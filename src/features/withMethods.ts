import { EmptyComponentStore, StoreFeature } from '../component-store.model.js'

export function withMethods<
  Store extends EmptyComponentStore = EmptyComponentStore,
  WithMethod extends Record<string, (...args: any[]) => unknown> = {}
>(feature: StoreFeature<Store, WithMethod>) {
  return feature
}
