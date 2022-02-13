import { GitDecorations, IconTypes, ThemeType, TreeViewItem } from "@lib/types";
import { HTMLAttributes } from "react";
import Folder from "./Folder";
import File from "./File";
import { vscodeState } from "@recoil/atoms/vscode";
import { useRecoilValue } from "recoil";

// type: "dir" | "file";
// name: string;
// extension?: string;
// children?: TreeViewItem[];
// iconPath?: string;
// iconOpenPath?: string;
// active?: boolean;
// path?: string;

function parseFiles(files: Array<TreeViewItem>, themeType: ThemeType) {
  if (!files.length) return null;
  return files.map((file, idx) => {
    const { name, type } = file;

    if (type === "dir")
      return (
        <Folder key={`folder-${name}-${idx}`} name={name} type={themeType}>
          {parseFiles(file.children || [], themeType)}
        </Folder>
      );
    return <File key={`file-${name}-${idx}`} name={name} type={themeType} />;
  });
}

export interface TreeProps extends HTMLAttributes<HTMLDivElement> {
  files?: Array<TreeViewItem>;
}

export default function Tree({ files, children, ...props }: TreeProps) {
  const { type } = useRecoilValue(vscodeState);
  const childs = files && files.length > 0 ? parseFiles(files, type) : children;
  return (
    <div role="tree" {...props}>
      {childs}
    </div>
  );
}
