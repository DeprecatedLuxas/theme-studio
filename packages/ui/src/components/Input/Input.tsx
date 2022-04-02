import { clsx } from "@theme-studio/core";
import { forwardRef, HTMLAttributes, InputHTMLAttributes } from "react";
import { classNames } from "react-select/dist/declarations/src/utils";

interface IInputProps {
  disabled?: InputHTMLAttributes<HTMLInputElement>["disabled"];
  readOnly?: InputHTMLAttributes<HTMLInputElement>["readOnly"];
  type?: string;
}

export interface InputProps
  extends IInputProps,
    Omit<HTMLAttributes<HTMLInputElement>, keyof IInputProps> {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    readOnly,
    disabled,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    type = "text",
    ...rest
  } = props;
  return (
    <input
      ref={ref}
      readOnly={readOnly}
      aria-readonly={readOnly}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      type={type}
      className={clsx("", className)}
      {...rest}
    />
  );
});
