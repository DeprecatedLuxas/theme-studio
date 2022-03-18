import { FeatonFeatures } from "../featon-features";

export const FeatonIndexedDB = {
  type: FeatonFeatures.INDEXED,
  runner: () => {
    const indexed = window.indexedDB;
    if (!indexed) {
      return false;
    }

    const dbName = "__featon-" + Math.random();

    let supported: boolean = true;

    const idbReq = indexed.open(dbName);

    idbReq.onerror = () => {
      if (
        idbReq.error &&
        (idbReq.error.name === "InvalidStateError" ||
          idbReq.error.name === "UnknownError")
      ) {
        supported = false;
      } else {
        supported = true;
        if (idbReq.result && idbReq.result.close) idbReq.result.close();
      }
    };

    idbReq.onsuccess = () => {
      supported = true;
      idbReq.result.close();
    };

    if (supported) {
      // The db has been created
      const deleteReq = indexed.deleteDatabase(dbName);

      deleteReq.onsuccess = () => {
        supported = true;
      };

      deleteReq.onerror = () => {
        supported = false;
      };
    }

    return supported;
  },
};
