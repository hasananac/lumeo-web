import React, { createContext, useContext, ReactNode } from 'react';
import { useAppearanceContext } from './AppearanceProvider';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  changeTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { settings, resolvedTheme, updateSettings } = useAppearanceContext();

  const changeTheme = (theme: Theme) => {
    updateSettings({ theme });
  };

  const value = {
    theme: settings.theme,
    resolvedTheme,
    changeTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};