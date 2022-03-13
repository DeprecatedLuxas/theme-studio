import { FeatonFeatures } from "../featon/featon-features";
import { Arrayable } from "./base";

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
