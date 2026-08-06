import {isRef, toRaw} from 'vue'

export type ValueKind = 'ref' | 'computed' | 'method' | 'plain' | 'object'
export type ControlKind = 'text' | 'number' | 'checkbox' | 'json' | 'button' | 'none'

export interface KeyInfo {
  key: string
  /**
   * What sits in the *raw* store slot. `Object.assign`-ing a ref onto a
   * `reactive()` object means reads through the proxy unwrap it, so the raw
   * object is the only place the ref-ness is still visible.
   */
  kind: ValueKind
  /** typeof the current unwrapped value, for picking a control. */
  valueType: string
  editable: boolean
  control: ControlKind
  /** Set when a computed has no setter — writes to it warn and are dropped. */
  readonlyComputed: boolean
}

/** Vue 3.5's ComputedRefImpl carries the getter as `.fn`; a plain RefImpl does not. */
export function isComputedRef(value: unknown): boolean {
  return isRef(value) && typeof (value as {fn?: unknown}).fn === 'function'
}

function controlFor(kind: ValueKind, valueType: string, editable: boolean): ControlKind {
  if (kind === 'method') return 'button'
  if (!editable) return 'none'
  switch (valueType) {
    case 'boolean':
      return 'checkbox'
    case 'number':
      return 'number'
    case 'string':
      return 'text'
    case 'object':
      return 'json'
    default:
      return 'none'
  }
}

export function describeKey(store: Record<string, unknown>, key: string): KeyInfo {
  const slot = (toRaw(store) as Record<string, unknown>)[key]
  // Read through the proxy so callers inside an effect stay reactive to changes.
  const valueType = typeof store[key]

  let kind: ValueKind
  let editable: boolean
  let readonlyComputed = false

  if (isComputedRef(slot)) {
    kind = 'computed'
    editable = typeof (slot as {setter?: unknown}).setter === 'function'
    readonlyComputed = !editable
  } else if (isRef(slot)) {
    kind = 'ref'
    editable = true
  } else if (typeof slot === 'function') {
    kind = 'method'
    editable = false
  } else if (slot !== null && typeof slot === 'object') {
    kind = 'object'
    editable = true
  } else {
    kind = 'plain'
    editable = true
  }

  return {key, kind, valueType, editable, readonlyComputed, control: controlFor(kind, valueType, editable)}
}

/** `Object.keys` on the proxy tracks key additions/removals, so this stays live. */
export function describeStore(store: Record<string, unknown>): KeyInfo[] {
  return Object.keys(store).map((key) => describeKey(store, key))
}

const PATH_BUDGET = 300

/**
 * Maps every raw object and ref reachable from the store to its dotted path.
 * A ref mutation reports `target = RefImpl, key = 'value'`, so without this the
 * change log could only say "some ref changed".
 */
export function buildTargetPaths(store: object): Map<object, string> {
  const root = toRaw(store)
  const paths = new Map<object, string>([[root, '']])
  const visited = new Set<object>([root])
  const queue: Array<[object, string]> = [[root, '']]
  let budget = PATH_BUDGET

  while (queue.length > 0 && budget-- > 0) {
    const [node, path] = queue.shift()!
    for (const key of Object.keys(node)) {
      const value = (node as Record<string, unknown>)[key]
      if (value === null || typeof value !== 'object') continue
      const childPath = path ? `${path}.${key}` : key

      if (isRef(value)) {
        if (!paths.has(value)) paths.set(value, childPath)
        // A ref holding an object: mutations inside it report the inner raw target.
        const inner = (value as {_value?: unknown})._value
        if (inner !== null && typeof inner === 'object') {
          const rawInner = toRaw(inner)
          if (!visited.has(rawInner)) {
            visited.add(rawInner)
            paths.set(rawInner, childPath)
            queue.push([rawInner, childPath])
          }
        }
        continue
      }

      const raw = toRaw(value)
      if (visited.has(raw)) continue
      visited.add(raw)
      paths.set(raw, childPath)
      queue.push([raw, childPath])
    }
  }

  return paths
}

export function resolveTargetPath(target: object, key: unknown, paths: Map<object, string>): string {
  const keyName = typeof key === 'symbol' ? key.toString() : String(key)

  if (isRef(target)) {
    const path = paths.get(target)
    if (path !== undefined) return keyName === 'value' ? path : `${path}.${keyName}`
    return `<ref>.${keyName}`
  }

  const path = paths.get(target)
  if (path === '') return keyName
  if (path !== undefined) return `${path}.${keyName}`
  return `<detached>.${keyName}`
}
