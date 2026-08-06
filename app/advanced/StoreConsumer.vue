<script setup lang="ts">
import {computed} from 'vue'
import {formatValue} from './harness/format'

const props = defineProps<{useStore: () => any}>()

// inject() only resolves inside a child's setup(), so this is the component
// that actually proves provide/inject works.
const store = props.useStore()
const resolved = computed(() => store !== undefined && store !== null)
const keyCount = computed(() => (resolved.value ? Object.keys(store).length : 0))
const dump = computed(() => (resolved.value ? formatValue(store) : 'undefined'))
</script>

<template>
  <div class="consumer" :class="{'consumer--failed': !resolved}">
    <div class="consumer__title">
      child consumer
      <span v-if="resolved" class="tag tag--ok">injected {{ keyCount }} keys</span>
      <span v-else class="tag tag--bad">inject failed</span>
    </div>
    <pre class="consumer__dump">{{ dump }}</pre>
  </div>
</template>
