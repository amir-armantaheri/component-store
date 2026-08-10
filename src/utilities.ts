import { EmptyComponentStore, StoreFeature } from './component-store.model.js'
import { isReactive, isReadonly, reactive, Reactive, toRefs } from 'vue'

export type ExtractFeatureType<T extends () => (x: any) => any> = Reactive<ReturnType<ReturnType<T>>>

function toReactive(obj: Reactive<Record<string, any>> | Record<string, any>) {
  return isReactive(obj) ? toRefs(obj) : obj
}
export function combineFeatures(features: StoreFeature[], initialValue: EmptyComponentStore = {}) {
  const initialReactiveObject = isReadonly(initialValue) ? toRefs(initialValue) : initialValue
  return features.reduce((store, feature) => {
    const featureStore = feature(store)

    if (featureStore === store) return store
    return Object.assign(store, toReactive(featureStore))
  }, reactive(initialReactiveObject))
}
