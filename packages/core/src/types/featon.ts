import { FeatonFeatures } from "../featon/featon-features";
import { PartialRecord } from "./base";

export interface FeatonFeature {
  type: FeatonFeatures;
  runner: () => boolean;
}

export interface FeatonOptions {
  /**
   * The features to check.
   */
  features: Array<FeatonFeatures>;
}

export type FeatonFeaturesResult = PartialRecord<FeatonFeatures, boolean>