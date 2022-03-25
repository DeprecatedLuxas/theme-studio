import { useContext } from "react";
import { ConfigurationContext } from "../providers/configuration-provider";

export function useConfiguration() {
  const context = useContext(ConfigurationContext);
  if (!context)
    throw new Error(
      "useConfiguration must be used within ConfigurationProvider"
    );
  return context;
}
