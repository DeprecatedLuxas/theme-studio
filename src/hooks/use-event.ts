import { useEffect, useRef } from "react";

type EventElement = Document | HTMLElement | Window;

export default function useEvent<E extends keyof DocumentEventMap>(
  eventName: E,
  handler: (event: DocumentEventMap[E]) => void,
  element?: EventElement
) {
  const savedHandler = useRef<(event: DocumentEventMap[E]) => void>();

  useEffect(() => {
    const targetElement: EventElement = element || window;

    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    const eventListener = (event:  DocumentEventMap[E]) => {
      // eslint-disable-next-line no-extra-boolean-cast

      if (!!savedHandler?.current) {
        savedHandler.current(event);
      }
    };

    targetElement.addEventListener(eventName, eventListener as EventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener as EventListener);
    };
  }, [eventName, element, handler]);
}
