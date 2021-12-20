import {
  SetupConfig,
  SetupOptions,
  ThemeStorage,
  TStudioActions,
  Variable,
  VSCThemeFormat,
} from "@lib/types";
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
        iconPack: "Material Icons",
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
}
