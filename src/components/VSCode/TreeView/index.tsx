import { IconTypes, TreeViewActiveItem, TreeViewItem } from "@lib/types";
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
  files: Array<TreeViewItem>;
}

function TreeView({ files, ...props }: TreeViewProps) {
  return <div {...props} />;
}

TreeView.Folder = TreeFolder;
TreeView.File = TreeFile;

export default TreeView;
