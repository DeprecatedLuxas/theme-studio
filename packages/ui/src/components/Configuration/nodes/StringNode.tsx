import { BaseNodeProps } from ".";
import { Input } from "../../Input";

export interface StringNodeProps extends BaseNodeProps {}

export function StringNode({ node }: StringNodeProps) {
  return (
    <div>
      <Input />
    </div>
  );
}
