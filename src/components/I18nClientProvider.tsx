'use client';

import { ReactNode, useEffect } from 'react';
import i18n from '../lib/i18n-client';

interface I18nClientProviderProps {
  children: ReactNode;
  lng: string;
}

export default function I18nClientProvider({ children, lng }: I18nClientProviderProps) {
  useEffect(() => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng]);

  return <>{children}</>;
}

