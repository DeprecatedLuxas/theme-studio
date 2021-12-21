import { SetupConfig } from "@lib/types";
import { atom } from "recoil";

type ISetup = SetupConfig;

export const setupState = atom<ISetup>({
  key: "setupState",
  default: {
    name: "Untitled",
    type: "dark",
    options: {
      sidebar: "left",
    },
  },
});
