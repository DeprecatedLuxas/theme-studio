import { useEffect, useState } from "react";
import { isBrowser } from "@theme-studio/core";

type UseSSRResult = { isSSR: boolean };

export default function useSSR(): UseSSRResult {
  const [isSSR, setSSR] = useState<boolean>(false);

  useEffect(() => {
    setSSR(isBrowser());
  }, []);

  return {
    isSSR: isSSR,
  };
}
