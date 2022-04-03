import Select, { SingleValue } from "react-select";
import { BaseNodeProps } from ".";
import { useConfiguration } from "../../../hooks";
import { ConfigurationActionTypes } from "../../../providers/configuration-provider";

export interface StringEnumNodeProps extends BaseNodeProps {}

export function StringEnumNode({ id, node }: StringEnumNodeProps) {
  const { dispatch } = useConfiguration();

  if (!node.enum) {
    throw new Error("StringEnumNode requires an enum");
  }
  const options = node.enum.map((option) => ({
    value: option,
    label: option,
  }));

  const handleChange = (
    selectedOption: SingleValue<{
      value: any;
      label: any;
    }>
  ) => {
    dispatch({
      type: ConfigurationActionTypes.SET_VALUE,
      payload: {
        id: id,
        value: selectedOption?.value || "Untitled",
      },
    });
  };
  return (
    <div>
      <Select
        options={options}
        defaultValue={{
          value: node.default,
          label: node.default,
        }}
        onChange={handleChange}
      />
    </div>
  );
}
