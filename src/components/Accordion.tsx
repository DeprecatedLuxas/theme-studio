import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
interface AccordionProps {
  text?: string;
  children?: ReactNode;
}

export default function Accordion({
  children,
  text = "Not defined",
}: AccordionProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="font-roboto flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-400 bg-gray-700 rounded-lg hover:bg-gray-600 mb-4"
      >
        {text.trim().length > 0 ? text : "Not defined"}
        {isOpen ? (
          <VscChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <VscChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <div>{isOpen && children}</div>
    </div>
  );
}
