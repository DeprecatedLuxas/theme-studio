import Element from "./Element";
import { VscChevronRight } from "react-icons/vsc";
import { TypeScriptReactIcon } from "./icons";
export default function Breadcrumbs() {
  return (
    <Element
      className="h-5.5 px-3 flex items-center leading-5.5"
      bind={["bg@breadcrumb.background", "c@breadcrumb.foreground"]}
    >
      <Element>src</Element>

      <VscChevronRight />
      <Element>pages</Element>

      <VscChevronRight />

      <Element>
        index.tsx
      </Element>
    </Element>
  );
}
