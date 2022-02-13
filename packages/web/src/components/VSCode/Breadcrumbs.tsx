import Element from "./Element";
import { useRecoilValue } from "recoil";
import { vscodeState } from "@recoil/atoms/vscode";
import Icon from "@components/Icon";
import Image from "next/image";

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
          {/* {idx === path.length - 1 && <Icon from="
          /api/icon/typescript" />} */}
          {idx === path.length - 1 && (
            <Image src="/api/icon/typescript" width="20" height="20" alt="test" />
          )}
          <span>{item}</span>
          {idx !== path.length - 1 && (
            <Icon icon="VscChevronRight" className="inline-block" />
          )}
        </div>
      ))}
    </Element>
  );
}
