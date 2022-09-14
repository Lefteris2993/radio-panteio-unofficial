import React from 'react';
import useLocalStorage from 'utils/useLocalStorage';

interface LocalSettings {
  autoplay: boolean;
  volume: number;
}

interface LocalSettingsContextInterface {
  settings: LocalSettings,
  setSettings: React.Dispatch<React.SetStateAction<LocalSettings>>
}

interface LocalSettingsProviderProps {
  children: JSX.Element | JSX.Element[];
}

const defaultSettings: LocalSettings = {
  autoplay: false,
  volume: 0.5,
};

const defaultContext: LocalSettingsContextInterface = {
  settings: defaultSettings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSettings: (value: React.SetStateAction<LocalSettings>) => {},
};

export const LocalSettingsContext = React.createContext<
  LocalSettingsContextInterface
>(defaultContext);

export function LocalSettingsProvider({ children }: LocalSettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage<LocalSettings>('_local_settings', defaultSettings);

  const contextValue = React.useMemo<LocalSettingsContextInterface>(() => ({
    settings, setSettings,
  }), [settings]);

  return (
    <LocalSettingsContext.Provider value={contextValue}>
      {children}
    </LocalSettingsContext.Provider>
  );
}
