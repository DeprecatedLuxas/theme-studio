import { useContext } from "react";
import { ITreeView, TreeViewContext } from "@contexts/TreeViewContext";

export default function useTreeView() {
  const context: ITreeView = useContext<ITreeView>(TreeViewContext);
  if (!context)
    throw new Error("useTreeView must be used within TreeViewContext.Provider");
  return context;
}
