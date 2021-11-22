import { useEffect, useRef, useState } from "react";
import tinycolor from "tinycolor2";

interface EditableInputProps {
  color?: string;
}

export default function EditableInput({ color }: EditableInputProps) {
  const [value, setValue] = useState<string | number | undefined>(color);

  useEffect(() => {
    if (color !== value) {
      setValue(color);
    }
  }, [color, value]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (tinycolor(value).isValid()) {
      setValue(value);
    }
    setValue(value);
  };
  return (
    <input
      ref={inputRef}
      defaultValue={value}
      onChange={handleChange}
      type="text"
      placeholder="Hex"
      className="w-full min-w-0 outline-none relative appearance-none px-4 h-8 rounded-md border border-gray-400 font-roboto mt-4"
      maxLength={9}
    />
  );
}
