<template>
  <div>
    <h5>My Ref Object</h5>
    <button @click="store.incrementRef()">Increment Ref</button>
    <button @click="incrementPlainRef()">Increment Plain Ref</button>
    <pre>{{ myRefObject.countRef.value }}</pre>
    <hr />
    <h5>My State</h5>
    <pre>{{ myState }}</pre>
    <hr />
    <h5>Component Store</h5>
    <button @click="store.increment()">Increment</button>
    <button @click="store.decrement()">Decrement</button>
    <button @click="store.reset()">Reset</button>
    <pre>
      {{ store }}
    </pre>
    <p :ref="store.setEl"></p>
  </div>
</template>

<script setup lang="ts">
import { ChildCmpProps } from './main'
const props = defineProps<ChildCmpProps>()
import { incrementPlainRef, myRefObject, myState, provideStore } from './store'
const store = provideStore(props)

store.watchState('el', (newId, oldId) => {
  console.log('id changed to', newId, 'from', oldId)
})
store.watchComputedState((store) => store.id, (newId, oldId) => {
  console.log('computed id changed to', newId, 'from', oldId)
})

</script>
