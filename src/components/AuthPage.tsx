import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Building2, Mail, Lock, User, CheckCircle, AlertCircle, Sparkles, ArrowLeft, Phone, Send } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import CountryCodeSelector, { countries, Country } from './CountryCodeSelector';

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone: string;
}

interface AuthPageProps {
  language: Language;
  onBack: () => void;
  onForgotPassword: () => void;
  onShowTerms: () => void;
  onShowPrivacy: () => void;
  onLogin: (userInfo: UserInfo) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ language, onBack, onForgotPassword, onShowTerms, onShowPrivacy, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // Default to Turkey
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string>('');
  
  // Inline verification states
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [isSendingEmailCode, setIsSendingEmailCode] = useState(false);
  const [isSendingPhoneCode, setIsSendingPhoneCode] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Check if user has a remembered session
    const rememberedUser = localStorage.getItem('lumeo-remembered-user');
    if (rememberedUser) {
      try {
        const userData = JSON.parse(rememberedUser);
        setFormData(prev => ({ ...prev, email: userData.email }));
        setRememberMe(true);
      } catch (error) {
        console.error('Error parsing remembered user data:', error);
        localStorage.removeItem('lumeo-remembered-user');
      }
    }
  }, []);

  const t = translations[language];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Basic phone validation - at least 7 digits
    const phoneRegex = /^\d{7,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone);
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 2) return { text: t.auth.passwordStrength.weak, color: 'text-red-500', bgColor: 'bg-red-500' };
    if (strength < 4) return { text: t.auth.passwordStrength.medium, color: 'text-amber-500', bgColor: 'bg-amber-500' };
    return { text: t.auth.passwordStrength.strong, color: 'text-emerald-500', bgColor: 'bg-emerald-500' };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Reset verification status when email or phone changes
    if (name === 'email' && emailVerified) {
      setEmailVerified(false);
      setEmailVerificationSent(false);
      setEmailVerificationCode('');
    }
    if (name === 'phone' && phoneVerified) {
      setPhoneVerified(false);
      setPhoneVerificationSent(false);
      setPhoneVerificationCode('');
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const sendEmailVerification = async () => {
    if (!formData.email || !validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: t.auth.errors.emailInvalid }));
      return;
    }

    setIsSendingEmailCode(true);
    // Simulate API call
    setTimeout(() => {
      setEmailVerificationSent(true);
      setIsSendingEmailCode(false);
      console.log('Email verification sent to:', formData.email);
    }, 1500);
  };

  const sendPhoneVerification = async () => {
    if (!formData.phone || !validatePhone(formData.phone)) {
      setErrors(prev => ({ ...prev, phone: language === 'tr' ? 'Lütfen geçerli bir telefon numarası girin' : 'Please enter a valid phone number' }));
      return;
    }

    setIsSendingPhoneCode(true);
    // Simulate API call
    setTimeout(() => {
      setPhoneVerificationSent(true);
      setIsSendingPhoneCode(false);
      console.log('Phone verification sent to:', selectedCountry.dialCode + formData.phone);
    }, 1500);
  };

  const verifyEmailCode = async () => {
    if (!emailVerificationCode) return;

    setIsVerifyingEmail(true);
    // Simulate verification
    setTimeout(() => {
      if (emailVerificationCode === '123456') {
        setEmailVerified(true);
        setErrors(prev => ({ ...prev, emailVerificationCode: '' }));
      } else {
        setErrors(prev => ({ ...prev, emailVerificationCode: language === 'tr' ? 'Geçersiz kod' : 'Invalid code' }));
      }
      setIsVerifyingEmail(false);
    }, 1500);
  };

  const verifyPhoneCode = async () => {
    if (!phoneVerificationCode) return;

    setIsVerifyingPhone(true);
    // Simulate verification
    setTimeout(() => {
      if (phoneVerificationCode === '654321') {
        setPhoneVerified(true);
        setErrors(prev => ({ ...prev, phoneVerificationCode: '' }));
      } else {
        setErrors(prev => ({ ...prev, phoneVerificationCode: language === 'tr' ? 'Geçersiz kod' : 'Invalid code' }));
      }
      setIsVerifyingPhone(false);
    }, 1500);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t.auth.errors.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.auth.errors.emailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.auth.errors.passwordRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = t.auth.errors.passwordMinLength;
    }

    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = t.auth.errors.firstNameRequired;
      if (!formData.lastName) newErrors.lastName = t.auth.errors.lastNameRequired;
      if (!formData.companyName) newErrors.companyName = t.auth.errors.companyNameRequired;
      
      if (!formData.phone) {
        newErrors.phone = language === 'tr' ? 'Telefon numarası gereklidir' : 'Phone number is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = language === 'tr' ? 'Lütfen geçerli bir telefon numarası girin' : 'Please enter a valid phone number';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t.auth.errors.passwordMismatch;
      }

      // Check verification status for registration
      if (!emailVerified) {
        newErrors.emailVerification = language === 'tr' ? 'E-posta adresinizi doğrulamanız gerekiyor' : 'You need to verify your email address';
      }
      if (!phoneVerified) {
        newErrors.phoneVerification = language === 'tr' ? 'Telefon numaranızı doğrulamanız gerekiyor' : 'You need to verify your phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        // Handle Remember Me functionality
        if (rememberMe) {
          // Store user data in localStorage for persistent login
          const userDataToRemember = {
            email: formData.email,
            loginTime: new Date().toISOString(),
            persistent: true
          };
          localStorage.setItem('lumeo-remembered-user', JSON.stringify(userDataToRemember));
          localStorage.setItem('lumeo-session-type', 'persistent');
        } else {
          // Use sessionStorage for session-only login
          const sessionData = {
            email: formData.email,
            loginTime: new Date().toISOString(),
            persistent: false
          };
          sessionStorage.setItem('lumeo-session-user', JSON.stringify(sessionData));
          localStorage.setItem('lumeo-session-type', 'session');
          // Remove any existing persistent data
          localStorage.removeItem('lumeo-remembered-user');
        }

        // Direct login for existing users
        const userInfo = {
          firstName: 'Ahmet', // Mock data for login
          lastName: 'Yılmaz',
          email: formData.email,
          companyName: 'ABC Teknoloji Ltd.',
          phone: '+90 555 123 45 67'
        };
        onLogin(userInfo);
      } else {
        // Complete registration
        const userInfo = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          companyName: formData.companyName,
          phone: selectedCountry.dialCode + ' ' + formData.phone
        };
        onLogin(userInfo);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      companyName: '',
      phone: ''
    });
    // Reset verification states
    setEmailVerificationCode('');
    setPhoneVerificationCode('');
    setEmailVerificationSent(false);
    setPhoneVerificationSent(false);
    setEmailVerified(false);
    setPhoneVerified(false);
    // Reset remember me when switching modes
    setRememberMe(false);
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordStrengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <div className="min-h-screen flex flex-col justify-center p-3 sm:p-4 relative">
      <div className={`w-full max-w-md mx-auto relative z-10 transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-600 hover:text-teal-600 transition-colors duration-300 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Premium Logo Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-3xl mb-4 shadow-lg animate-float-gentle animate-pulse-premium">
            <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            <Sparkles className="w-4 h-4 text-white/80 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent mb-2 animate-gradient-shift">
            Lumeo
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent">
            {t.welcome.subtitle}
          </p>
        </div>

        {/* Premium Main Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          {/* Premium Toggle Buttons */}
          <div className="flex bg-gradient-to-r from-slate-100/80 to-slate-50/80 backdrop-blur-sm rounded-2xl p-1.5 mb-6 relative overflow-hidden">
            <div className={`absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 shadow-lg shadow-teal-500/25 transition-all duration-500 ease-out ${
              isLogin ? 'left-1.5 right-1/2 mr-0.75' : 'right-1.5 left-1/2 ml-0.75'
            }`}></div>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 relative z-10 toggle-button ${
                isLogin
                  ? 'text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.auth.login}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 relative z-10 toggle-button ${
                !isLogin
                  ? 'text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.auth.register}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Premium Registration Fields */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4 animate-fade-in-up">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.auth.firstName}
                  </label>
                  <div className={`relative ${focusedField === 'firstName' ? 'input-focused' : ''}`}>
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 input-icon" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('firstName')}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-4 py-3 text-sm glass-input rounded-xl transition-all duration-300 ${
                        errors.firstName ? 'border-red-300 error-shake' : ''
                      }`}
                      placeholder={language === 'tr' ? 'Ahmet' : 'John'}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-2 text-xs text-red-600 flex items-center animate-fade-in-up">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.auth.lastName}
                  </label>
                  <div className={`relative ${focusedField === 'lastName' ? 'input-focused' : ''}`}>
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 input-icon" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('lastName')}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-4 py-3 text-sm glass-input rounded-xl transition-all duration-300 ${
                        errors.lastName ? 'border-red-300 error-shake' : ''
                      }`}
                      placeholder={language === 'tr' ? 'Yılmaz' : 'Doe'}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-2 text-xs text-red-600 flex items-center animate-fade-in-up">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="animate-fade-in-up">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.auth.companyName}
                </label>
                <div className={`relative ${focusedField === 'companyName' ? 'input-focused' : ''}`}>
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 input-icon" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('companyName')}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 text-sm glass-input rounded-xl transition-all duration-300 ${
                      errors.companyName ? 'border-red-300 error-shake' : ''
                    }`}
                    placeholder={language === 'tr' ? 'ABC Teknoloji Ltd.' : 'ABC Technology Inc.'}
                  />
                </div>
                {errors.companyName && (
                  <p className="mt-2 text-xs text-red-600 flex items-center animate-fade-in-up">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.companyName}
                  </p>
                )}
              </div>
            )}

            {/* Premium Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.auth.email}
              </label>
              <div className={`relative ${focusedField === 'email' ? 'input-focused' : ''}`}>
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 text-sm glass-input rounded-xl transition-all duration-300 ${
                    errors.email ? 'border-red-300 error-shake' : ''
                  } ${emailVerified ? 'border-emerald-300 bg-emerald-50/50' : ''}`}
                  placeholder={language === 'tr' ? 'ahmet@sirket.com' : 'john@company.com'}
                />
                {emailVerified && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-500" />
                )}
              </div>
              {errors.email && (
                <p className="mt-2 text-xs text-red-600 flex items-center animate-fade-in-up">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.email}
                </p>
              )}

              {/* Email Verification Section - Only for Registration */}
              {!isLogin && formData.email && validateEmail(formData.email) && (
                <div className="mt-3 p-4 bg-slate-50 rounded-xl animate-fade-in-up">
                  {!emailVerificationSent ? (
                    <button
                      type="button"
                      onClick={sendEmailVerification}
                      disabled={isSendingEmailCode}
                      className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-all duration-300 disabled:opacity-70"
                    >
                      {isSendingEmailCode ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>{language === 'tr' ? 'Gönderiliyor...' : 'Sending...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{language === 'tr' ? 'E-posta Doğrulama Kodu Gönder' : 'Send Email Verification Code'}</span>
                        </>
                      )}
                    </button>
                  ) : !emailVerified ? (
                    <div className="space-y-3">
                      <p className="text-sm text-slate-600 text-center">
                        {language === 'tr' 
                          ? `${formData.email} adresine doğrulama kodu gönderildi`
                          : `Verification code sent to ${formData.email}`
                        }
                      </p>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={emailVerificationCode}
                          onChange={(e) => {
                            setEmailVerificationCode(e.target.value);
                            if (errors.emailVerificationCode) {
                              setErrors(prev => ({ ...prev, emailVerificationCode: '' }));
                            }
                          }}
                          className={`flex-1 px-3 py-2 text-center font-mono glass-input rounded-lg text-sm ${
                            errors.emailVerificationCode ? 'border-red-300' : ''
                          }`}
                          placeholder="123456"
                          maxLength={6}
                          disabled={isVerifyingEmail}
                        />
                        <button
                          type="button"
                          onClick={verifyEmailCode}
                          disabled={isVerifyingEmail || !emailVerificationCode}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-all duration-300 disabled:opacity-70 flex items-center space-x-1"
                        >
                          {isVerifyingEmail ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : (
                            <span>{language === 'tr' ? 'Doğrula' : 'Verify'}</span>
                          )}
                        </button>
                      </div>
                      {errors.emailVerificationCode && (
                        <p className="text-xs text-red-600 flex items-center justify-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.emailVerificationCode}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={sendEmailVerification}
                        disabled={isSendingEmailCode}
                        className="w-full text-xs text-blue-600 hover:text-blue-700 transition-colors duration-300"
                      >
                        {language === 'tr' ? 'Kodu Tekrar Gönder' : 'Resend Code'}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {language === 'tr' ? 'E-posta doğrulandı!' : 'Email verified!'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Premium Phone Field - Only for Registration */}
            {!isLogin && (
              <div className="animate-fade-in-up">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {language === 'tr' ? 'Telefon Numarası' : 'Phone Number'}
                </label>
                <div className="flex space-x-3">
                  {/* Country Code Selector */}
                  <div className="flex-shrink-0">
                    <CountryCodeSelector
                      selectedCountry={selectedCountry}
                      onCountrySelect={setSelectedCountry}
                      language={language}
                    />
                  </div>
                  
                  {/* Phone Number Input */}
                  <div className={`flex-1 relative ${focusedField === 'phone' ? 'input-focused' : ''}`}>
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-4 py-3 text-sm glass-input rounded-xl transition-all duration-300 ${
                        errors.phone ? 'border-red-300 error-shake' : ''
                      } ${phoneVerified ? 'border-emerald-300 bg-emerald-50/50' : ''}`}
                      placeholder={selectedCountry.code === 'TR' ? '555 123 45 67' : '123 456 7890'}
                    />
                    {phoneVerified && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                </div>
                {errors.phone && (
                  <p className="mt-2 text-xs text-red-600 flex items-center animate-fade-in-up">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.phone}
                  </p>
                )}
                {formData.phone && !errors.phone && !phoneVerified && (
                  <p className="mt-2 text-xs text-slate-500 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1 text-emerald-500" />
                    {language === 'tr' ? 'Tam numara:' : 'Full number:'} {selectedCountry.dialCode} {formData.phone}
                  </p>
                )}

                {/* Phone Verification Section */}
                {formData.phone && validatePhone(formData.phone) && (
                  <div className="mt-3 p-4 bg-slate-50 rounded-xl animate-fade-in-up">
                    {!phoneVerificationSent ? (
                      <button
                        type="button"
                        onClick={sendPhoneVerification}
                        disabled={isSendingPhoneCode}
                        className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-all duration-300 disabled:opacity-70"
                      >
                        {isSendingPhoneCode ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>{language === 'tr' ? 'Gönderiliyor...' : 'Sending...'}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>{language === 'tr' ? 'SMS Doğrulama Kodu Gönder' : 'Send SMS Verification Code'}</span>
                          </>
                        )}
                      </button>
                    ) : !phoneVerified ? (
                      <div className="space-y-3">
                        <p className="text-sm text-slate-600 text-center">
                          {language === 'tr' 
                            ? `${selectedCountry.dialCode} ${formData.phone} numarasına SMS kodu gönderildi`
                            : `SMS code sent to ${selectedCountry.dialCode} ${formData.phone}`
                          }
                        </p>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={phoneVerificationCode}
                            onChange={(e) => {
                              setPhoneVerificationCode(e.target.value);
                              if (errors.phoneVerificationCode) {
                                setErrors(prev => ({ ...prev, phoneVerificationCode: '' }));
                              }
                            }}
                            className={`flex-1 px-3 py-2 text-center font-mono glass-input rounded-lg text-sm ${
                              errors.phoneVerificationCode ? 'border-red-300' : ''
                            }`}
                            placeholder="654321"
                            maxLength={6}
                            disabled={isVerifyingPhone}
                          />
                          <button
                            type="button"
                            onClick={verifyPhoneCode}
                            disabled={isVerifyingPhone || !phoneVerificationCode}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-all duration-300 disabled:opacity-70 flex items-center space-x-1"
                          >
                            {isVerifyingPhone ? (
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                              <span>{language === 'tr' ? 'Doğrula' : 'Verify'}</span>
                            )}
                          </button>
                        </div>
                        {errors.phoneVerificationCode && (
                          <p className="text-xs text-red-600 flex items-center justify-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.phoneVerificationCode}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={sendPhoneVerification}
                          disabled={isSendingPhoneCode}
                          className="w-full text-xs text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
                        >
                          {language === 'tr' ? 'SMS\'i Tekrar Gönder' : 'Resend SMS'}
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          {language === 'tr' ? 'Telefon doğrulandı!' : 'Phone verified!'}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Premium Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {t.auth.password}
              </label>
              <div className={`relative ${focusedField === 'password' ? 'input-focused' : ''}`}>
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-12 py-3 text-sm glass-input rounded-xl transition-all duration-300 ${
                    errors.password ? 'border-red-300 error-shake' : ''
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-all duration-300 hover:scale-110"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-xs text-red-600 flex items-center animate-fade-in-up">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.password}
                </p>
              )}
              {!isLogin && formData.password && (
                <div className="mt-3 animate-fade-in-up">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-600 font-medium">{t.auth.passwordStrength.label}</span>
                    <span className={`font-bold ${passwordStrengthInfo.color}`}>
                      {passwordStrengthInfo.text}
                    </span>
                  </div>
                  <div className="bg-slate-200/50 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${passwordStrengthInfo.bgColor} relative overflow-hidden`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    >
                      <div className="absolute inset-0 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Premium Confirm Password Field */}
            {!isLogin && (
              <div className="animate-fade-in-up">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.auth.confirmPassword}
                </label>
                <div className={`relative ${focusedField === 'confirmPassword' ? 'input-focused' : ''}`}>
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-12 py-3 text-sm glass-input rounded-xl transition-all duration-300 ${
                      errors.confirmPassword ? 'border-red-300 error-shake' : ''
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-all duration-300 hover:scale-110"
                  >
                    {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-xs text-red-600 flex items-center animate-fade-in-up">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="mt-2 text-xs text-emerald-600 flex items-center animate-fade-in-up success-bounce">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {t.auth.passwordMatch}
                  </p>
                )}
              </div>
            )}

            {/* Remember Me Checkbox - Only for Login */}
            {isLogin && (
              <div className="flex items-center space-x-3 animate-fade-in-up">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${
                      rememberMe 
                        ? 'bg-teal-500 border-teal-500 shadow-lg shadow-teal-500/25' 
                        : 'border-slate-300 group-hover:border-teal-300'
                    }`}>
                      {rememberMe && (
                        <CheckCircle className="w-3 h-3 text-white animate-fade-in-up" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-teal-600 transition-colors duration-300">
                    {language === 'tr' ? 'Beni Hatırla' : 'Remember Me'}
                  </span>
                </label>
              </div>
            )}

            {/* Forgot Password Link */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-teal-600 hover:text-teal-700 text-sm font-semibold transition-all duration-300 hover:underline decoration-2 underline-offset-2"
                >
                  {t.auth.forgotPassword}
                </button>
              </div>
            )}

            {/* Verification Status Messages */}
            {!isLogin && (
              <>
                {errors.emailVerification && (
                  <p className="text-xs text-red-600 flex items-center animate-fade-in-up">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.emailVerification}
                  </p>
                )}
                {errors.phoneVerification && (
                  <p className="text-xs text-red-600 flex items-center animate-fade-in-up">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.phoneVerification}
                  </p>
                )}
              </>
            )}

            {/* Premium Submit Button */}
            <button
              type="submit"
              className="w-full glass-button text-white py-3.5 px-6 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-6"
            >
              {isLogin ? t.auth.loginButton : t.auth.registerButton}
            </button>
          </form>

          {/* Terms and Privacy */}
          {!isLogin && (
            <p className="mt-6 text-center text-xs text-slate-600 leading-relaxed">
              {t.auth.acceptTerms}{' '}
              <button 
                onClick={onShowTerms}
                className="text-teal-600 hover:text-teal-700 transition-colors font-semibold hover:underline decoration-2 underline-offset-2"
              >
                {t.auth.terms}
              </button>{' '}
              ve{' '}
              <button 
                onClick={onShowPrivacy}
                className="text-teal-600 hover:text-teal-700 transition-colors font-semibold hover:underline decoration-2 underline-offset-2"
              >
                {t.auth.privacy}
              </button>
              {language === 'tr' ? "'nı kabul etmiş olursunuz" : " you agree to our terms"}
            </p>
          )}
        </div>

        {/* Premium Toggle Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            {isLogin ? t.auth.dontHaveAccount : t.auth.alreadyHaveAccount}{" "}
            <button
              onClick={toggleMode}
              className="text-teal-600 hover:text-teal-700 font-bold transition-all duration-300 hover:underline decoration-2 underline-offset-2 ml-1"
            >
              {isLogin ? t.auth.createFreeAccount : t.auth.loginHere}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;