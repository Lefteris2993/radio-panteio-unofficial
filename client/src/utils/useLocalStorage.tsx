import React, { useEffect, useState } from 'react';

function getSavedValue(key: string, initValue: any) {
  const savedRaw = localStorage.getItem(key);
  const savedJson = JSON.parse(savedRaw !== 'undefined' && savedRaw ? savedRaw : 'null');

  return savedJson || initValue;
}

export default function useLocalStorage<T>(key: string, initValue: T) {
  const [value, setValue] = useState<T>(() => getSavedValue(key, initValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
