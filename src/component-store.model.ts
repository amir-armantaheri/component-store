import type {Reactive} from 'vue'

export type EmptyComponentStore = {}
export type CombineFeatures<S,T extends EmptyComponentStore> = StoreFeature<S, T>
export type StoreFeature<
  Input = EmptyComponentStore,
  Output extends EmptyComponentStore = EmptyComponentStore
> = (store: Reactive<Input>) => Output


export type ComponentStore<T = EmptyComponentStore> =[() => Reactive<T>, () => Reactive<T>]
export type ComponentStoreInit<S, T = EmptyComponentStore> =[(store: S) => Reactive<T>, () => Reactive<T>]
