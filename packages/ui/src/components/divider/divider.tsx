import { clsx } from "@theme-studio/core";
import { HTMLAttributes, PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export type DividerProps = Props &
  Omit<HTMLAttributes<HTMLDivElement>, keyof Props>;

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
