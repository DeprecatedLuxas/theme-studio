import VSCodeIconPack from "./VSCode";
import MaterialIconPack from "./Material";
import SetiIconPack from "./Seti";

import { IconPack as IconPackType, IconTypes } from "@lib/types";

export interface IconPackProps {
  from: IconPackType;
  type: IconTypes;
  open?: boolean;
}

export default function IconPack({ from, type, open = false }: IconPackProps) {
  switch (from) {
    case "VSCode Icons":
      return <VSCodeIconPack type={type} open={open} />;
    case "Material Icons":
      return <MaterialIconPack type={type} open={open} />;
    case "Seti Icons":
    default:
      return <SetiIconPack type={type} open={open} />;
  }
}
