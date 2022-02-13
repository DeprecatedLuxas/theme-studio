import { HTMLAttributes, useMemo } from "react";
import { TBackgroundColor, TMargin } from "tailwindcss-classnames";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  placement?: "left" | "right" | "center" | "start" | "end";
  bg?: TBackgroundColor;
  space?: TMargin;
  color?: TBackgroundColor;
}

export default function Divider({
  placement = "center",
  space = "my-2",
  bg = "bg-white",
  color = "bg-gray-400",
  children,
  ...rest
}: DividerProps) {
  const placementClass = useMemo(() => {
    switch (placement) {
      case "start":
      case "left":
        return "divider-start";
      case "end":
      case "right":
        return "divider-end";
      default:
        return "";
    }
  }, [placement]);

  return (
    <div
      role="separator"
      className={`relative w-auto h-0.5 ${color} ${space}`}
      {...rest}
    >
      {children && (
        <span
          className={`absolute left-2/4 top-2/4 inline-flex justify-center items-center z-10 transform-50 px-12 ${color} ${placementClass} ${bg}`}
        >
          {children}
        </span>
      )}
    </div>
  );
}
