import { createContext } from "react";

export interface IVSCContext {
  functional?: boolean;
}

export const VSCContext = createContext<IVSCContext>({});
