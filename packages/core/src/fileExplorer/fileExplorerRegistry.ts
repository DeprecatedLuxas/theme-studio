import { IFileExplorer } from "../types";
import { defaultFileExplorer } from "./defaultFileExplorer";

export interface IFileExplorerRegistry {
  /**
   * Register a file explorer to the registry.
   */
  registerExplorer(explorer: IFileExplorer): void;

  /**
   * Returns all file explorers contributed to this registry.
   */
  getFileExplorers(): IFileExplorer[];
}

class FileExplorerRegistry implements IFileExplorerRegistry {
  constructor() {}

  registerExplorer(explorer: IFileExplorer): void {
    throw new Error("Method not implemented.");
  }

  getFileExplorers(): IFileExplorer[] {
    throw new Error("Method not implemented.");
  }
}

export const registry = new FileExplorerRegistry();

// Registering default file explorer
registry.registerExplorer(defaultFileExplorer);
