import { TreeNode } from "./editor";

export interface IFileExplorer {
  /**
   * All file nodes that are visible in the file explorer.
   */
  nodes: TreeNode[];
  /**
   * Content of the main file of the file explorer.
   */
  content: string;
}