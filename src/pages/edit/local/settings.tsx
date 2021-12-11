import { useUser } from "@auth0/nextjs-auth0";
import Loading from "@components/Loading";
import { useRouter } from "next/router";
import Divider from "@components/Divider";
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
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@components/Dialog";
import { useBiscuitBox } from "@hooks/use-biscuit-box";
import { usePrevious } from "@hooks/use-previous";
import { ThemeStorage } from "@lib/types";
import { useRecoilState } from "recoil";
import { setupState } from "@recoil/atoms/setup";

export default function LocalSettings() {
  const { user, isLoading, error } = useUser();
  const { isOpen, onOpen, onClose } = useBiscuitBox();
  const [config, setConfig] = useRecoilState(setupState);

  const router = useRouter();
  const [tab, setTab] = useState<number>(1);
  const isMounted = useIsMounted();

  const { storage, setStorage, clear } = useStorage(
    "tstudio-theme",
    EditorHelper.getFakeStorage()
  );

  const prevSettings = usePrevious<ThemeStorage>(
    storage
  );

  const handleTabChange = useCallback((newTab: number) => {
    setTab(newTab);
  }, []);

  useEffect(() => {
    setConfig({
      ...EditorHelper.getFromStorage(storage),
    });
    console.log(config);

    // console.log(storage);
    console.log(prevSettings);

    // setTimeout(() => {
    //   console.log(prevSettings);
    // }, 2000);
  }, []);

  if (!isMounted() && isLoading) {
    return <Loading />;
  }

  if (isMobile) {
    return <MobileWarning />;
  }

  // If user is authenticated, redirect to homepage.
  if (user) router.push("/");

  // TODO: Fix this, it renders the page before this redirects.
  // If the user doesn't have something in the storage, redirect to the setup page
  if (EditorHelper.compare(storage, EditorHelper.getFakeStorage()))
    router.push("/edit/setup");

  const handlePreSave = () => {
    onOpen();
    // router.push("/edit/local");
  };

  const handleSave = () => {};

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-gray-700">
        <div className="max-w-4xl w-full bg-white min-h-96 rounded p-4 flex flex-col">
          <div>
            <h1 className="text-2xl mb-4">Settings</h1>
          </div>
          <Navigation onClick={handleTabChange} currentTab={tab} />
          <div className="flex-1">
            {tab === 1 && <GeneralTab />}
            {tab === 2 && <PersonalizationTab />}
          </div>
          <div className="flex justify-end items-end">
            <Button onClick={handlePreSave}>Save</Button>
          </div>
        </div>
      </div>
      <Dialog isOpen={isOpen} onClose={onClose}>
        <DialogHeader>Are you sure?</DialogHeader>
        <DialogBody>
          <p className="text-white mb-2">
            Are you sure, you are done with the setup?
          </p>
          <p>{JSON.stringify(prevSettings)}</p>
          {/* <p className="text-white mb-2">
            You can preview your setup{" "}
            <Link
              href={`/edit/setup/preview?preview=${encode(
                JSON.stringify(config)
              )}`}
              passHref
            >
              <a className="text-blue-400 underline" target="_blank">
                here
              </a>
            </Link>
          </p> */}
        </DialogBody>

        <DialogFooter>
          <Button onClick={onClose} className="mr-4">
            Close
          </Button>
          <Button onClick={handleSave}>Continue</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
