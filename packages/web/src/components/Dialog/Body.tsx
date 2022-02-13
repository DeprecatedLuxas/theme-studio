import { PropsWithChildren } from "react";

export interface DialogBodyProps {
  className?: string;
}

export default function DialogBody({
  className = "",
  ...props
}: PropsWithChildren<DialogBodyProps>) {
  return <div {...props} className={`px-6 py-2 flex-initial ${className}`} />;
}
