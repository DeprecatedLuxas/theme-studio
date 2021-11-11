import { useState } from "react";

export default function useStorage<T>(
  key: string,
  initialValue: T
): {
  storage: T;
  setStorage: (value: T) => void;
  clear: Function;
} {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return {
    storage: storedValue,
    setStorage: setValue,
    clear: () => {
      try {
        window.localStorage.removeItem(key);
        setStoredValue(null);
      } catch (error) {
        console.log(error);
      }
    },
  };
}
