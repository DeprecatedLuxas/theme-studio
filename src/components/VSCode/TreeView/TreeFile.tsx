import useTreeView from "@hooks/use-tree-view";
import IconPack from "@components/IconPack";
import { TreeNodeProps } from ".";

export interface TreeFileProps extends TreeNodeProps {}

export default function TreeFile({ name, type, level = 0 }: TreeFileProps) {
  const { iconPack } = useTreeView();

  const indent: string | undefined = level === 0 ? "24" : undefined;

  return (
    <div className="flex justify-start items-center h-5.5 cursor-pointer pl-3 text-13px">
      <div
        className="flex justify-start items-center"
        style={{
          marginLeft: `${indent || level * 22}px`,
        }}
      >
        <span className="inline-flex items-center justify-start">
          <span className="w-4 h-4 mr-1.5">
            <IconPack from={iconPack || "Seti Icons"} type={type} />
          </span>
          {name}
        </span>
      </div>
    </div>
  );
}
