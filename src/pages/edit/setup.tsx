import { ReactNode, useEffect, useRef, useState } from "react";
import windy from "@helpers/windy";
import Button from "@components/Button";
import { setupState } from "src/recoil/atoms/setup";
import { useRecoilState } from "recoil";
import { isMobile } from "react-device-detect";
import EditorHelper from "@helpers/editor";
import useStorage from "@hooks/useStorage";
import StorageFound from "@components/Editor/StorageFound";
import Loading from "@components/Editor/Loading";
import InputSection from "@components/Setup/InputSection";
import TypeSection from "@components/Setup/TypeSection";
import PaletteTab from "@components/Setup/PaletteTab";
import EditWarning from "@components/EditWarning";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { v4 as uuid } from "uuid";

const Spacer = windy.div`
  h-1
  my-2
  border-gray-400
  border-b-2
`;

export default function Setup() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { user, isLoading, error } = useUser();
  const [config, setConfig] = useRecoilState(setupState);

  const { storage, setStorage, clear } = useStorage(
    "theme",
    EditorHelper.getFakeStorage()
  );

  const [tab, setTab] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
  }, []);
  
  if (!mounted && isLoading) {
    return <Loading />;
  }

  if (isMobile) {
    return <EditWarning />;
  }

  if (!EditorHelper.compare(storage, EditorHelper.getFakeStorage())) {
    return <StorageFound clearStorage={clear} />;
  }



  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-700">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded shadow min-h-96 p-2 flex flex-col">
          <div className="flex-1">
            {tab === 1 && (
              <div>
                <InputSection />
                <TypeSection />
              </div>
            )}
            {tab === 2 && <PaletteTab />}
            {tab === 3 && <div>Currently not implemented.</div>}
          </div>
          <Spacer />
          <div className="flex justify-end items-end">
            {tab !== 1 && (
              <Button
                onClick={() => {
                  setTab(tab - 1);
                }}
                className="mr-2"
              >
                Back
              </Button>
            )}
            <Button
              onClick={() => {
                if (tab === 3) {
                  setStorage(EditorHelper.getFromSetupConfig(config))
                  router.push(`/edit/${!user ? "local" : `${uuid()}`}`);
                } else {
                  const newTab = tab === 3 ? 1 : tab + 1;
                  setTab(newTab);
                }
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
  );
}
