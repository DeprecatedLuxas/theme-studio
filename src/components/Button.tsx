import { HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export default function Button({ className = "", disabled, ...rest }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${className} disabled:cursor-not-allowed inline-block appearance-none cursor-pointer select-none relative whitespace-nowrap align-middle outline-none rounded font-semibold h-10 min-w-10 max-w-full px-4 py-2 bg-blue-700 text-white `}
      {...rest}
    />
  );
}
