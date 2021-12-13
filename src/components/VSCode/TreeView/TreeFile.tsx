import useTreeView from "@hooks/use-tree-view";
import IconPack from "@components/IconPack";
import { TreeNodeProps } from ".";
import { Variables } from "@lib/types";
import Element from "../Element";

export interface TreeFileProps extends TreeNodeProps {}

// TODO: Fix icons margin is too much when icon pack is seti

export default function TreeFile({
  name,
  type,
  level = 0,
  status = "",
  active = false
}: TreeFileProps) {
  const { iconPack } = useTreeView();

  const indent: string | undefined = level === 0 ? "24" : undefined;
  const bindings: Variables[] = [
    "h:bg@list.hoverBackground",
    "h:c@list.hoverForeground",
  ];

  if (status !== "") {
    if (status === "modified") {
      bindings.push("c@gitDecoration.modifiedResourceForeground");
    } else {
      bindings.push("c@gitDecoration.untrackedResourceForeground");
    }
  }

  /* if (active) bindings.push("bg@list.activeSelectionBackground") */

  return (
    <Element
      className="flex justify-start items-center h-5.5 cursor-pointer pl-3 text-13px"
      bind={bindings}
    >
      <div
        className="flex justify-between items-center w-full"
        style={{
          marginLeft: `${indent || (level > 2 ? level * 19 : level * 22)}px`,
        }}
      >
        <span className="inline-flex items-center justify-start">
          <span className="w-4 h-4 mr-1.5">
            <IconPack from={iconPack || "Seti Icons"} type={type} />
          </span>
          {name}
        </span>
        {status === "modified" && (
          <span className="mr-4 h-5.5 flex items-center justify-center w-3">
            M
          </span>
        )}
        {status === "untracked" && (
          <span className="mr-4 h-5.5 flex items-center justify-center w-3">
            U
          </span>
        )}
      </div>
    </Element>
  );
}
