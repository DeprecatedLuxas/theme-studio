import { clsx, DEV } from "@theme-studio/core";
import { forwardRef, HTMLAttributes } from "react";

interface ISpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export interface SpinnerProps
  extends ISpinnerProps,
    Omit<HTMLAttributes<SVGSVGElement>, keyof ISpinnerProps> {}

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ size = "md", className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        className={clsx(
          "animate-spin",
          {
            "w-3 h-3": size === "xs",
            "w-4 h-4": size === "sm",
            "w-6 h-6": size === "md",
            "w-8 h-8": size === "lg",
            "w-12 h-12": size === "xl",
          },
          className
        )}
        fill="none"
        viewBox="0 0 66 66"
        {...props}
      >
        <circle
          cx="33"
          cy="33"
          fill="none"
          r="28"
          stroke="currentColor"
          strokeWidth="10"
          className="opacity-30"
        />
        <circle
          cx="33"
          cy="33"
          fill="none"
          r="28"
          stroke="currentColor"
          strokeDasharray="40, 134"
          strokeDashoffset="325"
          strokeLinecap="round"
          strokeWidth="10"
          className="opacity-70"
        />
      </svg>
    );
  }
);

if (DEV) {
  Spinner.displayName = "Spinner";
}