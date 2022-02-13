import EditorHelper from "@helpers/editor-helper";
import { ThemeType, TreeViewActiveItem, TreeViewItem } from "@lib/types";
import { atom } from "recoil";

type IVSCode = {
  type: ThemeType;
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
    type: "dark",
    sidebarPlacement: "left",
    name: "vscode-theme-studio",
    files: EditorHelper.getDefaultFiles(),
    branch: "main",
    language: "TypeScript React",
    activeFile: EditorHelper.getActiveFile(EditorHelper.getDefaultFiles()),
  },
});
