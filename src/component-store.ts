import {inject, provide, type Reactive, reactive, toRefs} from 'vue'

type EmptyComponentStore = {}
type CreateComponentStore<T> = [() => Reactive<T>, () => Reactive<T>]
type StoreFeature<Input extends EmptyComponentStore = EmptyComponentStore, Output extends EmptyComponentStore = EmptyComponentStore> = (
  store: Reactive<Input>,
  ...args: any[]
) => Output

export function createComponentStore<F1 extends EmptyComponentStore>(arg1: StoreFeature<EmptyComponentStore, F1>): CreateComponentStore<F1>
export function createComponentStore<F1 extends EmptyComponentStore, F2 extends EmptyComponentStore>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>
): CreateComponentStore<F1 & F2>
export function createComponentStore<F1 extends EmptyComponentStore, F2 extends EmptyComponentStore, F3 extends EmptyComponentStore>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>
): CreateComponentStore<F1 & F2 & F3>
export function createComponentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore
>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>
): CreateComponentStore<F1 & F2 & F3 & F4>
export function createComponentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore
>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>
): CreateComponentStore<F1 & F2 & F3 & F4 & F5>
export function createComponentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore
>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>
): CreateComponentStore<F1 & F2 & F3 & F4 & F5 & F6>
export function createComponentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore,
  F7 extends EmptyComponentStore
>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>
): CreateComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7>
export function createComponentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore,
  F7 extends EmptyComponentStore,
  F8 extends EmptyComponentStore
>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>
): CreateComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8>
export function createComponentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore,
  F7 extends EmptyComponentStore,
  F8 extends EmptyComponentStore,
  F9 extends EmptyComponentStore
>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>
): CreateComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9>
export function createComponentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore,
  F7 extends EmptyComponentStore,
  F8 extends EmptyComponentStore,
  F9 extends EmptyComponentStore,
  F10 extends EmptyComponentStore
>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>
): CreateComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10>
export function createComponentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore,
  F7 extends EmptyComponentStore,
  F8 extends EmptyComponentStore,
  F9 extends EmptyComponentStore,
  F10 extends EmptyComponentStore,
  F11 extends EmptyComponentStore
>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>,
  arg11: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>
): CreateComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11>
export function createComponentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore,
  F7 extends EmptyComponentStore,
  F8 extends EmptyComponentStore,
  F9 extends EmptyComponentStore,
  F10 extends EmptyComponentStore,
  F11 extends EmptyComponentStore,
  F12 extends EmptyComponentStore
>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>,
  arg11: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>,
  arg12: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>
): CreateComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12>
export function createComponentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore,
  F7 extends EmptyComponentStore,
  F8 extends EmptyComponentStore,
  F9 extends EmptyComponentStore,
  F10 extends EmptyComponentStore,
  F11 extends EmptyComponentStore,
  F12 extends EmptyComponentStore,
  F13 extends EmptyComponentStore
>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>,
  arg11: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>,
  arg12: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>,
  arg13: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, F13>
): CreateComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13>
export function createComponentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore,
  F7 extends EmptyComponentStore,
  F8 extends EmptyComponentStore,
  F9 extends EmptyComponentStore,
  F10 extends EmptyComponentStore,
  F11 extends EmptyComponentStore,
  F12 extends EmptyComponentStore,
  F13 extends EmptyComponentStore,
  F14 extends EmptyComponentStore
>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>,
  arg11: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>,
  arg12: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>,
  arg13: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, F13>,
  arg14: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13, F14>
): CreateComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14>
export function createComponentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore,
  F7 extends EmptyComponentStore,
  F8 extends EmptyComponentStore,
  F9 extends EmptyComponentStore,
  F10 extends EmptyComponentStore,
  F11 extends EmptyComponentStore,
  F12 extends EmptyComponentStore,
  F13 extends EmptyComponentStore,
  F14 extends EmptyComponentStore,
  F15 extends EmptyComponentStore
>(
  arg1: StoreFeature<EmptyComponentStore, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>,
  arg11: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10, F11>,
  arg12: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11, F12>,
  arg13: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12, F13>,
  arg14: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13, F14>,
  arg15: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14, F15>
): CreateComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14 & F15>

export function createComponentStore(...features: StoreFeature[]) {
  const injectionKey = Symbol('componentStore')

  function providerFn() {
    const storeInstance = features.reduce((store, feature) => {
      const featureStore = feature(store)
      return reactive({...toRefs(store), ...toRefs(featureStore)})
    }, reactive({}))

    provide(injectionKey, storeInstance)
    return storeInstance
  }

  function useStoreFn() {
    return inject(injectionKey)!
  }

  return [providerFn, useStoreFn]
}
