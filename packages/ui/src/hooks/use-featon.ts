import { FeatonOptions } from "@theme-studio/core";

type UseFeatonResult = {
  supported: boolean;
};

export function useFeaton({}: FeatonOptions): UseFeatonResult {

  return {
    supported: false,
  };
}
