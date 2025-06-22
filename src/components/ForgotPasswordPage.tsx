import React, { useState, useEffect } from 'react';
import { Mail, Phone, ArrowLeft, CheckCircle, AlertCircle, Send, Link, Key } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import CountryCodeSelector, { countries, Country } from './CountryCodeSelector';

interface ForgotPasswordPageProps {
  language: Language;
  onBack: () => void;
}

type ResetMethod = 'email' | 'phone';
type ResetType = 'link' | 'password';

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ language, onBack }) => {
  const [resetMethod, setResetMethod] = useState<ResetMethod>('email');
  const [resetType, setResetType] = useState<ResetType>('link');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // Default to Turkey
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  useEffect(() => {
    setIsLoaded(true);
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

  const formatPhone = (phone: string) => {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return selectedCountry.dialCode + cleanPhone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (resetMethod === 'email') {
      if (!email) {
        setError(t.auth.errors.emailRequired);
        return;
      }
      if (!validateEmail(email)) {
        setError(t.auth.errors.emailInvalid);
        return;
      }
    } else {
      if (!phone) {
        setError(language === 'tr' ? 'Telefon numarası gereklidir' : 'Phone number is required');
        return;
      }
      if (!validatePhone(phone)) {
        setError(language === 'tr' ? 'Lütfen geçerli bir telefon numarası girin' : 'Please enter a valid phone number');
        return;
      }
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log('Password reset sent via:', resetMethod, resetType, resetMethod === 'email' ? email : formatPhone(phone));
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (resetMethod === 'email') {
      setEmail(value);
    } else {
      setPhone(value);
    }
    if (error) {
      setError('');
    }
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const getSuccessMessage = () => {
    const contact = resetMethod === 'email' ? email : formatPhone(phone);
    const method = resetMethod === 'email' ? 
      (language === 'tr' ? 'e-posta adresinize' : 'to your email') : 
      (language === 'tr' ? 'telefon numaranıza' : 'to your phone');
    
    const content = resetType === 'link' ? 
      (language === 'tr' ? 'şifre sıfırlama bağlantısı' : 'password reset link') :
      (language === 'tr' ? 'yeni şifre' : 'new password');

    if (language === 'tr') {
      return `${contact} adresine ${content} gönderildi. ${resetMethod === 'email' ? 'E-posta kutunuzu' : 'SMS mesajlarınızı'} kontrol edin.`;
    } else {
      return `A ${content} has been sent ${method} ${contact}. Please check your ${resetMethod === 'email' ? 'email inbox' : 'SMS messages'}.`;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col justify-center p-3 sm:p-4">
        <div className={`w-full max-w-md mx-auto transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Success Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full mb-6 animate-pulse">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              {language === 'tr' ? 'Başarıyla Gönderildi!' : 'Successfully Sent!'}
            </h1>
            
            <p className="text-slate-600 mb-6 leading-relaxed text-sm">
              {getSuccessMessage()}
            </p>

            <div className="space-y-4">
              <button
                onClick={onBack}
                className="w-full glass-button text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {language === 'tr' ? 'Giriş Sayfasına Dön' : 'Back to Sign In'}
              </button>
              
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-3 px-6 rounded-xl font-semibold text-teal-600 hover:text-teal-700 hover:bg-teal-50 transition-all duration-300"
              >
                {language === 'tr' ? 'Tekrar Gönder' : 'Send Again'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center p-3 sm:p-4">
      <div className={`w-full max-w-md mx-auto transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-600 hover:text-teal-600 transition-colors duration-300 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-medium">
            {language === 'tr' ? 'Geri' : 'Back'}
          </span>
        </button>

        {/* Main Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full mb-4 animate-float-gentle">
              {resetMethod === 'email' ? <Mail className="w-8 h-8 text-white" /> : <Phone className="w-8 h-8 text-white" />}
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              {language === 'tr' ? 'Şifremi Unuttum' : 'Forgot Password'}
            </h1>
            
            <p className="text-slate-600 leading-relaxed text-sm">
              {language === 'tr' 
                ? 'İletişim bilginizi seçin ve şifre sıfırlama yöntemini belirleyin.'
                : 'Choose your contact method and password reset option.'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Method Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                {language === 'tr' ? 'İletişim Yöntemi' : 'Contact Method'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setResetMethod('email')}
                  className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center space-y-2 ${
                    resetMethod === 'email'
                      ? 'bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200'
                      : 'bg-white/50 border border-slate-200 hover:bg-teal-50/50 hover:border-teal-200'
                  }`}
                >
                  <Mail className={`w-5 h-5 ${resetMethod === 'email' ? 'text-teal-600' : 'text-slate-500'}`} />
                  <span className={`text-sm font-semibold ${resetMethod === 'email' ? 'text-teal-700' : 'text-slate-600'}`}>
                    {language === 'tr' ? 'E-posta' : 'Email'}
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setResetMethod('phone')}
                  className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center space-y-2 ${
                    resetMethod === 'phone'
                      ? 'bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200'
                      : 'bg-white/50 border border-slate-200 hover:bg-teal-50/50 hover:border-teal-200'
                  }`}
                >
                  <Phone className={`w-5 h-5 ${resetMethod === 'phone' ? 'text-teal-600' : 'text-slate-500'}`} />
                  <span className={`text-sm font-semibold ${resetMethod === 'phone' ? 'text-teal-700' : 'text-slate-600'}`}>
                    {language === 'tr' ? 'Telefon' : 'Phone'}
                  </span>
                </button>
              </div>
            </div>

            {/* Reset Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                {language === 'tr' ? 'Sıfırlama Türü' : 'Reset Type'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setResetType('link')}
                  className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center space-y-2 ${
                    resetType === 'link'
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200'
                      : 'bg-white/50 border border-slate-200 hover:bg-blue-50/50 hover:border-blue-200'
                  }`}
                >
                  <Link className={`w-5 h-5 ${resetType === 'link' ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span className={`text-sm font-semibold ${resetType === 'link' ? 'text-blue-700' : 'text-slate-600'}`}>
                    {language === 'tr' ? 'Bağlantı' : 'Link'}
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setResetType('password')}
                  className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center space-y-2 ${
                    resetType === 'password'
                      ? 'bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200'
                      : 'bg-white/50 border border-slate-200 hover:bg-purple-50/50 hover:border-purple-200'
                  }`}
                >
                  <Key className={`w-5 h-5 ${resetType === 'password' ? 'text-purple-600' : 'text-slate-500'}`} />
                  <span className={`text-sm font-semibold ${resetType === 'password' ? 'text-purple-700' : 'text-slate-600'}`}>
                    {language === 'tr' ? 'Yeni Şifre' : 'New Password'}
                  </span>
                </button>
              </div>
            </div>

            {/* Contact Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {resetMethod === 'email' ? t.auth.email : (language === 'tr' ? 'Telefon Numarası' : 'Phone Number')}
              </label>
              
              {resetMethod === 'email' ? (
                <div className={`relative ${focusedField === 'email' ? 'input-focused' : ''}`}>
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 text-sm glass-input rounded-xl transition-all duration-300 ${
                      error ? 'border-red-300 error-shake' : ''
                    }`}
                    placeholder={language === 'tr' ? 'ahmet@sirket.com' : 'john@company.com'}
                    disabled={isLoading}
                  />
                </div>
              ) : (
                <div className="flex space-x-3">
                  {/* Country Code Selector */}
                  <div className="flex-shrink-0">
                    <CountryCodeSelector
                      selectedCountry={selectedCountry}
                      onCountrySelect={setSelectedCountry}
                      disabled={isLoading}
                      language={language}
                    />
                  </div>
                  
                  {/* Phone Number Input */}
                  <div className={`flex-1 relative ${focusedField === 'phone' ? 'input-focused' : ''}`}>
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 input-icon" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-4 py-3 text-sm glass-input rounded-xl transition-all duration-300 ${
                        error ? 'border-red-300 error-shake' : ''
                      }`}
                      placeholder={selectedCountry.code === 'TR' ? '555 123 45 67' : '123 456 7890'}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}
              
              {error && (
                <p className="mt-2 text-xs text-red-600 flex items-center animate-fade-in-up">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {error}
                </p>
              )}
              
              {resetMethod === 'phone' && phone && !error && (
                <p className="mt-2 text-xs text-slate-500 flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1 text-emerald-500" />
                  {language === 'tr' ? 'Tam numara:' : 'Full number:'} {formatPhone(phone)}
                </p>
              )}
            </div>

            {/* Info Text */}
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                {resetType === 'link' ? (
                  language === 'tr' 
                    ? `${resetMethod === 'email' ? 'E-posta adresinize' : 'Telefon numaranıza'} şifre sıfırlama bağlantısı gönderilecek. Bu bağlantıya tıklayarak yeni şifrenizi belirleyebilirsiniz.`
                    : `A password reset link will be sent ${resetMethod === 'email' ? 'to your email' : 'to your phone'}. Click the link to set your new password.`
                ) : (
                  language === 'tr'
                    ? `${resetMethod === 'email' ? 'E-posta adresinize' : 'Telefon numaranıza'} otomatik oluşturulan yeni şifre gönderilecek. Bu şifre ile giriş yapabilirsiniz.`
                    : `An automatically generated new password will be sent ${resetMethod === 'email' ? 'to your email' : 'to your phone'}. You can sign in with this password.`
                )}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full glass-button text-white py-3.5 px-6 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{language === 'tr' ? 'Gönderiliyor...' : 'Sending...'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>
                    {resetType === 'link' 
                      ? (language === 'tr' ? 'Sıfırlama Bağlantısı Gönder' : 'Send Reset Link')
                      : (language === 'tr' ? 'Yeni Şifre Gönder' : 'Send New Password')
                    }
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500 leading-relaxed">
              {resetMethod === 'email' ? (
                language === 'tr' 
                  ? 'E-posta gelmedi mi? Spam klasörünüzü kontrol edin veya birkaç dakika bekleyin.'
                  : 'Didn\'t receive the email? Check your spam folder or wait a few minutes.'
              ) : (
                language === 'tr'
                  ? 'SMS gelmedi mi? Birkaç dakika bekleyin veya telefon numaranızı kontrol edin.'
                  : 'Didn\'t receive the SMS? Wait a few minutes or check your phone number.'
              )}
            </p>
          </div>
        </div>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            {language === 'tr' ? 'Şifrenizi hatırladınız mı?' : 'Remember your password?'}{" "}
            <button
              onClick={onBack}
              className="text-teal-600 hover:text-teal-700 font-bold transition-all duration-300 hover:underline decoration-2 underline-offset-2 ml-1"
            >
              {language === 'tr' ? 'Giriş Yap' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;