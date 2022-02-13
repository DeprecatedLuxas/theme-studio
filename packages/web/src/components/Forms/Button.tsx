import cx from "clsx";
import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";
import {
  TBackgroundColor,
  TTextColor,
  ComponentPropPlacement,
} from "@lib/types";
import Spinner from "@components/Spinner";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  type?: "submit" | "reset" | "button";
  bg?: TBackgroundColor;
  color?: TTextColor;
  icon?: ReactElement;
  iconPlacement?: Omit<ComponentPropPlacement, "top" | "bottom">;
}

export default function Button({
  disabled = false,
  type,
  className,
  bg = "bg-blue-700",
  color = "text-white",
  loading,
  loadingLabel = "Loading...",
  icon,
  iconPlacement,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>): JSX.Element {
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
      {icon && iconPlacement === "left" && !loading && icon}

      {loading && (
        <Spinner size="button" color="border-blue-400" className="mr-2" />
      )}

      {loading ? loadingLabel : children}
      {icon && iconPlacement === "right" && !loading && icon}
    </button>
  );
}
