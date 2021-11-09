import { HTMLAttributes } from "react";

interface ElementProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: keyof JSX.IntrinsicElements;
  // bind?: Arrayable<>
}

export default function Element({ as = "div", ...rest }: ElementProps) {
  const Component = as as keyof JSX.IntrinsicElements;
  return <Component {...rest} />;
}
