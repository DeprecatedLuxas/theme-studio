import { useEffect, useRef } from "react";

type EventElement = Document | HTMLElement | Window;

export default function useEvent<E extends keyof DocumentEventMap>(
  eventName: E | string,

  handler: (event: Event) => void,

  element?: EventElement
) {
  const savedHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    const targetElement: EventElement = element || window;

    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    const eventListener = (event: Event) => {
      // eslint-disable-next-line no-extra-boolean-cast

      if (!!savedHandler?.current) {
        savedHandler.current(event);
      }
    };

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, handler]);
}
