import { VSCThemeFormat } from "@lib/types";

export default class EditorHelper {
  static isValidStorage(storage: any): boolean {
    return false;
  }

  static toVSCFormat(): VSCThemeFormat {
    return {
      name: "",
    };
  }

  static formatVariable(variable: string): string {
    return variable.split("@")[1];
  }
}
