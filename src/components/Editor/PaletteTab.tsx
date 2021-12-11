import useRegistry from "@hooks/use-registry";
import registry from "@lib/registry";
import { VariablePossibleCategories, Variables } from "@lib/types";
import { useState } from "react";
import Variable from "./Variable";
import VariableGroup from "./VariableGroup";

export default function PaletteTab() {
  const { palette, categories: registryCategories } = useRegistry();
  const [categories, ,] = useState<VariablePossibleCategories[]>(
    registryCategories!.palette
  );

  if (!Object.keys(palette!).length) {
    return (
      <h4 className="text-white text-lg">
        There is no variables specified for this tab.
      </h4>
    );
  }

  return (
    <div>
      {categories &&
        categories.map((category: string, catId: number) => (
          <VariableGroup
            key={`category-${category}-${catId}`}
            groupName={category as VariablePossibleCategories}
          >
            {Object.keys(palette!).map((key: string, idx: number) => {
              const varCategory = registry.getVariableCategory(key);
              if (varCategory !== category) return;
              return (
                <Variable
                  key={`variable-${key}-${idx}`}
                  tab={palette!}
                  tabName={"palette"}
                  name={key as Variables}
                  value={palette![key]}
                />
              );
            })}
          </VariableGroup>
        ))}
    </div>
  );
}
