import {
  CompiledVariables,
  Indexable,
  VariableCategories,
} from "@lib/types";
import { createContext, Dispatch } from "react";

export type IRegistry = {
  variables?: CompiledVariables;
  categories?: VariableCategories;
  palette?: CompiledVariables & Indexable;
  editor?: CompiledVariables & Indexable;
  syntax?: CompiledVariables & Indexable;
  dispatch?: Dispatch<IRegistry>;
};

export function reducer(state: IRegistry, action: IRegistry) {
  return { ...state, ...action };
}

export const RegistryContext = createContext<IRegistry>({});
RegistryContext.displayName = "RegistryContext";
