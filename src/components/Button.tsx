import { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export default function Button({ className, disabled, ...rest }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`disabled:cursor-not-allowed inline-flex appearance-none items-center justify-center select-none relative whitespace-nowrap align-middle outline-none rounded-md font-semibold h-10 min-w-10 px-4 bg-blue-700 text-white ${className}`}
      {...rest}
    />
  );
}
