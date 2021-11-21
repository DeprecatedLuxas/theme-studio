import { VariablePossibleCategories } from "@lib/types";
import { PropsWithChildren, useState } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

export interface VariableGroupProps {
  groupName: VariablePossibleCategories;
}

export default function VariableGroup({
  groupName,
  children,
}: PropsWithChildren<VariableGroupProps>): JSX.Element {
  const [isOpen, setOpen] = useState<boolean>(false);
  // const { values, updateValues } = useCollapseContext();

  const handleClick = () => {
    setOpen(!isOpen);
  };
  return (
    <section>
      <button
        onClick={handleClick}
        className="font-roboto flex justify-between w-full px-4 py-3 text-md font-semibold text-left text-gray-400 bg-gray-700 rounded hover:bg-gray-600 mb-4"
      >
        {groupName.trim().length > 0 ? groupName : "Not defined"}
        {isOpen ? (
          <VscChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <VscChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <div>{isOpen && children}</div>
    </section>
  );
}
