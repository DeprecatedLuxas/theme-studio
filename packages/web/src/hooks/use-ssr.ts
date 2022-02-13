import { useEffect, useState } from "react";
import { isBrowser } from "@lib/utils";
export type UseSSRResult = { isSSR: boolean };

export default function useSSR(): UseSSRResult {
  const [isSSR, setSSR] = useState<boolean>(false);

  useEffect(() => {
    setSSR(
      isBrowser()
    );
  }, []);

  return {
    isSSR: isSSR,
  };
}
