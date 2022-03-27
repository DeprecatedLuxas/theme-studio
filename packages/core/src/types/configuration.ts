export interface IConfiguration {
  id: string;
  title: string;
  description: string;
  section: string;
  node: IConfigurationNode;
}

export interface IConfigurationNode {
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

export interface IConfigurationSection {
  id: string;
  title: string;
  description?: string;
}
