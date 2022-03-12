import { FeatonFeatures } from "@theme-studio/core";
import { useFeaton } from "@theme-studio/ui";
import { useEffect } from "react";

export default function Test() {
  const { fetch, localStorage, sessionStorage, webWorker } = useFeaton({
    features: [
      FeatonFeatures.FETCH,
      FeatonFeatures.LOCAL_STORAGE,
      FeatonFeatures.SESSION_STORAGE,
      FeatonFeatures.WEB_WORKER,
    ],
  });
  useEffect(() => {
    console.log("Hello");
  }, []);

  return (
    <div>
      <p>{JSON.stringify(fetch)}</p>
      <p>{JSON.stringify(localStorage)}</p>
      <p>{JSON.stringify(sessionStorage)}</p>
      <p>{JSON.stringify(webWorker)}</p>
    </div>
  );
}
