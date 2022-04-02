import { DEV } from "@theme-studio/core";
import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";

interface IHeadingProps {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface HeadingProps
  extends IHeadingProps,
    Omit<HTMLAttributes<HTMLHeadingElement>, keyof IHeadingProps> {}

export const Heading = forwardRef<
  HTMLHeadingElement,
  PropsWithChildren<HeadingProps>
>(({ type, children, ...props }, ref) => {
  const Component = type || "h1";
  return (
    <Component ref={ref} {...props}>
      {children}
    </Component>
  );
});

if (DEV) {
  Heading.displayName = "Heading";
}
