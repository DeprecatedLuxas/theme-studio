import { TreeViewContext } from "@contexts/TreeViewContext";
import { IconPack } from "@lib/types";
import { HTMLAttributes } from "react";
import TreeFile from "./TreeFile";
import TreeFolder from "./TreeFolder";

type Icons =
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
  | "modules";

export interface TreeNodeProps {
  name: string;
  type: Icons;
  level?: number;
}

export interface TreeViewProps extends HTMLAttributes<HTMLDivElement> {
  iconPack: IconPack;
}

function TreeView({ iconPack, ...props }: TreeViewProps) {
  return (
    <TreeViewContext.Provider value={{ iconPack }}>
      <div className="pl-3" {...props} />
    </TreeViewContext.Provider>
  );
}

TreeView.Folder = TreeFolder;
TreeView.File = TreeFile;

export default TreeView;
