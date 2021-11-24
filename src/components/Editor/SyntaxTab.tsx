import useRegistry from "@hooks/use-registry";
import registry from "@lib/registry";
import { VariablePossibleCategories } from "@lib/types";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Variable from "./Variable";
import VariableGroup from "./VariableGroup";

export default function SyntaxTab() {
  const { syntax, categories: registryCategories } = useRegistry();
  const [categories,,] = useState<VariablePossibleCategories[]>(
    registryCategories!.syntax
  );

  if (!Object.keys(syntax!).length) {
    return (
      <h4 className="text-white text-lg">
        There is no variables specified for this tab.
      </h4>
    );
  }
  return (
    <div>
      {categories.map((category: string) => (
        <VariableGroup
          key={uuid()}
          groupName={category as VariablePossibleCategories}
        >
          {Object.keys(syntax!).map((k) => {
            const varCategory = registry.getVariableCategory(k);

            if (varCategory !== category) return;
            return (
              <Variable
                key={uuid()}
                name={k}
                value={syntax![k]}
                groupName={category as VariablePossibleCategories}
              />
            );
          })}
        </VariableGroup>
      ))}
    </div>
  );
}
