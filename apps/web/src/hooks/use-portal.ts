import { createDOMElement } from "@helpers/dom";
import { useEffect, useState } from "react";
import useSSR from "./use-ssr";

export interface UsePortalOptions {
  id?: string;
}

function getPortalId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default function usePortal(options: UsePortalOptions) {
  const { id = getPortalId() } = options;
  const { isSSR } = useSSR();
  const portalId: string = `tstudio-${id}`;

  const [portalEl, setPortalEl] = useState<HTMLDivElement | null>(
    isSSR ? null : createDOMElement<"div">(portalId, "div")
  );

  useEffect(() => {
    let hasElement: HTMLDivElement = <HTMLDivElement>(
      document.body.querySelector(`#${portalId}`)
    );

    const element: HTMLDivElement =
      hasElement || createDOMElement<"div">(portalId, "div");
    if (!hasElement) {
      document.body.appendChild(element);
    }

    setPortalEl(element);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return portalEl;
}
