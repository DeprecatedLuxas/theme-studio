import useRegistry from "@hooks/use-registry";
import { VariablePossibleCategories } from "@lib/types";
import { v4 as uuid } from "uuid";
import Variable from "./Variable";
import VariableGroup from "./VariableGroup";

export default function PaletteTab() {
  const { palette } = useRegistry();

  if (!Object.keys(palette!).length) {
    return (
      <h4 className="text-white text-lg">
        There is no variables specified for this tab.
      </h4>
    );
  }
  return (
    <div>
      {Object.keys(palette!)
        .sort((a, b) => a.localeCompare(b))
        .map((key: string) => (
          <VariableGroup
            key={uuid()}
            groupName={key as VariablePossibleCategories}
          >
            {Object.keys(palette![key]).map((k) => (
              <Variable key={uuid()} name={k} value={palette![key][k]} />
            ))}
          </VariableGroup>
        ))}
    </div>
  );
}
