import type {StoreFeature} from '../../../src/component-store.model'

/** A feature as written by hand, optionally paired with a display label. */
export type AnyFeature = StoreFeature<any, any>
export type LabelledFeature = [label: string, feature: AnyFeature]
export type FixtureFeature = AnyFeature | LabelledFeature

/**
 * A fixture hands the harness the raw feature list rather than a built store,
 * so the harness can wrap each feature and attribute keys to it.
 */
export interface Fixture {
  name: string
  description?: string
  features: FixtureFeature[]
  initialState?: Record<string, unknown>
}

/** A fixture plus the id derived from its filename. */
export interface RegisteredFixture extends Fixture {
  id: string
}

/** Which feature owns a key, and everything that wrote to it along the way. */
export interface Attribution {
  key: string
  owner: string
  history: string[]
  clobbered: boolean
}

export interface Collision {
  key: string
  previousOwner: string
  newOwner: string
}

export interface AttributionResult {
  attribution: Attribution[]
  collisions: Collision[]
  byKey: Record<string, Attribution>
}

export interface StoreApi {
  fixture: RegisteredFixture
  provideStore: (initialState?: Record<string, unknown>) => any
  useStore: () => any
  featureLabels: string[]
}

export interface LiveStore extends AttributionResult {
  store: any
  instance: number
}
