import Variable from "@components/Editor/Variable";
import { ThemeStorage, VSCThemeFormat } from "@lib/types";
import { isEqual } from "lodash";

export default class EditorHelper {
  static isValidStorage(storage: any): boolean {
    return false;
  }

  static getFakeStorage(): ThemeStorage {
    return {
      name: "Untitled",
      type: "dark",
      palette: [],
      variables: {},
    };
  }


  static compare(storage: ThemeStorage, storage2: ThemeStorage): boolean {
    return isEqual(storage, storage2);
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
