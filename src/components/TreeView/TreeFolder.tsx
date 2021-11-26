import { useBiscuitBox } from "@hooks/use-biscuit-box";
import { Children, cloneElement, PropsWithChildren, ReactNode } from "react";
import {
  VscChevronDown,
  VscChevronRight,
  VscFolder,
  VscFolderOpened,
} from "react-icons/vsc";
import { TreeNodeProps } from ".";
import TreeIndent from "./Indent";

export interface TreeFolderProps extends Omit<TreeNodeProps, "type"> {
  defaultOpen?: boolean;
  canOpen?: boolean;
}

export default function TreeFolder({
  name,
  children,
  level = 0,
  canOpen = false,
  defaultOpen = false,
}: PropsWithChildren<TreeFolderProps>) {
  const { isOpen, onOpen, onClose } = useBiscuitBox({
    isOpen: defaultOpen,
  });
  const parentLevel = 0;

  const handleClick = () => {
    if (!canOpen) return;
    return !isOpen ? onOpen() : onClose();
  };

  return (
    <div
      className="cursor-pointer select-none leading-none"
      onClick={handleClick}
    >
      <div
        className="flex h-7 items-center relative"
        style={{
          marginLeft: `calc(1.875rem * ${parentLevel})`,
        }}
      >
        <TreeIndent level={parentLevel} />
        <span className="inline-flex items-center justify-center absolute -left-4.5 top-1/2 w-3.5 h-3.5 transform-50 z-10">
          {isOpen ? <VscChevronDown /> : <VscChevronRight />}
        </span>
        <span className="inline-flex items-center justify-center w-6 h-full mr-2">
          {isOpen ? <VscFolderOpened /> : <VscFolder />}
        </span>

        <span className="text-sm whitespace-nowrap text-green-700">{name}</span>
      </div>
      {isOpen && (
        <div className="flex flex-col h-auto">
          {Children.map(children, (child: any) => {
            const newP = parentLevel + 1;

            return cloneElement(child, {
              level: newP,
            });
          })}
        </div>
      )}
    </div>
  );
}
