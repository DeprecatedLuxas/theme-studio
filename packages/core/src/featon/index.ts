import { FeatonFeature, PartialRecord } from "../types";
import { FeatonFeatures } from "./featon-features";
import {
  FeatonFetch,
  FeatonWorker,
  FeatonLocalStorage,
  FeatonSessionStorage,
} from "./features";

class Featon {
  private registeredFeatures: Map<FeatonFeatures, FeatonFeature>;

  constructor() {
    this.registeredFeatures = new Map();
  }

  register(feature: FeatonFeature) {
    console.log(`Registering featon for: ${feature.type}`);
    this.registeredFeatures.set(feature.type, feature);
  }

  check(
    features: Array<FeatonFeatures>
  ): PartialRecord<FeatonFeatures, boolean> {
    return features.reduce(
      (acc, feature) => ({
        ...acc,
        [feature]: this.run(this.registeredFeatures.get(feature)!),
      }),
      {}
    );
  }

  private run(feature: FeatonFeature) {
    return typeof feature.runner === "function"
      ? feature.runner()
      : feature.runner;
  }
}

const featon = new Featon();

featon.register(FeatonFetch);
featon.register(FeatonWorker);
featon.register(FeatonLocalStorage);
featon.register(FeatonSessionStorage);

export { featon, FeatonFeatures };
