import { type IConfiguration } from "@theme-studio/core";

export interface ConfigurationNodeProps {
  node: IConfiguration;
}

export function ConfigurationNode({ node }: ConfigurationNodeProps) {
  return <div>{JSON.stringify(node)}</div>;
}
