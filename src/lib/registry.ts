import {
  CompiledVariables,
  ThemeType,
  Variable,
  VariableGroup,
  VariableTab,
} from "./types";
import baseVars from "@variables/base.tstudio";
import titleBarVars from "@variables/titlebar.tstudio";
import statusBarVars from "@variables/statusbar.tstudio";
import tinycolor from "tinycolor2";
enum Functions {
  TRANSPARENT = "transparent",
  DARKEN = "darken",
  LIGHTEN = "lighten",
}

interface IRegistry {
  register(key: string, variable: Variable): void;
  registerFile(file: Record<string, Variable>): void;
  compile(type: ThemeType): {
    palette: {
      [key: string]: CompiledVariables;
    };
    editor: {
      [key: string]: CompiledVariables;
    };
    syntax: {
      [key: string]: CompiledVariables;
    };
  };
  getByTab(tab: VariableTab): Record<string, Variable>;
  parseGroup(group: VariableGroup): VariableGroup;
  getVariable(variable: string): VariableGroup;
}

class Registry implements IRegistry {
  readonly variables: Record<string, Variable> = {};

  readonly varRegex: RegExp = /var@(?<varname>[a-zA-Z.]+)/;
  readonly funcRegex: RegExp =
    /func@(?<func>transparent|darken|lighten)\((?<color>#(([\da-fA-F]{3}){1,2}|([\da-fA-F]{4}){1,2})), (?<int>[\d.]+)/;

  register(key: string, variable: Variable): void {
    if (this.variables[key]) {
      throw new Error("SHIT HAPPENDED");
    }
    variable.group = this.parseGroup(variable.group);
    this.variables[key] = variable;
  }

  registerFile(file: Record<string, Variable>): void {
    Object.keys(file).forEach((key: string) => {
      if (key === "exclude") return;
      this.register(key, file[key]);
    });
  }

  getByTab(tab: VariableTab): Record<string, Variable> {
    return Object.keys(this.variables).reduce((acc, key) => {
      if (this.variables[key].tab === tab) {
        acc[key] = this.variables[key];
      }
      return acc;
    }, {} as Record<string, Variable>);
  }

  parseGroup(group: VariableGroup): VariableGroup {
    const newGroup: VariableGroup = group;
    Object.keys(group).forEach((key: string) => {
      if (this.varRegex.test(newGroup[key])) {
        const varMatch = newGroup[key].match(this.varRegex);

        newGroup[key] = newGroup[key].replace(
          this.varRegex,
          this.getVariable(varMatch!.groups!.varname)[key]
        );
      }
      if (this.funcRegex.test(newGroup[key])) {
        const funcMatch = newGroup[key].match(this.funcRegex);
        const func = funcMatch!.groups!.func;
        const int = parseFloat(funcMatch!.groups!.int);
        const color = funcMatch!.groups!.color;

        switch (func) {
          case Functions.TRANSPARENT:
            newGroup[key] = tinycolor(color).setAlpha(int).toHexString();
            break;
          case Functions.DARKEN:
            newGroup[key] = tinycolor(color).darken(int).toHexString();
            break;
          case Functions.LIGHTEN:
            newGroup[key] = tinycolor(color).lighten(int).toHexString();
            break;
          default:
            throw new Error("Unknown Function Error");
        }
      }
    });

    return newGroup;
  }

  getVariable(variable: string): VariableGroup {
    const vari = Object.keys(this.variables).find((key: string) => {
      return this.variables[key].variable === variable;
    });
    return this.variables[vari!].group;
  }

  compile(type: ThemeType): {
    palette: {
      [key: string]: CompiledVariables;
    };
    editor: {
      [key: string]: CompiledVariables;
    };
    syntax: {
      [key: string]: CompiledVariables;
    };
  } {
    const compiledObject: {
      palette: {
        [key: string]: CompiledVariables;
      };
      editor: {
        [key: string]: CompiledVariables;
      };
      syntax: {
        [key: string]: CompiledVariables;
      };
    } = {
      palette: {},
      editor: {},
      syntax: {},
    };

    Object.keys(compiledObject).forEach((key: string) => {
      const vars = this.getByTab(key as VariableTab);
      Object.keys(vars).forEach((varKey: string) => {
        const category = vars[varKey].category!;
        compiledObject[key as VariableTab][category] = {
          ...compiledObject["palette"][category],
          [varKey]: vars[varKey].group[type],
        };
      });
    });

    return compiledObject;
  }
}

const registry = new Registry();

registry.registerFile(baseVars);
registry.registerFile(titleBarVars);
registry.registerFile(statusBarVars);

export default registry;
