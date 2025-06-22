import { useState, useEffect } from 'react';
import { Theme, FontSize, AppearanceSettings, AccentColor, Density } from '../types';

const defaultSettings: AppearanceSettings = {
  theme: 'system',
  fontSize: 'medium',
  animations: true,
  density: 'normal',
  accentColor: 'teal',
  customColor: '#14b8a6',
  colorIntensity: 100,
  glowEffects: false,
  gradientAnimation: false
};

export const useAppearance = () => {
  const [settings, setSettings] = useState<AppearanceSettings>(() => {
    try {
      const saved = localStorage.getItem('lumeo-appearance');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Update resolved theme when theme or system preference changes
  useEffect(() => {
    const updateResolvedTheme = () => {
      if (settings.theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setResolvedTheme(systemPrefersDark ? 'dark' : 'light');
      } else {
        setResolvedTheme(settings.theme as 'light' | 'dark');
      }
    };

    updateResolvedTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (settings.theme === 'system') {
        updateResolvedTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [settings.theme]);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply font size
    root.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    root.classList.add(`font-size-${settings.fontSize}`);

    // Apply animations
    if (!settings.animations) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Apply density
    root.classList.remove('density-compact', 'density-normal', 'density-comfortable');
    root.classList.add(`density-${settings.density}`);

    // Apply accent color
    root.classList.remove(
      'accent-teal', 'accent-blue', 'accent-emerald', 'accent-purple', 'accent-amber', 'accent-rose', 'accent-indigo', 'accent-orange',
      'accent-red', 'accent-green', 'accent-yellow', 'accent-pink', 'accent-cyan', 'accent-lime', 'accent-violet', 'accent-fuchsia',
      'accent-neon-blue', 'accent-neon-green', 'accent-neon-pink', 'accent-neon-yellow', 'accent-neon-purple', 'accent-neon-orange',
      'accent-gold', 'accent-silver', 'accent-bronze', 'accent-copper', 'accent-platinum', 'accent-titanium',
      'accent-sunset', 'accent-ocean', 'accent-forest', 'accent-mountain', 'accent-sky', 'accent-earth',
      'accent-lavender', 'accent-mint', 'accent-peach', 'accent-baby-blue', 'accent-soft-pink', 'accent-cream',
      'accent-coral', 'accent-terracotta', 'accent-burgundy', 'accent-rust', 'accent-cinnamon', 'accent-paprika',
      'accent-steel', 'accent-slate', 'accent-navy', 'accent-arctic', 'accent-glacier', 'accent-storm',
      'accent-custom'
    );
    root.classList.add(`accent-${settings.accentColor}`);

    // Apply glow effects
    if (settings.glowEffects) {
      root.classList.add('glow-effects');
    } else {
      root.classList.remove('glow-effects');
    }

    // Apply gradient animation
    if (settings.gradientAnimation) {
      root.classList.add('gradient-animation');
    } else {
      root.classList.remove('gradient-animation');
    }

    // Apply color intensity
    root.style.setProperty('--color-intensity', `${settings.colorIntensity}%`);

    // Apply custom color if selected
    if (settings.accentColor === 'custom' && settings.customColor) {
      const hex = settings.customColor;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      
      // Generate color variations
      const primary = `rgb(${r}, ${g}, ${b})`;
      const secondary = `rgb(${Math.max(0, r - 20)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 20)})`;
      const light = `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`;
      const dark = `rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`;
      
      root.style.setProperty('--accent-primary', primary);
      root.style.setProperty('--accent-secondary', secondary);
      root.style.setProperty('--accent-light', light);
      root.style.setProperty('--accent-dark', dark);
      root.style.setProperty('--accent-50', `rgba(${r}, ${g}, ${b}, 0.05)`);
      root.style.setProperty('--accent-100', `rgba(${r}, ${g}, ${b}, 0.1)`);
      root.style.setProperty('--accent-500', primary);
      root.style.setProperty('--accent-600', secondary);
      root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${primary}, ${secondary})`);
    }

    // Save to localStorage
    localStorage.setItem('lumeo-appearance', JSON.stringify(settings));
  }, [settings, resolvedTheme]);

  const updateSettings = (newSettings: Partial<AppearanceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    resolvedTheme,
    updateSettings,
    resetToDefaults
  };
};