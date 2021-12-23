import {
  SetupConfig,
  SetupOptions,
  ThemeStorage,
  TreeViewActiveItem,
  TreeViewItem,
  Variable,
  VSCThemeFormat,
} from "@lib/types";
import defaultFiles from "./default_files.json";
import dayjs from "dayjs";
import isEqual from "fast-deep-equal";

export default class EditorHelper {
  static getFromSetupConfig(config: SetupConfig): ThemeStorage {
    return {
      ...config,
      variables: {},
      createdAt: dayjs().unix(),
    };
  }

  static getFromStorage(storage: ThemeStorage): SetupConfig {
    return {
      name: storage.name,
      type: storage.type,
      options: storage.options as SetupOptions,
    };
  }

  static getFakeStorage(): ThemeStorage {
    return {
      name: "Untitled",
      type: "dark",
      variables: {},
      options: {
        sidebar: "left",
      },
      createdAt: -1,
    };
  }

  static cleanVariables(variables: Record<string, string>) {
    const newVariables: Record<string, string> = {};
    Object.keys(variables).forEach((key) => {
      newVariables[this.formatVariable(key)] = variables[key];
    });

    return newVariables;
  }

  static compare(storage: ThemeStorage, storage2: ThemeStorage): boolean {
    return isEqual(storage, storage2);
  }

  static toVSCFormat(variables: Record<string, Variable>): VSCThemeFormat {
    // console.log(variables);

    return {
      name: "",
    };
  }

  static formatVariable(variable: string): string {
    return variable.split("@")[1];
  }

  static getDefaultFiles(): Array<TreeViewItem> {
    return defaultFiles as Array<TreeViewItem>;
  }

  static getActiveFile(files: Array<TreeViewItem>): TreeViewActiveItem {
    const file = getObject(files);
    

    return {
      name: file.name,
      path: file.path,
      iconPath: file.iconPath,
    };
  }
}

// Taken from stackoverflow, not sure if it's the best way to do this
// and should be written with correct types
function getObject(obj: any): any {
  let result = null;
  if (obj instanceof Array) {
    for (let i = 0; i < obj.length; i++) {
      result = getObject(obj[i]);
      if (result) {
        break;
      }
    }
  } else {
    for (var prop in obj) {
      if (prop === "active") {
        if (obj[prop]) {
          return obj;
        }
      }
      if (obj[prop] instanceof Object || obj[prop] instanceof Array) {
        result = getObject(obj[prop]);
        if (result) {
          break;
        }
      }
    }
  }
  return result;
}
