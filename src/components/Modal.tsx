import { useBiscuitBox } from "@hooks/useBiscuitBox";
import { useEvent } from "@hooks/useEvent";
import { cloneElement, ReactNode, useRef } from "react";
import Portal from "./Portal";

interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEvent(
    "mousedown",
    (e) => {
      // if (modalRef.current?.contains(e.target as HTMLElement)) return;
      // onClose();
    },
    window
  );

  useEvent(
    "keydown",
    (e) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      onClose();
    },
    window
  );

  return (
    <Portal>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="min-h-screen px-4 text-center">
          <div className="fixed inset-0" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div ref={modalRef}>{children}</div>
        </div>
      </div>
    </Portal>
  );
}
