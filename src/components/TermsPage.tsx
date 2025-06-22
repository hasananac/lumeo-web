import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Shield, AlertTriangle, CheckCircle, Calendar, Mail } from 'lucide-react';
import { Language } from '../types';

interface TermsPageProps {
  language: Language;
  onBack: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ language, onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const content = {
    tr: {
      title: 'Kullanım Şartları',
      subtitle: 'Lumeo platformunu kullanırken uymanız gereken kurallar ve koşullar',
      lastUpdated: 'Son güncelleme: 15 Ocak 2025',
      sections: [
        {
          title: '1. Genel Hükümler',
          icon: FileText,
          content: [
            'Bu kullanım şartları ("Şartlar"), Lumeo platformunun ("Platform") kullanımını düzenler.',
            'Platformu kullanarak bu şartları kabul etmiş sayılırsınız.',
            'Bu şartlar herhangi bir zamanda güncellenebilir ve güncel hali her zaman geçerlidir.',
            'Şartları kabul etmiyorsanız, platformu kullanmayı derhal bırakmalısınız.'
          ]
        },
        {
          title: '2. Hesap Oluşturma ve Güvenlik',
          icon: Shield,
          content: [
            'Hesap oluştururken doğru ve güncel bilgiler vermelisiniz.',
            'Hesap güvenliğinizden tamamen siz sorumlusunuz.',
            'Şifrenizi güvenli tutmalı ve kimseyle paylaşmamalısınız.',
            'Hesabınızda yetkisiz erişim tespit ederseniz derhal bize bildirmelisiniz.',
            'Bir kişi yalnızca bir hesap oluşturabilir.'
          ]
        },
        {
          title: '3. Platform Kullanımı',
          icon: CheckCircle,
          content: [
            'Platformu yalnızca yasal amaçlar için kullanabilirsiniz.',
            'Başkalarının haklarını ihlal edecek şekilde platform kullanamazsınız.',
            'Zararlı yazılım, spam veya kötü amaçlı içerik yükleyemezsiniz.',
            'Platformun güvenliğini tehlikeye atacak eylemler yapamazsınız.',
            'Ticari olmayan kişisel kullanım için platform ücretsizdir.'
          ]
        },
        {
          title: '4. Veri ve Gizlilik',
          icon: Shield,
          content: [
            'Kişisel verileriniz Gizlilik Politikamız kapsamında işlenir.',
            'Platformda paylaştığınız verilerden siz sorumlusunuz.',
            'Verilerinizi düzenli olarak yedeklemenizi öneririz.',
            'Hesabınızı sildiğinizde verileriniz kalıcı olarak silinir.',
            'Yasal yükümlülükler dışında verilerinizi üçüncü taraflarla paylaşmayız.'
          ]
        },
        {
          title: '5. Fikri Mülkiyet',
          icon: FileText,
          content: [
            'Platform ve içeriği telif hakkı ile korunmaktadır.',
            'Platformun kaynak kodunu kopyalayamaz veya dağıtamazsınız.',
            'Lumeo markası ve logoları bizim mülkiyetimizdir.',
            'Kullanıcı içerikleri üzerindeki haklar size aittir.',
            'Bize içeriklerinizi platform üzerinde kullanma hakkı verirsiniz.'
          ]
        },
        {
          title: '6. Sorumluluk Sınırlaması',
          icon: AlertTriangle,
          content: [
            'Platform "olduğu gibi" sunulmaktadır.',
            'Hizmet kesintilerinden sorumlu değiliz.',
            'Veri kaybından doğan zararlardan sorumlu değiliz.',
            'Üçüncü taraf hizmetlerinden kaynaklanan sorunlardan sorumlu değiliz.',
            'Toplam sorumluluğumuz ödediğiniz ücretle sınırlıdır.'
          ]
        },
        {
          title: '7. Hesap Sonlandırma',
          icon: AlertTriangle,
          content: [
            'Hesabınızı istediğiniz zaman silebilirsiniz.',
            'Şartları ihlal ederseniz hesabınızı askıya alabiliriz.',
            'Hesap sonlandırıldığında tüm veriler silinir.',
            'Ödenen ücretler iade edilmez.',
            'Sonlandırma sonrası platform erişiminiz sona erer.'
          ]
        },
        {
          title: '8. Değişiklikler ve İletişim',
          icon: Mail,
          content: [
            'Bu şartları önceden haber vermeksizin değiştirebiliriz.',
            'Önemli değişiklikler e-posta ile bildirilir.',
            'Değişiklikler yayınlandığı tarihte yürürlüğe girer.',
            'Sorularınız için destek@lumeo.com adresine yazabilirsiniz.',
            'Yasal uyuşmazlıklar Türkiye mahkemelerinde çözülür.'
          ]
        }
      ]
    },
    en: {
      title: 'Terms of Service',
      subtitle: 'Rules and conditions you must follow when using the Lumeo platform',
      lastUpdated: 'Last updated: January 15, 2025',
      sections: [
        {
          title: '1. General Provisions',
          icon: FileText,
          content: [
            'These terms of service ("Terms") govern the use of the Lumeo platform ("Platform").',
            'By using the Platform, you are deemed to have accepted these terms.',
            'These terms may be updated at any time and the current version is always valid.',
            'If you do not accept the terms, you must immediately stop using the platform.'
          ]
        },
        {
          title: '2. Account Creation and Security',
          icon: Shield,
          content: [
            'You must provide accurate and up-to-date information when creating an account.',
            'You are fully responsible for the security of your account.',
            'You must keep your password secure and not share it with anyone.',
            'You must immediately notify us if you detect unauthorized access to your account.',
            'A person can only create one account.'
          ]
        },
        {
          title: '3. Platform Usage',
          icon: CheckCircle,
          content: [
            'You may only use the platform for legal purposes.',
            'You cannot use the platform in a way that violates the rights of others.',
            'You cannot upload malware, spam, or malicious content.',
            'You cannot perform actions that would compromise the security of the platform.',
            'The platform is free for non-commercial personal use.'
          ]
        },
        {
          title: '4. Data and Privacy',
          icon: Shield,
          content: [
            'Your personal data is processed under our Privacy Policy.',
            'You are responsible for the data you share on the platform.',
            'We recommend that you regularly back up your data.',
            'When you delete your account, your data is permanently deleted.',
            'We do not share your data with third parties except for legal obligations.'
          ]
        },
        {
          title: '5. Intellectual Property',
          icon: FileText,
          content: [
            'The platform and its content are protected by copyright.',
            'You cannot copy or distribute the source code of the platform.',
            'Lumeo trademarks and logos are our property.',
            'You retain rights to your user content.',
            'You grant us the right to use your content on the platform.'
          ]
        },
        {
          title: '6. Limitation of Liability',
          icon: AlertTriangle,
          content: [
            'The platform is provided "as is".',
            'We are not responsible for service interruptions.',
            'We are not responsible for damages arising from data loss.',
            'We are not responsible for problems arising from third-party services.',
            'Our total liability is limited to the fees you have paid.'
          ]
        },
        {
          title: '7. Account Termination',
          icon: AlertTriangle,
          content: [
            'You can delete your account at any time.',
            'We may suspend your account if you violate the terms.',
            'All data is deleted when the account is terminated.',
            'Paid fees are not refunded.',
            'Your platform access ends after termination.'
          ]
        },
        {
          title: '8. Changes and Communication',
          icon: Mail,
          content: [
            'We may change these terms without prior notice.',
            'Important changes are notified by email.',
            'Changes take effect on the date they are published.',
            'You can write to support@lumeo.com for your questions.',
            'Legal disputes are resolved in Turkish courts.'
          ]
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-600 hover:text-teal-600 transition-colors duration-300 mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">
              {language === 'tr' ? 'Geri' : 'Back'}
            </span>
          </button>

          <div className="glass-card rounded-3xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">{t.title}</h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-4">{t.subtitle}</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>{t.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {t.sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div key={index} className="glass-card rounded-2xl p-6 sm:p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">{section.title}</h2>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <div key={pIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
                      <p className="text-slate-700 leading-relaxed">{paragraph}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 glass-card rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="w-5 h-5 text-teal-600" />
            <span className="font-semibold text-slate-800">
              {language === 'tr' ? 'Sorularınız mı var?' : 'Have questions?'}
            </span>
          </div>
          <p className="text-slate-600 mb-4">
            {language === 'tr' 
              ? 'Bu şartlarla ilgili herhangi bir sorunuz varsa bizimle iletişime geçin.'
              : 'Contact us if you have any questions about these terms.'
            }
          </p>
          <a 
            href="mailto:support@lumeo.com"
            className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300"
          >
            <Mail className="w-4 h-4" />
            <span>support@lumeo.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;