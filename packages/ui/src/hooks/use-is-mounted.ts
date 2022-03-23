import { useCallback, useEffect, useRef } from "react";

type UseIsMountedResult = () => boolean;

export function useIsMounted(): UseIsMountedResult {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
