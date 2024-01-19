import { useEffect, useState } from "react";
import { useStorage } from "@/hooks/useStorage";
import { StorageID } from "@/types/storage.enum";
import { AppSettings } from "@/types/settings.interface";
import { CardBackStyle, Theme } from "@/types/settings.enum";

const defaultAppSettings: AppSettings = {
  game: {
    cards: {
      well: false,
    },
  },
  theme: Theme.DARK,
  cardBackStyle: CardBackStyle.DEFAULT,
};

interface UseAppSettingsReturn {
  appSettings: AppSettings;
  saveAppSettings: (settings: AppSettings) => void;
  clearHistory: () => void;
}

const useAppSettings = (): UseAppSettingsReturn => {
  const { getFromLocalStorage, setInLocalStorage, removeFromLocalStorage } =
    useStorage();

  const [appSettings, setAppSettings] = useState<AppSettings>(
    (getFromLocalStorage<AppSettings>(StorageID.APP_SETTINGS) as AppSettings) ||
      defaultAppSettings
  );

  useEffect(() => {
    const appSettings = getFromLocalStorage<AppSettings>(
      StorageID.APP_SETTINGS
    );
    if (appSettings && typeof appSettings !== "string")
      setAppSettings(appSettings);
  }, []);

  useEffect(() => {
    if (appSettings) setInLocalStorage(StorageID.APP_SETTINGS, appSettings);
  }, [appSettings]);

  const saveAppSettings = (settings: AppSettings) => {
    setAppSettings((prev) => ({ ...prev, settings }));
  };

  const clearHistory = () => {
    setAppSettings(defaultAppSettings);
    removeFromLocalStorage([StorageID.APP_SETTINGS]);
  };

  return { appSettings, saveAppSettings, clearHistory };
};

export default useAppSettings;
