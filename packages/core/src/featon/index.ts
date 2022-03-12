import { FeatonFeature } from "../types";
import { FeatonFeatures } from "./featon-features";
import {
  FeatonFetch,
  FeatonWorker,
  FeatonLocalStorage,
  FeatonSessionStorage,
} from "./features";

class Featon {
  private features: Map<FeatonFeatures, FeatonFeature>;

  constructor() {
    this.features = new Map();
  }

  register(feature: FeatonFeature) {
    this.features.set(feature.type, feature);
  }
}

const featon = new Featon();

featon.register(FeatonFetch);
featon.register(FeatonWorker);
featon.register(FeatonLocalStorage);
featon.register(FeatonSessionStorage);

export { featon };
