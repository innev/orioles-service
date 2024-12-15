'use client'

import i18n from '@/lib/i18n-client';

export default function LanguageSwitcher() {
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }

  return (
    <div>
      <button onClick={() => changeLanguage('zh')} className="mr-2">
        中文
      </button>
      <button onClick={() => changeLanguage('en')}>
        English
      </button>
    </div>
  )
}