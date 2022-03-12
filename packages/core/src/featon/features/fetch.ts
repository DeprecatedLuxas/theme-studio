import { FeatonFeatures } from "../featon-features";

export const FeatonFetch = {
  type: FeatonFeatures.FETCH,
  runner: "fetch" in window,
};
