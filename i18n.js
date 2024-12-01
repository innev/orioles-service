'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // 加载语言文件
  .use(LanguageDetector) // 自动检测语言
  .use(initReactI18next) // 将 i18n 绑定到 react-i18next
  .init({
    fallbackLng: 'zh', // 默认语言
    supportedLngs: ['zh', 'en'], // 支持的语言
    // debug: process.env.NODE_ENV === 'development',
    debug: false,
    interpolation: {
      escapeValue: false, // React 已经默认转义
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // 加载语言文件的路径
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'], // 语言检测优先级
      caches: ['cookie'], // 将语言信息缓存到 Cookie 中
    },
  });

export default i18n;