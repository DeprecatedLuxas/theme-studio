import { useBiscuitBox } from "@hooks/useBiscuitBox";
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
    <div>
      <div className="flex">
        <TreeIndent level={level} />
        {isOpen ? <VscChevronDown /> : <VscChevronRight />}

        {isOpen ? <VscFolderOpened /> : <VscFolder />}

        <span>{name}</span>
      </div>
      <div>
        {Children.map(children, (child: any) => {
          const newP = parentLevel + 1
          console.log(newP);
          
          return cloneElement(child, {
            level: newP,
          });
        })}
      </div>
    </div>
  );
}
