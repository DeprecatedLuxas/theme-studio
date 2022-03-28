import { clsx } from "@theme-studio/core";
import { HTMLAttributes, PropsWithChildren } from "react";

interface IDividerProps {}

export interface DividerProps
  extends IDividerProps,
    Omit<HTMLAttributes<HTMLDivElement>, keyof IDividerProps> {}

export function Divider({
  className,
  ...props
}: PropsWithChildren<DividerProps>) {
  return (
    <div
      role="separator"
      className={clsx(className, "w-auto bg-gray-700 h-0.5")}
      {...props}
    />
  );
}
