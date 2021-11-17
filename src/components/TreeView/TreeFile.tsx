import { VscFile } from "react-icons/vsc";
import { TreeNodeProps } from ".";
import TreeIndent from "./Indent";

export interface TreeFileProps extends TreeNodeProps {}

export default function TreeFile({ name, level = 0 }: TreeFileProps) {
  return (
    <div>
      <div className="flex">
        <TreeIndent level={level} />
        <VscFile />
        <span>{name}</span>
      </div>
    </div>
  );
}
