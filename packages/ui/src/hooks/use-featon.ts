// const enabled = useFeaton(FeatonFeature.LOCAL_STORAGE);
// const enabled = useFeaton(FeatonFeature.LOCAL_STORAGE);
// const enabled = useFeaton(Featon.LocalStorage);

import { FeatonOptions } from "@theme-studio/core";

type UseFeatonResult = {
  supported: boolean;
};

export function useFeaton({}: FeatonOptions): UseFeatonResult {
  
  return {
    supported: false,
  };
}
