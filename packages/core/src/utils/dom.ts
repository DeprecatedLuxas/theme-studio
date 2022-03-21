import type { NodeSize, Nullable } from "../types";

/**
 * Returns whether the window object is ready to use
 * @returns boolean
 */
export function isBrowser(): boolean {
  return Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );
}
