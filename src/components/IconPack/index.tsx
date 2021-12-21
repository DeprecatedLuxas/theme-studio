import VSCodeIconPack from "./VSCode";
import MaterialIconPack from "./Material";

import { IconTypes } from "@lib/types";

export interface IconPackProps {
  type: IconTypes;
  open?: boolean;
}

export default function IconPack({ type, open = false }: IconPackProps) {
  return <MaterialIconPack type={type} open={open} />
}
