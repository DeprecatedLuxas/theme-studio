import { useCallback, useEffect, useState } from "react";
import Button from "@components/Button";
import { setupState } from "src/recoil/atoms/setup";
import { useRecoilState } from "recoil";
import {
  SetupNavigation,
  GeneralTab,
  PaletteTab,
  PersonalizationTab,
} from "@components/Setup";
import { isMobile } from "react-device-detect";
import EditorHelper from "@helpers/editor";
import useStorage from "@hooks/useStorage";
import StorageFound from "@components/Editor/StorageFound";
import Loading from "@components/Loading";
import SecondTab from "@components/Setup/SecondTab";
import EditWarning from "@components/Editor/EditorWarning";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { v4 as uuid } from "uuid";
import Divider from "@components/Divider";
import useIsMounted from "@hooks/use-is-mounted";

const bottomNav = [1, 2, 3];

export default function Setup() {
  const isMounted = useIsMounted();
  const [completed, setCompleted] = useState<boolean>(false);
  const { user, isLoading, error } = useUser();
  const [config, ,] = useRecoilState(setupState);

  // const { storage, setStorage, clear } = useStorage(
  //   "theme",
  //   EditorHelper.getFakeStorage()
  // );

  const [tab, setTab] = useState<number>(1);
  // const router = useRouter();

  const handleTabChange = useCallback((newTab: number) => {
    setTab(newTab);
  }, []);

  if (!isMounted() && isLoading) {
    return <Loading />;
  }

  // if (isMobile) {
  //   return <EditWarning />;
  // }

  // if (!EditorHelper.compare(storage, EditorHelper.getFakeStorage()) && !completed) {
  //   return <StorageFound clearStorage={clear} />;
  // }

  const handleBack = () => setTab(tab - 1);

  const handleNext = () => {
    if (tab === 3) {
      // setCompleted(true);
      // setStorage(EditorHelper.getFromSetupConfig(config));
      // router.push(`/edit/${!user ? "local" : `${uuid()}`}`);
    } else {
      const newTab = tab === 3 ? 1 : tab + 1;
      setTab(newTab);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-700">
      <div className="max-w-4xl w-full flex">
        <SetupNavigation onClick={handleTabChange} currentTab={tab} />
        <div className="flex-1 bg-white rounded flex flex-col p-2">
          <div className="flex-1">
            {tab === 1 && <GeneralTab />}
            {tab === 2 && <PaletteTab />}
            {tab === 3 && <PersonalizationTab />}
          </div>
          <Divider />
          <div className="flex justify-end items-end">
            {tab !== 1 && (
              <Button onClick={handleBack} className="mr-2">
                Back
              </Button>
            )}
            <Button onClick={handleNext}>{tab !== 3 ? "Next" : "Done"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
