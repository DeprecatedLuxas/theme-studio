import IconPack from "@components/IconPack";
import { useBiscuitBox } from "@hooks/use-biscuit-box";
import useTreeView from "@hooks/use-tree-view";
import { Children, cloneElement, PropsWithChildren, ReactNode } from "react";
import {
  VscChevronDown,
  VscChevronRight,
  VscFolder,
  VscFolderOpened,
} from "react-icons/vsc";
import { TreeNodeProps } from ".";
import TreeIndent from "./Indent";

export interface TreeFolderProps extends TreeNodeProps {
  defaultOpen?: boolean;
}

export default function TreeFolder({
  name,
  children,
  level = 0,
  type,
  defaultOpen = false,
}: PropsWithChildren<TreeFolderProps>) {
  const { iconPack } = useTreeView();
  const { isOpen } = useBiscuitBox({
    isOpen: defaultOpen,
  });

  return (
    <div className="cursor-pointer select-none leading-none">
      <div
        className="flex h-7 items-center relative"
        style={{
          marginLeft: `calc(1.875rem * ${level})`,
        }}
      >
        <TreeIndent level={level} />
        <span className="inline-flex items-center justify-center absolute -left-4.5 top-1/2 w-3.5 h-3.5 transform-50 z-10">
          {isOpen ? <VscChevronDown /> : <VscChevronRight />}
        </span>
        <span className="inline-flex items-center justify-center w-6 h-full mr-2">
          {isOpen ? (
            <IconPack from={iconPack || "Seti Icons"} type={type} open />
          ) : (
            <IconPack from={iconPack || "Seti Icons"} type={type} />
          )}
        </span>

        <span className="text-sm whitespace-nowrap text-green-700">{name}</span>
      </div>
      {isOpen && (
        <div className="flex flex-col h-auto">
          {Children.map(children, (child: any) => {
            return cloneElement(child, {
              level: level + 1,
            });
          })}
        </div>
      )}
    </div>
  );
}
