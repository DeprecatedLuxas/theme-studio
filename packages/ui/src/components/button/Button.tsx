import { clsx, TBackgroundColor, TTextColor } from "@theme-studio/core";
import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import { Spinner } from "../spinner";

interface IButtonProps {
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  type?: "submit" | "reset" | "button";
  bg?: TBackgroundColor;
  color?: TTextColor;
}

export interface ButtonProps
  extends IButtonProps,
    Omit<HTMLAttributes<HTMLButtonElement>, keyof IButtonProps> {}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      className,
      disabled: _disabled,
      bg = "bg-blue-700",
      color = "text-white",
      loading,
      loadingLabel = "Loading...",
      type,
      children,
      ...props
    },
    ref
  ) => {
    const disabled = loading || _disabled;
    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        type={type}
        className={clsx(
          "appearance-none select-none justify-center inline-flex rounded m-0 items-center h-9 min-w-9 px-4 disabled:cursor-not-allowed disabled:opacity-60",
          bg,
          color,
          className
        )}
        {...props}
      >
        {loading && (
          <Spinner
            className={clsx(
              loadingLabel ? "relative" : "absolute",
              loadingLabel ? "mr-2" : "mr-0"
            )}
            size="sm"
          />
        )}
        {loading
          ? loadingLabel || <span className="opacity-0">{children}</span>
          : children}
      </button>
    );
  }
);
