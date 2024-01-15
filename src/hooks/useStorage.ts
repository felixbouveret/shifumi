const getFromStorage = <T>(
  key: string,
  storage: Storage
): T | string | undefined => {
  const result = storage.getItem(key);
  if (result) {
    try {
      return JSON.parse(result) as T;
    } catch (e) {
      return result;
    }
  }
  return undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setInStorage = (key: string, value: any, storage: Storage): void => {
  const formattedValue =
    typeof value === "object" ? JSON.stringify(value) : value || "";
  storage.setItem(key, formattedValue);
};

const removeFromStorage = (keys: string[], storage: Storage): void => {
  keys.forEach((key) => storage.removeItem(key));
};

const clearStorage = (storage: Storage): void => {
  storage.clear();
};

const getFromLocalStorage = <T>(key: string): T | string | undefined => {
  return getFromStorage(key, window.localStorage);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setInLocalStorage = (key: string, value: any): void => {
  setInStorage(key, value, window.localStorage);
};

const removeFromLocalStorage = (keys: string[]): void => {
  removeFromStorage(keys, window.localStorage);
};

const clearLocalStorage = (preserve: string[] = []): void => {
  const stored: Array<{ key: string; value: unknown }> = [];
  for (const item of preserve) {
    stored.push({ key: item, value: getFromLocalStorage(item) });
  }
  clearStorage(window.localStorage);
  for (const s of stored) {
    setInLocalStorage(s.key, s.value);
  }
};

export const useStorage = () => ({
  getFromLocalStorage,
  setInLocalStorage,
  removeFromLocalStorage,
  clearLocalStorage,
});
