import {
  CompiledVariables,
  OnAction,
  VariableLocations,
  Variables,
} from "@lib/types";
import { actionState } from "@recoil/atoms/action";
import {
  CSSProperties,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilValue } from "recoil";

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
  const action = useRecoilValue(actionState);

  const [binds, setBinds] = useState<Array<Variables>>(bind);

  useEffect(() => {
    const actionKeys = Object.keys(onAction);
    // Wont run if onAction is empty.
    if (!actionKeys.length) return;

    if (action === "") {
      setBinds(bind);
      return;
    }

    if (actionKeys.includes(action)) {
      setBinds(onAction[action] as Variables[]);
    }
  }, [action, bind, onAction]);

  if (!binds) return {};

  let styleObj: CSSProperties = {};
  const events: {
    onMouseEnter?: (event: React.MouseEvent<HTMLOrSVGElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLOrSVGElement>) => void;
  } = {};


  binds.forEach((binding: Variables) => {
    console.log("binding", binding);

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
