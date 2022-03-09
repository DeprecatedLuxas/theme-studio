import { Arrayable, IgnoreCase } from "./base";
import { ReactElement } from "react";

export type IconProviders = IgnoreCase<"fa" | "vsc">;

export type IconCredit = string;

export interface IconObject {
  /**
   * Credit to the person/organization that created the icon.
   */
  credit: IconCredit;
  /**
   * The viewBox attribute of the SVG.
   */
  viewBox: string;
  /**
   * The SVG content.
   * @examples
   *  - "M0 0h24v24H0z"
   *  - <path d="M0 0h24v24H0z"/>
   */
  path: string | Arrayable<ReactElement>;
}
