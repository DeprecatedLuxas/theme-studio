export interface IConfiguration {
  identifier?: string;
  title?: string;
  description?: string;
  nodes: IConfigurationNodes;
}

export interface IConfigurationNodes {
  [key: string]: IConfigurationNode;
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
  description: string;
  default?: any;
  enum?: any[];
  
}
