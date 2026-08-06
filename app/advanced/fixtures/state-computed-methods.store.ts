import {computed, type ComputedRef} from 'vue'
import {withComputed, withMethods, withState} from '../../../src'
import type {Fixture} from '../harness/types'

interface CounterState {
  count: number
  step: number
  label: string
  nested: {hits: number}
}

/**
 * withState returns the *same* object on every invocation. Object.assign copies
 * primitives by value, so `count` resets on remount — but `nested` is copied by
 * reference, so mutations to it leak across instances. Bump nested.hits, remount,
 * and watch it survive.
 */
const state = withState<CounterState>({
  count: 0,
  step: 1,
  label: 'counter',
  nested: {hits: 0}
})

const derived = withComputed<CounterState, {doubled: ComputedRef<number>; summary: ComputedRef<string>}>((store) => ({
  doubled: computed(() => store.count * 2),
  summary: computed(() => `${store.label}: ${store.count} (step ${store.step})`)
}))

const methods = withMethods<
  CounterState,
  {increment: () => void; decrement: () => void; bumpNested: () => void; reset: () => void}
>((store) => ({
  increment() {
    store.count += store.step
  },
  decrement() {
    store.count -= store.step
  },
  bumpNested() {
    store.nested.hits += 1
  },
  reset() {
    store.count = 0
    store.nested.hits = 0
  }
}))

export default {
  name: 'withState / withComputed / withMethods',
  description:
    'Covers the three new features in src/features. Nested-object leak to try: bumpNested() a few times, then remount — count goes back to 0 but nested.hits does not, because withState hands out one shared object.',
  features: [
    ['f1 withState', state],
    ['f2 withComputed', derived],
    ['f3 withMethods', methods]
  ]
} satisfies Fixture
