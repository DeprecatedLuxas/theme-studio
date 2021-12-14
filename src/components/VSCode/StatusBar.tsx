import Element from "./Element";
import {
  VscRemote,
  VscSourceControl,
  VscWarning,
  VscError,
} from "react-icons/vsc";
import { v4 as uuid } from "uuid";

const statusBarItems = [
  "Ln 3, Col 10",
  "Spaces 4",
  "UTF-8",
  "LF",
  "TypeScript React",
];

export default function StatusBar() {
  return (
    <Element
      className="flex justify-between h-5.5 text-xs"
      bind={["bg@statusBar.background", "bc@statusBar.border"]}
      onAction={{
        "statusbar.NoFolder": [
          "bg@statusBar.noFolderBackground",
          "c@statusBar.noFolderForeground",
          "bc@statusBar.noFolderBorder",
        ],
        "statusbar.Debugging": ["bg@statusBar.debuggingBackground"],
      }}
    >
      <div className="flex">
        <Element bind={["bg@statusBarItem.remoteBackground"]}>
          <Element
            className="cursor-pointer h-full w-remote-icon flex items-center justify-center px-1.5"
            bind={[
              "h:bg@statusBarItem.hoverBackground",
              "c@statusBarItem.remoteForeground",
            ]}
          >
            <VscRemote fontSize="16px" />
          </Element>
        </Element>

        <Element
          className="cursor-pointer h-full flex items-center justify-center px-1.25 mx-0.25 select-none"
          bind={[
            "h:bg@statusBarItem.hoverBackground",
            "c@statusBar.foreground",
          ]}
        >
          <VscSourceControl fontSize="16px" />
          <span className="select-none">
            main*
          </span>
        </Element>

        <Element
          className="cursor-pointer h-full flex items-center justify-center px-1.25 mx-0.25 select-none"
          bind={[
            "h:bg@statusBarItem.hoverBackground",
            "c@statusBar.foreground",
          ]}
        >
          <VscError fontSize="16px" />
          <span className="mx-1 select-none">
            0
          </span>
          <VscWarning fontSize="16px" />
          <span className="ml-1 select-none">
            0
          </span>
        </Element>
      </div>
      <Element className="flex items-center">
        {statusBarItems &&
          statusBarItems.map((item: string, idx: number) => (
            <Element
              key={`statusbar-${idx}`}
              className={`cursor-pointer px-1.25 ${
                idx + 1 === statusBarItems.length ? "ml-0.25 mr-7px" : "mx-0.25"
              } h-full select-none`}
              bind={[
                "h:bg@statusBarItem.hoverBackground",
                "c@statusBar.foreground",
              ]}
            >
              <p className="flex items-center h-full">{item}</p>
            </Element>
          ))}
      </Element>
    </Element>
  );
}
