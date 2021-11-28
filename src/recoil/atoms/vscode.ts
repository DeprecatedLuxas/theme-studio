import { SetupConfig } from "@lib/types";
import { atom } from "recoil";

type IVSCode = {
  sidebarPlacement: "left" | "right";
};

export const vscodeState = atom<IVSCode>({
  key: "vscodeState",
  default: {
    sidebarPlacement: "left",
  },
});
