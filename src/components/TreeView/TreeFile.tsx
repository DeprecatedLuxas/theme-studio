import { VscFile } from "react-icons/vsc";
import { TreeNodeProps } from ".";
import TreeIndent from "./Indent";

export interface TreeFileProps extends TreeNodeProps {}

export default function TreeFile({ name, type, level = 0 }: TreeFileProps) {

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
          <VscFile />
        </span>

        <span className="whitespace-nowrap text-sm text-green-700">
          {name}
        </span>
      </div>
    </div>
  );
}
