export type ConfigurationKeys = "name" | "type" | "sidebarPosition" | "windowTitle";
export type Configurations = Record<ConfigurationKeys, string | number | boolean | object>;


export interface Configuration {
  id: string;
  title: string;
  description: string;
  section: string;
  node: ConfigurationNode;
}

export interface ConfigurationNode {
  type:
    | "string"
    | "number"
    | "boolean"
    | "integer"
    | "enum"
    | "object"
    | "array"
    | "null";
  default?: any;
  enum?: any[];
}
