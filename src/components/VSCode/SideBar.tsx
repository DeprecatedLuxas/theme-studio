import TreeView from "./TreeView";
import { vscodeState } from "@recoil/atoms/vscode";
import { VscChevronRight, VscChevronDown, VscEllipsis } from "react-icons/vsc";
import { useRecoilState } from "recoil";
import Element from "./Element";

export default function SideBar() {
  const [options, setOptions] = useRecoilState(vscodeState);

  return (
    <Element
      className="w-62.5 h-full flex flex-col"
      conditionalClassName={{
        "brc@sideBar.border": {
          when: "NOT_NULL",
          then: "border-r-2",
        },
      }}
      bind={[
        "bg@sideBar.background",
        "c@sideBar.foreground",
        "brc@sideBar.border",
      ]}
    >
      <div className="uppercase flex items-center justify-between px-5 h-8.75 text-sideBarTitle cursor-default select-none">
        <Element
          as="span"
          className="text-sideBarTitle"
          bind={["c@sideBarTitle.foreground"]}
        >
          EXPLORER
        </Element>
        <Element
          className="flex items-center justify-center cursor-pointer -mr-5 h-full w-12.5"
          bind={["c@sideBar.foreground"]}
        >
          <Element
            className="h-5.5 w-5.5 flex items-center justify-center rounded-md"
            bind={["h:bg@toolbar.hoverBackground"]}
          >
            <VscEllipsis className="text-base" />
          </Element>
        </Element>
      </div>
      <Element
        className="uppercase flex justify-start items-center h-5.5 cursor-pointer text-11px font-semibold"
        bind={[
          "bg@sideBarSectionHeader.background",
          "c@sideBarSectionHeader.foreground",
        ]}
      >
        <VscChevronDown className="mx-0.5 text-base" />
        <Element as="span">vscode-theme-studio</Element>
      </Element>
      <div className="flex-1">
        {/* <Element className="flex justify-start items-center h-5.5 cursor-pointer pl-2 text-13px">
          <Element className="flex justify-start items-center">
            <VscChevronRight />
            <Element as="span">node_modules</Element>
          </Element>
        </Element> */}
        <TreeView iconPack={options.iconPack}>
          <TreeView.Folder name="node_modules" type="modules" />
          <TreeView.Folder name="public" type="public" />
          <TreeView.Folder name="src" defaultOpen type="src">
            <TreeView.Folder name="components" defaultOpen type="components">
              <TreeView.File name="Header.tsx" type="tsx" />
              <TreeView.File name="Footer.tsx" type="tsx" />
            </TreeView.Folder>

            <TreeView.Folder name="pages" defaultOpen type="pages">
              <TreeView.File name="index.tsx" type="tsx" />
              <TreeView.File name="_app.tsx" type="tsx" />
            </TreeView.Folder>
          </TreeView.Folder>
          <TreeView.File name="next.config.js" type="js" />
          <TreeView.File name="package.json" type="json" />
          <TreeView.File name="tsconfig.json" type="tsconfig" />
          <TreeView.File name="yarn.lock" type="lock" />
        </TreeView>
      </div>
      <Element
        className="uppercase flex border-t justify-start items-center h-5.5 cursor-pointer text-11px font-bold select-none"
        bind={[
          "btc@sideBarSectionHeader.border",
          "bg@sideBarSectionHeader.background",
          "c@sideBarSectionHeader.foreground",
        ]}
      >
        <VscChevronRight className="mx-0.5 text-base" />
        <Element as="span">outline</Element>
      </Element>
      <Element
        className="uppercase flex border-t justify-start items-center h-5.5 cursor-pointer text-11px font-bold select-none"
        bind={[
          "btc@sideBarSectionHeader.border",
          "bg@sideBarSectionHeader.background",
          "c@sideBarSectionHeader.foreground",
        ]}
      >
        <VscChevronRight className="mx-0.5 text-base" />
        <Element as="span">open editors</Element>
      </Element>
    </Element>
  );
}
