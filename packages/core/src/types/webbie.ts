import { StorageType } from "../webbie";

export interface WebbieConfig {
  /**
   * The storage type to use.
   * @see {@link priority}
   */
  type: StorageType;
  /**
   * Priority to use when storing data.
   * If IndexedDB is not supported, use the next in the list.
   *
   * If priority is not defined, the storage disables
   * when its not supported.
   */
  priority?: Array<StorageType>;
}
