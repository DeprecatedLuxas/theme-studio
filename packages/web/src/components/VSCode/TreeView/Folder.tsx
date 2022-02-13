import IconPack from "@components/IconPack";
import { useBiscuitBox } from "@hooks/use-biscuit-box";
import { Variables } from "@lib/types";
import { Children, cloneElement, PropsWithChildren, ReactNode } from "react";
import Icon from "@components/Icon";
import { NodeProps } from ".";
import Element from "../Element";
import Image from "next/image";
import windy from "@helpers/windy";
import IconHelper from "@helpers/icon-helper";

export interface FolderProps extends NodeProps {
  // defaultOpen?: boolean;
}

export default function Folder({
  name,
  children,
  level = 0,
  type,
}: PropsWithChildren<FolderProps>) {
  const { isOpen } = useBiscuitBox({
    isOpen: (children && Children.count(children) > 0) || false,
  });

  const bindings: Variables[] = [];

  const twistieIndent = level === 0 ? 8 : level * 8;
  // if (status !== "") {
  //   if (status === "modified") {
  //     bindings.push("c@gitDecoration.modifiedResourceForeground");
  //   } else {
  //     bindings.push("c@gitDecoration.untrackedResourceForeground");
  //   }
  // }



  const icon = IconHelper.getIcon(name, "", true);
  
  const iconPath = isOpen ? icon + "/true" : icon + "/false";
  
  console.log(encodeURIComponent(iconPath));
  
  return (
    <>
      <Element
        className="h-5.5 pl-1 leading-5.5 cursor-pointer text-[13px] select-none"
        role="treeitem"
        aria-label={name}
      >
        <div className="flex h-full items-center">
          <div
            className="h-full pointer-events-none"
            style={{ width: `${level * 8}px` }}
          />
          <div
            className="pr-1.5 flex items-center justify-center translate-x-[3px] h-full flex-shrink-0"
            style={{
              paddingLeft: `${twistieIndent}px`,
            }}
          >
            {isOpen ? (
              <Icon icon="VscChevronDown" size="16px" />
            ) : (
              <Icon icon="VscChevronRight" size="16px" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex overflow-ellipsis">
              <Image
                src={iconPath}
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
      {isOpen && (
        <div className="flex flex-col h-auto">
          {Children.map(children, (child: any) => {
            return cloneElement(child, {
              level: level + 1,
            });
          })}
        </div>
      )}
    </>
  );
}
