import { createContext } from "react";

interface IDialog {
  isOpen?: boolean;
  onClose?: () => void;
}

export const DialogContext = createContext<IDialog>({});
