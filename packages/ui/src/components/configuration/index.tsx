import { ReactNode } from "react";
import { ConfigurationProvider } from "../../providers/configuration-provider";

export {
  ConfigurationSidebar,
  type ConfigurationSidebarProps,
} from "./ConfigurationSidebar";

export interface ConfigurationProps {
  children: ReactNode;
}

export function Configuration({ children }: ConfigurationProps) {
  return <ConfigurationProvider>{children}</ConfigurationProvider>;
}
