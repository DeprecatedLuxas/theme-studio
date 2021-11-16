import { ReactNode } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: ReactNode;
};

export default function Portal({ children }: PortalProps) {
  return createPortal(<div>{children}</div>, document.body);
}
