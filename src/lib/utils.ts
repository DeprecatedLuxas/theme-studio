export const __DEV__ = process.env.NODE_ENV !== "production";

// TODO: Rewrite this.
export function getPropertyDifferences(obj1: any, obj2: any) {
  return Object.entries(obj1).reduce((diff, [key, value]) => {
    if (obj2.hasOwnProperty(key)) {
      const val = obj2[key];

      if (val !== value) {
        return {
          ...diff,
          [key]: val,
        };
      }
    }

    return diff;
  }, {});
}


export function isBrowser(): boolean {
  return Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );
}
