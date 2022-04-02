import { clsx, DEV } from "@theme-studio/core";
import { forwardRef, HTMLAttributes } from "react";

interface IBadgeProps {}

export interface BadgeProps
  extends IBadgeProps,
    Omit<HTMLAttributes<HTMLSpanElement>, keyof IBadgeProps> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        {...props}
        className={clsx(
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