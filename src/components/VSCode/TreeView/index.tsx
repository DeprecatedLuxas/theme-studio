import { GitDecorations } from "@lib/types";


export interface NodeProps {
  name: string;
  // type?: IconTypes;
  level?: number;
  // status?: "" | "modified" | "untracked";
  // active?: boolean;
  decoration?: GitDecorations;
  decorationIcon?: boolean;
}

export { default as Tree } from "./Tree";
export { default as File } from "./File";
