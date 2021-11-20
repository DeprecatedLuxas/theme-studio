import {
  CompiledVariable,
  CompiledVariables,
  Indexable,
  PartialRecord,
  VariableCategories,
  VariableTab,
} from "@lib/types";
import { createContext, Dispatch } from "react";

export type IRegistry = {
  variables?: CompiledVariables;
  palette?: VariableCategories & Indexable;
  editor?: VariableCategories & Indexable;
  syntax?: VariableCategories & Indexable;
  dispatch?: Dispatch<IRegistry>;
};

export function reducer(state: IRegistry, action: IRegistry) {
  return { ...state, ...action };
}

export const RegistryContext = createContext<IRegistry>({});
