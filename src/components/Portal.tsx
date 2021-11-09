import useIsoMorphicLayoutEffect from "@hooks/useIsoMorphicLayoutEffect";
import { ReactNode, useRef } from "react";
import ReactDOM from "react-dom";

type PortalProps = {
  children?: ReactNode;
};

export default function Portal({ children }: PortalProps) {
  const tempNode = useRef<HTMLDivElement | null>(null);
  const portal = useRef<HTMLDivElement | null>(null);

  useIsoMorphicLayoutEffect(() => {
    if (!tempNode.current) return;

    const doc = tempNode.current!.ownerDocument;
    const host = doc.body;

    if (!host) return;
    console.log("HELLO");
    
    portal.current = doc.createElement("div");
    portal.current.className = "portal";

    host.appendChild(portal.current);

    const portalNode = portal.current;
    return () => {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode);
      }
    };
  }, []);
  const Porta = ReactDOM.createPortal(children, document.body);
  return Porta;
}
