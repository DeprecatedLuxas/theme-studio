import { DEV, tcx } from "@theme-studio/core";
import { forwardRef, HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The classNames to apply to the badge.
   */
  className?: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        {...rest}
        className={tcx(
          "inline-block text-center leading-4 rounded py-1 px-2 text-gray-200 bg-blue-700 font-roboto",
          className
        )}
      />
    );
  }
);

if (DEV) {
  Badge.displayName = "Badge";
}
