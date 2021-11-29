import usePortal from "@hooks/use-portal";
import useTooltip from "@hooks/use-tooltip";
import {
  Children,
  cloneElement,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  Ref,
  useRef,
} from "react";
import { createPortal } from "react-dom";

export interface TooltipProps {
  label?: ReactNode;
  hasArrow?: boolean;
}

export default function Tooltip({
  label,
  hasArrow = true,
  children,
}: PropsWithChildren<TooltipProps>) {
  const tooltip = useTooltip();
  const portal = usePortal({
    id: "tooltip",
  });

  const trigger: ReactElement = (
    <span tabIndex={0} {...tooltip.getTriggerProps()}>
      {children}
    </span>
  );

  const tooltipProps = tooltip.getTooltipProps({});

  if (!label) {
    return <>{children}</>;
  }

  if (!portal) return null;

  return (
    <>
      {trigger}
      {tooltip.isOpen &&
        createPortal(
          <div {...tooltip.getTooltipPositionerProps()}>
            <div {...(tooltipProps as any)}>
              {label}
              {hasArrow && (
                <div
                  data-popper-arrow
                  className="chakra-tooltip__arrow-wrapper"
                >
                  <div
                    data-popper-arrow-inner
                    className="chakra-tooltip__arrow"
                    /*       __css={{ bg: styles.bg }} */
                  />
                </div>
              )}
            </div>
          </div>,
          portal
        )}
    </>
  );
}
