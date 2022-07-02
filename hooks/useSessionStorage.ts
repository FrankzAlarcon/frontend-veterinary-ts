/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { User } from "../types/custom";

function useSessionStorage(initialState: unknown, key: string):[unknown, (value: unknown) =>void] {
  const [value, setValue] = useState<User | unknown>(initialState);
  
  useEffect(() => {
    const storageValue = sessionStorage.getItem(key);
    if (!storageValue) {
      sessionStorage.setItem(key, JSON.stringify(initialState));      
    } else {
      setValue(JSON.parse(storageValue));
    }
  }, [])

  const saveValue = (newValue: unknown) => {
    setValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, saveValue]
}

export default useSessionStorage