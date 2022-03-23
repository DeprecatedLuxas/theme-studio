import { FeatonFeature, FeatonFeaturesResult } from "../types";
import { FeatonFeatures } from "./featon-features";
import {
  FeatonWorker,
  FeatonLocalStorage,
  FeatonSessionStorage,
  FeatonIndexedDB,
} from "./features";

class Featon {
  private registeredFeatures: Map<FeatonFeatures, FeatonFeature>;

  constructor() {
    this.registeredFeatures = new Map();
    this.register(FeatonWorker);
    this.register(FeatonLocalStorage);
    this.register(FeatonSessionStorage);
    this.register(FeatonIndexedDB);
  }

  private register(feature: FeatonFeature) {
    if (this.registeredFeatures.has(feature.type)) {
      console.error(`Feature ${feature.type} already registered, skipping`);
      return;
    }
    this.registeredFeatures.set(feature.type, feature);
  }

  check(features: Array<FeatonFeatures>): FeatonFeaturesResult {
    return features.reduce(
      (acc, feature) => ({
        ...acc,
        [feature]: this.run(this.registeredFeatures.get(feature)!),
      }),
      {}
    );
  }

  private run(feature: FeatonFeature) {
    return feature.runner();
  }
}

const featon = new Featon();

export { featon, FeatonFeatures };
