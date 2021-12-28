import FaCode from "./FaCode";
import FaPalette from "./FaPalette";
import FaKeyboard from "./FaKeyboard";
import { FontAwesomeIcons } from "@lib/types";

export default function FontAwesome(icon: FontAwesomeIcons) {
  switch (icon) {
    case "FaCode":
      return FaCode;
    case "FaKeyboard":
      return FaKeyboard;
    case "FaPalette":
      return FaPalette;
    default:
      return null;
  }
}
