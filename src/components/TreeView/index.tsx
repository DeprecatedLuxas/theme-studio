import { HTMLAttributes, PropsWithChildren, useState } from "react";
import TreeFile from "./TreeFile";
import TreeFolder from "./TreeFolder";

type FileIcons = "json" | "ts" | "tsx" | "js" | "tsconfig" | "lock";

export interface TreeNodeProps {
  name: string;
  type: FileIcons;
  level?: number;
}

export interface TreeViewProps extends HTMLAttributes<HTMLDivElement> {}

function TreeView({ ...props }: TreeViewProps) {
  return <div {...props} />;
}

TreeView.Folder = TreeFolder;
TreeView.File = TreeFile;

export default TreeView;
