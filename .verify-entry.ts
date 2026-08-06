/* Throwaway verification driver for the dev harness engine. Not part of the harness. */
import {createRenderer, defineComponent, h, onMounted} from 'vue'
import {installErrorCapture} from './app/harness/errors'
import {createRecorder, instrumentFeatures, logAttribution, watchStoreChanges, withRecorder} from './app/harness/instrument'
import {describeStore, type KeyInfo} from './app/harness/inspect'
import {clearLog, entries, type LogEntry} from './app/harness/log'
import type {AnyFeature, AttributionResult, Fixture} from './app/harness/types'
import {componentStore} from './src'
import basic from './app/fixtures/basic.store'
import collision from './app/fixtures/collision.store'
import hooks from './app/fixtures/hooks.store'
import counter from './app/fixtures/state-computed-methods.store'

// ── minimal non-DOM renderer ────────────────────────────────────────────────
interface TestNode {
  type: string
  children: TestNode[]
  parent: TestNode | null
  text?: string
  props: Record<string, unknown>
}

const node = (type: string, text?: string): TestNode => ({type, children: [], parent: null, text, props: {}})

const {createApp} = createRenderer<TestNode, TestNode>({
  createElement: (type) => node(type),
  createText: (text) => node('#text', text),
  createComment: (text) => node('#comment', text),
  setText: (n, text) => void (n.text = text),
  setElementText: (n, text) => {
    n.children = []
    n.text = text
  },
  insert: (child, parent, anchor) => {
    child.parent = parent
    const index = anchor ? parent.children.indexOf(anchor) : -1
    if (index === -1) parent.children.push(child)
    else parent.children.splice(index, 0, child)
  },
  remove: (child) => {
    const parent = child.parent
    if (!parent) return
    const index = parent.children.indexOf(child)
    if (index > -1) parent.children.splice(index, 1)
    child.parent = null
  },
  parentNode: (n) => n.parent,
  nextSibling: (n) => {
    const parent = n.parent
    if (!parent) return null
    return parent.children[parent.children.indexOf(n) + 1] ?? null
  },
  patchProp: (el, key, _prev, next) => void (el.props[key] = next)
})

// ── mirrors app/StoreHost.vue + app/StoreConsumer.vue ───────────────────────
const Consumer = defineComponent({
  props: {useStore: {type: Function, required: true}},
  setup(props) {
    const injected = (props.useStore as () => any)()
    injectedKeyCount = injected ? Object.keys(injected).length : -1
    return () => h('div', null, String(injectedKeyCount))
  }
})

let injectedKeyCount = -1

interface Mounted {
  store: any
  result: AttributionResult
  unmount: () => void
}

function mountFixture(fixture: Fixture, instance: number): Mounted {
  const {wrapped} = instrumentFeatures(fixture.features)
  const create = componentStore as unknown as (...f: AnyFeature[]) => [(s?: any) => any, () => any]
  const [provideStore, useStore] = create(...wrapped)
  return mountApi({provideStore, useStore}, fixture, instance)
}

function mountApi(
  api: {provideStore: (s?: any) => any; useStore: () => any},
  fixture: Fixture,
  instance: number
): Mounted {
  let store: any
  let result!: AttributionResult

  const Host = defineComponent({
    setup() {
      const recorder = createRecorder()
      onMounted(() => void 0)
      store = withRecorder(recorder, () => api.provideStore(fixture.initialState))
      result = recorder.result()
      logAttribution(result, instance)
      watchStoreChanges(store, instance)
      return () => h(Consumer, {useStore: api.useStore})
    }
  })

  const app = createApp(Host)
  installErrorCapture(app)
  app.mount(node('root'))
  return {store, result, unmount: () => app.unmount()}
}

// ── assertions ──────────────────────────────────────────────────────────────
let failures = 0
let checks = 0

function check(label: string, condition: boolean, detail?: string) {
  checks++
  if (condition) {
    process.stdout.write(`  ok    ${label}\n`)
  } else {
    failures++
    process.stdout.write(`  FAIL  ${label}${detail ? `\n          ${detail}` : ''}\n`)
  }
}

const kindOf = (keys: KeyInfo[], key: string) => keys.find((k) => k.key === key)?.kind
const mutations = () => entries.value.filter((e) => e.kind === 'mutation')
const findMutation = (text: string): LogEntry | undefined => mutations().find((e) => e.text === text)
const hasWarn = (needle: string) =>
  entries.value.some((e) => (e.kind === 'warn' || e.kind === 'error') && e.text.toLowerCase().includes(needle.toLowerCase()))

function section(title: string) {
  process.stdout.write(`\n${title}\n`)
  clearLog()
}

// ── 1. basic (ported scratchpad) ────────────────────────────────────────────
section('basic — ported scratchpad')
{
  const {store, result} = mountFixture(basic, 1)
  const keys = describeStore(store)

  check('inject() resolved in the child', injectedKeyCount === 5, `key count = ${injectedKeyCount}`)
  check('name attributed to f1', result.byKey['name']?.owner === 'f1 baseState')
  check('isLoading attributed to f2', result.byKey['isLoading']?.owner === 'f2 withStats')
  check('loading attributed to f3 (winner)', result.byKey['loading']?.owner === 'f3 withLoadingControls')
  check('loading flagged as clobbered', result.byKey['loading']?.clobbered === true)
  check(
    'exactly one collision, f1 → f3 on loading',
    result.collisions.length === 1 &&
      result.collisions[0].key === 'loading' &&
      result.collisions[0].previousOwner === 'f1 baseState' &&
      result.collisions[0].newOwner === 'f3 withLoadingControls',
    JSON.stringify(result.collisions)
  )

  check('name classified as ref', kindOf(keys, 'name') === 'ref', String(kindOf(keys, 'name')))
  check('isLoading classified as computed', kindOf(keys, 'isLoading') === 'computed', String(kindOf(keys, 'isLoading')))
  check('loading classified as ref (f3 won)', kindOf(keys, 'loading') === 'ref', String(kindOf(keys, 'loading')))
  check('startLoading classified as method', kindOf(keys, 'startLoading') === 'method')

  store.name = 'ali'
  const nameEntry = findMutation('set name')
  check(
    'ref mutation logged under its key name, not <ref>.value',
    nameEntry !== undefined && nameEntry.from === "'hasan'" && nameEntry.to === "'ali'",
    nameEntry ? `${nameEntry.text} ${nameEntry.from} → ${nameEntry.to}` : `keys logged: ${mutations().map((m) => m.text).join(', ')}`
  )

  store.startLoading()
  const loadingEntry = findMutation('set loading')
  check(
    'method-driven ref mutation logged false → true',
    loadingEntry !== undefined && loadingEntry.from === 'false' && loadingEntry.to === 'true',
    loadingEntry ? `${loadingEntry.from} → ${loadingEntry.to}` : 'not logged'
  )
  check('lazy computed tracked the winning loading ref', store.isLoading === true, String(store.isLoading))
}

// ── 2. collision ────────────────────────────────────────────────────────────
section('collision — three features, one key')
{
  const {store, result} = mountFixture(collision, 2)
  const keys = describeStore(store)

  check('two collisions recorded on status', result.collisions.filter((c) => c.key === 'status').length === 2, JSON.stringify(result.collisions))
  check('collision chain f1 → f2 → f3', result.byKey['status']?.history.join(' → ') === 'f1 seed → f2 overrideWithRef → f3 overrideWithComputed', String(result.byKey['status']?.history))
  check('retries not flagged', result.byKey['retries']?.clobbered === false)
  check('status classified as computed', kindOf(keys, 'status') === 'computed')
  check('status marked read-only (no setter)', keys.find((k) => k.key === 'status')?.readonlyComputed === true)
  check('no control offered for read-only computed', keys.find((k) => k.key === 'status')?.control === 'none')
  check("f2's computed reads the merged store", store.statusUpper === 'ALWAYS-F3', String(store.statusUpper))

  store.forceStatus()
  check('write to read-only computed captured as a warning', hasWarn('readonly'), entries.value.filter((e) => e.kind === 'warn').map((e) => e.text).join(' | ') || 'no warnings logged')
  check('read-only computed value unchanged', store.status === 'always-f3', String(store.status))
}

// ── 3. hooks ────────────────────────────────────────────────────────────────
section('withHooks — provide / mounted / unmounted')
{
  const first = mountFixture(hooks, 3)
  check('onProvide ran during construction', first.store.mounts === 1 || first.store.note === 'mounted', String(first.store.note))
  check('onMounted incremented mounts', first.store.mounts === 1, String(first.store.mounts))
  check('onMounted write logged 0 → 1', findMutation('set mounts')?.from === '0' && findMutation('set mounts')?.to === '1', JSON.stringify(findMutation('set mounts')))

  first.unmount()
  check('store onUnmounted hook fired', first.store.note === 'unmounted', String(first.store.note))
  check('onUnmounted console.warn captured', hasWarn('onUnmounted fired'))

  clearLog()
  const second = mountFixture(hooks, 4)
  check('remount builds fresh refs (mounts back to 1)', second.store.mounts === 1, String(second.store.mounts))
  second.unmount()
}

// ── 4. withState / withComputed / withMethods ───────────────────────────────
section('withState / withComputed / withMethods')
{
  const {wrapped} = instrumentFeatures(counter.features)
  const create = componentStore as unknown as (...f: AnyFeature[]) => [(s?: any) => any, () => any]
  const [provideStore, useStore] = create(...wrapped)
  const api = {provideStore, useStore}

  const first = mountApi(api, counter, 5)
  const keys = describeStore(first.store)

  check('count classified as plain value', kindOf(keys, 'count') === 'plain', String(kindOf(keys, 'count')))
  check('nested classified as object', kindOf(keys, 'nested') === 'object')
  check('doubled classified as computed', kindOf(keys, 'doubled') === 'computed')
  check('increment classified as method', kindOf(keys, 'increment') === 'method')
  check('no collisions in this fixture', first.result.collisions.length === 0, JSON.stringify(first.result.collisions))

  first.store.increment()
  check('plain-value mutation logged 0 → 1', findMutation('set count')?.from === '0' && findMutation('set count')?.to === '1', JSON.stringify(findMutation('set count')))
  check('computed recomputed', first.store.doubled === 2, String(first.store.doubled))

  first.store.bumpNested()
  const nestedEntry = findMutation('set nested.hits')
  check('nested mutation logged with dotted path', nestedEntry !== undefined && nestedEntry.from === '0' && nestedEntry.to === '1', nestedEntry ? `${nestedEntry.from} → ${nestedEntry.to}` : mutations().map((m) => m.text).join(', '))

  first.unmount()
  const second = mountApi(api, counter, 6)
  check('remount resets primitive from withState', second.store.count === 0, String(second.store.count))
  check('remount leaks shared nested object (documented in fixture)', second.store.nested.hits === 1, String(second.store.nested.hits))
  second.unmount()
}

process.stdout.write(`\n${checks - failures}/${checks} checks passed\n`)
process.exit(failures > 0 ? 1 : 0)
