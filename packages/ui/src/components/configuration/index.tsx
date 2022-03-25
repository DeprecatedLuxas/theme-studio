import { ReactNode } from "react";
import { ConfigurationProvider } from "../../providers/configuration-provider";

export {
  ConfigurationSidebar,
  type ConfigurationSidebarProps,
} from "./configurationSidebar";

export interface ConfigurationProps {
  children: ReactNode;
}

export function Configuration({ children }: ConfigurationProps) {
  return <ConfigurationProvider>{children}</ConfigurationProvider>;
}
