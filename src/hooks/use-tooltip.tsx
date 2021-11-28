/**
 * Modified code from https://github.com/chakra-ui/chakra-ui/blob/main/packages/tooltip/src/use-tooltip.ts
 */

import { useCallback, useEffect, useRef } from "react";
import { useBiscuitBox } from "./use-biscuit-box";
import useEvent from "./use-event";
import usePopper from "./use-popper";

export default function useTooltip() {
  const { isOpen, onOpen, onClose } = useBiscuitBox();

  const { referenceRef, getPopperProps } = usePopper();

  const ref = useRef<any>(null);
  const enterTimeout = useRef<number>();
  const exitTimeout = useRef<number>();

  const openWithDelay = useCallback(() => {
    enterTimeout.current = window.setTimeout(onOpen, 10);
  }, [onOpen]);

  const closeWithDelay = useCallback(() => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
    }
    exitTimeout.current = window.setTimeout(onClose, 10);
  }, [onClose]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        closeWithDelay();
      }
    },
    [isOpen, closeWithDelay]
  );

  useEvent("keydown", onKeyDown);

  useEffect(
    () => () => {
      clearTimeout(enterTimeout.current);
      clearTimeout(exitTimeout.current);
    },
    []
  );

  useEvent("mouseleave", closeWithDelay, ref.current);

  const getTriggerProps: PropGetter = React.useCallback(
    (props = {}, _ref = null) => {
      const triggerProps = {
        ...props,
        ref: mergeRefs(ref, _ref, referenceRef),
        onMouseEnter: callAllHandlers(props.onMouseEnter, openWithDelay),
        onClick: callAllHandlers(props.onClick, onClick),
        onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
        onFocus: callAllHandlers(props.onFocus, openWithDelay),
        onBlur: callAllHandlers(props.onBlur, closeWithDelay),
        "aria-describedby": isOpen ? tooltipId : undefined,
      };

      return triggerProps;
    },
    [
      openWithDelay,
      closeWithDelay,
      onMouseDown,
      isOpen,
      tooltipId,
      onClick,
      referenceRef,
    ]
  );
}
