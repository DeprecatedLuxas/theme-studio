import { GitDecorations, IconTypes, TreeViewItem } from "@lib/types";
import { HTMLAttributes } from "react";

export interface TreeNodeProps {
  name: string;
  type?: IconTypes;
  level?: number;
  status?: "" | "modified" | "untracked";
  active?: boolean;
  decoration?: GitDecorations;
  decorationIcon?: boolean;
}

export interface TreeProps extends HTMLAttributes<HTMLDivElement> {
  files?: Array<TreeViewItem>;
}

export default function Tree({ files, ...props }: TreeProps) {
  return <div {...props} />;
}
