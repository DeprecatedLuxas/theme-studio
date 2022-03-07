import usePortal from "@hooks/use-portal";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Dialog({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<DialogProps>) {
  const portal = usePortal({
    id: "dialog",
  });

  if (!portal) return null;

  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="fixed left-0 top-0 w-screen h-screen z-50 bg-dialog-overlay" />
          <div className="flex w-screen h-screen fixed left-0 top-0 items-start justify-center z-50">
            <section className="flex flex-col w-full relative rounded-md bg-gray-700 mt-16 shadow-lg max-w-md">
              {children}
            </section>
          </div>
        </>
      )}
    </>,
    portal
  );
}
