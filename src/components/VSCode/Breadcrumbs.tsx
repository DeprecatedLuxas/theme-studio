import Element from "./Element";
import { VscChevronRight } from "react-icons/vsc";
import { useRecoilValue } from "recoil";
import { vscodeState } from "@recoil/atoms/vscode";

export default function Breadcrumbs() {
  const vscode = useRecoilValue(vscodeState);
  const path = vscode.activeFile.path.split("/");

  return (
    <Element
      className="h-5.5 px-3 flex items-center leading-5.5"
      bind={["bg@breadcrumb.background", "c@breadcrumb.foreground"]}
    >
      {path.map((item, index) => (
        <>
          {/* TODO: ICON COMPONENT */}
          {index === path.length - 1 && <p>ICONCOMPONENT{vscode.activeFile.iconPath}</p>}
          <Element>{item}</Element>
          {index !== path.length - 1 && <VscChevronRight />}
        </>
      ))}
    </Element>
  );
}
