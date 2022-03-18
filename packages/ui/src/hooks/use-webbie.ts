import { StorageType } from "@theme-studio/core";
import { useContext } from "react";

type UseWebbieResult = {
  /**
   * The type of storage that was supported,
   * or `null` if no storage was supported.
   */
  type: StorageType;
};

export function useWebbie(): UseWebbieResult {
  return {
    type: StorageType.NONE,
  };
}
