import { merge } from "@helpers/refs";
import { useCallback, useEffect, useRef } from "react";
import { useBiscuitBox } from "./useBiscuitBox";
import { useEvent } from "./useEvent";
import usePositioningEngine from "./usePositioningEngine";

export default function useTooltip() {
  const { isOpen, onOpen, onClose } = useBiscuitBox();

  const { referenceRef, getPopperProps, getArrowInnerProps, getArrowProps } =
    usePositioningEngine({
      enabled: isOpen,
      placement: "top",
    });

  const ref = useRef<any>(null);
  const enterTimeout = useRef<number>();
  const exitTimeout = useRef<number>();

  const openWithDelay = useCallback(() => {
    enterTimeout.current = window.setTimeout(onOpen, 0);
  }, [onOpen]);

  const closeWithDelay = useCallback(() => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
    }
    exitTimeout.current = window.setTimeout(onClose, 0);
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
        ref: merge(ref, _ref, referenceRef),
        onMouseEnter: callAllHandlers(props.onMouseEnter, openWithDelay),
        onClick: callAllHandlers(props.onClick, onClick),
        onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
        onFocus: callAllHandlers(props.onFocus, openWithDelay),
        onBlur: callAllHandlers(props.onBlur, closeWithDelay),
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
          style: props.style,
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

function callAllHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function func(event: FunctionArguments<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
}

type FunctionArguments<T extends Function> = T extends (
  ...args: infer R
) => any
  ? R
  : never