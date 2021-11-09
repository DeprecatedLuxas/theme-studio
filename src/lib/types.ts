import {
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";

export type Nullable<T> = T | null;
export type Arrayable<T> = T | T[];

export type VariableTab = "palette" | "editor" | "syntax";

export interface VariableGroup {
  dark: Nullable<string>;
  light: Nullable<string>;
  hc: Nullable<string>;
}
export interface Variable {
  variable: string;
  group: VariableGroup;
  tab?: VariableTab;
  description: string;
  category?: string;
  action?: string;
  hover?: boolean;
}

export interface CompiledVariable {
  description: string;
  action?: string;
  hover?: boolean;
}

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
