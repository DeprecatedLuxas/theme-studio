import {
  CompiledVariables,
  IconPack,
  Indexable,
  VariableCategories,
  VariablePossibleCategories,
} from "@lib/types";
import { createContext, Dispatch } from "react";

export type ITreeView = {
  iconPack?: IconPack;
};

export const TreeViewContext = createContext<ITreeView>({});
TreeViewContext.displayName = "TreeViewContext";
