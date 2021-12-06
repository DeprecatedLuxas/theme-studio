import { IconPack } from "@lib/types";
import { atom } from "recoil";

type IVSCode = {
  sidebarPlacement: "left" | "right";
  iconPack: IconPack;
};

export const vscodeState = atom<IVSCode>({
  key: "vscodeState",
  default: {
    sidebarPlacement: "left",
    iconPack: "Seti Icons",
  },
});
