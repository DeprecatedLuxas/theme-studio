import {
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { Variables } from "./generated/variables";

export * from "./generated/variables";

export type Nullable<T> = T | null;
export type Arrayable<T> = T | T[];

export type VariableTab = "palette" | "editor" | "syntax";

export interface Indexable {
  [key: string]: any;
}

export interface VariableGroup extends Indexable {
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

export type ThemeType = "dark" | "light" | "hoc";

export type CompiledVariable = string;
export type CompiledVariables = Record<CompiledVariable, string>;

export interface VSCThemeFormat {
  name: string;
  type?: "dark" | "light";
  colors?: {};
  tokenColors?: {};
  semanticHighlighting?: boolean;
  semanticTokenColors?: {};
}

export interface ThemeStorage {
  name: string;
  type: "dark" | "light";
  palette: Palette[];
  variables: Record<CompiledVariable, string>;
}

export interface SetupConfig {
  name: string;
  type: "dark" | "light";
  palette: Palette[];
}

export type Palette = string;

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

export interface Interaction {
  left: number;
  top: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

export type ComponentPropPlacement = "top" | "bottom" | "left" | "right";