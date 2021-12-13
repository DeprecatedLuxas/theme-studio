import { TreeViewContext } from "@contexts/TreeViewContext";
import { IconPack, IconTypes } from "@lib/types";
import { HTMLAttributes } from "react";
import TreeFile from "./TreeFile";
import TreeFolder from "./TreeFolder";

export interface TreeNodeProps {
  name: string;
  type: IconTypes;
  level?: number;
  status?: "" | "modified" | "untracked";
  active?: boolean;
}

export interface TreeViewProps extends HTMLAttributes<HTMLDivElement> {
  iconPack: IconPack;
}

function TreeView({ iconPack, ...props }: TreeViewProps) {
  return (
    <TreeViewContext.Provider value={{ iconPack }}>
      <div {...props} />
    </TreeViewContext.Provider>
  );
}

TreeView.Folder = TreeFolder;
TreeView.File = TreeFile;

export default TreeView;
