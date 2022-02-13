import {
  CompiledVariables,
  Indexable,
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
import tinycolor from "tinycolor2";
import Validation from "./validation";
import VariableSchema from "@schemas/tstudio-schema.json";
import { colorNames } from "./color-names";

import baseVars from "@variables/base.tstudio";
import activityBarVars from "@variables/activitybar.tstudio";
import titleBarVars from "@variables/titlebar.tstudio";
import statusBarVars from "@variables/statusbar.tstudio";
import menuBarVars from "@variables/menubar.tstudio";
import gitVars from "@variables/git.tstudio";
import sideBarVars from "@variables/sidebar.tstudio";
import tabsVars from "@variables/tabs.tstudio";
import toolbarVars from "@variables/toolbar.tstudio";
import editorVars from "@variables/editor.tstudio";
import breadcrumbsVar from "@variables/breadcrumbs.tstudio";
import treeVars from "@variables/tree.tstudio";
import listVars from "@variables/list.tstudio";
import inputVars from "@variables/input.tstudio";
import editorGroupVars from "@variables/editorgroup.tstudio";
import buttonVars from "@variables/button.tstudio";

enum Functions {
  TRANSPARENT = "transparent",
  DARKEN = "darken",
  LIGHTEN = "lighten",
  IFTHENELSE = "ifThenElse",
}

interface IRegistry {
  getAction(key: string): TStudioAction | undefined;
  register(key: string, variable: Variable): void;
  registerFile(file: Record<string, Variable>): void;
  compile<K extends VariableTab>(type: ThemeType, tab: K): CompiledVariables;
  compileAll(type: ThemeType): CompiledVariables;
  getByTab(tab: VariableTab): Record<string, Variable>;
  parseGroup(group: VariableGroup): VariableGroup;
  clone(storage: ThemeStorage, tab: VariableTab): CompiledVariables | undefined;
  cloneAll(storage: ThemeStorage): CompiledVariables | undefined;
  getVariable(variable: string): VariableGroup | undefined;
  getCategories(): VariableCategories;
  getVariableCategory(variable: CompiledVariable): VariablePossibleCategories;
}

class Registry implements IRegistry {
  readonly variables: Record<string, Variable> = {};
  readonly rgbRegex: RegExp =
    /rgba?\(\s*(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01\.]\.?\d?)?\s*\)/;
  readonly varRegex: RegExp =
    /@(?!transparent|darken|lighten|ifThenElse)([a-zA-Z.]+)/g;

  readonly funcTypeRegex: RegExp =
    /@(?<func>transparent|darken|lighten|ifThenElse)/;
  readonly funcRegex: RegExp =
    /\((?<color>#(([\da-fA-F]{3}){1,2}|([\da-fA-F]{4}){1,2})), (?<int>[\d.]+)\)/;
  readonly funcRegex2: RegExp =
    /\((?<if>#(([\da-fA-F]{3}){1,2}|([\da-fA-F]{4}){1,2})), (?<then>#(([\da-fA-F]{3}){1,2}|([\da-fA-F]{4}){1,2})), (?<else>#(([\da-fA-F]{3}){1,2}|([\da-fA-F]{4}){1,2}))\)/;

  readonly placeholderColor = tinycolor("hotpink").toHex8String();

  register(key: string, variable: Variable): void {
    const isValid = Validation.validate(
      {
        [key]: variable,
      },
      VariableSchema
    );

    if (!isValid) {
      console.error("Invalid variable:", key);
      return;
    }

    if (this.variables[key]) {
      console.warn(`Variable with key ${key} already exists`);
      return;
    }

    variable.group = this.parseGroup(variable.group);

    this.variables[key] = variable;
  }

  registerFile(file: Record<string, Variable>): void {
    Object.keys(file).forEach((key: string) => {
      if (key === "exclude") return;

      this.register(key, file[key]);
      const addi = file[key].additional || [];
      // TODO: Fix this. This creates a duplicate of the variable.
      addi.forEach((additional: string) => {
        this.register(`${additional}@${key.split("@")[1]}`, file[key]);
      });
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
      if (newGroup[key] === null) {
        newGroup[key] = this.placeholderColor;
      }

      if (colorNames.includes(newGroup[key])) {
        newGroup[key] = tinycolor(newGroup[key]).toHex8String();
      }

      if (this.rgbRegex.test(newGroup[key])) {
        newGroup[key] = tinycolor(newGroup[key]).toHex8String();
      }

      if (this.varRegex.test(newGroup[key])) {
        const varMatch = newGroup[key].match(this.varRegex);
        varMatch!.forEach((match: string) => {
          let replacementVariable = this.getVariable(match.split("@")[1]);
          if (!replacementVariable) {
            replacementVariable = {
              dark: this.placeholderColor,
              light: this.placeholderColor,
              hc: this.placeholderColor,
            };
          }

          newGroup[key] = newGroup[key].replace(
            match,
            replacementVariable[key]
          );
        });
      }

      if (this.funcTypeRegex.test(newGroup[key])) {
        const funcTypeMatch = newGroup[key].match(this.funcTypeRegex);
        const funcType = funcTypeMatch!.groups!.func;
        if (funcType === Functions.IFTHENELSE) {
          const funcMatch = newGroup[key].match(this.funcRegex2);
          const ifMatch = funcMatch!.groups!.if;
          const thenMatch = funcMatch!.groups!.then;
          const elseMatch = funcMatch!.groups!.else;

          // If if hex color matches placeholder color, it is not defined.
          if (ifMatch !== this.placeholderColor) {
            newGroup[key] = thenMatch;
          } else {
            newGroup[key] = elseMatch;
          }
        } else {
          const funcMatch = newGroup[key].match(this.funcRegex);

          const int = parseFloat(funcMatch!.groups!.int);
          const color = funcMatch!.groups!.color;
          switch (funcType) {
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
      }
    });

    return newGroup;
  }

  cloneAll(storage: ThemeStorage): CompiledVariables | undefined {
    const { variables, type } = storage;
    const compiled: CompiledVariables & Indexable = this.compileAll(type);
    if (!Object.keys(variables).length) return undefined;

    Object.keys(variables).forEach((key: string) => {
      compiled[key] = variables[key];
    });

    return compiled;
  }

  clone(
    storage: ThemeStorage,
    tab: VariableTab
  ): CompiledVariables | undefined {
    const { variables, type } = storage;
    const compiled: CompiledVariables & Indexable = this.compile(type, tab);

    if (Object.keys(compiled).length < 1) return undefined;

    const tabVarKeys = Object.keys(this.getByTab(tab));
    const varKeys = Object.keys(variables);

    varKeys.forEach((key: string) => {
      if (tabVarKeys.includes(key)) {
        compiled[key] = variables[key];
      }
    });

    return compiled;
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

  getAction(key: Variables): TStudioAction | undefined {
    const variable = this.variables[key];

    if (!variable.category || !variable.action) return undefined;

    const actionPrefix = variable.category.split(" ").join("").toLowerCase();

    return `${actionPrefix}.${variable.action}`;
  }
}

const registry = new Registry();

registry.registerFile(baseVars);
registry.registerFile(editorVars);
registry.registerFile(activityBarVars);
registry.registerFile(titleBarVars);
registry.registerFile(statusBarVars);
registry.registerFile(menuBarVars);
registry.registerFile(gitVars);
registry.registerFile(sideBarVars);
registry.registerFile(tabsVars);
registry.registerFile(toolbarVars);
registry.registerFile(breadcrumbsVar);
registry.registerFile(treeVars);
registry.registerFile(listVars);
registry.registerFile(inputVars);
registry.registerFile(editorGroupVars);
registry.registerFile(buttonVars);

export default registry;
