import { useEffect } from "react";
import { useCallbackRef } from "./use-callback-ref";

export function useEvent<K extends keyof DocumentEventMap>(
  event: K | (string & {}),
  handler: (event: DocumentEventMap[K]) => void,
  ele?: Document | HTMLElement | Window
) {
  const listener = useCallbackRef(handler) as EventListener;

  useEffect(() => {
    const node = ele ?? document;

    node.addEventListener(event, listener);
    return () => {
      node.removeEventListener(event, listener);
    };
  }, [event, ele, listener]);

  return () => {
    const node = ele ?? document;
    node.removeEventListener(event, listener);
  };
}
