import useTreeView from "@hooks/use-tree-view";
import IconPack from "@components/IconPack";
import { TreeNodeProps } from ".";
import TreeIndent from "./Indent";

export interface TreeFileProps extends TreeNodeProps {}

export default function TreeFile({ name, type, level = 0 }: TreeFileProps) {
  const { iconPack } = useTreeView();

  return (
    <div
      className="cursor-pointer leading-none select-none"
      style={{
        marginLeft: `calc(1.875rem * ${level})`,
      }}
    >
      <div className="flex h-7 items-center relative">
        <TreeIndent level={level} />
        <span className="w-6 h-full inline-flex items-center">
          <IconPack from={iconPack || "Seti Icons"} type={type} />
        </span>

        <span className="whitespace-nowrap text-sm text-green-700">{name}</span>
      </div>
    </div>
  );
}
