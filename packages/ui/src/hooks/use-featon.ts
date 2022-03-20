import {
  featon,
  FeatonOptions,
  FeatonFeaturesResult,
} from "@theme-studio/core";
import { useEffect, useState } from "react";

type UseFeatonResult = FeatonFeaturesResult;

export function useFeaton({ features }: FeatonOptions): UseFeatonResult {
  const [supported, setSupported] = useState<UseFeatonResult>({});

  useEffect(() => {
    setSupported(featon.check(features));
  }, []);

  return supported;
}
