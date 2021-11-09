import { ReactNode, useState } from "react";
import { Tab } from "@headlessui/react";
import windy from "@helpers/windy";
import Button from "@components/Button";

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
  const [tab, setTab] = useState<number>(0);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-700">
      <div className="max-w-3xl w-full">
        <Tab.Group defaultIndex={tab} onChange={(index) => setTab(index)}>
          <Tab.Panels className="bg-white rounded shadow min-h-96 p-2 flex flex-col">
            <div className="flex-1">
              <Tab.Panel>Tab 1</Tab.Panel>
              <Tab.Panel>Tab 2</Tab.Panel>
              <Tab.Panel>Tab 3</Tab.Panel>
            </div>
            <Spacer />
            <div className="flex justify-end items-end">
              <Button>{tab !== 2 ? "Next" : "Done"}</Button>
            </div>
          </Tab.Panels>
          <Tab.List className="w-64 mt-8 mx-auto flex justify-between">
            <Tab
              className={`h-1 w-12 rounded cursor-pointer ${
                tab === 0 ? "bg-blue-700" : "bg-blue-300"
              }`}
            />
            <Tab
              className={`h-1 w-12 rounded cursor-pointer ${
                tab === 1 ? "bg-blue-700" : "bg-blue-300"
              }`}
            />

            <Tab
              className={`h-1 w-12 rounded cursor-pointer ${
                tab === 2 ? "bg-blue-700" : "bg-blue-300"
              }`}
            />
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  );
}
