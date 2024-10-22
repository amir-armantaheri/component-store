import {inject, provide, reactive} from 'vue'
import {ComponentStore, EmptyComponentStore, StoreFeature} from './component-store.model'
import {combineFeatures} from './utilities'

export function componentStore<F1 extends EmptyComponentStore>(arg1: StoreFeature<Record<string, never>, F1>): ComponentStore<F1>
export function componentStore<F1 extends EmptyComponentStore, F2 extends EmptyComponentStore>(
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>
): ComponentStore<F1 & F2>
export function componentStore<F1 extends EmptyComponentStore, F2 extends EmptyComponentStore, F3 extends EmptyComponentStore>(
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>
): ComponentStore<F1 & F2 & F3>
export function componentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore
>(
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>
): ComponentStore<F1 & F2 & F3 & F4>
export function componentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore
>(
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>
): ComponentStore<F1 & F2 & F3 & F4 & F5>
export function componentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore
>(
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>
): ComponentStore<F1 & F2 & F3 & F4 & F5 & F6>
export function componentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore,
  F7 extends EmptyComponentStore
>(
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>
): ComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7>
export function componentStore<
  F1 extends EmptyComponentStore,
  F2 extends EmptyComponentStore,
  F3 extends EmptyComponentStore,
  F4 extends EmptyComponentStore,
  F5 extends EmptyComponentStore,
  F6 extends EmptyComponentStore,
  F7 extends EmptyComponentStore,
  F8 extends EmptyComponentStore
>(
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>
): ComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8>
export function componentStore<
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
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>
): ComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9>
export function componentStore<
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
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9, F10>
): ComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10>
export function componentStore<
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
  arg1: StoreFeature<Record<string, never>, F1>,
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
): ComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11>
export function componentStore<
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
  arg1: StoreFeature<Record<string, never>, F1>,
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
): ComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12>
export function componentStore<
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
  arg1: StoreFeature<Record<string, never>, F1>,
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
): ComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13>
export function componentStore<
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
  arg1: StoreFeature<Record<string, never>, F1>,
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
): ComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14>
export function componentStore<
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
  arg1: StoreFeature<Record<string, never>, F1>,
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
): ComponentStore<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14 & F15>

export function componentStore<T extends StoreFeature[]>(...features: T) {
  const injectionKey = Symbol('component-store')

  function providerFn() {
    const storeInstance = reactive(combineFeatures(features))
    provide(injectionKey, storeInstance)
    return storeInstance
  }
  function useStoreFn() {
    return inject(injectionKey)!
  }
  return [providerFn, useStoreFn]
}
