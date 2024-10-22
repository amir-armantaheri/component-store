import type {Reactive} from 'vue'

export type EmptyComponentStore = {}
export type CombineFeatures<T> = StoreFeature<EmptyComponentStore, T>
export type StoreFeature<
  Input extends EmptyComponentStore = EmptyComponentStore,
  Output extends EmptyComponentStore = EmptyComponentStore
> = (store: Reactive<Input>) => Output


export type ComponentStore<T> =[() => Reactive<T>, () => Reactive<T>]
