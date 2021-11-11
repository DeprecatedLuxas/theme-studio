import { Arrayable, Variables } from "@lib/types";
import { HTMLAttributes } from "react";

interface ElementProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: keyof JSX.IntrinsicElements;
  bind?: Arrayable<Variables>;
}

export default function Element({ as = "div", bind, ...rest }: ElementProps) {
  const Component = as as keyof JSX.IntrinsicElements;

  if (bind) console.log(bind);

  return <Component {...rest} />;
}


