import { useContext } from "react";
import { IRegistry, RegistryContext } from "@contexts/RegistryContext";

type UseWebbieResult = {
  
}


export function useWebbie() {
  const context: WebbieInstance = useContext<IRegistry>(RegistryContext);
  if (!context)
    throw new Error("useRegistry must be used within RegistryContext.Provider");
  return context;
}
