import { onUnmounted, Reactive, watch, WatchHandle } from 'vue'
type CallbackOnChange<T> = (newValue: T, oldValue: T) => void
export function withProps<T extends Reactive<Record<string, any>>>() {
  return (props: T) => {
    const watcherHandlers: WatchHandle[] = []

    function onPropChange(key: keyof T, callback: CallbackOnChange<T>) {
      const stop = watch(
        () => props[key],
        (newValue, oldValue) => {
          callback(newValue, oldValue)
        }
      )
      watcherHandlers.push(stop)
    }
    onUnmounted(() => {
      watcherHandlers.forEach((stopFn) => stopFn())
    })
    return { onPropChange }
  }
}
