import { ComputedRef, watch, WatchCallback, WatchHandle, WatchOptions } from 'vue'

export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]
type ComputedKey<T, B> = (store: T) => B
export type Callback<T, K extends NonFunctionPropertyNames<T>> = (newValue: T[K], oldValue?: T[K]) => void

export function withStateChange() {
  return <T extends Record<string, any>>(store: T) => {
    const callbackHanders: WatchHandle[] = []

    function watchState(key: NonFunctionPropertyNames<T>, callback: WatchCallback, options: WatchOptions = {}) {
      const stopFn = watch(() => store[key], callback, options)
      callbackHanders.push(stopFn)
      return stopFn
    }
    function watchComputedState<B>(computedKey: ComputedKey<T, B>, callback: WatchCallback<B>, options: WatchOptions = {}) {
      const stopFn = watch(() => computedKey(store), callback, options)
      callbackHanders.push(stopFn)
      return stopFn
    }
    return {
      watchState,
      watchComputedState
    }
  }
}
