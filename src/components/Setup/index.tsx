import windy from "@helpers/windy";
import { SetupConfig } from "@lib/types";
import { useRef, useState } from "react";
import Config from "./Config";

const Button = windy.button`
  inline-flex
  appearance-none
  items-center
  justify-center
  select-none
  relative
  whitespace-nowrap
  align-middle
  outline-none
  rounded-md
  font-semibold
  h-10
  min-w-10
  px-4
  bg-green-700
  text-white
`;

const Input = windy.input`
  w-full
  min-w-0
  outline-none
  relative
  appearance-none
  px-4
  h-10
  rounded-md
  border
  border-gray-400
  font-roboto
`;

const Spacer = windy.div`
  h-1
  my-2
  border-gray-400
  border-b-2
`;

interface SetupProps {
  onComplete?: (config: SetupConfig) => void;
}

export default function Setup({ onComplete }: SetupProps) {
  const [config, setConfig] = useState<SetupConfig>({
    name: "Untitled",
    type: "dark",
    palette: [],
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const handleNameChange = () => {
    if (nameRef.current) {
      const name = nameRef.current.value.trim();
      if (name && name.length > 0 && name.length < 15) {
        setConfig({
          ...config,
          name: name,
        });
      }
    }
  };

  const handleTypeChange = (type: "dark" | "light") => {
    setConfig({
      ...config,
      type: type,
    });
  };
  return (
    <div className="h-screen w-full bg-gray-700 flex justify-center items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-5xl font-roboto text-white mb-4">Setup</h1>
        <div className="rounded-md shadow-xl bg-white h-auto p-2 flex flex-col">
          <div className="flex flex-row">
            <div className="flex-1">
              <label className="block font-roboto">Theme Name</label>
              <Input
                placeholder="Theme Name"
                ref={nameRef}
                onChange={handleNameChange}
              />
              <label className="block font-roboto mt-4">Theme Type</label>
              <div className="w-40 flex justify-between">
                <Button onClick={() => handleTypeChange("dark")}>Dark</Button>
                <Button onClick={() => handleTypeChange("light")}>Light</Button>
              </div>
            </div>
            <Config conf={config} />
          </div>
          <Spacer />
          <div className="flex-1 flex justify-end items-end">
            <Button
              onClick={() => {
                setConfig({
                  name: "Untitled",
                  type: "dark",
                  palette: [],
                });
              }}
            >
              Set Defaults
            </Button>

            <Button
              className="ml-4"
              onClick={() => {
                onComplete && onComplete(config);
              }}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
