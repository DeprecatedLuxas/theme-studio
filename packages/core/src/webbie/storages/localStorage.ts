import { WebbieStorage } from ".";

export class LocalStorage extends WebbieStorage {
  isSupported(): boolean {
    throw new Error("Method not implemented.");
  }
  getItem<T>(key: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  setItem<T>(key: string, value: T): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removeItem(key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  clear(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  length(): Promise<number> {
    throw new Error("Method not implemented.");
  }
  keys(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
}