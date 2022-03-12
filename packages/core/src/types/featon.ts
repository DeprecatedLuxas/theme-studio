import { FeatonFeatures } from "../featon/featon-features";

export interface FeatonFeature {
  type: FeatonFeatures;
  runner: FeatonFeatureRunner;
}

export type FeatonFeatureRunner = boolean | (() => boolean);

export interface FeatonDetectionOptions {}

export interface CustomFeatonDetectionOptions {}

export type FeatonOptions =
  | CustomFeatonDetectionOptions
  | FeatonDetectionOptions;
