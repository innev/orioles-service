const APP_KEY = 'aigrego';
const LICENSE_KEY: string = 'licenseKey';
export const TOKEN: string = 'token';
export const AVATAR: string = 'avatar';

export const set = (key: string, value: Object): any => {
  if (typeof window === 'undefined') return;

  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(`${APP_KEY}.${key}`, serializedValue);
  } catch (error) {
    throw new Error('store serialization failed');
  }
};

export const get = (key: string): any => {
  if (typeof window === 'undefined') return;

  try {
    const serializedValue = localStorage.getItem(`${APP_KEY}.${key}`);
    if (serializedValue == null) return;

    return JSON.parse(serializedValue);
  } catch (error) {
    throw new Error('store deserialization failed');
  }
};

const removeItem = (key: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${APP_KEY}.${key}`);
  } catch (error) {
    throw new Error('store deserialization failed');
  }
};

const clearAll = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.clear();
  } catch (error) {
    throw new Error('store deserialization failed');
  }
};

export const saveLicenseKey = (key: string): any => {
  return set(LICENSE_KEY, key);
};

export const loadLicenseKey = (): string => {
  return get(LICENSE_KEY) as string || '';
};