import { TStudioActions } from "@lib/types";
import { atom } from "recoil";


export const actionState = atom<TStudioActions>({
  key: "actionState",
  default: "",
});
