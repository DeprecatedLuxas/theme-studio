import { WebbieOptions } from "../types";
import { WebbieStorage } from "./webbie-storage";

export class Webbie<T extends string> {
  constructor(private readonly options: WebbieOptions, l: T) {
    this.options = options;
  }
}
