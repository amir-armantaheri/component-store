<script setup lang="ts">
import {computed, nextTick, ref, watch} from 'vue'
import {clearLog, entries, type LogEntry, type LogKind} from './harness/log'

type Group = 'mutations' | 'calls' | 'lifecycle' | 'collisions' | 'diagnostics' | 'attribution'

const GROUPS: Array<{id: Group; label: string}> = [
  {id: 'mutations', label: 'mutations'},
  {id: 'calls', label: 'calls'},
  {id: 'lifecycle', label: 'lifecycle'},
  {id: 'collisions', label: 'collisions'},
  {id: 'diagnostics', label: 'warn/error'},
  {id: 'attribution', label: 'attribution'}
]

// Attribution is one entry per key per mount — useful on demand, noisy by default.
const visible = ref<Record<Group, boolean>>({
  mutations: true,
  calls: true,
  lifecycle: true,
  collisions: true,
  diagnostics: true,
  attribution: false
})

function groupOf(kind: LogKind): Group {
  switch (kind) {
    case 'mutation':
      return 'mutations'
    case 'call':
      return 'calls'
    case 'divider':
    case 'lifecycle':
      return 'lifecycle'
    case 'collision':
      return 'collisions'
    case 'attribution':
      return 'attribution'
    default:
      return 'diagnostics'
  }
}

const shown = computed(() => entries.value.filter((entry) => visible.value[groupOf(entry.kind)]))

const scroller = ref<HTMLElement | null>(null)
const pinned = ref(true)

function onScroll() {
  const element = scroller.value
  if (!element) return
  pinned.value = element.scrollHeight - element.scrollTop - element.clientHeight < 40
}

watch(
  () => shown.value.length,
  async () => {
    if (!pinned.value) return
    await nextTick()
    const element = scroller.value
    if (element) element.scrollTop = element.scrollHeight
  }
)

function rowClass(entry: LogEntry): string {
  return `logrow logrow--${entry.kind}`
}
</script>

<template>
  <div class="log">
    <div class="log__filters">
      <label v-for="group in GROUPS" :key="group.id" class="chip">
        <input type="checkbox" v-model="visible[group.id]" />
        {{ group.label }}
      </label>
      <button class="btn btn--ghost" type="button" @click="clearLog()">clear</button>
    </div>

    <div ref="scroller" class="log__scroll" @scroll="onScroll">
      <div v-for="entry in shown" :key="entry.id" :class="rowClass(entry)">
        <template v-if="entry.kind === 'divider'">
          <span class="logrow__divider">── {{ entry.text }} ──</span>
        </template>
        <template v-else>
          <span class="logrow__time">{{ entry.time }}</span>
          <span class="logrow__body">
            <span class="logrow__text">{{ entry.text }}</span>
            <span v-if="entry.from !== undefined || entry.to !== undefined" class="logrow__delta">
              <template v-if="entry.from !== undefined">{{ entry.from }} → </template>{{ entry.to }}
            </span>
            <span v-if="entry.detail" class="logrow__detail">{{ entry.detail }}</span>
          </span>
        </template>
      </div>
      <p v-if="shown.length === 0" class="empty">No entries match the current filters.</p>
    </div>

    <div class="log__footer">
      {{ shown.length }} / {{ entries.length }} entries · survives remount &amp; HMR reload (sessionStorage), capped at 500
    </div>
  </div>
</template>
