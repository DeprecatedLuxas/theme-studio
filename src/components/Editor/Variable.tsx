import EditorHelper from "@helpers/editor";
import useRegistry from "@hooks/use-registry";
import { useEffect, useState } from "react";

export interface VariableProps {
  name: string;
  value: string;
  groupName: string;
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
  groupName,
}: VariableProps): JSX.Element {
  const { dispatch, palette, variables, syntax, editor } = useRegistry();
  const variable = EditorHelper.formatVariable(name);

  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div
        className="flex w-full justify-start items-center cursor-pointer py-2 px-2 text-gray-400 hover:bg-gray-600 bg-gray-700 mb-2 rounded"
        onMouseEnter={() => {
          // Check if action
          // if (true) {
          // }
          // console.log("Enter");
          // dispatch({ type: "SET_EDITOR_VARIABLE", payload: { name, value } });
          // console.log(variable.action);
          // if (variable.action) console.log(variable.action);
        }}
        onMouseLeave={() => {
          // console.log("Leave");
          // Clear state.
        }}
      >
        <div
          className="bg-variable w-8 h-8 rounded-md mr-3"
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
                if (!dispatch) throw new Error("Dispatch is undefined?");
                dispatch({
                  variables: {
                    ...variables,
                    [name]: color,
                  },
                  palette: {
                    ...palette,
                    [name]: color,
                  },
                });

                /*       dispatch &&
                  dispatch({
                    variables: {
                      ...variables!,
                      [name]: color,
                    },
                    palette: {
                      ...palette!,
                      [groupName]: {
                        ...palette![groupName],
                        [name]: color,
                      },
                    },
                  }); */

                /* 
                // TODO: Clean this up.
                const variable = getEditorVariable(variables, name);
                const co = getVariable(variables, name);

                const type = co.group.dark ? "dark" : "light";
                co.group[type] = color;
                dispatch({
                  type: Actions.SET_EDITOR_VARIABLES,
                  payload: {
                    editorVariables: { ...editorVariables, [variable]: color },
                  },
                }); */
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
