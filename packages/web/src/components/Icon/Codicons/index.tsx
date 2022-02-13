import VscChevronUp from "./VscChevronUp";
import VscChevronDown from "./VscChevronDown";
import VscChevronLeft from "./VscChevronLeft";
import VscChevronRight from "./VscChevronRight";
import VscEllipsis from "./VscEllipsis";
import VscAccount from "./VscAccount";
import VscClose from "./VscClose";
import VscDebugAlt from "./VscDebugAlt";
import VscError from "./VscError";
import VscExtensions from "./VscExtensions";
import VscFeedback from "./VscFeedback";
import VscFiles from "./VscFiles";
import VscGear from "./VscGear";
import VscGitCompare from "./VscGitCompare";
import VscOpenPreview from "./VscOpenPreview";
import VscRemote from "./VscRemote";
import VscSearch from "./VscSearch";
import VscSourceControl from "./VscSourceControl";
import VscSplitHorizontal from "./VscSplitHorizontal";
import VscWarning from "./VscWarning";
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
    case "VscEllipsis":
      return VscEllipsis;
    case "VscAccount":
      return VscAccount;
    case "VscClose":
      return VscClose;
    case "VscDebugAlt":
      return VscDebugAlt;
    case "VscError":
      return VscError;
    case "VscExtensions":
      return VscExtensions;
    case "VscFeedback":
      return VscFeedback;
    case "VscFiles":
      return VscFiles;
    case "VscGear":
      return VscGear;
    case "VscGitCompare":
      return VscGitCompare;
    case "VscOpenPreview":
      return VscOpenPreview;
    case "VscRemote":
      return VscRemote;
    case "VscSearch":
      return VscSearch;
    case "VscSourceControl":
      return VscSourceControl;
    case "VscSplitHorizontal":
      return VscSplitHorizontal;
    case "VscWarning":
      return VscWarning;
    default:
      return null;
  }
}
