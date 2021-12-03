import {
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { TStudioActions } from "./generated/actions";
import { Variables, VariablePossibleCategories } from "./generated/variables";

export * from "./generated/variables";
export * from "./generated/actions";

export type Nullable<T> = T | null;
export type Arrayable<T> = T | T[];
export type PartialRecord<K extends string | number | symbol, T> = {
  [P in K]?: T;
};
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

export type ThemeType = "dark" | "light" | "hc";
export type ChangedVariables = CompiledVariables;

export type CompiledVariable = string;
export type CompiledVariables = Record<string, string>;
export type VariableCategories = Record<
  VariableTab,
  VariablePossibleCategories[]
>;

export type OnAction = PartialRecord<TStudioActions, Variables>;
export type OnHover = Array<Variables>;

export type Rule = string;
export type ConditionalClassName = PartialRecord<
  Variables,
  ConditionalClassNameRule
>;
export type ConditionalClassNameWhen = "NOT_NULL";

export interface ConditionalClassNameRule {
  when: ConditionalClassNameWhen;
  then: string;
}

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
  createdAt?: number;
  updatedAt?: number;
  type: "dark" | "light";
  palette: Palette[];
  options?: ThemeOptions;
  variables: Record<CompiledVariable, string>;
}

export interface ThemeOptions {
  sidebar: "left" | "right";
}

export interface SetupOptions extends ThemeOptions {}

export interface SetupConfig {
  name: string;
  type: "dark" | "light";
  palette: Palette[];
  options: SetupOptions;
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
export type TStudioAction = string;

export interface ValidationSchema {}
