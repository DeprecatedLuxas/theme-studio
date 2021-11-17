import Element from "./Element";
import {
  VscRemote,
  VscSourceControl,
  VscWarning,
  VscError,
} from "react-icons/vsc";
import { v4 as uuid } from "uuid";

const stautsBarItems = [
  "Ln 3, Col 10",
  "Spaces 4",
  "UTF-8",
  "LF",
  "TypeScript React",
];

export default function StatusBar() {
  return (
    <Element
      className="flex justify-between h-statusbar text-xs"
      bind={["bg@statusBar.background", "border@statusBar.border"]}
    >
      <Element className="flex">
        <Element
          className="cursor-pointer h-full w-remote-icon flex items-center justify-center px-1.5"
          // bind={[
          //   "h:bg@statusBarItem.hoverBackground",
          //   "bg@statusBarItem.remoteBackground",
          //   "text@statusBarItem.remoteForeground",
          // ]}
        >
          <VscRemote fontSize="16px" />
        </Element>
        <Element
          className="cursor-pointer h-full flex items-center justify-center px-1.5"
          // v={[
          //   "h:bg@statusBarItem.hoverBackground",
          //   "text@statusBar.foreground",
          // ]}
        >
          <VscSourceControl fontSize="16px" />
          <Element as="span">master*</Element>
        </Element>

        <Element
          className="cursor-pointer h-full flex items-center justify-center px-1.5"
          // v={[
          //   "h:bg@statusBarItem.hoverBackground",
          //   "text@statusBar.foreground",
          // ]}
        >
          <VscError fontSize="16px" />
          <Element as="span" className="mx-1">
            0
          </Element>
          <VscWarning fontSize="16px" />
          <Element as="span" className="ml-1">
            0
          </Element>
        </Element>
      </Element>
      <Element className="flex items-center">
        {stautsBarItems &&
          stautsBarItems.map((item: string) => (
            <Element
              key={uuid()}
              className="cursor-pointer px-1.5 py-0.5 h-full"
              bind={[
                "h:bg@statusBarItem.hoverBackground",
                "text@statusBar.foreground",
              ]}
            >
              {item}
            </Element>
          ))}
      </Element>
    </Element>
  );
}
