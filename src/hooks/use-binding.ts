import {
  Arrayable,
  CompiledVariables,
  OnAction,
  VariableLocations,
  Variables,
} from "@lib/types";
import { actionState } from "@recoil/atoms/action";
import { CSSProperties, MutableRefObject, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

const Places: Map<VariableLocations, string> = new Map([
  ["bg", "backgroundColor"],
  ["c", "color"],
  ["bc", "borderColor"],
  ["blc", "borderLeftColor"],
  ["brc", "borderRightColor"],
  ["btc", "borderTopColor"],
  ["bbc", "borderBottomColor"],
]);

export interface UseBindingOptions {
  ref: MutableRefObject<HTMLOrSVGElement | undefined>;
  bind: Array<Variables>;
  onAction: OnAction;
  variables?: CompiledVariables;
}

export default function useBinding({
  ref,
  bind,
  variables,
  onAction = {},
}: UseBindingOptions) {
  const extraBindingsRef = useRef<Variables[]>([]);
  const [action, setAction] = useRecoilState(actionState);

  const binds = useRef<Array<Variables>>(bind);

  useEffect(() => {
    // Wont run if onAction is empty.
    if (!Object.keys(onAction).length) return;

    if (action === "") {
      console.log("bind", bind);
      
      binds.current = bind;
  
    }

    const actionKeys = Object.keys(onAction);
    if (action && actionKeys.includes(action)) {
      console.log("action, onAction",action, onAction[action]);


      /*       console.log(...onAction[action] as Variables[]); */

      //binds.current.push(...(onAction[action] as Variables[]));
      binds.current = onAction[action] as Variables[];
    }
  }, [action, bind, onAction]);

  if (!bind) return {};

  let styleObj: CSSProperties = {};
  const events: {
    onMouseEnter?: (event: React.MouseEvent<HTMLOrSVGElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLOrSVGElement>) => void;
  } = {};

  const bindings = binds.current;
  //console.log(bindings);

  bindings.forEach((binding: Variables) => {
    const [, hover, location] = binding.match(
      /^(?<hover>h:)?(?<location>.+)@(.+)$/
    )!;

    const styling = Places.get(
      location as "bg" | "c" | "bc" | "blc" | "brc" | "btc" | "bbc"
    );

    if (!styling) return {};

    if (hover) {
      let oldStyle: CSSProperties = {};
      // This is just a fix for now, but probably not the best solution.
      let oldMouseEnter: any;
      let oldMouseLeave: any;

      if (events.onMouseEnter) oldMouseEnter = events.onMouseEnter;
      if (events.onMouseLeave) oldMouseLeave = events.onMouseLeave;

      events.onMouseEnter = () => {
        oldMouseEnter && oldMouseEnter();

        oldStyle =
          // @ts-ignore
          ref!.current!.style[styling];

        // We need to to @ts-ignore on the style, else it will give an error
        // @ts-ignore
        ref!.current!.style[styling] = variables![binding.split(":")[1]];
      };
      events.onMouseLeave = () => {
        oldMouseLeave && oldMouseLeave();
        // @ts-ignore
        ref!.current!.style[styling] = oldStyle;
      };
    } else {
      styleObj = {
        ...styleObj,
        [styling]: variables![binding],
      };
    }
  });

  return {
    style: styleObj,
    ref,
    ...events,
  };
}
