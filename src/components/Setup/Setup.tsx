import { ReactNode, useState } from "react";
import { Tab } from "@headlessui/react";
import windy from "@helpers/windy";
import Button from "@components/Button";
import { setupState } from "src/recoil/atoms/setup";
import { useRecoilState } from "recoil";

const Spacer = windy.div`
  h-1
  my-2
  border-gray-400
  border-b-2
`;

interface SetupProps {
  children?: ReactNode;
}

export default function Setup({ children }: SetupProps) {
  const [config, setConfig] = useRecoilState(setupState);
  const [tab, setTab] = useState<number>(1);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-700">
      <div className="max-w-3xl w-full">
        <div>
          <div className="bg-white rounded shadow min-h-96 p-2 flex flex-col">
            <div className="flex-1">
              {tab === 1 && <div>Tab 1</div>}
              {tab === 2 && <div>Tab 2</div>}
              {tab === 3 && (
                <div>
                  <h1>H</h1>
                </div>
              )}
            </div>
            <Spacer />
            <div className="flex justify-end items-end">
              <Button
                onClick={() => {
                  const newTab = tab === 3 ? 1 : tab + 1;
                  setTab(newTab);
                }}
              >
                {tab !== 3 ? "Next" : "Done"}
              </Button>
            </div>
          </div>
          <div className="w-64 mt-8 mx-auto flex justify-between">
            <div
              className={`h-1 w-12 rounded cursor-pointer ${
                tab === 1 ? "bg-blue-700" : "bg-blue-300"
              }`}
              onClick={() => setTab(1)}
            />
            <div
              className={`h-1 w-12 rounded cursor-pointer ${
                tab === 2 ? "bg-blue-700" : "bg-blue-300"
              }`}
              onClick={() => setTab(2)}
            />

            <div
              className={`h-1 w-12 rounded cursor-pointer ${
                tab === 3 ? "bg-blue-700" : "bg-blue-300"
              }`}
              onClick={() => setTab(3)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
