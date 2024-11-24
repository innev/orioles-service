import OSS from "ali-oss";

interface IExpirationValue {
  value: OSS.Options,
  expiration: number
}

const setSTSCache = (key: string, value: OSS.Options, expire: number = 60000): void => {
  const expiration: number = new Date().getTime() + expire;
  sessionStorage.setItem(key, JSON.stringify({ value, expiration }));
};

const getSTSCache = (key: string): OSS.Options|null => {
  const itemStr: string | null = sessionStorage.getItem(key);
  if (!itemStr) return null;

  const item: IExpirationValue = JSON.parse(itemStr);
  const expiration: number = new Date().getTime();
  if (expiration > item.expiration) {
    sessionStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export default {
  setSTSCache,
  getSTSCache
};