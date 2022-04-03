import { type Configuration } from "@theme-studio/core";
import { ComponentType } from "react";
import { Heading } from "../Heading";
import { StringEnumNode, StringNode } from "./nodes";

export interface ConfigurationNodeProps {
  node: Configuration;
}

export function getComponentNode({ node }: Configuration): ComponentType<any> {
  switch (node.type) {
    case "string":
      if (node.enum) {
        return StringEnumNode;
      }
      return StringNode;

    case "array":
    case "boolean":
    case "number":
    case "object":
    case "integer":
    case "null":
    default:
      throw new Error(`Unsupported configuration type: ${node.type}`);
  }
}

export function ConfigurationNode({ node }: ConfigurationNodeProps) {
  const ComponentNode = getComponentNode(node);
  return (
    <div className="w-56 py-2">
      <Heading type="h3" className="text-xl text-dark-700 dark:text-white mb-1">
        {node.title}
      </Heading>
      <p className="text-dark-700 dark:text-gray-400 mb-1">
        {node.description}
      </p>
      <ComponentNode node={node.node} id={node.id} />
    </div>
  );
}
