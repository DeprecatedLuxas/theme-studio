import { useUser } from "@auth0/nextjs-auth0";
import Loading from "@components/Loading";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import MobileWarning from "@components/Editor/MobileWarning";
import useStorage from "@hooks/useStorage";
import EditorHelper from "@helpers/editor";
import Navigation from "@components/Editor/Settings/Navigation";
import { useCallback, useEffect, useState } from "react";
import useIsMounted from "@hooks/use-is-mounted";
import GeneralTab from "@components/Editor/Settings/GeneralTab";
import PersonalizationTab from "@components/Editor/Settings/PersonalizationTab";
import { Button } from "@components/Forms";
import { usePrevious } from "@hooks/use-previous";
import { ThemeStorage } from "@lib/types";
import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";

export default function LocalSettings() {
  const { user, isLoading, error } = useUser();
  const [config, setConfig] = useRecoilState(setupState);

  const router = useRouter();
  const [tab, setTab] = useState<number>(1);
  const isMounted = useIsMounted();

  const { storage, setStorage, clear } = useStorage(
    "tstudio-theme",
    EditorHelper.getFakeStorage()
  );

  const prevSettings = usePrevious<ThemeStorage>(storage);

  const handleTabChange = useCallback((newTab: number) => {
    setTab(newTab);
  }, []);

  useEffect(() => {
    setConfig({
      ...EditorHelper.getFromStorage(storage),
    });
  }, [setConfig, storage]);

  if (!isMounted() && isLoading) {
    return <Loading />;
  }

  if (isMobile) {
    return <MobileWarning />;
  }

  // If user is authenticated, redirect to homepage.
  if (user) router.push("/");

  // If the user doesn't have something in the storage, redirect to the setup page
  if (EditorHelper.compare(storage, EditorHelper.getFakeStorage()))
    router.push("/edit/setup");

  const handleSave = () => {
    const currentSettings = {
      ...prevSettings,
      ...config,
    } as ThemeStorage;
    if (EditorHelper.compare(prevSettings!, currentSettings)) {
      // Nothing changed, will redirect to editor.
      router.push("/edit/local");
    } else {
      setStorage(currentSettings);
      router.push("/edit/local");
    }
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-gray-700">
        <div className="max-w-4xl w-full bg-white h-96 rounded p-4 flex flex-col">
          <div>
            <h1 className="text-2xl mb-4">Settings</h1>
          </div>
          <Navigation onClick={handleTabChange} currentTab={tab} />
          <div className="flex-1">
            {tab === 1 && <GeneralTab />}
            {tab === 2 && <PersonalizationTab />}
          </div>
          <div className="flex justify-end items-end">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}
