import { Variable } from "./types";
import baseVars from "@variables/base.tstudio";
import titleBarVars from "@variables/titlebar.tstudio";
import statusBarVars from "@variables/statusbar.tstudio";

interface IRegistry {
  register(key: string, variable: Variable): void;
  registerFile(file: Record<string, Variable>): void;
}

class Registry implements IRegistry {
  readonly varRegex: RegExp = /var@(?<varname>[a-zA-Z.]+)/;
  readonly funcRegex: RegExp =
    /func@(?<func>transparent|darken|lighten)\((?<color>#(([\da-fA-F]{3}){1,2}|([\da-fA-F]{4}){1,2})), (?<int>[\d.]+)/;

  register(key: string, variable: Variable): void {
    throw new Error("Method not implemented.");
  }
  registerFile(file: Record<string, Variable>): void {
    Object.keys(file).forEach((key: string) => {
      this.register(key, file[key]);
    });
  }
}

const registry = new Registry();

registry.registerFile(baseVars);
registry.registerFile(titleBarVars);
registry.registerFile(statusBarVars);

export default registry;
