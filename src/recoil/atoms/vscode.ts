import EditorHelper from "@helpers/editor";
import { TreeViewActiveItem, TreeViewItem } from "@lib/types";
import { atom } from "recoil";

type IVSCode = {
  sidebarPlacement: "left" | "right";
  name: string;
  files: Array<TreeViewItem>;
  branch: string;
  language: string;
  activeFile: TreeViewActiveItem;
};

export const vscodeState = atom<IVSCode>({
  key: "vscodeState",
  default: {
    sidebarPlacement: "left",
    name: "vscode-theme-studio",
    files: EditorHelper.getDefaultFiles(),
    branch: "main",
    language: "TypeScript React",
    activeFile: EditorHelper.getActiveFile(EditorHelper.getDefaultFiles()),
  },
});
