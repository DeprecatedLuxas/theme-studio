import { isBrowser } from "@theme-studio/core";
import { useLayoutEffect, useEffect } from "react";

export const useIsoMorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
