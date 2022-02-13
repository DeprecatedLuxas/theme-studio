import { PropsWithChildren } from "react";

export interface DialogFooterProps {
  className?: string;
}

export default function DialogFooter({
  className = "",
  ...props
}: PropsWithChildren<DialogFooterProps>) {
  return (
    <footer
      {...props}
      className={`flex items-center justify-end px-6 py-4 ${className}`}
    />
  );
}
