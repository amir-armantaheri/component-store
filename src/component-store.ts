import {inject, provide, reactive} from 'vue'
import {ComponentStore, ComponentStoreInit, EmptyComponentStore, StoreFeature} from './component-store.model'
import {combineFeatures} from './utilities'

export function componentStore<F1 extends EmptyComponentStore = EmptyComponentStore>(
  arg1: StoreFeature<Record<string, never>, F1>
): ComponentStore<F1>
export function componentStore<F1 extends EmptyComponentStore = EmptyComponentStore, F2 extends EmptyComponentStore = EmptyComponentStore>(
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>
): ComponentStore<F1 & F2>

export function componentStore<
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore
>(arg1: StoreFeature<Record<string, never>, F1>, arg2: StoreFeature<F1, F2>, arg3: StoreFeature<F1 & F2, F3>): ComponentStore<F1 & F2 & F3>
export function componentStore<
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>
): ComponentStore<F1 & F2 & F3 & F4>
export function componentStore<
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>
): ComponentStore<F1 & F2 & F3 & F4 & F5>
export function componentStore<
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<Record<string, never>, F1>,
  arg2: StoreFeature<F1, F2>,
  arg3: StoreFeature<F1 & F2, F3>,
  arg4: StoreFeature<F1 & F2 & F3, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5, F6>
): ComponentStore<F1 & F2 & F3 & F4 & F5 & F6>
export function componentStore<
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore
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
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore
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
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore
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
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore,
  F10 extends EmptyComponentStore = EmptyComponentStore
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
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore,
  F10 extends EmptyComponentStore = EmptyComponentStore,
  F11 extends EmptyComponentStore = EmptyComponentStore
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
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore,
  F10 extends EmptyComponentStore = EmptyComponentStore,
  F11 extends EmptyComponentStore = EmptyComponentStore,
  F12 extends EmptyComponentStore = EmptyComponentStore
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
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore,
  F10 extends EmptyComponentStore = EmptyComponentStore,
  F11 extends EmptyComponentStore = EmptyComponentStore,
  F12 extends EmptyComponentStore = EmptyComponentStore,
  F13 extends EmptyComponentStore = EmptyComponentStore
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
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore,
  F10 extends EmptyComponentStore = EmptyComponentStore,
  F11 extends EmptyComponentStore = EmptyComponentStore,
  F12 extends EmptyComponentStore = EmptyComponentStore,
  F13 extends EmptyComponentStore = EmptyComponentStore,
  F14 extends EmptyComponentStore = EmptyComponentStore
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
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore,
  F10 extends EmptyComponentStore = EmptyComponentStore,
  F11 extends EmptyComponentStore = EmptyComponentStore,
  F12 extends EmptyComponentStore = EmptyComponentStore,
  F13 extends EmptyComponentStore = EmptyComponentStore,
  F14 extends EmptyComponentStore = EmptyComponentStore,
  F15 extends EmptyComponentStore = EmptyComponentStore
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

// ********************** with initial state **********************

export function componentStore<F0 extends EmptyComponentStore = EmptyComponentStore, F1 extends EmptyComponentStore = EmptyComponentStore>(
  arg1: StoreFeature<F0, F1>
): ComponentStoreInit<F0, F1>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore
>(arg1: StoreFeature<F0, F1>, arg2: StoreFeature<F1 & F0, F2>): ComponentStoreInit<F0, F1 & F2>

export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore
>(arg1: StoreFeature<F0, F1>, arg2: StoreFeature<F1 & F0, F2>, arg3: StoreFeature<F1 & F2 & F0, F3>): ComponentStoreInit<F0, F1 & F2 & F3>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<F0, F1>,
  arg2: StoreFeature<F1 & F0, F2>,
  arg3: StoreFeature<F1 & F2 & F0, F3>,
  arg4: StoreFeature<F1 & F2 & F3 & F0, F4>
): ComponentStoreInit<F0, F1 & F2 & F3 & F4>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<F0, F1>,
  arg2: StoreFeature<F1 & F0, F2>,
  arg3: StoreFeature<F1 & F2 & F0, F3>,
  arg4: StoreFeature<F1 & F2 & F3 & F0, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4 & F0, F5>
): ComponentStoreInit<F0, F1 & F2 & F3 & F4 & F5>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<F0, F1>,
  arg2: StoreFeature<F1 & F0, F2>,
  arg3: StoreFeature<F1 & F2 & F0, F3>,
  arg4: StoreFeature<F1 & F2 & F3 & F0, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4 & F0, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5 & F0, F6>
): ComponentStoreInit<F0, F1 & F2 & F3 & F4 & F5 & F6>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<F0, F1>,
  arg2: StoreFeature<F1 & F0, F2>,
  arg3: StoreFeature<F1 & F2 & F0, F3>,
  arg4: StoreFeature<F1 & F2 & F3 & F0, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4 & F0, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5 & F0, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F0, F7>
): ComponentStoreInit<F0, F1 & F2 & F3 & F4 & F5 & F6 & F7>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<F0, F1>,
  arg2: StoreFeature<F1 & F0, F2>,
  arg3: StoreFeature<F1 & F2 & F0, F3>,
  arg4: StoreFeature<F1 & F2 & F3 & F0, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4 & F0, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5 & F0, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F0, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F0, F8>
): ComponentStoreInit<F0, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<F0, F1>,
  arg2: StoreFeature<F1 & F0, F2>,
  arg3: StoreFeature<F1 & F2 & F0, F3>,
  arg4: StoreFeature<F1 & F2 & F3 & F0, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4 & F0, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5 & F0, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F0, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F0, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F0, F9>
): ComponentStoreInit<F0, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore,
  F10 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<F0, F1>,
  arg2: StoreFeature<F1 & F0, F2>,
  arg3: StoreFeature<F1 & F2 & F0, F3>,
  arg4: StoreFeature<F1 & F2 & F3 & F0, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4 & F0, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5 & F0, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F0, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F0, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F0, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F0, F10>
): ComponentStoreInit<F0, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore,
  F10 extends EmptyComponentStore = EmptyComponentStore,
  F11 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<F0, F1>,
  arg2: StoreFeature<F1 & F0, F2>,
  arg3: StoreFeature<F1 & F2 & F0, F3>,
  arg4: StoreFeature<F1 & F2 & F3 & F0, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4 & F0, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5 & F0, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F0, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F0, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F0, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F0, F10>,
  arg11: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F0, F11>
): ComponentStoreInit<F0, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore,
  F10 extends EmptyComponentStore = EmptyComponentStore,
  F11 extends EmptyComponentStore = EmptyComponentStore,
  F12 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<F0, F1>,
  arg2: StoreFeature<F1 & F0, F2>,
  arg3: StoreFeature<F1 & F2 & F0, F3>,
  arg4: StoreFeature<F1 & F2 & F3 & F0, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4 & F0, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5 & F0, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F0, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F0, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F0, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F0, F10>,
  arg11: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F0, F11>,
  arg12: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F0, F12>
): ComponentStoreInit<F0, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore,
  F10 extends EmptyComponentStore = EmptyComponentStore,
  F11 extends EmptyComponentStore = EmptyComponentStore,
  F12 extends EmptyComponentStore = EmptyComponentStore,
  F13 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<F0, F1>,
  arg2: StoreFeature<F1 & F0, F2>,
  arg3: StoreFeature<F1 & F2 & F0, F3>,
  arg4: StoreFeature<F1 & F2 & F3 & F0, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4 & F0, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5 & F0, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F0, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F0, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F0, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F0, F10>,
  arg11: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F0, F11>,
  arg12: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F0, F12>,
  arg13: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F0, F13>
): ComponentStoreInit<F0, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore,
  F10 extends EmptyComponentStore = EmptyComponentStore,
  F11 extends EmptyComponentStore = EmptyComponentStore,
  F12 extends EmptyComponentStore = EmptyComponentStore,
  F13 extends EmptyComponentStore = EmptyComponentStore,
  F14 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<F0, F1>,
  arg2: StoreFeature<F1 & F0, F2>,
  arg3: StoreFeature<F1 & F2 & F0, F3>,
  arg4: StoreFeature<F1 & F2 & F3 & F0, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4 & F0, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5 & F0, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F0, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F0, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F0, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F0, F10>,
  arg11: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F0, F11>,
  arg12: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F0, F12>,
  arg13: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F0, F13>,
  arg14: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F0, F14>
): ComponentStoreInit<F0, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14>
export function componentStore<
  F0 extends EmptyComponentStore = EmptyComponentStore,
  F1 extends EmptyComponentStore = EmptyComponentStore,
  F2 extends EmptyComponentStore = EmptyComponentStore,
  F3 extends EmptyComponentStore = EmptyComponentStore,
  F4 extends EmptyComponentStore = EmptyComponentStore,
  F5 extends EmptyComponentStore = EmptyComponentStore,
  F6 extends EmptyComponentStore = EmptyComponentStore,
  F7 extends EmptyComponentStore = EmptyComponentStore,
  F8 extends EmptyComponentStore = EmptyComponentStore,
  F9 extends EmptyComponentStore = EmptyComponentStore,
  F10 extends EmptyComponentStore = EmptyComponentStore,
  F11 extends EmptyComponentStore = EmptyComponentStore,
  F12 extends EmptyComponentStore = EmptyComponentStore,
  F13 extends EmptyComponentStore = EmptyComponentStore,
  F14 extends EmptyComponentStore = EmptyComponentStore,
  F15 extends EmptyComponentStore = EmptyComponentStore
>(
  arg1: StoreFeature<F0, F1>,
  arg2: StoreFeature<F1 & F0, F2>,
  arg3: StoreFeature<F1 & F2 & F0, F3>,
  arg4: StoreFeature<F1 & F2 & F3 & F0, F4>,
  arg5: StoreFeature<F1 & F2 & F3 & F4 & F0, F5>,
  arg6: StoreFeature<F1 & F2 & F3 & F4 & F5 & F0, F6>,
  arg7: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F0, F7>,
  arg8: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F0, F8>,
  arg9: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F0, F9>,
  arg10: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F0, F10>,
  arg11: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F0, F11>,
  arg12: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F0, F12>,
  arg13: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F0, F13>,
  arg14: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F0, F14>,
  arg15: StoreFeature<F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14 & F0, F15>
): ComponentStoreInit<F0, F1 & F2 & F3 & F4 & F5 & F6 & F7 & F8 & F9 & F10 & F11 & F12 & F13 & F14 & F15>

export function componentStore(...features: StoreFeature[]): ComponentStore | ComponentStoreInit<EmptyComponentStore> {
  const injectionKey = Symbol('component-store')
  return [
    function providerFn(store) {
      const storeInstance = reactive(combineFeatures(features, store))
      provide(injectionKey, storeInstance)
      return storeInstance
    },
    function useStoreFn() {
      return inject(injectionKey)!
    }
  ]
  // return [providerFn, useStoreFn]
}
