import { HTMLAttributes } from "react";

export default function Button({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex appearance-none items-center justify-center select-none relative whitespace-nowrap align-middle outline-none rounded-md font-semibold h-10 min-w-10 px-4 bg-blue-700 text-white ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
