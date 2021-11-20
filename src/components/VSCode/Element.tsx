import EditorHelper from "@helpers/editor";
import useRegistry from "@hooks/useRegistry";
import { Arrayable, Variables } from "@lib/types";
import { HTMLAttributes } from "react";

interface ElementProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: keyof JSX.IntrinsicElements;
  bind?: Arrayable<Variables>;
}

export default function Element({ as = "div", bind, ...rest }: ElementProps) {
  const { palette, editor, syntax, variables } = useRegistry();
  const Component = as as keyof JSX.IntrinsicElements;
  return (
    <Component {...rest} {...EditorHelper.handleVariables(bind, variables!)} />
  );
}
