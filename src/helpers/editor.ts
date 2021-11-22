import {
  Arrayable,
  CompiledVariables,
  SetupConfig,
  ThemeStorage,
  Variable,
  Variables,
  VSCThemeFormat,
} from "@lib/types";
import dayjs from "dayjs";
import { isEqual } from "lodash";
import { CSSProperties, RefObject, useRef } from "react";

export default class EditorHelper {
  static Places: Map<"bg" | "text" | "border", string> = new Map([
    ["bg", "backgroundColor"],
    ["text", "color"],
    ["border", "borderColor"],
  ]);

  static isValidStorage(storage: any): boolean {
    return false;
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
      createdAt: -1,
    };
  }

  static compare(storage: ThemeStorage, storage2: ThemeStorage): boolean {
    return isEqual(storage, storage2);
  }

  static toVSCFormat(variables: Record<string, Variable>): VSCThemeFormat {
    console.log(variables);

    return {
      name: "",
    };
  }

  static formatVariable(variable: string): string {
    return variable.split("@")[1];
  }

}