import { GitDecorations, ThemeType } from "@lib/types";

export interface NodeProps {
  name: string;
  // type?: IconTypes;
  level?: number;
  // status?: "" | "modified" | "untracked";
  // active?: boolean;
  decoration?: GitDecorations;
  decorationIcon?: boolean;
  type?: ThemeType;
}

export { default as Tree } from "./Tree";
export { default as File } from "./File";
