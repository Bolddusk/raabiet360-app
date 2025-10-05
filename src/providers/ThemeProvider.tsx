import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { KEYS, THEME } from '@constant';
import useAsyncStorage from '@shared/hooks/useAsyncStorage';
import { DARK_COLOR, LIGHT_COLOR } from '@styles/theme';
import { ProviderProps, ThemeContextProps } from '@types';

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<ProviderProps> = ({ children }) => {
  const [colors, setColors] = useState(LIGHT_COLOR);
  const { fetchAsync, saveAsync } = useAsyncStorage();
  const [currentTheme, setCurrentMode] = useState(THEME.LIGHT);

  const getSavedTheme = useCallback(async () => {
    const fetchCurrentTheme = await fetchAsync(KEYS.THEME);
    if (fetchCurrentTheme === THEME.DARK) {
      setCurrentMode(THEME.DARK);
      setColors(DARK_COLOR);
    } else if (fetchCurrentTheme === THEME.LIGHT) {
      setCurrentMode(THEME.LIGHT);
      setColors(LIGHT_COLOR);
    }
  }, [fetchAsync]);

  useEffect(() => {
    getSavedTheme();
  }, [getSavedTheme]);

  const onThemeShift = useCallback(async () => {
    setCurrentMode(prevMode => {
      const newMode = prevMode === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
      setColors(newMode === THEME.LIGHT ? LIGHT_COLOR : DARK_COLOR);
      saveAsync(KEYS.THEME, newMode);
      return newMode;
    });
  }, [saveAsync]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        THEME_COLOR: colors,
        toggleTheme: onThemeShift,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
