import { WebbieOptions, WebbieStorage } from "@theme-studio/core";
import { useContext } from "react";

type UseWebbieResult = {
  /**
   * The type of storage that was supported,
   * or `none` if no storage was supported.
   */
  type: WebbieStorage;
};

export function useWebbie<T extends string>(
  options: WebbieOptions,
  l: T
): UseWebbieResult {
  return {
    type: WebbieStorage.NONE,
  };
}
