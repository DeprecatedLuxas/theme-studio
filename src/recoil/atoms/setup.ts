import EditorHelper from "@helpers/editor";
import { SetupConfig } from "@lib/types";
import { atom } from "recoil";

export const setupState = atom<SetupConfig>({
  key: "setupState",
  default: {
    name: "Untitled",
    type: "dark",
    options: {
      sidebar: "left",
      files: EditorHelper.getDefaultFiles(),
    },
  },
});
