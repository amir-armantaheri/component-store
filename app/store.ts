import { ComponentPublicInstance, computed, reactive, ref } from 'vue'
import { componentStore, withComputed, withMethods, withProps, withState } from '../src'
import { ChildCmpProps } from './main'

const myState = reactive({
  count: 0
})
const myRefObject = {
  countRef: ref(0)
}
function incrementPlainRef() {
  myRefObject.countRef.value++
}
const [provideStore, useStore] = componentStore(
  withProps<ChildCmpProps>(),
  withState(myState),
  withState(myRefObject),
  withState({
    el: null as HTMLElement | null
  }),
  withComputed((store) => ({
    double: computed(() => store.count * 2),
    triple: computed(() => store.count * 3)
  })),
  withMethods((store) => ({
    increment() {
      store.count++
    },
    decrement() {
      store.count--
    },
    incrementRef() {
      store.countRef++
    },
    setEl(el: Element | ComponentPublicInstance | null) {
      store.el = el as unknown as HTMLElement | null
    }
  })),
  withMethods((store) => {
    function reset() {
      store.count = 0
    }

    return { reset }
  })
)

export { incrementPlainRef, myRefObject, myState, provideStore, useStore }
