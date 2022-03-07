import { CompiledVariables, OnAction, OnHover } from "@lib/types";
import { CSSProperties, MutableRefObject } from "react";

export interface UseVSCEvent {
  ref: MutableRefObject<HTMLOrSVGElement | undefined>;
  onHover: OnHover;
  variables?: CompiledVariables;
}


export default function useVSCEvent({
  ref,
  onHover,
  variables,
}: UseVSCEvent) {
  const eventHandlers: any = {};

  onHover.forEach((hover) => {
    let oldStyle: CSSProperties = {};
    eventHandlers["onMouseEnter"] = (e: any) => {

      oldStyle =
        // @ts-ignore
        ref.current!.style["color"];
      //@ts-ignore
      ref.current.style["color"] = variables![hover];
    };
    eventHandlers["onMouseLeave"] = (e: any) => {

      // @ts-ignore
      ref.current!.style["color"] = oldStyle;
    };
  });

  return eventHandlers;
}
