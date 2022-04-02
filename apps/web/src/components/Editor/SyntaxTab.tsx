import useRegistry from "@hooks/use-registry";
import registry from "@lib/registry";
import { VariablePossibleCategories, Variables } from "@lib/types";
import { Heading } from "@theme-studio/ui";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Variable from "./Variable";
import VariableGroup from "./VariableGroup";

export default function SyntaxTab() {
  const { syntax, categories: registryCategories } = useRegistry();
  const [categories, ,] = useState<VariablePossibleCategories[]>(
    registryCategories!.syntax
  );

  if (!Object.keys(syntax!).length) {
    return (
      <Heading type="h4" className="text-white text-lg">
        There is no variables specified for this tab.
      </Heading>
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
            {Object.keys(syntax!).map((key: string, idx: number) => {
              const varCategory = registry.getVariableCategory(key);
              if (varCategory !== category) return;
              return (
                <Variable
                  key={`variable-${key}-${idx}`}
                  tab={syntax!}
                  tabName="syntax"
                  name={key as Variables}
                  value={syntax![key]}
                />
              );
            })}
          </VariableGroup>
        ))}
    </div>
  );
}
