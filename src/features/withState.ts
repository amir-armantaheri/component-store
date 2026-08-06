import { Reactive } from 'vue'

export function withState<T extends Record<any, any>>(state: T) {
  return () => state as Reactive<T>
}
