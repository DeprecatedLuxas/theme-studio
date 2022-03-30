import { type Configuration } from "@theme-studio/core";

export interface ConfigurationNodeProps {
  node: Configuration;
}

export function ConfigurationNode({ node }: ConfigurationNodeProps) {
  return <div>{JSON.stringify(node)}</div>;
}
