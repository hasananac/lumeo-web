import { useState, useEffect } from 'react';
import { Language } from '../types';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('lumeo-language');
      return (saved as Language) || 'tr';
    } catch {
      return 'tr';
    }
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('lumeo-language', language);
    
    // Update document language
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return {
    language,
    changeLanguage
  };
};