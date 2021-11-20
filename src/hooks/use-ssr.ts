import { useEffect, useState } from "react";

export type UseSSRResult = { isSSR: boolean };

export default function useSSR(): UseSSRResult {
  const [isSSR, setSSR] = useState<boolean>(false);

  useEffect(() => {
    setSSR(
      Boolean(
        typeof window !== "undefined" &&
          window.document &&
          window.document.createElement
      )
    );
  }, []);

  return {
    isSSR: isSSR,
  };
}
