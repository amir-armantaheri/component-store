import {ref} from 'vue'
import {withHooks} from '../../../src'
import type {Fixture} from '../harness/types'

interface HookState {
  mounts: number
  note: string
  touches: number
}

// f1 — plain refs plus a method, so there is something to watch and drive.
function hookState() {
  return () => {
    const mounts = ref(0)
    const note = ref('constructed')
    const touches = ref(0)
    return {
      mounts,
      note,
      touches,
      touch() {
        touches.value += 1
      }
    }
  }
}

/**
 * f2 — the lifecycle feature. onProvide runs during combineFeatures, i.e. before
 * the harness' change watcher exists, so its write shows up in State but not in
 * the Log. onMounted/onUnmounted run inside real Vue hooks and are logged.
 */
const lifecycle = withHooks<HookState>((store) => ({
  onProvide() {
    store.note = 'provided (during construction)'
  },
  onMounted() {
    store.mounts += 1
    store.note = 'mounted'
  },
  onUnmounted() {
    store.note = 'unmounted'
    console.warn('[hooks] onUnmounted fired — this write lands on a store nobody holds any more')
  }
}))

export default {
  name: 'withHooks — provide / mounted / unmounted',
  description:
    'Press unmount and watch the log: the store\'s own onUnmounted fires between the "unmounting" and "unmounted" dividers. Then remount — mounts goes back to 1, not 2, because each mount builds a fresh set of refs (contrast with the nested leak in the withState fixture).',
  features: [
    ['f1 hookState', hookState()],
    ['f2 withHooks', lifecycle]
  ]
} satisfies Fixture
