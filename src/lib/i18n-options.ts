export const fallbackLng = 'zh';
export const languages = ['zh', 'en'];
export const defaultNS = 'common';

export const getOptions = (lng = fallbackLng, ns = defaultNS) => {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  };
};