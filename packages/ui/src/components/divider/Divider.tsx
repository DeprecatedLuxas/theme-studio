import { clsx, TBackgroundColor, TMargin } from "@theme-studio/core";
import { HTMLAttributes, PropsWithChildren } from "react";

interface IDividerProps {
  space?: TMargin;
  color?: TBackgroundColor;
  darkColor?: TBackgroundColor;
}

export interface DividerProps
  extends IDividerProps,
    Omit<HTMLAttributes<HTMLDivElement>, keyof IDividerProps> {}

export function Divider({
  className,
  space = "my-2",
  color = "bg-gray-400",
  darkColor,
  ...props
}: PropsWithChildren<DividerProps>) {
  return (
    <div
      role="separator"
      className={clsx(className, "w-auto h-0.5", color, space, {
        [`dark:${darkColor}`]: darkColor,
      })}
      {...props}
    />
  );
}
