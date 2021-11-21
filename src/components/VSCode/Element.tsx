import EditorHelper from "@helpers/editor";
import useRegistry from "@hooks/use-registry";
import { Arrayable, Variables } from "@lib/types";
import { HTMLAttributes } from "react";

export interface ElementProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: keyof JSX.IntrinsicElements;
  bind?: Arrayable<Variables>;
}

export default function Element({
  as = "div",
  bind = "",
  ...rest
}: ElementProps) {
  const { variables } = useRegistry();
  const Component = as as keyof JSX.IntrinsicElements;
  return (
    <Component {...rest} {...EditorHelper.handleBinding(variables!, bind)} />
  );
}
