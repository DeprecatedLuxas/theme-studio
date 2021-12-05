import {
  SetupConfig,
  ThemeStorage,
  TStudioActions,
  Variable,
  VSCThemeFormat,
} from "@lib/types";
import dayjs from "dayjs";
import { isEqual } from "lodash";

export default class EditorHelper {
  static doesActionExist(action: string | undefined): boolean {
    if (action === undefined) return false;
    const act: TStudioActions = action as TStudioActions;
    // Check if action is really valid.

    return true;
  }

  static getFromSetupConfig(config: SetupConfig): ThemeStorage {
    return {
      ...config,
      variables: {},
      createdAt: dayjs().unix(),
    };
  }

  static getFakeStorage(): ThemeStorage {
    return {
      name: "Untitled",
      type: "dark",
      palette: [],
      variables: {},
      options: {
        sidebar: "left",
      },
      createdAt: -1,
    };
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
