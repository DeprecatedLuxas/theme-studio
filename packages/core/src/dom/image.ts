import { DOMImageOptions } from "@types";
import { getNodeSize } from "./utils";


/**
 * Converts a Element to a SVG Data Url
 * @param node T
 * @param options DOMImageOptions 
 * @returns Promise<string>
 */
export async function toSvg<T extends HTMLElement>(
  node: T,
  options: DOMImageOptions
): Promise<string> {
  const { width, height} = getNodeSize(node);
  
  return Promise.resolve("")
}