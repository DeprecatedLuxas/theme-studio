export * from "./localStorage";
export * from "./sesstionStorage";
export * from "./IndexedDB";

export abstract class WebbieStorage {
  abstract isSupported(): boolean;
  abstract getItem<T>(key: string): Promise<T>;
  abstract setItem<T>(key: string, value: T): Promise<void>;
  abstract removeItem(key: string): Promise<void>;
  abstract clear(): Promise<void>;
  abstract length(): Promise<number>;
  abstract keys(): Promise<string[]>;
}
