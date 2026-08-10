import type { Ref } from 'vue'

export type EmptyComponentStore = {}
export type StoreState<T> = { [K in keyof T]: T[K] extends Ref<infer V> ? V : T[K] }

export type CombineFeatures<S, T extends EmptyComponentStore> = StoreFeature<S, T>
export type StoreFeature<Input = EmptyComponentStore, Output extends EmptyComponentStore = EmptyComponentStore> = (
  store: StoreState<Input>
) => Output

export type ComponentStore<T = EmptyComponentStore> = [() => StoreState<T>, () => StoreState<T>]
export type ComponentStoreInit<S, T = EmptyComponentStore> = [(store: S) => StoreState<T & S>, () => StoreState<T & S>]
