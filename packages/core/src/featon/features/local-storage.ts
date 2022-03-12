import { FeatonFeatures } from "../featon-features";

export const FeatonLocalStorage = {
  type: FeatonFeatures.LOCAL_STORAGE,
  runner: () => {
    try {
      localStorage.setItem("featon", "featon");
      localStorage.removeItem("featon");
      return true;
    } catch (e) {
      return false;
    }
  },
};
