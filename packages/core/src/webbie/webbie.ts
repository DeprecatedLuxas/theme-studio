import { WebbieConfig } from "../types";

export class Webbie {

  constructor(private readonly options: WebbieConfig) {
    this.options = options;
  }

  static instance(options: WebbieConfig) {
    return new Webbie(options);
  }
}
