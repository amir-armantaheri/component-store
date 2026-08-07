import {onMounted, onUnmounted, Reactive} from 'vue'
import {EmptyComponentStore, StoreFeature} from '../component-store.model.js'

type OnHook = () => void
interface WithHooks {
  onProvide?: OnHook
  onUnmounted?: OnHook
  onMounted?: OnHook
}

export function withHooks<Store extends EmptyComponentStore = EmptyComponentStore>(feature: StoreFeature<Store, WithHooks>) {
  return (store: Reactive<Store>) => {
    const {onProvide, onUnmounted: onUnmount, onMounted: onMount} = feature(store)
    if (onProvide) {
      onProvide()
    }

    if (onUnmount) {
      onUnmounted(onUnmount)
    }
    if (onMount) {
      onMounted(onMount)
    }

    return {}
  }
}
