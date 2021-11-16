import { DialogContext } from "@contexts/DialogContext";
import { HTMLAttributes, useCallback, useContext, useRef } from "react";
import Portal from "./Portal";

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onClose?: () => void;
}

const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  return (
    <DialogContext.Provider
      value={{
        onClose,
        isOpen,
      }}
    >
      {isOpen && <Portal>{children}</Portal>}
    </DialogContext.Provider>
  );
};

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

const Header = (props: HeaderProps) => (
  <header className="flex-initial px-6 py-4" {...props} />
);

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Body = (props: BodyProps) => <div {...props} />;

const Overlay = () => <div className="fixed top-0 left-0 w-screen h-screen" />;

interface ContentProps extends HTMLAttributes<HTMLDivElement> {}

const Content = ({ children }: ContentProps) => {
  const { onClose } = useContext(DialogContext);

  const onOverlayClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();

      onClose?.();
    },
    [onClose]
  );

  const mouseDownTarget = useRef<EventTarget | null>(null);
  const onMouseDown = useCallback((event: MouseEvent) => {
    console.log("leol");

    mouseDownTarget.current = event.target;
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      console.log(event.key);

      if (event.key === "Escape") {
        event.stopPropagation();

        onClose?.();
      }
    },
    [onClose]
  );
  // const containerProps = {
  //   onClick: onOverlayClick,
  //   onKeyDown: onKeyDown,
  //   onMouseDown: onMouseDown,
  // };
  return (
    <div
      // {...containerProps}
      className="flex w-screen h-screen fixed top-0 left-0 justify-center items-start overflow-auto"
    >
      <section
        className="flex flex-col relative w-full max-w-48 bg-gray-400 mt-12 rounded-lg"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </section>
    </div>
  );
};

interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

const Footer = (props: FooterProps) => (
  <div {...props} className="flex items-center" />
);

Dialog.Overlay = Overlay;
Dialog.Body = Body;
Dialog.Header = Header;
Dialog.Content = Content;
Dialog.Footer = Footer;

export default Dialog;
