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
  bind?: Arrayable<Variables>;
}

export default function Element({ as = "div", bind, ...rest }: ElementProps) {
  // const { variables } = useRegistry();
  const Component = as as keyof JSX.IntrinsicElements;

  const binding = useBinding({
    bind,
  });
  

  // {...EditorHelper.handleBinding(variables!, bind)} data-custom={bind}

  // const bindings = EditorHelper.handleBinding(variables!, bind);
  // console.log(ref);
  // style={styleObject} {...events} ref={ref}

  return <Component {...rest} {...binding} />;
}
