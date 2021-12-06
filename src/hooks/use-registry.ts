import { useContext } from "react";
import { IRegistry, RegistryContext } from "@contexts/RegistryContext";

export default function useRegistry() {
  const context: IRegistry = useContext<IRegistry>(RegistryContext);
  if (!context)
    throw new Error(
      "useRegistry must be used within RegistryContext.Provider"
    );
  return context;
}
