import useRegistry from "@hooks/use-registry";
import { VariablePossibleCategories } from "@lib/types";
import { v4 as uuid } from "uuid";
import Variable from "./Variable";
import VariableGroup from "./VariableGroup";

export default function EditorTab() {
  const { editor } = useRegistry();

  if (!Object.keys(editor!).length) {
    return (
      <h4 className="text-white text-lg">
        There is no variables specified for this tab.
      </h4>
    );
  }
  return (
    <div>
      {Object.keys(editor!)
        .sort((a, b) => a.localeCompare(b))
        .map((key: string) => (
          <VariableGroup
            key={uuid()}
            groupName={key as VariablePossibleCategories}
          >
            {Object.keys(editor![key]).map((k) => (
              <Variable key={uuid()} name={k} value={editor![key][k]} />
            ))}
          </VariableGroup>
        ))}
    </div>
  );
}
