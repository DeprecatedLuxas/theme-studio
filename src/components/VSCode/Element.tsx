import EditorHelper from "@helpers/editor";
import useBinding from "@hooks/use-binding";
import useRegistry from "@hooks/use-registry";
import { Arrayable, Variables } from "@lib/types";
import { CSSProperties, HTMLAttributes, RefObject, useRef } from "react";

const Places: Map<"bg" | "text" | "border", string> = new Map([
  ["bg", "backgroundColor"],
  ["text", "color"],
  ["border", "borderColor"],
]);

export interface ElementProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: keyof JSX.IntrinsicElements;
  conditionalClassName?: string;
  bind?: Arrayable<Variables>;
}

export default function Element({ as = "div", bind, className, conditionalClassName, ...rest }: ElementProps) {
  const Component = as as keyof JSX.IntrinsicElements;

  const binding = useBinding({
    bind,
  });
  

  return <Component className={className} {...rest} {...binding} />;
}
