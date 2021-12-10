import IconPack from "@components/IconPack";
import { useBiscuitBox } from "@hooks/use-biscuit-box";
import useTreeView from "@hooks/use-tree-view";
import { Children, cloneElement, PropsWithChildren, ReactNode } from "react";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";
import { TreeNodeProps } from ".";
import Element from "../Element";

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
    <>
      <Element
        className="flex justify-start items-center h-5.5 cursor-pointer pl-3 text-13px"
        bind={[]}
      >
        <div
          className="flex items-center justify-start"
          style={{
            marginLeft: `${level * 10}px`,
          }}
        >
          {isOpen ? (
            <VscChevronDown size="16" className="mx-1" />
          ) : (
            <VscChevronRight size="16" className="mx-1" />
          )}
          <span className="inline-flex items-center justify-start">
            {iconPack !== "Seti Icons" && (
              <span className="w-4 h-4 mr-1.5">
                {isOpen ? (
                  <IconPack from={iconPack || "Material Icons"} type={type} open />
                ) : (
                  <IconPack from={iconPack || "Material Icons"} type={type} />
                )}
              </span>
            )}

            {name}
          </span>
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
    // <div className="leading-none cursor-pointer select-none">
    //   <div
    //     className="relative flex items-center h-7"
    //     style={{
    //       marginLeft: `calc(1.875rem * ${level})`,
    //     }}
    //   >
    //     <TreeIndent level={level} />
    //     <span className="inline-flex items-center justify-center absolute -left-4.5 top-1/2 w-3.5 h-3.5 transform-50 z-10">
    //       {isOpen ? <VscChevronDown /> : <VscChevronRight />}
    //     </span>
    //     <span className="inline-flex items-center justify-center w-6 h-full mr-2">
    // {isOpen ? (
    //   <IconPack from={iconPack || "Seti Icons"} type={type} open />
    // ) : (
    //   <IconPack from={iconPack || "Seti Icons"} type={type} />
    // )}
    //     </span>

    //     <span className="text-sm text-green-700 whitespace-nowrap">{name}</span>
    //   </div>
    // {isOpen && (
    //   <div className="flex flex-col h-auto">
    //     {Children.map(children, (child: any) => {
    //       return cloneElement(child, {
    //         level: level + 1,
    //       });
    //     })}
    //   </div>
    // )}
    // </div>
  );
}
