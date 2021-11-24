import { Arrayable, CompiledVariables, Variables } from "@lib/types";
import { CSSProperties, MutableRefObject, useRef } from "react";

const Places: Map<"bg" | "c" | "bc" | "blc" | "brc" | "btc" | "bbc", string> =
  new Map([
    ["bg", "backgroundColor"],
    ["c", "color"],
    ["bc", "borderColor"],
    ["blc", "borderLeftColor"],
    ["brc", "borderRightColor"],
    ["btc", "borderTopColor"],
    ["bbc", "borderBottomColor"],
  ]);

export interface UseBindingOptions {
  ref?: MutableRefObject<HTMLOrSVGElement | undefined>;
  bind?: Arrayable<Variables>;
  variables?: CompiledVariables;
}

export default function useBinding({
  ref,
  bind,
  variables,
}: UseBindingOptions) {
  // let ref = useRef<HTMLOrSVGElement>();

  if (!bind) return {};

  let styleObj: CSSProperties = {};
  const events: {
    onMouseEnter?: (event: React.MouseEvent<HTMLOrSVGElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLOrSVGElement>) => void;
  } = {};
  const bindings: Variables[] = Array.isArray(bind) ? bind : [bind];
  bindings.forEach((binding: Variables) => {
    const [, hover, location] = binding.match(
      /^(?<hover>h:)?(?<location>.+)@(.+)$/
    )!;
    const styling = Places.get(
      location as "bg" | "c" | "bc" | "blc" | "brc" | "btc" | "bbc"
    );

    if (!styling) return {};

    if (hover) {
      let oldStyle: CSSProperties = {};

      events.onMouseEnter = () => {
        oldStyle =
          // @ts-ignore
          ref.current!.style[styling];

        // We need to to @ts-ignore on the style, else it will give an error
        // @ts-ignore
        ref.current!.style[styling] = variables![binding.split(":")[1]];
      };
      events.onMouseLeave = () => {
        // @ts-ignore
        ref.current!.style[styling] = oldStyle;
      };
    } else {
      styleObj = {
        ...styleObj,
        [styling]: variables![binding],
      };
    }
  });
  return {
    style: styleObj,
    ref,
    ...events,
  };
}
