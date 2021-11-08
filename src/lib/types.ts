import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";

export type WindyElement<P, E> = <K extends Record<`$${string}`, any> = {}>(
  element: TemplateStringsArray,
  ...elements: ((props: P & K) => string | undefined | null)[]
) => ForwardRefExoticComponent<PropsWithoutRef<P & K> & RefAttributes<E>>;

export type IntrinsicElements = {
  [key in keyof JSX.IntrinsicElements]: WindyElement<
    JSX.IntrinsicElements[key],
    any
  >;
};
