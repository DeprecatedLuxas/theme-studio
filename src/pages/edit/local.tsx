import { useUser } from "@auth0/nextjs-auth0";
import { FaPalette, FaKeyboard, FaCode } from "react-icons/fa";
import Loading from "@components/Editor/Loading";
import Setup from "@components/Setup/Setup";
import { default as Setupp } from "@components/Setup";
import { Nullable, SetupConfig } from "@lib/types";
import { useRouter } from "next/router";
import { useState } from "react";
import windy from "@helpers/windy";
import Settings from "@components/Editor/Settings";
import { BsStars, BsCloudDownload } from "react-icons/bs";
import VSCode from "@components/VSCode";
import { Tab } from "@headlessui/react";
import { v4 as uuid } from "uuid";
const Spacer = windy.div`
  h-1
  my-2
  rounded-lg
  border-gray-700
  border-b-2
`;

const testData = {
  palette: {},
  editor: {},
  syntax: {},
};

export default function EditLocal() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const [config, setConfig] = useState<Nullable<SetupConfig>>(null);

  if (isLoading) {
    return <Loading />;
  }

  if (user) router.push("/");

  // Make a check here to see if user already has a theme in local storage.
  // and set config after that.

  const handleSave = () => {};

  const handleDownload = () => {
    let link = document.createElement("a");
    link.download = "theme.json";
    let blob = new Blob([JSON.stringify({ hello: "what" })], {
      type: "application/json",
    });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Setup>
      {!config ? (
        <Setupp
          onComplete={(conf: SetupConfig) => {
            setConfig(conf);
          }}
        />
      ) : (
        <div className="flex h-screen">
          <div className="w-72 flex flex-col p-2 bg-gray-900">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl text-white font-roboto">Theme Studio</h1>
              <Settings />
            </div>
            <Spacer />
            <Tab.Group>
              <Tab.List className="flex justify-between px-16 py-4">
                <Tab className="p-2 rounded-lg cursor-pointer bg-gray-800">
                  <FaPalette size="20px" color="white" />
                </Tab>
                <Tab className="p-2 rounded-lg cursor-pointer bg-gray-800">
                  <FaKeyboard size="20px" color="white" />
                </Tab>
                <Tab className="p-2 rounded-lg cursor-pointer bg-gray-800">
                  <FaCode size="20px" color="white" />
                </Tab>
              </Tab.List>
              <Tab.Panels className="flex-1 overflow-y-auto">
                {Object.keys(testData).map((key: string) => (
                  <Tab.Panel key={uuid()}>
                    <p>{key}</p>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            <Spacer />
            <div className="w-full h-auto">
              <button
                className="w-56 mx-auto bg-blue-700 hover:bg-blue-800 text-white font-roboto my-2 py-2 rounded-xl block"
                onClick={handleSave}
              >
                <BsStars className="inline-block" /> Save
              </button>
              <button
                className="w-56 mx-auto bg-blue-700 hover:bg-blue-800 text-white font-roboto my-2 py-2 rounded-xl block"
                onClick={handleDownload}
              >
                <BsCloudDownload className="inline-block" /> Download
              </button>
            </div>
          </div>
          <div className="flex-1 p-8 bg-gray-700">
            <VSCode functional={false} />
          </div>
        </div>
      )}
    </Setup>
  );
}
