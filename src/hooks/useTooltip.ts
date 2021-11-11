import mergeRefs from "@helpers/refs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBiscuitBox } from "./useBiscuitBox";
import { useEvent } from "./useEvent";
import usePositioningEngine from "./usePositioningEngine";

type UseTooltipProps = {
  onOpen?(): void;
  onClose?(): void;
};

export default function useTooltip({
  onOpen: onOpenProp,
  onClose: onCloseProp,
}: UseTooltipProps = {}) {
  const { isOpen, onOpen, onClose } = useBiscuitBox({
    onOpen: onOpenProp,
    onClose: onCloseProp,
  });

  const { referenceRef, getPopperProps, getArrowInnerProps, getArrowProps } =
    usePositioningEngine({
      enabled: isOpen,
      placement: "bottom",
    });

  const ref = useRef<any>(null);

  const enterTimeout = useRef<number>();
  const exitTimeout = useRef<number>();

  const openWithDelay = useCallback(() => {
    enterTimeout.current = window.setTimeout(onOpen, 5);
  }, [onOpen]);

  const closeWithDelay = useCallback(() => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
    }
    exitTimeout.current = window.setTimeout(onClose, 5);
  }, [onClose]);

  const onClick = useCallback(() => {
    closeWithDelay();
  }, [closeWithDelay]);

  const onMouseDown = useCallback(() => {
    closeWithDelay();
  }, [closeWithDelay]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (isOpen && event.key === "Escape") {
      closeWithDelay();
    }
  };

  useEvent("keydown", onKeyDown);

  useEffect(
    () => () => {
      clearTimeout(enterTimeout.current);
      clearTimeout(exitTimeout.current);
    },
    []
  );

  /**
   * This allows for catching mouseleave events when the tooltip
   * trigger is disabled. There's currently a known issue in
   * React regarding the onMouseLeave polyfill.
   * @see https://github.com/facebook/react/issues/11972
   */
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
            "--popper-arrow-size": "8px",
            "--popper-arrow-shadow-color": "rgba(0, 0, 0, 0.2)",
          },
        },
        forwardedRef
      ),
    [getPopperProps]
  );

  const getTooltipProps = useCallback((props = {}, _ref = null) => {
    const tooltipProps = {
      ref: _ref,
      ...props,
      role: "tooltip",
      style: {
        ...props.style,
        position: "relative",
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
