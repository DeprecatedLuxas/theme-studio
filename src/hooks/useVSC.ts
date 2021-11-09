import { useContext } from "react";
import { IVSCContext, VSCContext } from "@contexts/VSCContext";

export default function useVSC() {
  const context: IVSCContext = useContext<IVSCContext>(VSCContext);
  if (!context)
    throw new Error("useVSC must be used within VSCProvider");
  return context;
}
