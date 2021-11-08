import FunctionalVSCode from "./FunctionalVSCode";
import UnfunctionalVSCode from "./UnfunctionalVSCode";

type VSCodeProps = {
  functional?: boolean;
};
export default function VSCode({ functional }: VSCodeProps) {
  return functional ? <FunctionalVSCode /> : <UnfunctionalVSCode />;
}
