import cx from "clsx";
import { HTMLAttributes } from "react";
import {
  TBackgroundColor,
  TBorderColor,
  TTextColor,
} from "tailwindcss-classnames";

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  color?: TTextColor;
  bg?: TBackgroundColor;
  border?: TBorderColor;
}

export default function Input({
  readOnly,
  disabled,
  required,
  type = "text",
  color,
  bg,
  border,
  className,
  ...rest
}: InputProps) {
  return (
    <input
      {...rest}
      readOnly={readOnly}
      aria-readonly={readOnly}
      disabled={disabled}
      aria-disabled={disabled}
      type={type}
      required={required}
      className={cx(
        "disabled:cursor-not-allowed disabled:opacity-60 inline-flex w-full min-w-0 appearance-none items-center rounded border py-3 px-2 h-9",
        color,
        bg,
        border,
        className
      )}
    />
  );
}
