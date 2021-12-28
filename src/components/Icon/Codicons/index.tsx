import VscChevronUp from "./VscChevronUp";
import VscChevronDown from "./VscChevronDown";
import VscChevronLeft from "./VscChevronLeft";
import VscChevronRight from "./VscChevronRight";
import { CodiconsIcons } from "@lib/types";

export default function Codicons(icon: CodiconsIcons) {
  switch (icon) {
    case "VscChevronDown":
      return VscChevronDown;
    case "VscChevronUp":
      return VscChevronUp;
    case "VscChevronLeft":
      return VscChevronLeft;
    case "VscChevronRight":
      return VscChevronRight;
    default:
      return null;
  }
}
