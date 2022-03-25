import { useConfiguration } from "../../hooks/use-configuration";

export interface ConfigurationSidebarProps {}

export function ConfigurationSidebar({}: ConfigurationSidebarProps) {
  const { sections } = useConfiguration();
  return <div>{JSON.stringify(sections)}</div>;
}
