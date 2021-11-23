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
}: PropsWithChildren<TreeFolderProps>) {
  const { isOpen, onOpen, onClose } = useBiscuitBox();
  const parentLevel = 0;
  return (
    <div className="cursor-pointer select-none leading-none">
      <div className="flex h-7 items-center relative ml-">
        <TreeIndent level={level} />
        <span className="absolute -left-4.5 top-1/2 w-3.5 h-3.5 transform-50 z-10 bg-green-700">{isOpen ? <VscChevronDown /> : <VscChevronRight />}</span>
        <span className="icon">{isOpen ? <VscFolderOpened /> : <VscFolder />}</span>

        <span>{name}</span>
      </div>
      <div>
        {Children.map(children, (child: any) => {
          const newP = parentLevel + 1;

          return cloneElement(child, {
            level: newP,
          });
        })}
      </div>
    </div>
  );
}
/* height: 1.75rem;
align-items: center;
margin-left: calc(1.875rem * ${parentLevel});
position: relative; */
