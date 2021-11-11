import windy from "@helpers/windy";
import useTooltip from "@hooks/useTooltip";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import Portal from "./Portal";

interface TooltipProps {
  hasArrow?: boolean;
  label: ReactNode;
  children?: ReactNode;
}

export default function Tooltip({ hasArrow, children, label }: TooltipProps) {
  const tooltip = useTooltip();

  return (
    <>
      <span {...tooltip.getTriggerProps()}>{children}</span>
      {tooltip.isOpen && (
        <Portal>
          <div {...tooltip.getTooltipPositionerProps()}>
            <div {...tooltip.getTooltipProps({})}>
              {label}

              {hasArrow && (
                <div
                  data-popper-arrow
                  className="chakra-tooltip__arrow-wrapper"
                >
                  <div
                    data-popper-arrow-inner
                    className="chakra-tooltip__arrow"
                    style={{
                      backgroundColor: "green",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
