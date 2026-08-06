<script setup lang="ts">
import {formatValue} from './harness/format'
import type {KeyInfo} from './harness/inspect'
import type {Attribution, Collision} from './harness/types'

const props = defineProps<{
  store: Record<string, any>
  keys: KeyInfo[]
  byKey: Record<string, Attribution>
  collisions: Collision[]
}>()

const kindLabel: Record<KeyInfo['kind'], string> = {
  ref: 'ref',
  computed: 'cmp',
  method: 'fn',
  plain: 'val',
  object: 'obj'
}

function ownerOf(key: string): string {
  return props.byKey[key]?.owner ?? '—'
}

function historyOf(key: string): string {
  const entry = props.byKey[key]
  if (!entry) return 'not produced by a feature'
  return `set by ${entry.history.join(' → ')}`
}

function isClobbered(key: string): boolean {
  return props.byKey[key]?.clobbered === true
}
</script>

<template>
  <div class="inspector">
    <table class="inspector__table">
      <thead>
        <tr>
          <th>key</th>
          <th>owner</th>
          <th>type</th>
          <th>value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in keys" :key="info.key" :class="{'row--clobbered': isClobbered(info.key)}">
          <td class="cell--key">{{ info.key }}</td>
          <td class="cell--owner" :title="historyOf(info.key)">
            {{ ownerOf(info.key) }}<span v-if="isClobbered(info.key)" class="warnmark">(!)</span>
          </td>
          <td><span class="kind" :class="`kind--${info.kind}`">{{ kindLabel[info.kind] }}</span></td>
          <td class="cell--value">{{ formatValue(store[info.key]) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="collisions.length > 0" class="collisions">
      <div class="collisions__title">⚠ {{ collisions.length }} key collision{{ collisions.length === 1 ? '' : 's' }}</div>
      <ul>
        <li v-for="(collision, index) in collisions" :key="index">
          <code>{{ collision.key }}</code> from <strong>{{ collision.previousOwner }}</strong> was overwritten by
          <strong>{{ collision.newOwner }}</strong>
        </li>
      </ul>
      <p class="collisions__note">
        <code>combineFeatures</code> merges with <code>Object.assign</code>, so the earlier value is dropped silently.
      </p>
    </div>
  </div>
</template>
