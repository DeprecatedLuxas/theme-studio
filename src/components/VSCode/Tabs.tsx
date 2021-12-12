import {
  VscEllipsis,
  VscGitCompare,
  VscSplitHorizontal,
} from "react-icons/vsc";

import Element from "./Element";
import { TypeScriptIcon, TypeScriptReactIcon } from "./icons";

export default function Tabs() {
  return (
    <Element
      className="w-full h-8.75 flex justify-between"
      bind={["bg@editorGroupHeader.tabsBackground", "c@foreground"]}
    >
      <Element className="flex justify-start">
        <Element
          className="flex justify-start items-center h-8.75 min-w-120px px-10px text-13px cursor-pointer relative"
          bind={["bg@tab.activeBackground"]}
        >
          <span
            className="h-8.75"
            style={{
              width: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TypeScriptReactIcon />
          </span>
          <span>index.tsx</span>
        </Element>
        <Element
          className="flex justify-start items-center h-8.75 min-w-120px px-10px text-13px cursor-pointer relative"
          bind={["bg@tab.inactiveBackground"]}
        >
          <span
            className="h-8.75"
            style={{
              width: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TypeScriptReactIcon />
          </span>
          <span>Header.tsx</span>
        </Element>
        <Element
          className="flex justify-start items-center h-8.75 min-w-120px px-10px text-13px cursor-pointer relative"
          bind={["bg@tab.inactiveBackground"]}
        >
          <span
            className="h-8.75"
            style={{
              width: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TypeScriptIcon />
          </span>
          <span>[id].ts</span>
        </Element>
      </Element>
      <Element className="flex justify-end items-center px-2 text-base">
        <Element
          className="h-5.5 w-5.5 flex items-center justify-center rounded-md mr-1"
          bind={["h:bg@toolbar.hoverBackground", "c@iconForeground"]}
        >
          <VscGitCompare />
        </Element>
        <Element
          className="h-5.5 w-5.5 flex items-center justify-center rounded-md mr-1"
          bind={["h:bg@toolbar.hoverBackground", "c@iconForeground"]}
        >
          <VscSplitHorizontal />
        </Element>

        <Element
          className="h-5.5 w-5.5 flex items-center justify-center rounded-md mr-1"
          bind={["h:bg@toolbar.hoverBackground", "c@iconForeground"]}
        >
          <VscEllipsis />
        </Element>
      </Element>
    </Element>
  );
}
