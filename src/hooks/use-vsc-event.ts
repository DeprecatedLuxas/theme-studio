import {
  CompiledVariables,
  OnAction,
  OnHover,
  TStudioActions,
} from "@lib/types";
import { actionState } from "@recoil/atoms/action";
import {
  CSSProperties,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useRecoilState } from "recoil";

export interface UseVSCEvent {
  ref: MutableRefObject<HTMLOrSVGElement | undefined>;
  onHover: OnHover;
  onAction: OnAction;
  variables?: CompiledVariables;
}

export default function useVSCEvent({
  ref,
  onAction,
  onHover,
  variables,
}: UseVSCEvent) {
  const [action, setAction] = useRecoilState(actionState);
/*   const currentAction = useRef<TStudioActions>(action);
  const handleAction = useCallback(() => {

  }, [action]);
     const actions: Array<OnAction> = Array.isArray(onAction)
    ? onAction
    : [onAction]; 
 */


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
