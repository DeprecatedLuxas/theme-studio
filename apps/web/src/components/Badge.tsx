import cx from "clsx";
import { HTMLAttributes, PropsWithChildren } from "react";
import { TBackgroundColor, TTextColor } from "tailwindcss-classnames";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: TTextColor;
  bg?: TBackgroundColor;
}

export default function Badge({
  bg = "bg-blue-700",
  color = "text-gray-200",
  className,
  ...props
}: PropsWithChildren<BadgeProps>) {
  return (
    <span
      {...props}
      className={cx(
        "inline-block text-center leading-4 rounded py-1 px-2 font-roboto",
        className,
        bg,
        color
      )}
    />
  );
}
