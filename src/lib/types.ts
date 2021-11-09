import {
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";

export type Nullable<T> = T | null;
export type PropGetter<T extends ElementType, P = {}> = (
  props?: Omit<
    React.ComponentPropsWithoutRef<T>,
    "color" | "width" | "height"
  > &
    P,
  ref?: React.Ref<any> | React.RefObject<any>
) => Omit<React.ComponentPropsWithRef<T>, "color" | "width" | "height">;

export interface SetupConfig {
  name: string;
  type: "dark" | "light";
}

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
