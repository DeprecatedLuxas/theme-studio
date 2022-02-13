import IconPack from "@components/IconPack";
import { NodeProps } from ".";
import { Variables } from "@lib/types";
import Element from "../Element";
import Image from "next/image";
import IconHelper from "@helpers/icon-helper";
import { getFileExtension } from "@lib/utils";

export interface FileProps extends NodeProps {}

export default function File({
  name,
  level = 0,
  decoration,
  decorationIcon = false,
}: FileProps) {
  const bindings: Variables[] = [
    "h:bg@list.hoverBackground",
    "h:c@list.hoverForeground",
  ];

  // if (status !== "") {
  //   if (status === "modified") {
  //     bindings.push("c@gitDecoration.modifiedResourceForeground");
  //   } else {
  //     bindings.push("c@gitDecoration.untrackedResourceForeground");
  //   }
  // }
  /* if (active) bindings.push("bg@list.activeSelectionBackground") */
  const twistieIndent = level === 0 ? 8 : level * 10;
  const icon = IconHelper.getIcon(name, getFileExtension(name), false);
  console.log("icon", icon);
  
  console.log(encodeURIComponent(icon));
  
  // const iconPath = isOpen ? icon + "/true" : icon + "/false";
  return (
    <Element
      className="h-5.5 pl-1 leading-5.5 cursor-pointer text-[13px] select-none"
      role="treeitem"
      aria-label={name}
    >
      <div className="flex h-full items-center">
        <div
          className="h-full pointer-events-none"
          style={{ width: `${level * 10}px` }}
        />
        <div
          className="pr-1.5 w-4 flex items-center justify-center translate-x-[3px] h-full flex-shrink-0"
          style={{
            paddingLeft: `${twistieIndent}px`,
          }}
        />
        <div className="flex-1">
          <div className="flex overflow-ellipsis">
            <Image
              src={icon}
              width="16"
              height="22"
              alt={`${name} icon`}
            />
            <div className="min-w-0 flex-1 ml-1.5">
              <span>{name}</span>
              {/* <span></span> */}
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
}
