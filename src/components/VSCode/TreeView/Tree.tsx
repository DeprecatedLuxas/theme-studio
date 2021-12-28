import { GitDecorations, IconTypes, TreeViewItem } from "@lib/types";
import { HTMLAttributes } from "react";
import Folder from "./Folder";
import File from "./File";

// type: "dir" | "file";
// name: string;
// extension?: string;
// children?: TreeViewItem[];
// iconPath?: string;
// iconOpenPath?: string;
// active?: boolean;
// path?: string;

function parseFiles(files: Array<TreeViewItem>) {
  if (!files.length) return null;
  return files.map((file, idx) => {
    const { name, type } = file;

    if (type === "dir")
      return (
        <Folder key={`folder-${name}-${idx}`} name={name}>
          {parseFiles(file.children || [])}
        </Folder>
      );
    return <File key={`file-${name}-${idx}`} name={name} />;
  });
}

export interface TreeProps extends HTMLAttributes<HTMLDivElement> {
  files?: Array<TreeViewItem>;
}

export default function Tree({ files, children, ...props }: TreeProps) {
  const childs = files && files.length > 0 ? parseFiles(files) : children;
  return <div {...props}>{childs}</div>;
}
