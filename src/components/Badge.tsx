import { PropsWithChildren } from "react";
import { TBackgroundColor, TTextColor } from "tailwindcss-classnames";

export interface BadgeProps {
  textColor?: TTextColor;
  bgColor?: TBackgroundColor;
  className?: string
}

export default function Badge({
  bgColor = "bg-blue-700",
  textColor = "text-gray-200",
  className = "",
  ...props
}: PropsWithChildren<BadgeProps>) {
  return (
    <span
      {...props}
      className={`inline-block rounded align-middle border-0 ${bgColor} ${textColor} leading-none py-1 px-2 font-roboto ${className}`}
    />
  );
}


