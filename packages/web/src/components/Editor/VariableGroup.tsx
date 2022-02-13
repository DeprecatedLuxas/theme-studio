import { VariablePossibleCategories } from "@lib/types";
import { PropsWithChildren, useState } from "react";
import Icon from "@components/Icon";
export interface VariableGroupProps {
  groupName: VariablePossibleCategories;
}

export default function VariableGroup({
  groupName,
  children,
}: PropsWithChildren<VariableGroupProps>): JSX.Element {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <section>
      <button
        onClick={handleClick}
        className="font-semibold flex justify-between w-full px-4 py-3 text-md text-left text-gray-400 bg-gray-700 rounded hover:bg-gray-600 mb-2"
      >
        {groupName.trim().length > 0 ? groupName : "Not defined"}
        {isOpen ? (
          <Icon icon="VscChevronUp" className="w-5 h-5 text-gray-400" />
        ) : (
          <Icon icon="VscChevronDown" className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <div>{isOpen && children}</div>
    </section>
  );
}
