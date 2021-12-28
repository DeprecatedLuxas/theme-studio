import Element from "./Element";
import { VscChevronRight } from "react-icons/vsc";
import { useRecoilValue } from "recoil";
import { vscodeState } from "@recoil/atoms/vscode";
import Icon from "@components/Icon";

export default function Breadcrumbs() {
  const vscode = useRecoilValue(vscodeState);

  const path = vscode.activeFile.path.split("/");

  return (
    <Element
      className="h-5.5 px-3 flex items-center leading-5.5"
      bind={["bg@breadcrumb.background", "c@breadcrumb.foreground"]}
    >
      {path.map((item, idx) => (
        <div key={`breadcrumb-${idx}`} className="inline-block">
          {/* TODO: ICON COMPONENT */}

          {idx === path.length - 1 && <Icon icon="FaPalette" />}
          <span>{item}</span>
          {idx !== path.length - 1 && (
            <VscChevronRight className="inline-block" />
          )}
        </div>
      ))}
    </Element>
  );
}
