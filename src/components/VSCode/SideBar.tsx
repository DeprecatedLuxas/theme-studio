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
        <Element as="div" className="flex">
          <VscChevronRight />
          <Element as="span">node_modules</Element>
        </Element>
        <Element as="div" className="flex">
          <VscChevronRight />
          <Element as="span">public</Element>
        </Element>
        <Element as="div" className="flex">
          <VscChevronDown />
          <Element as="span">src</Element>
          <Element as="div" className="flex">
            <VscChevronDown />
            <Element as="span">assets</Element>
          </Element>
        </Element>
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
