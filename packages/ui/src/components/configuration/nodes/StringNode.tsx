import { BaseNodeProps } from ".";

export interface StringNodeProps extends BaseNodeProps {}

export function StringNode({ node }: StringNodeProps) {
  return <div>StringNode</div>;
}
