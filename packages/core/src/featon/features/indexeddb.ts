import { FeatonFeatures } from "../featon-features";

export const RANDOM_KEY = "featon-" + Math.random();

export const FeatonIndexedDB = {
  type: FeatonFeatures.INDEXED,
  runner: () => {
    throw new Error("Not implemented yet.")
  },
};
