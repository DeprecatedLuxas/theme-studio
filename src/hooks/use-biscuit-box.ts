import { useCallback, useState } from "react";
import { useCallbackRef } from "./use-callback-ref";

type UseBiscuitBoxProps = {
  onOpen?(): void;
  onClose?(): void;
  isOpen?: boolean;
};

export function useBiscuitBox({
  onOpen: onOpenProp,
  onClose: onCloseProp,
  isOpen: isOpenProp = false,
}: UseBiscuitBoxProps = {}) {
  const onOpenPropCallbackRef = useCallbackRef(onOpenProp);
  const onClosePropCallbackRef = useCallbackRef(onCloseProp);
  const [isOpen, setIsOpen] = useState(isOpenProp);

  const onClose = useCallback(() => {
    setIsOpen(false);
    onClosePropCallbackRef?.();
  }, [onClosePropCallbackRef]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
    onOpenPropCallbackRef?.();
  }, [onOpenPropCallbackRef]);

  const onToggle = useCallback(() => {
    const action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen: !!isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}
