import React, { useState, useEffect } from "react";
import { Building2, Globe, ArrowRight } from "lucide-react";
import { Language, LanguageConfig } from "../types";
import { translations, languages } from "../utils/translations";
import { useLanguageContext } from "./LanguageProvider";

interface WelcomePageProps {
  onLanguageSelect: (language: Language) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onLanguageSelect }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("tr");
  const [isLoaded, setIsLoaded] = useState(false);

  const { language: currentLanguage } = useLanguageContext();

  useEffect(() => {
    setIsLoaded(true);
    // Eğer daha önce bir dil seçilmişse onu kullan
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

  const t = translations[selectedLanguage];

  const handleContinue = () => {
    onLanguageSelect(selectedLanguage);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-4">
      <div
        className={`w-full max-w-md mx-auto transition-all duration-1000 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-3xl mb-6 shadow-lg animate-float-gentle relative">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent mb-2 animate-gradient-shift">
            Lumeo
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            {t.welcome.subtitle}
          </p>
        </div>

        {/* Language Selection Card */}
        <div className="glass-card rounded-3xl p-8 mb-6">
          <div className="text-center mb-6">
            <Globe className="w-8 h-8 text-teal-600 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              {t.welcome.selectLanguage}
            </h2>
          </div>

          {/* Language Options */}
          <div className="space-y-3 mb-6">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center space-x-4 ${
                  selectedLanguage === lang.code
                    ? "bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200"
                    : "bg-white/50 border border-slate-200 hover:bg-teal-50/50 hover:border-teal-200"
                }`}
              >
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-mono font-bold text-slate-600">
                  {lang.flag.toUpperCase()}
                </div>
                <span
                  className={`font-semibold text-lg ${
                    selectedLanguage === lang.code
                      ? "text-teal-700"
                      : "text-slate-700"
                  }`}
                >
                  {lang.nativeName}
                </span>
                {selectedLanguage === lang.code && (
                  <div className="ml-auto w-3 h-3 bg-teal-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedLanguage}
          >
            {selectedLanguage === "tr" ? "Devam Et" : "Continue"}
          </button>

          {/* Direct Test Buttons */}
          <div className="mt-4 space-y-2">
            <button
              onClick={() => alert("TEST ÇALIŞIYOR!")}
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg text-lg font-bold"
            >
              ✅ TEST BUTONU
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg text-sm"
            >
              🔄 SAYFAYI YENİLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
