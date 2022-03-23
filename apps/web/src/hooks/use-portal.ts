import { useEffect, useState } from "react";
import { useSSR } from "@theme-studio/ui"

export interface UsePortalOptions {
  id?: string;
}

function createDOMElement<K extends keyof HTMLElementTagNameMap>(
  id: string,
  ele: K
): HTMLElementTagNameMap[K] {
  const element = document.createElement(ele);
  element.setAttribute("id", id);
  return element;
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
