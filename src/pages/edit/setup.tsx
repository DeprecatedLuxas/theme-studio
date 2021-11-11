import { ReactNode, useEffect, useState } from "react";
import windy from "@helpers/windy";
import Button from "@components/Button";
import { setupState } from "src/recoil/atoms/setup";
import { useRecoilState } from "recoil";
import { useLocalStorage } from "@hooks/useLocalStorage";
import EditorHelper from "@helpers/editor";
import { BsFillTrashFill } from "react-icons/bs";
import useStorage from "@hooks/useStorage";

const Spacer = windy.div`
  h-1
  my-2
  border-gray-400
  border-b-2
`;

export default function Setup() {
  const { storage, setStorage, clear } = useStorage(
    "theme",
    EditorHelper.getFakeStorage()
  );

  const [config, setConfig] = useRecoilState(setupState);
  const [tab, setTab] = useState<number>(1);

  if (
    !EditorHelper.compare(
      JSON.parse(JSON.stringify(storage)),
      EditorHelper.getFakeStorage()
    )
  ) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-gray-700">
        <div className="max-w-lg w-full bg-white rounded min-h-56 p-4 flex flex-col">
          <h1 className="mb-4 text-4xl font-roboto font-bold">Oh wait..</h1>
          <p className="font-roboto">
            You already have a theme in your storage, do you want to continue
            editing that or you can start from a fresh?
          </p>
          <div className="flex-1 flex justify-between items-end w-3/5 mx-auto">
            <button
              onClick={() => clear()}
              className="w-32 mx-auto bg-blue-700 hover:bg-blue-800 text-white font-roboto my-2 py-2 rounded"
            >
              Start from new
            </button>
            <button className="w-32 mx-auto bg-blue-700 hover:bg-blue-800 text-white font-roboto my-2 py-2 rounded">
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

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
