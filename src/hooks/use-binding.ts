import { Arrayable, Variables } from "@lib/types";
import { CSSProperties, useRef } from "react";
import useRegistry from "./use-registry";

const Places: Map<"bg" | "text" | "border", string> = new Map([
  ["bg", "backgroundColor"],
  ["text", "color"],
  ["border", "borderColor"],
]);

export interface UseBindingOptions {
  bind?: Arrayable<Variables>;
}

export default function useBinding({ bind }: UseBindingOptions) {
  const { variables } = useRegistry();
  let ref = useRef<HTMLOrSVGElement>();

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
    const styling = Places.get(location as "bg" | "text" | "border");

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
