import {
  featon,
  FeatonOptions,
  PartialRecord,
  FeatonFeatures,
} from "@theme-studio/core";
import { useEffect, useState } from "react";

type UseFeatonResult = PartialRecord<FeatonFeatures, boolean>;

export function useFeaton({ features }: FeatonOptions): UseFeatonResult {
  const [supported, setSupported] = useState<UseFeatonResult>({});

  useEffect(() => {
    setSupported(featon.check(features));
  }, []);

  return supported;
}
