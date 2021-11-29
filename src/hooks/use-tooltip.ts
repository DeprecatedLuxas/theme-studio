/**
 * Modified code from https://github.com/chakra-ui/chakra-ui/blob/main/packages/tooltip/src/use-tooltip.ts
 */

import mergeRefs from "@helpers/refs";
import { useCallback, useEffect, useRef } from "react";
import { useBiscuitBox } from "./use-biscuit-box";
import useEvent from "./use-event";
import usePopper from "./use-popper";

export default function useTooltip() {
  const { isOpen, onOpen, onClose } = useBiscuitBox();

  const { referenceRef, getPopperProps, getArrowInnerProps, getArrowProps } =
    usePopper();

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
  const onClick = useCallback(() => {
    closeWithDelay();
  }, [closeWithDelay]);

  const onMouseDown = useCallback(() => {
    if (false) {
      closeWithDelay();
    }
  }, [closeWithDelay]);

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

  const getTriggerProps = useCallback(
    (props = {}, _ref = null) => {
      const triggerProps = {
        ...props,
        ref: mergeRefs(ref, _ref, referenceRef),
        onMouseEnter: openWithDelay,
        onClick: onClick,
        onMouseDown: onMouseDown,
        onFocus: openWithDelay,
        onBlur: closeWithDelay,
      };

      return triggerProps;
    },
    [openWithDelay, closeWithDelay, onMouseDown, onClick, referenceRef]
  );

  const getTooltipPositionerProps = useCallback(
    (props = {}, forwardedRef = null) =>
      getPopperProps(
        {
          ...props,
          style: {
            ...props.style,
            ["--popper-arrow-size"]: "8px",
            ["--popper-arrow-shadow-color"]: "green",
          },
        },
        forwardedRef
      ),
    [getPopperProps]
    /*   [getPopperProps, arrowSize, arrowShadowColor], */
  );

  const getTooltipProps = useCallback((props = {}, _ref = null) => {
    const tooltipProps = {
      ref: _ref,
      /*         ...htmlProps, */
      ...props,
      role: "tooltip",
      style: {
        ...props.style,
        backgroundColor: "red",
        position: "relative",
        transformOrigin: "var(--popper-transform-origin)"
      },
    };

    return tooltipProps;
  }, []);

  return {
    isOpen,
    show: openWithDelay,
    hide: closeWithDelay,
    getTriggerProps,
    getTooltipProps,
    getTooltipPositionerProps,
    getArrowProps,
    getArrowInnerProps,
  };
}
