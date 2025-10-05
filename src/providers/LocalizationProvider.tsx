import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import { KEYS } from '@constant';
import { en_US, fr_CA } from '@languages';
import useAsyncStorage from '@shared/hooks/useAsyncStorage';
import { LanguageCode, LocalizationContextProps, ProviderProps } from '@types';

const resources = {
  en_US: { translation: en_US },
  fr_CA: { translation: fr_CA },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'en_US',
  fallbackLng: 'en_US',
  interpolation: {
    escapeValue: false,
  },
});

const LocalizationContext = createContext<LocalizationContextProps | undefined>(
  undefined,
);

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      'useLocalization must be used within a LocalizationProvider',
    );
  }
  return context;
};

export const LocalizationProvider: React.FC<ProviderProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { fetchAsync, saveAsync } = useAsyncStorage();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(
    i18n.language as LanguageCode,
  );

  useEffect(() => {
    getSavedLanguage();
  }, []);

  const getSavedLanguage = useCallback(async () => {
    const fetchCurrentLanguage: any = await fetchAsync(KEYS.LANGUAGE);
    if (fetchCurrentLanguage) {
      setCurrentLanguage(fetchCurrentLanguage);
      i18n.changeLanguage(fetchCurrentLanguage);
    }
  }, []);

  const changeLanguage = async (lng: LanguageCode) => {
    i18n.changeLanguage(lng);
    await saveAsync(KEYS.LANGUAGE, lng);
    setCurrentLanguage(lng);
  };

  return (
    <LocalizationContext.Provider
      value={{
        t,
        changeLanguage,
        currentLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};
