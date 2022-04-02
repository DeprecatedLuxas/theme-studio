import Select from "react-select";
import { BaseNodeProps } from ".";

export interface StringEnumNodeProps extends BaseNodeProps {}

export function StringEnumNode({ node }: StringEnumNodeProps) {
  if (!node.enum) {
    throw new Error("StringEnumNode requires an enum");
  }
  const options = node.enum.map((option) => ({
    value: option,
    label: option,
  }));
  return (
    <div>
      <Select options={options} />
    </div>
  );
}
