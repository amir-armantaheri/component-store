<script setup lang="ts">
import {computed, nextTick, ref, shallowRef, watch} from 'vue'
import ControlsPanel from './ControlsPanel.vue'
import LogPanel from './LogPanel.vue'
import StateInspector from './StateInspector.vue'
import StoreHost from './StoreHost.vue'
import {createStoreApi, findFixture, fixtures} from './harness/fixtures'
import {describeStore} from './harness/inspect'
import {divider} from './harness/log'
import type {LiveStore, StoreApi} from './harness/types'

const SELECTION_KEY = 'vue3-component-store:harness-fixture'

function restoreSelection(): string {
  try {
    const stored = sessionStorage.getItem(SELECTION_KEY)
    if (stored && findFixture(stored)) return stored
  } catch {
    // ignore
  }
  return fixtures[0]?.id ?? ''
}

const selectedId = ref(restoreSelection())
const api = shallowRef<StoreApi | null>(null)
const live = shallowRef<LiveStore | null>(null)
const mounted = ref(true)
const instance = ref(0)

watch(
  selectedId,
  (id) => {
    try {
      sessionStorage.setItem(SELECTION_KEY, id)
    } catch {
      // ignore
    }
    const fixture = findFixture(id)
    if (!fixture) {
      api.value = null
      return
    }
    divider(`fixture selected: ${fixture.id} — ${fixture.name}`)
    api.value = createStoreApi(fixture)
    instance.value += 1
    mounted.value = true
  },
  {immediate: true}
)

function register(next: LiveStore | null) {
  live.value = next
}

function unmount() {
  mounted.value = false
}

function mount() {
  instance.value += 1
  mounted.value = true
}

async function remount() {
  mounted.value = false
  await nextTick()
  mount()
}

const keys = computed(() => (live.value ? describeStore(live.value.store) : []))
const fixture = computed(() => api.value?.fixture ?? null)
</script>

<template>
  <div class="harness">
    <header class="harness__header">
      <span class="harness__brand">vue3-component-store</span>
      <span class="harness__sub">dev harness — state inspector, change log, feature attribution</span>
    </header>

    <div class="harness__grid">
      <!-- ── left: fixture, lifecycle, controls ───────────────────────────── -->
      <section class="panel">
        <h2 class="panel__title">Fixture</h2>
        <select v-model="selectedId" class="select">
          <option v-for="item in fixtures" :key="item.id" :value="item.id">{{ item.id }}</option>
        </select>
        <p v-if="fixture" class="fixture__name">{{ fixture.name }}</p>
        <p v-if="fixture?.description" class="fixture__desc">{{ fixture.description }}</p>

        <div v-if="api" class="featurelist">
          <div class="featurelist__title">features, in merge order</div>
          <ol>
            <li v-for="label in api.featureLabels" :key="label">{{ label }}</li>
          </ol>
        </div>

        <h2 class="panel__title">Lifecycle</h2>
        <div class="btnrow">
          <button v-if="mounted" class="btn" type="button" @click="unmount">unmount</button>
          <button v-else class="btn" type="button" @click="mount">mount</button>
          <button class="btn" type="button" :disabled="!mounted" @click="remount">remount</button>
        </div>
        <StoreHost v-if="mounted && api" :key="instance" :api="api" :instance="instance" :register="register" />
        <p v-else class="empty">Provider is unmounted — no store exists.</p>

        <h2 class="panel__title">Controls</h2>
        <ControlsPanel v-if="live" :store="live.store" :keys="keys" :instance="live.instance" />
        <p v-else class="empty">Mount the provider to get controls.</p>
      </section>

      <!-- ── middle: live state ───────────────────────────────────────────── -->
      <section class="panel">
        <h2 class="panel__title">State</h2>
        <StateInspector
          v-if="live"
          :store="live.store"
          :keys="keys"
          :by-key="live.byKey"
          :collisions="live.collisions"
        />
        <p v-else class="empty">No live store.</p>
      </section>

      <!-- ── right: timeline ──────────────────────────────────────────────── -->
      <section class="panel panel--log">
        <h2 class="panel__title">Log</h2>
        <LogPanel />
      </section>
    </div>
  </div>
</template>
