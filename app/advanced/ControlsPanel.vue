<script setup lang="ts">
import {ref} from 'vue'
import type {KeyInfo} from './harness/inspect'
import {log} from './harness/log'

const props = defineProps<{
  store: Record<string, any>
  keys: KeyInfo[]
  instance: number
}>()

const jsonDrafts = ref<Record<string, string>>({})

function write(key: string, value: unknown) {
  // Writing through the proxy is what a consumer would do: Vue routes it to the
  // underlying ref if there is one.
  props.store[key] = value
}

function onText(key: string, event: Event) {
  write(key, (event.target as HTMLInputElement).value)
}

function onNumber(key: string, event: Event) {
  const raw = (event.target as HTMLInputElement).value
  write(key, raw === '' ? 0 : Number(raw))
}

function onCheckbox(key: string, event: Event) {
  write(key, (event.target as HTMLInputElement).checked)
}

function draftFor(key: string): string {
  const draft = jsonDrafts.value[key]
  if (draft !== undefined) return draft
  try {
    return JSON.stringify(props.store[key])
  } catch {
    return ''
  }
}

function applyJson(key: string) {
  try {
    write(key, JSON.parse(draftFor(key)))
    delete jsonDrafts.value[key]
  } catch (error) {
    log({kind: 'error', instance: props.instance, text: `invalid JSON for '${key}'`, detail: String(error)})
  }
}

function callMethod(key: string) {
  log({kind: 'call', instance: props.instance, text: `call ${key}()`})
  try {
    ;(props.store[key] as (...args: unknown[]) => unknown)()
  } catch (error) {
    log({kind: 'error', instance: props.instance, text: `${key}() threw`, detail: String(error)})
  }
}

const writable = (info: KeyInfo) => info.control !== 'none' && info.control !== 'button'
</script>

<template>
  <div class="controls">
    <template v-for="info in keys" :key="info.key">
      <div v-if="info.control === 'button'" class="controls__row">
        <button class="btn btn--call" type="button" @click="callMethod(info.key)">{{ info.key }}()</button>
      </div>

      <label v-else-if="info.control === 'checkbox'" class="controls__row">
        <span class="controls__label">{{ info.key }}</span>
        <input type="checkbox" :checked="Boolean(store[info.key])" @change="onCheckbox(info.key, $event)" />
      </label>

      <label v-else-if="info.control === 'number'" class="controls__row">
        <span class="controls__label">{{ info.key }}</span>
        <input type="number" :value="store[info.key]" @input="onNumber(info.key, $event)" />
      </label>

      <label v-else-if="info.control === 'text'" class="controls__row">
        <span class="controls__label">{{ info.key }}</span>
        <input type="text" :value="store[info.key]" @input="onText(info.key, $event)" />
      </label>

      <div v-else-if="info.control === 'json'" class="controls__row controls__row--json">
        <span class="controls__label">{{ info.key }}</span>
        <textarea rows="2" :value="draftFor(info.key)" @input="jsonDrafts[info.key] = ($event.target as HTMLTextAreaElement).value" />
        <button class="btn" type="button" @click="applyJson(info.key)">apply</button>
      </div>

      <div v-else class="controls__row controls__row--readonly">
        <span class="controls__label">{{ info.key }}</span>
        <span class="controls__note">{{ info.readonlyComputed ? 'read-only computed' : `no control for ${info.valueType}` }}</span>
      </div>
    </template>

    <p v-if="!keys.some(writable) && !keys.some((k) => k.control === 'button')" class="empty">
      Nothing writable on this store.
    </p>
  </div>
</template>
