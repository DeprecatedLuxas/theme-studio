import { useUser } from "@auth0/nextjs-auth0";
import Loading from "@components/Loading";
import { useRouter } from "next/router";
import Divider from "@components/Divider";
import { isMobile } from "react-device-detect";
import MobileWarning from "@components/Editor/MobileWarning";
import useStorage from "@hooks/useStorage";
import EditorHelper from "@helpers/editor";
import Navigation from "@components/Editor/Settings/Navigation";
import { useCallback, useState } from "react";
import useIsMounted from "@hooks/use-is-mounted";
import Button from "@components/Button";
export default function LocalSettings() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const [tab, setTab] = useState<number>(1);
  const isMounted = useIsMounted();
  const [completed, setCompleted] = useState<boolean>(false);
  const { storage, setStorage, clear } = useStorage(
    "theme",
    EditorHelper.getFakeStorage()
  );

  const handleTabChange = useCallback((newTab: number) => {
    setTab(newTab);
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

  const handleBack = () => setTab(tab - 1);

  const handleNext = () => {
    if (tab === 3) {
      /* onOpen(); */
    } else {
      const newTab = tab === 3 ? 1 : tab + 1;
      setTab(newTab);
    }
  };


  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-700">
      <div className="max-w-4xl w-full bg-white min-h-96 rounded p-4 flex flex-col">
        <div>
          <h1 className="text-2xl mb-4 ">Settings</h1>
        </div>
        <Navigation onClick={handleTabChange} currentTab={tab} />
        <div className="flex-1">
          {tab === 1 && <div>General</div>}
          {tab === 2 && <div>Palette</div>}
          {tab === 3 && <div>Personalization</div>}
        </div>
      </div>
    </div>
  );
}
