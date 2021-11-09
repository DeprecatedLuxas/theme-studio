import { useBiscuitBox } from "@hooks/useBiscuitBox";
import { VscGear } from "react-icons/vsc";

export default function Settings() {
  const { isOpen, onOpen, onClose } = useBiscuitBox();
  return (
    <>
      <span className="text-2xl text-gray-500 font-roboto inline-block p-1 cursor-pointer" onClick={onOpen}>
        <VscGear />
      </span>
      
    </>
  );
}
