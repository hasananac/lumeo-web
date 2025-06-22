import { Translations, Language } from '../types';

export const translations: Record<Language, Translations> = {
  tr: {
    welcome: {
      title: 'Lumeo\'ya Hoş Geldiniz',
      subtitle: 'İş Dünyasının Dijital Kalbi',
      description: 'Modern şirket yönetimi için tasarlanmış, güçlü ve kullanıcı dostu platform ile işletmenizi dijital çağa taşıyın.',
      selectLanguage: 'Dil Seçiniz',
      continue: 'Devam Et',
      features: {
        title: 'Neden Lumeo?',
        items: [
          {
            title: 'Akıllı Yönetim',
            description: 'Yapay zeka destekli iş süreçleri ile verimliliğinizi artırın'
          },
          {
            title: 'Güvenli Altyapı',
            description: 'Kurumsal düzeyde güvenlik ile verileriniz her zaman korunur'
          },
          {
            title: 'Kolay Entegrasyon',
            description: 'Mevcut sistemlerinizle sorunsuz entegrasyon imkanı'
          }
        ]
      }
    },
    auth: {
      login: 'Giriş Yap',
      register: 'Hesap Oluştur',
      email: 'E-posta Adresi',
      password: 'Şifre',
      confirmPassword: 'Şifre Onayı',
      firstName: 'Ad',
      lastName: 'Soyad',
      companyName: 'Şirket Adı',
      forgotPassword: 'Şifrenizi mi unuttunuz?',
      loginButton: 'Lumeo\'ya Giriş Yap',
      registerButton: 'Hesap Oluştur',
      alreadyHaveAccount: 'Zaten hesabınız var mı?',
      dontHaveAccount: 'Hesabınız yok mu?',
      loginHere: 'Buradan giriş yapın',
      createFreeAccount: 'Ücretsiz hesap oluşturun',
      terms: 'Kullanım Şartları',
      privacy: 'Gizlilik Politikası',
      acceptTerms: 'Hesap oluşturarak',
      errors: {
        emailRequired: 'E-posta adresi gereklidir',
        emailInvalid: 'Lütfen geçerli bir e-posta adresi girin',
        passwordRequired: 'Şifre gereklidir',
        passwordMinLength: 'Şifre en az 8 karakter olmalıdır',
        firstNameRequired: 'Ad gereklidir',
        lastNameRequired: 'Soyad gereklidir',
        companyNameRequired: 'Şirket adı gereklidir',
        passwordMismatch: 'Şifreler eşleşmiyor'
      },
      passwordStrength: {
        label: 'Şifre gücü:',
        weak: 'Zayıf',
        medium: 'Orta',
        strong: 'Güçlü'
      },
      passwordMatch: 'Şifreler eşleşiyor'
    }
  },
  en: {
    welcome: {
      title: 'Welcome to Lumeo',
      subtitle: 'The Digital Heart of Business',
      description: 'Transform your business into the digital age with our powerful and user-friendly platform designed for modern company management.',
      selectLanguage: 'Select Language',
      continue: 'Continue',
      features: {
        title: 'Why Lumeo?',
        items: [
          {
            title: 'Smart Management',
            description: 'Boost your productivity with AI-powered business processes'
          },
          {
            title: 'Secure Infrastructure',
            description: 'Your data is always protected with enterprise-grade security'
          },
          {
            title: 'Easy Integration',
            description: 'Seamless integration with your existing systems'
          }
        ]
      }
    },
    auth: {
      login: 'Sign In',
      register: 'Create Account',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      companyName: 'Company Name',
      forgotPassword: 'Forgot your password?',
      loginButton: 'Sign In to Lumeo',
      registerButton: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: 'Don\'t have an account?',
      loginHere: 'Sign in here',
      createFreeAccount: 'Create free account',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      acceptTerms: 'By creating an account',
      errors: {
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 8 characters',
        firstNameRequired: 'First name is required',
        lastNameRequired: 'Last name is required',
        companyNameRequired: 'Company name is required',
        passwordMismatch: 'Passwords do not match'
      },
      passwordStrength: {
        label: 'Password strength:',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong'
      },
      passwordMatch: 'Passwords match'
    }
  }
};

export const languages = [
  { code: 'tr' as Language, name: 'Türkçe', flag: 'tr', nativeName: 'Türkçe' },
  { code: 'en' as Language, name: 'English', flag: 'en', nativeName: 'English' }
];