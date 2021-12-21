import { createContext } from "react";

export type ITreeView = {
};

export const TreeViewContext = createContext<ITreeView>({});
TreeViewContext.displayName = "TreeViewContext";
