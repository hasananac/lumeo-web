export type Language = 'tr' | 'en';
export type Theme = 'light' | 'dark' | 'system';
export type FontSize = 'small' | 'medium' | 'large';
export type AccentColor = 
  // Classic Colors
  | 'teal' | 'blue' | 'emerald' | 'purple' | 'amber' | 'rose' | 'indigo' | 'orange'
  // Vibrant Colors
  | 'red' | 'green' | 'yellow' | 'pink' | 'cyan' | 'lime' | 'violet' | 'fuchsia'
  // Neon Colors
  | 'neon-blue' | 'neon-green' | 'neon-pink' | 'neon-yellow' | 'neon-purple' | 'neon-orange'
  // Metallic Colors
  | 'gold' | 'silver' | 'bronze' | 'copper' | 'platinum' | 'titanium'
  // Nature Colors
  | 'sunset' | 'ocean' | 'forest' | 'mountain' | 'sky' | 'earth'
  // Pastel Colors
  | 'lavender' | 'mint' | 'peach' | 'baby-blue' | 'soft-pink' | 'cream'
  // Warm Colors
  | 'coral' | 'terracotta' | 'burgundy' | 'rust' | 'cinnamon' | 'paprika'
  // Cool Colors
  | 'steel' | 'slate' | 'navy' | 'arctic' | 'glacier' | 'storm'
  // Custom
  | 'custom';

export type Density = 'compact' | 'normal' | 'comfortable';

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
  nativeName: string;
}

export interface ThemeConfig {
  id: Theme;
  name: string;
  icon: string;
  description: string;
}

export interface ColorConfig {
  id: AccentColor;
  name: string;
  primary: string;
  secondary: string;
  gradient: string;
  category?: 'classic' | 'vibrant' | 'neon' | 'metallic' | 'nature' | 'pastel' | 'warm' | 'cool' | 'custom';
  glow?: boolean;
  animated?: boolean;
}

export interface AppearanceSettings {
  theme: Theme;
  fontSize: FontSize;
  animations: boolean;
  density: Density;
  accentColor: AccentColor;
  customColor?: string;
  colorIntensity: number;
  glowEffects: boolean;
  gradientAnimation: boolean;
}

export interface Translations {
  welcome: {
    title: string;
    subtitle: string;
    description: string;
    selectLanguage: string;
    continue: string;
    features: {
      title: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
  };
  auth: {
    login: string;
    register: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    companyName: string;
    forgotPassword: string;
    loginButton: string;
    registerButton: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    loginHere: string;
    createFreeAccount: string;
    terms: string;
    privacy: string;
    acceptTerms: string;
    errors: {
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordMinLength: string;
      firstNameRequired: string;
      lastNameRequired: string;
      companyNameRequired: string;
      passwordMismatch: string;
    };
    passwordStrength: {
      label: string;
      weak: string;
      medium: string;
      strong: string;
    };
    passwordMatch: string;
  };
}