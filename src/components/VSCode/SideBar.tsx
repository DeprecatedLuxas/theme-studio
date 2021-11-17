import TreeView from "@components/TreeView";
import { VscChevronRight, VscChevronDown, VscEllipsis } from "react-icons/vsc";
import Element from "./Element";

export default function SideBar() {
  return (
    <Element
      as="div"
      // v={["bg@sideBar.background", "text@sideBar.foreground"]}
      className="w-sidebar h-full flex flex-col"
    >
      <Element as="div" className="uppercase flex items-center justify-between">
        EXPLORER <VscEllipsis />
      </Element>
      <Element
        as="div"
        className="uppercase flex border justify-start items-center"
      >
        <VscChevronDown />
        VSCODE-THEME
      </Element>
      <Element as="div" className="flex-1">
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
        as="div"
        className="uppercase border flex justify-start items-center"
      >
        <VscChevronRight />
        OUTLINE
      </Element>
      <Element
        as="div"
        className="uppercase border flex justify-start items-center"
      >
        <VscChevronRight />
        OPEN EDITORS
      </Element>
    </Element>
  );
}
