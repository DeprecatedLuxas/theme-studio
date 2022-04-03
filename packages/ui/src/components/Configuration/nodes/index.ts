import { ConfigurationNode } from "@theme-studio/core";

export { StringNode } from "./StringNode";
export { StringEnumNode } from "./StringEnumNode";

export interface BaseNodeProps {
  id: string;
  node: ConfigurationNode;
}
