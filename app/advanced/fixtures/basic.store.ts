import {computed, ref} from 'vue'
import type {Fixture} from '../harness/types'

/**
 * Ported from the original app/app.store.ts scratchpad, which called
 * provideStore() at module scope and so could never actually run — provide()
 * needs a setup() context. The harness supplies that context; the features are
 * otherwise unchanged, including the `loading` collision between f1 and f3.
 */

// f1 — seeds `name` as a ref and `loading` as a plain boolean.
function baseState() {
  return () => {
    const name = ref('hasan')
    return {
      name,
      loading: false
    }
  }
}

// f2 — derives from `loading`. Because computeds are lazy, this reads whichever
// `loading` won the merge, not the one that existed when f2 ran.
function withStats() {
  return (store: {loading: boolean; name: string}) => {
    const isLoading = computed(() => store.loading)
    return {isLoading}
  }
}

// f3 — re-declares `loading`, this time as a ref, plus the methods that drive it.
function withLoadingControls() {
  return (store: {name: string}) => {
    console.log('[basic] f3 sees name =', store.name)
    const loading = ref(false)
    function startLoading() {
      loading.value = true
    }
    function stopLoading() {
      loading.value = false
    }
    return {loading, startLoading, stopLoading}
  }
}

export default {
  name: 'basic — ported scratchpad',
  description:
    'Your original app.store.ts, made runnable. Watch the State panel: `loading` is flagged (!) because f1 set it to a plain false and f3 replaced it with a ref. Hit startLoading() and note that f2 isLoading still tracks correctly — the computed is lazy, so it read f3 winner.',
  features: [
    ['f1 baseState', baseState()],
    ['f2 withStats', withStats()],
    ['f3 withLoadingControls', withLoadingControls()]
  ]
} satisfies Fixture
