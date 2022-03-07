import { Ref, RefObject } from "react";

type Mutable<T> = {
  -readonly [k in keyof T]: T[k];
};

const mergeRefs =
  <T>(...refs: Ref<T>[]) =>
  (value: T): void => {
    for (let i = 0; i < refs.length; i += 1) {
      const ref = refs[i];

      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        (ref as Mutable<RefObject<T>>).current = value;
      }
    }
  };

export default mergeRefs;
