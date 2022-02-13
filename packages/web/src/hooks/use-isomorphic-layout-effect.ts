import { isBrowser } from "@lib/utils";
import { useLayoutEffect, useEffect } from "react";

const useIsoMorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
export default useIsoMorphicLayoutEffect;
