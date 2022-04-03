import { clsx, DEV } from "@theme-studio/core";
import { forwardRef, InputHTMLAttributes } from "react";

interface IInputProps {}

export interface InputProps
  extends IInputProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, keyof IInputProps> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        className={clsx("", className)}
        {...props}
      />
    );
  }
);

if (DEV) {
  Input.displayName = "Input";
}
