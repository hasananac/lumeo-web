import React, { createContext, useContext, ReactNode } from 'react';
import { useAppearance } from '../hooks/useAppearance';
import { AppearanceSettings } from '../types';

interface AppearanceContextType {
  settings: AppearanceSettings;
  resolvedTheme: 'light' | 'dark';
  updateSettings: (settings: Partial<AppearanceSettings>) => void;
  resetToDefaults: () => void;
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);

export const useAppearanceContext = () => {
  const context = useContext(AppearanceContext);
  if (context === undefined) {
    throw new Error('useAppearanceContext must be used within an AppearanceProvider');
  }
  return context;
};

interface AppearanceProviderProps {
  children: ReactNode;
}

export const AppearanceProvider: React.FC<AppearanceProviderProps> = ({ children }) => {
  const appearanceHook = useAppearance();

  return (
    <AppearanceContext.Provider value={appearanceHook}>
      {children}
    </AppearanceContext.Provider>
  );
};