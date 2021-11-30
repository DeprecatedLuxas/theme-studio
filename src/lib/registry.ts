import {
  CompiledVariables,
  Indexable,
  PartialRecord,
  ThemeStorage,
  ThemeType,
  Variable,
  VariableGroup,
  VariableCategories,
  VariableTab,
  VariablePossibleCategories,
  CompiledVariable,
  TStudioAction,
  Variables,
} from "./types";
import baseVars from "@variables/base.tstudio";
import activityBarVars from "@variables/activitybar.tstudio";
import titleBarVars from "@variables/titlebar.tstudio";
import statusBarVars from "@variables/statusbar.tstudio";
import menuBarVars from "@variables/menubar.tstudio";
import gitVars from "@variables/git.tstudio";
import sideBarVars from "@variables/sidebar.tstudio";
import tabsVar from "@variables/tabs.tstudio";
import tinycolor from "tinycolor2";

enum Functions {
  TRANSPARENT = "transparent",
  DARKEN = "darken",
  LIGHTEN = "lighten",
}

interface IRegistry {
  validate(): boolean;
  getAction(key: string): TStudioAction | undefined;
  register(key: string, variable: Variable): void;
  registerFile(file: Record<string, Variable>): void;
  compile<K extends VariableTab>(type: ThemeType, tab: K): CompiledVariables;
  compileAll(type: ThemeType): CompiledVariables;
  getByTab(tab: VariableTab): Record<string, Variable>;
  parseGroup(group: VariableGroup): VariableGroup;
  clone(storage: ThemeStorage): boolean | undefined;
  getVariable(variable: string): VariableGroup | undefined;
  getCategories(): VariableCategories;
  getVariableCategory(variable: CompiledVariable): VariablePossibleCategories;
}

class Registry implements IRegistry {
  readonly variables: Record<string, Variable> = {};

  readonly varRegex: RegExp = /var@(?<varname>[a-zA-Z.]+)/;
  readonly funcRegex: RegExp =
    /func@(?<func>transparent|darken|lighten)\((?<color>#(([\da-fA-F]{3}){1,2}|([\da-fA-F]{4}){1,2})), (?<int>[\d.]+)/;

  register(key: string, variable: Variable): void {
    if (this.variables[key]) {
      throw new Error(`Variable with key ${key} already exists`);
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
        let replacementVariable = this.getVariable(varMatch!.groups!.varname);
        if (!replacementVariable)
          replacementVariable = {
            dark: "hotpink",
            light: "hotpink",
            hc: "hotpink",
          };

        newGroup[key] = newGroup[key].replace(
          this.varRegex,
          replacementVariable[key]
        );
      }
      if (this.funcRegex.test(newGroup[key])) {
        const funcMatch = newGroup[key].match(this.funcRegex);
        const func = funcMatch!.groups!.func;
        const int = parseFloat(funcMatch!.groups!.int);
        const color = funcMatch!.groups!.color;

        switch (func) {
          case Functions.TRANSPARENT:
            newGroup[key] = tinycolor(color).setAlpha(int).toHex8String();
            break;
          case Functions.DARKEN:
            newGroup[key] = tinycolor(color).darken(int).toHex8String();
            break;
          case Functions.LIGHTEN:
            newGroup[key] = tinycolor(color).lighten(int).toHex8String();
            break;
          default:
            throw new Error("Unknown Function Error");
        }
      }
    });

    return newGroup;
  }

  clone(storage: ThemeStorage): boolean | undefined {
    throw new Error("Method not implemented.");
  }

  getVariable(variable: string): VariableGroup | undefined {
    const vari = Object.keys(this.variables).find((key: string) => {
      return this.variables[key].variable === variable;
    });
    if (!this.variables[vari!]) return undefined;
    return this.variables[vari!].group;
  }

  compile(type: ThemeType, tab: VariableTab): CompiledVariables {
    const variables: CompiledVariables & Indexable = {};

    const vars = this.getByTab(tab);
    Object.keys(vars).forEach((varKey: string) => {
      const variable = vars[varKey];
      variables[varKey] = variable.group[type];
    });
    return variables;
  }

  compileAll(type: ThemeType): CompiledVariables {
    const compiled: CompiledVariables & Indexable = {};
    Object.keys(this.variables).forEach((key: string) => {
      compiled[key] = this.variables[key].group[type];
    });

    return compiled;
  }

  getCategories(): VariableCategories {
    const categories: VariableCategories = {
      palette: [],
      editor: [],
      syntax: [],
    };

    Object.keys(this.variables).forEach((key: string) => {
      const variable = this.variables[key];
      const tab = variable.tab;
      const category = variable.category;
      if (!tab || !category) return;
      if (categories[tab].includes(category as VariablePossibleCategories))
        return;
      categories[tab].push(category as VariablePossibleCategories);
    });
    return categories;
  }

  getVariableCategory(variable: CompiledVariable): VariablePossibleCategories {
    const vari = this.variables[variable];
    if (!vari) throw new Error("Category not found");
    return vari.category as VariablePossibleCategories;
  }

  validate(): boolean {
    throw new Error("Method not implemented.");
  }

  getAction(key: Variables): TStudioAction | undefined {
    return this.variables[key].action;
  }
}

const registry = new Registry();

registry.registerFile(baseVars);
registry.registerFile(activityBarVars);
registry.registerFile(titleBarVars);
registry.registerFile(statusBarVars);
registry.registerFile(menuBarVars);
registry.registerFile(gitVars);
registry.registerFile(sideBarVars);
registry.registerFile(tabsVar);

export default registry;
