import { IconPack } from "@lib/types";
import { createContext } from "react";

export type ITreeView = {
  iconPack?: IconPack;
};

export const TreeViewContext = createContext<ITreeView>({});
TreeViewContext.displayName = "TreeViewContext";
