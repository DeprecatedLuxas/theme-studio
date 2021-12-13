import EditorHelper from "@helpers/editor";
import useRegistry from "@hooks/use-registry";
import registry from "@lib/registry";
import {
  CompiledVariables,
  Indexable,
  TStudioAction,
  TStudioActions,
  Variables,
  VariableTab,
} from "@lib/types";
import { actionState } from "@recoil/atoms/action";

import { Dispatch, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
export interface VariableProps {
  name: Variables;
  value: string;
  tabName: VariableTab;
  tab: CompiledVariables & Indexable;
}

const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
];

export default function Variable({
  name,
  value,
  tabName,
  tab,
}: VariableProps): JSX.Element {
  const { dispatch, variables } = useRegistry();
  const [action, setAction] = useRecoilState(actionState);
  const variable = EditorHelper.formatVariable(name);

  const [show, setShow] = useState<boolean>(false);

  const handleMouseEnter = () => {
    const action: TStudioAction | undefined = registry.getAction(name);
    if (!action && !EditorHelper.doesActionExist(action)) return;
    const act: TStudioActions = action as TStudioActions;

    setAction(act);
  };

  const handleMouseLeave = () => {
    // Dont set action state if action is empty
    if (action === "") return;

    setAction("");
  };

  return (
    <>
      <div
        className="flex items-center justify-start w-full px-2 py-2 mb-2 text-gray-400 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="w-8 h-8 mr-3 rounded bg-grid"
          onClick={() => setShow(!show)}
        >
          <div
            className="w-8 h-8 rounded shadow-variable"
            style={{
              background: `${value} none repeat scroll 0% 0%`,
            }}
          />
        </div>

        <div>
          <div className="text-variable">
            {variable.length > 27
              ? variable.substring(0, 26) + "..."
              : variable}
          </div>
          <div className="text-xs">{value || "No Value"}</div>
        </div>
      </div>
      {show && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          {colors.map((color) => (
            <div
              key={color}
              className="w-8 h-8"
              style={{ backgroundColor: color }}
              onClick={() => {
                if (!dispatch) console.warn("Dispatch is undefined");

                dispatch &&
                  dispatch({
                    variables: {
                      ...variables,
                      [name]: color,
                    },
                    [tabName as string]: {
                      ...tab,
                      [name]: color,
                    },
                  });
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
