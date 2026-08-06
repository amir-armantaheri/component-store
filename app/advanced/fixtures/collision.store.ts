import {computed, ref} from 'vue'
import type {Fixture} from '../harness/types'

/**
 * A deliberate three-way collision on `status`, each feature using a different
 * kind of value. The winner changes what the key even *is*: plain → ref →
 * read-only computed.
 */

// f1 — plain string, plus a key nobody else touches for contrast.
function seed() {
  return () => ({
    status: 'idle',
    retries: 0
  })
}

// f2 — same key, now a ref, plus a computed that reads it back off the store.
function overrideWithRef() {
  return (store: {status: string}) => ({
    status: ref('from-f2'),
    statusUpper: computed(() => String(store.status).toUpperCase())
  })
}

// f3 — same key again, now a computed with no setter. Writes to it are dropped
// with a Vue warning; forceStatus() proves it.
function overrideWithComputed() {
  return (store: {status: string}) => ({
    status: computed(() => 'always-f3'),
    forceStatus() {
      // Deliberately illegal: `status` is a read-only computed by the time the
      // merge finishes, so Vue warns and the write is discarded.
      ;(store as {status: string}).status = 'written-by-hand'
    }
  })
}

export default {
  name: 'collision — three features, one key',
  description:
    'All three features declare `status`. State shows owner f3 with (!) and lists both overwrites; statusUpper resolves to ALWAYS-F3 because f2\'s computed reads the merged store, not its own value. Click forceStatus() to see Vue\'s read-only-computed warning land in the log.',
  features: [
    ['f1 seed', seed()],
    ['f2 overrideWithRef', overrideWithRef()],
    ['f3 overrideWithComputed', overrideWithComputed()]
  ]
} satisfies Fixture
