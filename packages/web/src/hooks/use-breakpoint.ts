import { useState } from "react";
import useIsoMorphicLayoutEffect from "./use-isomorphic-layout-effect";

export default function useBreakpoint(breakpoint: number): boolean {
  const [size, setSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useIsoMorphicLayoutEffect(() => {

    const handleResizing = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResizing);

    return () => {
      window.removeEventListener("resize", handleResizing);
    };
  }, [breakpoint]);

  return breakpoint > size.width;
}
