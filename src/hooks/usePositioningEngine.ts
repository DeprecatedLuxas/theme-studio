import { merge } from "@helpers/refs";
import { PropGetter } from "@lib/types";
import {
  createPopper,
  Instance,
  Placement,
  VirtualElement,
} from "@popperjs/core";
import { useCallback, useEffect, useRef } from "react";

type UsePositioningEngine = {
  enabled?: boolean;
  strategy?: "absolute" | "fixed";
  placement: Placement;
};

export type ArrowCSSVarProps = {
  /**
   * The size of the popover arrow.
   * This sets the `--popper-arrow-size` css property
   */
  size?: string | number;
  /**
   * The box-shadow color of the popover arrow.
   * This sets the `--popper-arrow-shadow-color` css property
   */
  shadowColor?: string;
  /**
   * The background color of teh popper arrow.
   * This sets the `--popper-arrow-bg` css property.
   */
  bg?: string;
};

export default function usePositioningEngine({
  enabled,
  strategy,
  placement,
}: UsePositioningEngine) {
  const reference = useRef<Element | VirtualElement | null>(null);
  const popper = useRef<HTMLElement | null>(null);
  const instance = useRef<Instance | null>(null);
  const cleanup = useRef(() => {});
  const bootstrap = useCallback(() => {
    if (!enabled || !reference.current || !popper.current) return;

    // If popper instance exists, destroy it so we can create a new one
    cleanup.current?.();

    instance.current = createPopper(reference.current, popper.current, {
      placement,
      strategy: strategy,
    });
    instance.current.forceUpdate();

    cleanup.current = instance.current.destroy;
  }, [placement, strategy, enabled]);

  useEffect(() => {
    return () => {
      /**
       * Fast refresh might call this function and tear down the popper
       * even if the reference still exists. This checks against that
       */
      if (!reference.current && !popper.current) {
        instance.current?.destroy();
        instance.current = null;
      }
    };
  }, []);

  const referenceRef = useCallback(
    <T extends Element | VirtualElement>(node: T | null) => {
      reference.current = node;
      bootstrap();
    },
    [bootstrap]
  );

  const getReferenceProps = useCallback<PropGetter<"button">>(
    (props = {}, ref = null) => ({
      ...props,
      ref: merge(referenceRef, ref),
    }),
    [referenceRef]
  );

  const popperRef = useCallback(
    <T extends HTMLElement>(node: T | null) => {
      popper.current = node;
      bootstrap();
    },
    [bootstrap]
  );

  const getPopperProps = useCallback<PropGetter<"div">>(
    (props = {}, ref = null) => ({
      ...props,
      ref: merge(popperRef, ref),
      style: {
        ...props.style,
        position: strategy,
        minWidth: "max-content",
        inset: "0 auto auto 0",
      },
    }),
    [strategy, popperRef]
  );

  const getArrowProps = useCallback<PropGetter<"div", ArrowCSSVarProps>>(
    (props = {}, ref = null) => {
      const { size, shadowColor, bg, style, ...rest } = props;
      return {
        ...rest,
        ref,
        "data-popper-arrow": "",
        style: getArrowStyle(props),
      };
    },
    []
  );

  const getArrowInnerProps = useCallback<PropGetter<"div">>(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      "data-popper-arrow-inner": "",
    }),
    []
  );

  return {
    update() {
      instance.current?.update();
    },
    forceUpdate() {
      instance.current?.forceUpdate();
    },
    referenceRef,
    popperRef,
    getPopperProps,
    getArrowProps,
    getArrowInnerProps,
    getReferenceProps,
  };
}

function getArrowStyle(props: any) {
  const { size, shadowColor, bg, style } = props;
  const computedStyle = { ...style, position: "absolute" };
  if (size) {
    computedStyle["--popper-arrow-size"] = size;
  }
  if (shadowColor) {
    computedStyle["--popper-arrow-shadow-color"] = shadowColor;
  }
  if (bg) {
    computedStyle["--popper-arrow-bg"] = bg;
  }
  return computedStyle;
}
