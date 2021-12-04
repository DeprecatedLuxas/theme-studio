import { useCallback, useState } from "react";
import Button from "@components/Button";
import { setupState } from "@recoil/atoms/setup";
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
import EditorWarning from "@components/Editor/EditorWarning";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@components/Dialog";
import Link from "next/link";
import { useBiscuitBox } from "@hooks/use-biscuit-box";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { v4 as uuid } from "uuid";
import Divider from "@components/Divider";
import useIsMounted from "@hooks/use-is-mounted";
import { encode } from "@helpers/encoding";

export default function Setup() {
  const isMounted = useIsMounted();
  const { isOpen, onOpen, onClose } = useBiscuitBox();
  const [completed, setCompleted] = useState<boolean>(false);
  const { user, isLoading, error } = useUser();
  const [config, ,] = useRecoilState(setupState);

  const { storage, setStorage, clear } = useStorage(
    "theme",
    EditorHelper.getFakeStorage()
  );

  const [tab, setTab] = useState<number>(1);
  const router = useRouter();

  const handleTabChange = useCallback((newTab: number) => {
    setTab(newTab);
  }, []);

  if (!isMounted() && isLoading) {
    return <Loading />;
  }

  if (isMobile) {
    return <EditorWarning />;
  }

  if (
    !EditorHelper.compare(storage, EditorHelper.getFakeStorage()) &&
    !completed
  ) {
    return <StorageFound clearStorage={clear} />;
  }

  const handleBack = () => setTab(tab - 1);

  const handleNext = () => {
    if (tab === 3) {
      onOpen();
    } else {
      const newTab = tab === 3 ? 1 : tab + 1;
      setTab(newTab);
    }
  };

  const handleComplete = () => {
    setCompleted(true);
    if (!user) {
      setStorage(EditorHelper.getFromSetupConfig(config));
    } else {
      console.log("Save to db plz");
    }
    router.push(`/edit/${!user ? "local" : `${uuid()}`}`);
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-gray-700">
        <div className="max-w-4xl w-full flex">
          <SetupNavigation
            onClick={handleTabChange}
            currentTab={tab}
            config={config}
          />
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
              <Button onClick={handleNext}>
                {tab !== 3 ? "Next" : "Done"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog isOpen={isOpen} onClose={onClose}>
        <DialogHeader>Are you sure?</DialogHeader>
        <DialogBody>
          <p className="text-white mb-2">
            Are you sure, you are done with the setup?
          </p>

          <p className="text-white mb-2">
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
          </p>
        </DialogBody>

        <DialogFooter>
          <Button onClick={onClose} className="mr-4">
            Close
          </Button>
          <Button onClick={handleComplete}>Continue</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
