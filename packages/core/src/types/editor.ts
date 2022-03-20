export type SidebarPosition = "left" | "right";
export type Modes = "Full Screen" | "Zen Mode" | "Centered Layout";

export type TreeLabel = string;

export interface TreeNode {
  type: "dir" | "file";
  label: TreeLabel;
  children: TreeNode[];
  collapsed?: boolean;
  active: boolean;
  icon: string;
}
