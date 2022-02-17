import { isBrowser } from "@theme-studio/core";
import { useLayoutEffect, useEffect } from "react";

const useIsoMorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
export default useIsoMorphicLayoutEffect;
