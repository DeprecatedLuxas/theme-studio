import EditorHelper from "@helpers/editor";
import useRegistry from "@hooks/useRegistry";
import { useEffect } from "react";

type VariableProps = {
  name: string;
  value: string;
};

const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
];

export default function Variable({ name, value }: VariableProps) {
  const { dispatch, variables } = useRegistry();
  // const slicedAnimes = useRecoilValue(EditorSelector);

  useEffect(() => {
    console.log(variables);
  }, []);

  // const [show, setShow] = useState<boolean>(false);
  const variable = EditorHelper.formatVariable(name);
  return (
    <div
      className="flex w-full justify-start items-center cursor-pointer py-2 px-2 text-gray-400 hover:bg-gray-600 bg-gray-700 mb-2 rounded-lg"
      // onMouseEnter={() => {
      //   console.log("Enter");
      //   // dispatch({ type: "SET_EDITOR_VARIABLE", payload: { name, value } });
      //   // console.log(variable.action);
      //   if (variable.action) console.log(variable.action);
      // }}
      // onMouseLeave={() => {
      //   console.log("Leave");
      //   // Clear state.
      // }}
    >
      <div
        className="bg-variable w-8 h-8 rounded-md mr-3"
        // onClick={() => setShow(!show)}
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
          {variable.length > 27 ? variable.substring(0, 26) + "..." : variable}
        </div>
        <div className="text-xs">{value || "No Value"}</div>
      </div>
    </div>
  );
}
