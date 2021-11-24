import { CompiledVariables } from "@lib/types";
import { CSSProperties, MutableRefObject } from "react";

// TODO: Add types for this.
export default function useVSCEvent(
  ref: MutableRefObject<HTMLOrSVGElement | undefined>,
  variables?: CompiledVariables,
  eventList?: any
) {
  if (!eventList) return {};
  const events: any[] = Array.isArray(eventList) ? eventList : [eventList];
  const eventHandlers: any = {};
  events.forEach((event) => {
    console.log(event);
    // TODO: Rewrite this, it's ugly and a proof of concept.
    if (event.includes("onHover")) {
      let oldStyle: CSSProperties = {};
      eventHandlers["onMouseEnter"] = (e: any) => {
        oldStyle =
          // @ts-ignore
          ref.current!.style["color"];
        //@ts-ignore
        ref.current.style["color"] = variables![event.split(":")[1]];
      };
      eventHandlers["onMouseLeave"] = (e: any) => {
        // @ts-ignore
        ref.current!.style["color"] = oldStyle;
      };
    }
  });

  return eventHandlers;
}
