<script setup lang="ts">
import {onBeforeUnmount, onMounted, onUnmounted} from 'vue'
import StoreConsumer from './StoreConsumer.vue'
import {createRecorder, logAttribution, watchStoreChanges, withRecorder} from './harness/instrument'
import {divider} from './harness/log'
import type {LiveStore, StoreApi} from './harness/types'

const props = defineProps<{
  api: StoreApi
  instance: number
  register: (live: LiveStore | null) => void
}>()

let store: any

divider(`provider setup — instance #${props.instance} · fixture: ${props.api.fixture.id}`, props.instance)

// Registered *before* provideStore() so these run before any onMounted /
// onBeforeUnmount hook the store itself installs via withHooks.
onMounted(() => {
  divider(`provider mounted — instance #${props.instance}`, props.instance)
  props.register({store, instance: props.instance, ...recorderResult})
})
onBeforeUnmount(() => {
  divider(`provider unmounting — instance #${props.instance}`, props.instance)
  props.register(null)
})

const recorder = createRecorder()
store = withRecorder(recorder, () => props.api.provideStore(props.api.fixture.initialState))
const recorderResult = recorder.result()
logAttribution(recorderResult, props.instance)

// Lives in this component's effect scope, so it stops with the provider.
watchStoreChanges(store, props.instance)

// Registered after provideStore() so it runs *after* the store's own
// onUnmounted hooks — the divider closes the instance's log section.
onUnmounted(() => divider(`provider unmounted — instance #${props.instance}`, props.instance))
</script>

<template>
  <div class="host">
    <div class="host__title">provider instance #{{ instance }}</div>
    <StoreConsumer :use-store="api.useStore" />
  </div>
</template>
