import { useRef, useEffect } from "react";

type ListenerTarget = HTMLElement | Window | Document;
interface EventListenerOptions<E extends keyof DocumentEventMap> {
  type: E;
  handler: (event: DocumentEventMap[E]) => void;
}

export default function useEventListener<E extends keyof DocumentEventMap>(
  target: ListenerTarget,
  options: EventListenerOptions<E>
) {
  const { handler, type } = options;
  const savedHandler = useRef<(event: DocumentEventMap[E]) => void>();

  useEffect(() => {
    const targetElement: ListenerTarget = target || window;

    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    const eventListener = (event: DocumentEventMap[E]) => {
      // eslint-disable-next-line no-extra-boolean-cast

      if (!!savedHandler?.current) {
        savedHandler.current(event);
      }
    };

    targetElement.addEventListener(type, eventListener as EventListener);

    return () => {
      targetElement.removeEventListener(type, eventListener as EventListener);
    };
  }, [type, target, handler]);
}
