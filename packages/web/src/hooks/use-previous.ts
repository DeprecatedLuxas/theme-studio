import { useRef, useEffect } from "react";
import type { MutableRefObject } from "react";

export function usePrevious<T>(
  value: T,
): MutableRefObject<T>["current"] {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
