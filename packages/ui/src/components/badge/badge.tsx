import { clsx } from "@theme-studio/core";
import { forwardRef, HTMLAttributes } from "react";

export type BadgeProps = HTMLAttributes<HTMLDivElement>;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        {...rest}
        className={clsx(
          "inline-block text-center leading-4 rounded py-1 px-2 text-gray-200 bg-blue-700 font-roboto",
          className
        )}
      />
    );
  }
);
