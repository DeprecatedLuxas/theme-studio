import { VSCContext } from "@contexts/VSCContext";
import FunctionalVSCode from "./FunctionalVSCode";
import UnfunctionalVSCode from "./UnfunctionalVSCode";

type VSCodeProps = {
  functional?: boolean;
};
export default function VSCode({ functional }: VSCodeProps) {
  return (
    <VSCContext.Provider
      value={{
        functional,
      }}
    >
      {functional ? <FunctionalVSCode /> : <UnfunctionalVSCode />}
    </VSCContext.Provider>
  );
}
