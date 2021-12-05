import { useUser } from "@auth0/nextjs-auth0";
import Loading from "@components/Loading";
import { useRouter } from "next/router";

import { isMobile } from "react-device-detect";
import MobileWarning from "@components/Editor/MobileWarning";
import useStorage from "@hooks/useStorage";
import EditorHelper from "@helpers/editor";

export default function LocalSettings() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  const { storage, setStorage, clear } = useStorage(
    "theme",
    EditorHelper.getFakeStorage()
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isMobile) {
    return <MobileWarning />;
  }

  // If user is authenticated, redirect to homepage.
  if (user) router.push("/");

  // TODO: Fix this, it renders the page before this shows.
  // If the user doesn't have something in the storage, redirect to the setup page
  if (EditorHelper.compare(storage, EditorHelper.getFakeStorage()))
    router.push("/edit/setup");

  return <div className="flex h-screen">Not implemented yet.</div>;
}
