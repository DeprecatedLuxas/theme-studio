import TreeView from "@components/TreeView";
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
      <Element className="uppercase flex items-center justify-between px-5 h-2.1875 text-sideBarTitle cursor-default select-none">
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
      </Element>
      <Element
        className="uppercase flex border justify-start items-center h-5.5 cursor-pointer text-11px font-semibold"
        bind={[
          "bc@sideBarSectionHeader.border",
          "bg@sideBarSectionHeader.background",
          "c@sideBarSectionHeader.foreground",
        ]}
      >
        <VscChevronDown className="mx-0.5 text-base" />
        <Element as="span">vscode-theme-studio</Element>
      </Element>
      <Element className="flex-1">
        <Element className="flex justify-start items-center h-5.5 cursor-pointer pl-2 text-13px">
          <Element className="flex justify-start items-center">
            <VscChevronRight />
            <Element as="span">node_modules</Element>
          </Element>
        </Element>
        {/* <TreeView>
          <TreeView.Folder name="node_modules" />
          <TreeView.Folder name="public" />
          <TreeView.Folder name="src" canOpen defaultOpen>
            <TreeView.Folder name="components" canOpen>
              <TreeView.File name="Button.tsx" type="tsx" />
              <TreeView.File name="Header.tsx" type="tsx" />
              <TreeView.File name="Footer.tsx" type="tsx" />
            </TreeView.Folder>

            <TreeView.Folder name="pages" canOpen defaultOpen>
              <TreeView.File name="index.tsx" type="tsx" />
              <TreeView.File name="_app.tsx" type="tsx" />
            </TreeView.Folder>
          </TreeView.Folder>
          <TreeView.File name="next.config.js" type="js" />
          <TreeView.File name="package.json" type="json" />
          <TreeView.File name="tsconfig.json" type="tsconfig" />
          <TreeView.File name="yarn.lock" type="lock" />
        </TreeView> */}
      </Element>
      <Element
        className="uppercase flex border justify-start items-center h-5.5 cursor-pointer text-11px font-semibold"
        bind={[
          "bc@sideBarSectionHeader.border",
          "bg@sideBarSectionHeader.background",
          "c@sideBarSectionHeader.foreground",
        ]}
      >
        <VscChevronRight className="mx-0.5 text-base" />
        <Element as="span">outline</Element>
      </Element>
      <Element
        className="uppercase flex border justify-start items-center h-5.5 cursor-pointer text-11px font-semibold font-roboto"
        bind={[
          "bc@sideBarSectionHeader.border",
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
