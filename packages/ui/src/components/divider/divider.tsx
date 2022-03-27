import { tcx } from "@theme-studio/core";
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
  return <div role="separator" className={tcx(className)} {...props} />;
}
