import {toRaw, watch} from 'vue'
import type {WatchStopHandle} from 'vue'
import {formatValue} from './format'
import {buildTargetPaths, resolveTargetPath} from './inspect'
import {log} from './log'
import type {AnyFeature, Attribution, AttributionResult, Collision, FixtureFeature} from './types'

interface Recorder {
  record(label: string, keys: string[], preexisting: Set<string>): void
  result(): AttributionResult
}

export function createRecorder(): Recorder {
  const order: string[] = []
  const byKey: Record<string, Attribution> = {}
  const collisions: Collision[] = []

  return {
    record(label, keys, preexisting) {
      for (const key of keys) {
        const existing = byKey[key]
        if (existing) {
          // Another *feature* already provided this key: combineFeatures'
          // Object.assign silently replaced it.
          collisions.push({key, previousOwner: existing.owner, newOwner: label})
          existing.history.push(label)
          existing.owner = label
          existing.clobbered = true
          continue
        }
        if (preexisting.has(key)) {
          // Came in via initialState rather than an earlier feature.
          collisions.push({key, previousOwner: 'initialState', newOwner: label})
          byKey[key] = {key, owner: label, history: ['initialState', label], clobbered: true}
          order.push(key)
          continue
        }
        byKey[key] = {key, owner: label, history: [label], clobbered: false}
        order.push(key)
      }
    },
    result() {
      return {attribution: order.map((key) => byKey[key]), collisions, byKey}
    }
  }
}

let activeRecorder: Recorder | null = null

/** Feature wrappers report to whichever recorder is active for this mount. */
export function withRecorder<T>(recorder: Recorder, run: () => T): T {
  const previous = activeRecorder
  activeRecorder = recorder
  try {
    return run()
  } finally {
    activeRecorder = previous
  }
}

function labelOf(entry: FixtureFeature, index: number): [string, AnyFeature] {
  if (Array.isArray(entry)) return [entry[0], entry[1]]
  const name = (entry as {name?: string}).name
  return [name ? `f${index + 1} ${name}` : `f${index + 1}`, entry]
}

/**
 * Wraps each feature so we can diff the store's key set around it. The wrapper
 * is transparent: it returns exactly what the feature returned (identity
 * included, which combineFeatures relies on) and calls it synchronously inside
 * the same setup() context, so provide/inject and lifecycle hooks still work.
 */
export function instrumentFeatures(features: FixtureFeature[]): {wrapped: AnyFeature[]; labels: string[]} {
  const labels: string[] = []
  const wrapped = features.map((entry, index) => {
    const [label, feature] = labelOf(entry, index)
    labels.push(label)
    return (store: any) => {
      const preexisting = new Set(Object.keys(toRaw(store) as object))
      const produced = feature(store)
      if (produced === store || produced === null || produced === undefined) {
        activeRecorder?.record(label, [], preexisting)
        return produced
      }
      activeRecorder?.record(label, Object.keys(produced as object), preexisting)
      return produced
    }
  })
  return {wrapped, labels}
}

export function logAttribution(result: AttributionResult, instance: number) {
  for (const entry of result.attribution) {
    log({
      kind: 'attribution',
      instance,
      text: `${entry.key} ← ${entry.owner}`,
      detail: entry.clobbered ? `set by ${entry.history.join(' → ')}` : undefined
    })
  }
  for (const collision of result.collisions) {
    log({
      kind: 'collision',
      instance,
      text: `'${collision.key}' from ${collision.previousOwner} was overwritten by ${collision.newOwner}`,
      detail: 'combineFeatures uses Object.assign — the earlier value is gone, with no warning'
    })
  }
}

/**
 * Logs every mutation reachable from the store, with key path and old → new.
 * Uses Vue's `onTrigger` debugger hook (dev-only, which is all this harness
 * runs in) rather than a diffing watcher, so key adds/deletes show up too.
 */
export function watchStoreChanges(store: object, instance: number): WatchStopHandle {
  let paths = buildTargetPaths(store)

  return watch(
    store,
    () => {
      // Runs untracked, after the triggers below — refresh paths for anything
      // newly added so the next mutation resolves to a real name.
      paths = buildTargetPaths(store)
    },
    {
      deep: true,
      flush: 'sync',
      onTrigger(event) {
        const path = resolveTargetPath(event.target as object, event.key, paths)
        if (event.type === 'set') {
          log({
            kind: 'mutation',
            instance,
            text: `set ${path}`,
            from: formatValue(event.oldValue),
            to: formatValue(event.newValue)
          })
          return
        }
        if (event.type === 'add') {
          log({kind: 'mutation', instance, text: `add ${path}`, to: formatValue(event.newValue)})
          return
        }
        if (event.type === 'delete') {
          log({kind: 'mutation', instance, text: `delete ${path}`, from: formatValue(event.oldValue)})
          return
        }
        log({kind: 'mutation', instance, text: `${event.type} ${path}`})
      }
    }
  )
}
