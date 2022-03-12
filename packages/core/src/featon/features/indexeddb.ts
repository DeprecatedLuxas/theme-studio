import { FeatonFeatures } from "../featon-features";


// TODO: After this is done, IndexedDB still shows a db, but it's empty or glitched somehow?.
export const FeatonIndexedDB = {
  type: FeatonFeatures.INDEXED,
  runner: () => {
    const indexed = window.indexedDB;
    if (!indexed) {
      return false;
    }
    const dbName = "featon-" + Math.random();
    let supported: boolean = true;

    const idbReq = indexed.open(dbName);

    idbReq.onerror = () => {
      if (idbReq.error && idbReq.error.name === "InvalidStateError") {
        supported = false;
      } else {
        supported = true;
      }
    };

    idbReq.onsuccess = () => {
      supported = true;
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
