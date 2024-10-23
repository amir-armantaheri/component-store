import {EmptyComponentStore, StoreFeature} from './component-store.model'
import {reactive} from 'vue'

export function combineFeatures(features: StoreFeature[], initialValue: EmptyComponentStore = {}) {
  return features.reduce((store, feature) => {
    const featureStore = feature(reactive(store))
    return {...store, ...featureStore}
  }, reactive(initialValue))
}