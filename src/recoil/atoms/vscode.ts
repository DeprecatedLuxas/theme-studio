import EditorHelper from "@helpers/editor";
import { IconPack, TreeViewActiveItem, TreeViewItem } from "@lib/types";
import { atom } from "recoil";

type IVSCode = {
  sidebarPlacement: "left" | "right";
  name: string;
  files: TreeViewItem[];
  iconPack: IconPack;
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
    iconPack: "Material Icons",
    branch: "main",
    language: "TypeScript React",
    activeFile: {
      name: "index.tsx",
      path: "src/pages/index.tsx",
      iconPath: "",
    },
  },
});
