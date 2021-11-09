import useIsoMorphicLayoutEffect from "@hooks/useIsoMorphicLayoutEffect";
import useTooltip from "@hooks/useTooltip";
import { ReactNode, ReactElement, useRef } from "react";
import ReactDOM from "react-dom";
import Portal from "./Portal";
type TooltipProps = {
  label?: string;
  children?: ReactNode;
};

export default function Tooltip({ label, children }: TooltipProps) {
  const tooltip = useTooltip();

  return (
    <>
      <span {...tooltip.getTriggerProps()}>{children}</span>
      <Portal>
        {label}
      </Portal>
    </>
  );
}
