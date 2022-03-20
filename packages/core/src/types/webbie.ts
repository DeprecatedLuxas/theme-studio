import { WebbieStorage } from "../webbie";
import { FeatonFeaturesResult } from "./featon";

export interface WebbieOptions {
  /**
   * The storage type to use.
   * @see {@link priority}
   */
  type: WebbieStorage;

  /**
   * Use a memory indexedDB
   *
   * If indexedDB is not available,
   * the memory indexedDB will be used.
   * 
   * If value is false, the localStorage
   * will be used.
   *
   * @default false
   */
  useMemory?: boolean;

  /**
   * The name of the database to use.
   */
  name?: string;

  /**
   * Featon values to use.
   *
   * If not set, webbie will provide their own
   * featon values.
   */
  featonValues?: FeatonFeaturesResult;
  
}
