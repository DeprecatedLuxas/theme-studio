import cx from "clsx";
import { HTMLAttributes, PropsWithChildren } from "react";
import { TBackgroundColor, TTextColor } from "tailwindcss-classnames";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  bg?: TBackgroundColor;
  color?: TTextColor;
}

export default function Button({
  disabled = false,
  type,
  className,
  bg = "bg-blue-700",
  color = "text-white",
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      type={type}
      {...rest}
      className={cx(
        "appearance-none select-none justify-center inline-flex rounded m-0 items-center h-9 min-w-9 px-4 disabled:cursor-not-allowed disabled:opacity-60",
        bg,
        color,
        className
      )}
    >
      {children}
    </button>
  );
}
