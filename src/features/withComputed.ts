import { ComputedRef } from 'vue'
import {EmptyComponentStore, StoreFeature} from '../component-store.model.js'

export function withComputed<Store extends EmptyComponentStore = EmptyComponentStore, WithComputed extends Record<string, ComputedRef> = {}>(feature: StoreFeature<Store, WithComputed >) {
  return feature
}
