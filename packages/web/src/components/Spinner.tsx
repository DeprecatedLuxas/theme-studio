import { TBorderColor } from "@lib/types";
import clsx from "clsx";

export interface SpinnerProps {
  size?: "button" | "page";
  color?: TBorderColor;
  className?: string;
}

export default function Spinner({
  size = "page",
  color = "border-blue-700",
  className = "",
}) {
  return (
    <div
      aria-label="Loading..."
      className={clsx(
        className,
        size === "page" && "w-16 h-16",
        size === "button" && "w-6 h-6",
        color,
        "inline-block bg-transparent border-2 rounded-full border-b-transparent animate-loader"
      )}
    />
  );
}
