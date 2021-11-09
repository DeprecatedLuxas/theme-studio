import { useUser } from "@auth0/nextjs-auth0";
import Loading from "@components/Editor/Loading";
import Setup from "@components/Setup";
import { Nullable, SetupConfig } from "@lib/types";
import { useRouter } from "next/router";
import { useState } from "react";
import windy from "@helpers/windy";
import Settings from "@components/Editor/Settings";
import { BsStars, BsCloudDownload } from "react-icons/bs";
import Tooltip from "@components/Tooltip";

const Spacer = windy.div`
  h-1
  my-2
  border-gray-400
  border-b-2
`;

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
    <>
      {!config ? (
        <Setup
          onComplete={(conf: SetupConfig) => {
            setConfig(conf);
          }}
        />
      ) : (
        <div className="flex h-screen">
          <div className="w-72 flex flex-col p-2 bg-gray-900">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl text-white font-roboto">Theme Studio</h1>
              <Tooltip label="What">
                <Settings />
              </Tooltip>
            </div>
            <Spacer />
            <div className="flex justify-between px-16 py-4"></div>
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
          <div className="flex-1 p-8 bg-gray-700"></div>
        </div>
      )}
    </>
  );
}
