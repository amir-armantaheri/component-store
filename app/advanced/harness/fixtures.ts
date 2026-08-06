import {componentStore} from '../../../src'
import {instrumentFeatures} from './instrument'
import type {AnyFeature, Fixture, RegisteredFixture, StoreApi} from './types'

const modules = import.meta.glob<{default: Fixture}>('../fixtures/*.store.ts', {eager: true})

export const fixtures: RegisteredFixture[] = Object.entries(modules)
  .map(([path, module]) => ({
    ...module.default,
    id: path.split('/').pop()!.replace(/\.store\.ts$/, '')
  }))
  .sort((a, b) => a.id.localeCompare(b.id))

export function findFixture(id: string | null): RegisteredFixture | undefined {
  return fixtures.find((fixture) => fixture.id === id)
}

/**
 * `componentStore` is declared with ~15 fixed-arity overloads, so it can't take
 * a spread of an unknown-length array. The harness works with runtime-length
 * feature lists, hence the cast.
 */
const createComponentStore = componentStore as unknown as (
  ...features: AnyFeature[]
) => [(initialState?: Record<string, unknown>) => any, () => any]

/**
 * Built once per fixture selection rather than per mount, matching real usage
 * where `componentStore()` is called at module scope — so its injection key is
 * shared across mounts, and remounting can expose state that leaks between
 * instances.
 */
export function createStoreApi(fixture: RegisteredFixture): StoreApi {
  const {wrapped, labels} = instrumentFeatures(fixture.features)
  const [provideStore, useStore] = createComponentStore(...wrapped)
  return {fixture, provideStore, useStore, featureLabels: labels}
}
