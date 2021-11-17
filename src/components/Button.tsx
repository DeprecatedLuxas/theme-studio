import { Children, HTMLAttributes, ReactNode } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export default function Button({ className, disabled, ...rest }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`disabled:cursor-not-allowed inline-block appearance-none cursor-pointer select-none relative whitespace-nowrap align-middle outline-none rounded-md font-semibold h-10 min-w-10 max-w-full px-4 mx-2 py-2 bg-blue-700 text-white ${className}`}
      {...rest}
    />
  );
}
