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

  static handleBinding(
    variables: CompiledVariables,
    bind: Arrayable<Variables>
  ) {
    if (bind !== "") {
      // const events: {
      //   onMouseEnter?: (event: React.MouseEvent<HTMLOrSVGElement>) => void;
      //   onMouseLeave?: (event: React.MouseEvent<HTMLOrSVGElement>) => void;
      // } = {};
      let styleObject: CSSProperties = {};
      // let ref: RefObject<HTMLOrSVGElement>;
      const bindings = Array.isArray(bind) ? bind : [bind];
      bindings.forEach((binding: Variables) => {
        const [, hover, location] = binding.match(
          /^(?<hover>h:)?(?<location>.+)@(.+)$/
        )!;

        if (hover) {
          // console.log(hover);

          // ref = useRef<HTMLOrSVGElement>(null);
          // let oldStyle: CSSProperties = {};
          // events.onMouseEnter = () => {
          //   oldStyle =
          //     // @ts-ignore
          //     ref.current!.style[
          //       this.Places.get(location as "bg" | "text" | "border")
          //     ];

          //   // We need to to @ts-ignore on the style, else it will give an error
          //   // @ts-ignore
          //   ref.current!.style[
          //     this.Places.get(location as "bg" | "text" | "border")
          //   ] = variables[binding];
          // };
          // events.onMouseLeave = () => {
          //   // @ts-ignore
          //   ref.current!.style[
          //     this.Places.get(location as "bg" | "text" | "border")
          //   ] = oldStyle;
          // };
        } else {
          const styling = this.Places.get(location as "bg" | "text" | "border");
          if (!styling) return {};
          styleObject = {
            ...styleObject,
            [styling]: variables[binding],
          };
        }
      });
      return {
        style: styleObject,
        // ref,
        // ...events,
      };
    } else {
      return {};
    }
  }
}
