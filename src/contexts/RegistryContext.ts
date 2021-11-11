import { CompiledVariable, CompiledVariables } from "@lib/types";
import { createContext, Dispatch } from "react";

export type IRegistry = {
  variables?: {
    palette: {
      [key: string]: CompiledVariables;
    };
    editor: {
      [key: string]: CompiledVariables;
    };
    syntax: {
      [key: string]: CompiledVariables;
    };
  };
  dispatch?: Dispatch<IRegistry>;
};

export function reducer(state: IRegistry, action: IRegistry) {
  return { ...state, ...action };
}

export const RegistryContext = createContext<IRegistry>({});
