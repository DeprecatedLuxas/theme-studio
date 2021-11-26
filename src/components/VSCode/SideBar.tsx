import TreeView from "@components/TreeView";
import { VscChevronRight, VscChevronDown, VscEllipsis } from "react-icons/vsc";
import Element from "./Element";

export default function SideBar() {
  return (
    <Element
    className="w-sidebar h-full flex flex-col"
    conditionalClassName={{
      "brc@sideBar.border": {
        when: "NOT_NULL",
        then: "border-r-2",
      },
    }}
    bind={["bg@sideBar.background", "c@sideBar.foreground", "brc@sideBar.border"]}
    >
      <Element className="uppercase flex items-center justify-between px-5 h-sideBarTitle text-sideBarTitle">
        <Element
          as="span"
          className="text-sideBarTitle"
          bind={["c@sideBarTitle.foreground"]}
        >
          EXPLORER
        </Element>
        <Element
          className="flex items-center justify-center cursor-pointer -mr-5 h-full w-sideBarTitleIcon"
          bind={["c@sideBar.foreground"]}
        >
          <VscEllipsis fontSize="16px" />
        </Element>
      </Element>
      <Element
        className="uppercase flex border justify-start items-center"
        bind={["bc@sideBarSectionHeader.border", "bg@sideBarSectionHeader.background", "c@sideBarSectionHeader.foreground"]}

      >
        <VscChevronDown />
        VSCODE-THEME
      </Element>
      <Element className="flex-1">
        <TreeView>
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
        </TreeView>
      </Element>
      <Element
        className="uppercase border flex justify-start items-center"
        bind={[
          "bc@sideBarSectionHeader.border",
          "bg@sideBarSectionHeader.background",
          "c@sideBarSectionHeader.foreground",
        ]}
      >
        <VscChevronRight />
        OUTLINE
      </Element>
      <Element
        className="uppercase border flex justify-start items-center"
        bind={[
          "bc@sideBarSectionHeader.border",
          "bg@sideBarSectionHeader.background",
          "c@sideBarSectionHeader.foreground",
        ]}
      >
        <VscChevronRight />
        OPEN EDITORS
      </Element>
    </Element>
  );
}
