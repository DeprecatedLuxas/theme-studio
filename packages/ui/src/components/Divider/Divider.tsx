import { clsx, DEV, TBackgroundColor, TMargin } from "@theme-studio/core";
import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";

interface IDividerProps {
  space?: TMargin;
  color?: TBackgroundColor;
  darkColor?: TBackgroundColor;
}

export interface DividerProps
  extends IDividerProps,
    Omit<HTMLAttributes<HTMLDivElement>, keyof IDividerProps> {}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    { className, space = "my-2", color = "bg-gray-400", darkColor, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={clsx(className, "w-auto h-0.5", color, space, {
          [`dark:${darkColor}`]: darkColor,
        })}
        {...props}
      />
    );
  }
);

if (DEV) {
  Divider.displayName = "Divider";
}
