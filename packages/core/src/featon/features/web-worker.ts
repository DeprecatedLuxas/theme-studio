import { FeatonFeatures } from "../featon-features";

export const FeatonWorker = {
  type: FeatonFeatures.WEB_WORKER,
  runner: "Worker" in window,
};
