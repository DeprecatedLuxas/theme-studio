import { FeatonFeatures } from "../featon-features";

export const FeatonSessionStorage = {
  type: FeatonFeatures.SESSION_STORAGE,
  runner: () => {
    try {
      sessionStorage.setItem("featon", "featon");
      sessionStorage.removeItem("featon");
      return true;
    } catch (e) {
      return false;
    }
  },
};
