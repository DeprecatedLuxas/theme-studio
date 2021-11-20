import { PropsWithChildren } from "react";

export interface DialogHeaderProps {
  className?: string;
}

export default function DialogHeader({
  className = "",
  ...props
}: PropsWithChildren<DialogHeaderProps>) {
  return (
    <header
      {...props}
      className={`flex-initial py-4 px-6 text-xl text-white font-semibold ${className}`}
    />
  );
}
