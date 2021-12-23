import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { MessageStatusEnum, MessagePositionEnum } from "./enums";
import { TStudioActions } from "@generated/actions";
import { Variables, VariablePossibleCategories } from "@generated/variables";
import { Languages } from "@generated/languages";
export * from "@generated/tailwind";
export type {
  Variables,
  VariablePossibleCategories,
  TStudioActions,
  Languages,
};

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
  additional?: VariableLocations[];
}

export type VariableLocations =
  | "bg"
  | "c"
  | "bc"
  | "blc"
  | "brc"
  | "btc"
  | "bbc";
export type ThemeType = "dark" | "light" | "hc";
export type ChangedVariables = CompiledVariables;

export type CompiledVariable = string;
export type CompiledVariables = Record<string, string>;
export type VariableCategories = Record<
  VariableTab,
  VariablePossibleCategories[]
>;

export type OnAction = PartialRecord<
  Exclude<TStudioActions, "">,
  Array<Variables>
>;
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
  type?: ThemeType;
  colors?: {};
  tokenColors?: {};
  semanticHighlighting?: boolean;
  semanticTokenColors?: {};
}

export interface ThemeStorage {
  name: string;
  createdAt?: number;
  updatedAt?: number;
  type: ThemeType;
  options?: ThemeOptions;
  variables: Record<CompiledVariable, string>;
}

export interface ThemeOptions {
  sidebar: SideBarPlacement;
  repo?: string;
  repoType?: "github" | "gitlab";
  language?: string;
  files?: TreeViewItem[];
  branch?: string;
}

export type SideBarPlacement = "left" | "right";

export interface SetupOptions extends ThemeOptions {}

export interface SetupConfig {
  name: string;
  type: ThemeType;
  options: SetupOptions;
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

export type AnchorPoint = {
  x: number;
  y: number;
};

export type IconTypes =
  | "json"
  | "ts"
  | "tsx"
  | "js"
  | "tsconfig"
  | "lock"
  | "components"
  | "pages"
  | "src"
  | "public"
  | "modules"
  | "api";

export type MessageStatus =
  | MessageStatusEnum
  | ""
  | "error"
  | "warning"
  | "info"
  | "success";

export type MessagePosition =
  | MessagePositionEnum
  | "top"
  | "top-right"
  | "top-left"
  | "bottom"
  | "bottom-right"
  | "bottom-left";

export interface Message {
  message: string;
  status?: MessageStatus;
  position?: MessagePosition;
}

export interface TreeViewItem {
  type: "dir" | "file";
  name: string;
  extension?: string;
  children?: TreeViewItem[];
  iconPath?: string;
  iconOpenPath?: string;
  active?: boolean;
  path?: string;
}

export interface TreeViewActiveItem {
  name: string;
  path: string;
  iconPath: string;
}
