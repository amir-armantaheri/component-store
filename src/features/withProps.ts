import { Reactive } from 'vue'
export function withProps<T extends Reactive<Record<string, any>>>() {
  return (props: T) => {
    return {}
  }
}
