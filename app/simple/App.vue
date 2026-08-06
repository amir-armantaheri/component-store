<template>
  <div style="padding: 3rem; max-width: 600px; margin: auto">

    <ChildCmp v-if="showChild" name="dasd" :id="id" />
    <button @click="incrementId">Increment Id</button>
    <button @click="toggleChild">Toggle Child</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChildCmp from './ChildCmp.vue'
const id = ref(1)
const showChild = ref(true)
function toggleChild() {
  showChild.value = !showChild.value
}
function incrementId() {
  id.value += 1
}
</script>
