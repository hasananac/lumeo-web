import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Eye, Database, Lock, Users, Globe, Calendar, Mail } from 'lucide-react';
import { Language } from '../types';

interface PrivacyPageProps {
  language: Language;
  onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ language, onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const content = {
    tr: {
      title: 'Gizlilik Politikası',
      subtitle: 'Kişisel verilerinizi nasıl topladığımız, kullandığımız ve koruduğumuz',
      lastUpdated: 'Son güncelleme: 15 Ocak 2025',
      sections: [
        {
          title: '1. Veri Sorumlusu',
          icon: Users,
          content: [
            'Lumeo Teknoloji A.Ş. olarak, kişisel verilerinizin korunması konusunda hassasiyetle hareket ediyoruz.',
            'Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında hazırlanmıştır.',
            'Veri sorumlusu sıfatıyla, verilerinizi yasal çerçevede ve güvenli şekilde işliyoruz.',
            'İletişim: Maslak Mahallesi, Büyükdere Caddesi No:123, Sarıyer/İstanbul'
          ]
        },
        {
          title: '2. Toplanan Veriler',
          icon: Database,
          content: [
            'Kimlik Bilgileri: Ad, soyad, e-posta adresi, telefon numarası',
            'Şirket Bilgileri: Şirket adı, sektör, çalışan sayısı',
            'Teknik Veriler: IP adresi, tarayıcı bilgileri, cihaz bilgileri',
            'Kullanım Verileri: Platform kullanım istatistikleri, tıklama verileri',
            'İletişim Verileri: Destek talepleri, geri bildirimler'
          ]
        },
        {
          title: '3. Veri Toplama Yöntemleri',
          icon: Eye,
          content: [
            'Hesap oluşturma sırasında siz tarafınızdan sağlanan bilgiler',
            'Platform kullanımı sırasında otomatik olarak toplanan teknik veriler',
            'Müşteri destek hizmetleri kapsamında paylaştığınız bilgiler',
            'Anket ve geri bildirim formları aracılığıyla toplanan veriler',
            'Yasal çerezler (cookies) aracılığıyla toplanan kullanım verileri'
          ]
        },
        {
          title: '4. Veri İşleme Amaçları',
          icon: Globe,
          content: [
            'Hesap oluşturma ve kimlik doğrulama işlemleri',
            'Platform hizmetlerinin sunulması ve geliştirilmesi',
            'Müşteri destek hizmetlerinin sağlanması',
            'Güvenlik önlemlerinin alınması ve dolandırıcılığın önlenmesi',
            'Yasal yükümlülüklerin yerine getirilmesi',
            'İstatistiksel analiz ve raporlama (anonim verilerle)'
          ]
        },
        {
          title: '5. Veri Güvenliği',
          icon: Lock,
          content: [
            'Verileriniz SSL/TLS şifreleme ile korunmaktadır',
            'Veritabanları güvenli sunucularda saklanmaktadır',
            'Erişim yetkileri sınırlı ve kontrollüdür',
            'Düzenli güvenlik denetimleri yapılmaktadır',
            'Veri ihlali durumunda 72 saat içinde bildirim yapılır',
            'Çalışanlarımız gizlilik sözleşmesi imzalamaktadır'
          ]
        },
        {
          title: '6. Veri Paylaşımı',
          icon: Users,
          content: [
            'Kişisel verileriniz üçüncü taraflarla paylaşılmaz',
            'Yasal zorunluluklar dışında veri aktarımı yapılmaz',
            'Hizmet sağlayıcılarla sınırlı veri paylaşımı (veri işleme sözleşmesi ile)',
            'Anonim ve toplu veriler araştırma amaçlı kullanılabilir',
            'Şirket devri durumunda veriler yeni sahibine aktarılabilir'
          ]
        },
        {
          title: '7. Veri Saklama Süresi',
          icon: Calendar,
          content: [
            'Hesap aktif olduğu sürece veriler saklanır',
            'Hesap silindikten sonra 30 gün içinde veriler silinir',
            'Yasal yükümlülükler için gerekli veriler yasal süre boyunca saklanır',
            'Log kayıtları maksimum 2 yıl saklanır',
            'Pazarlama izni geri alındığında ilgili veriler silinir'
          ]
        },
        {
          title: '8. Haklarınız',
          icon: Shield,
          content: [
            'Kişisel verilerinizin işlenip işlenmediğini öğrenme hakkı',
            'İşlenen verileriniz hakkında bilgi talep etme hakkı',
            'Verilerin düzeltilmesini veya silinmesini talep etme hakkı',
            'Veri işlemeye itiraz etme hakkı',
            'Veri taşınabilirliği hakkı',
            'Şikayetinizi Veri Koruma Kuruluna iletme hakkı'
          ]
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'How we collect, use, and protect your personal data',
      lastUpdated: 'Last updated: January 15, 2025',
      sections: [
        {
          title: '1. Data Controller',
          icon: Users,
          content: [
            'As Lumeo Technology Inc., we act with sensitivity regarding the protection of your personal data.',
            'This policy has been prepared within the scope of the Personal Data Protection Law No. 6698 (PDPL).',
            'As the data controller, we process your data within the legal framework and securely.',
            'Contact: Maslak District, Büyükdere Street No:123, Sarıyer/Istanbul'
          ]
        },
        {
          title: '2. Data Collected',
          icon: Database,
          content: [
            'Identity Information: Name, surname, email address, phone number',
            'Company Information: Company name, industry, number of employees',
            'Technical Data: IP address, browser information, device information',
            'Usage Data: Platform usage statistics, click data',
            'Communication Data: Support requests, feedback'
          ]
        },
        {
          title: '3. Data Collection Methods',
          icon: Eye,
          content: [
            'Information provided by you during account creation',
            'Technical data automatically collected during platform usage',
            'Information you share within the scope of customer support services',
            'Data collected through surveys and feedback forms',
            'Usage data collected through legal cookies'
          ]
        },
        {
          title: '4. Data Processing Purposes',
          icon: Globe,
          content: [
            'Account creation and identity verification processes',
            'Providing and improving platform services',
            'Providing customer support services',
            'Taking security measures and preventing fraud',
            'Fulfilling legal obligations',
            'Statistical analysis and reporting (with anonymous data)'
          ]
        },
        {
          title: '5. Data Security',
          icon: Lock,
          content: [
            'Your data is protected with SSL/TLS encryption',
            'Databases are stored on secure servers',
            'Access permissions are limited and controlled',
            'Regular security audits are conducted',
            'Notification is made within 72 hours in case of data breach',
            'Our employees sign confidentiality agreements'
          ]
        },
        {
          title: '6. Data Sharing',
          icon: Users,
          content: [
            'Your personal data is not shared with third parties',
            'No data transfer is made except for legal obligations',
            'Limited data sharing with service providers (with data processing agreement)',
            'Anonymous and aggregate data may be used for research purposes',
            'Data may be transferred to the new owner in case of company transfer'
          ]
        },
        {
          title: '7. Data Retention Period',
          icon: Calendar,
          content: [
            'Data is stored as long as the account is active',
            'Data is deleted within 30 days after account deletion',
            'Data required for legal obligations is stored for the legal period',
            'Log records are stored for a maximum of 2 years',
            'Related data is deleted when marketing consent is withdrawn'
          ]
        },
        {
          title: '8. Your Rights',
          icon: Shield,
          content: [
            'Right to learn whether your personal data is processed',
            'Right to request information about your processed data',
            'Right to request correction or deletion of data',
            'Right to object to data processing',
            'Right to data portability',
            'Right to submit your complaint to the Data Protection Board'
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full mb-6">
              <Shield className="w-8 h-8 text-white" />
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
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">{section.title}</h2>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <div key={pIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                      <p className="text-slate-700 leading-relaxed">{paragraph}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-12 glass-card rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-slate-800">
              {language === 'tr' ? 'Veri Koruma Sorumlusu' : 'Data Protection Officer'}
            </span>
          </div>
          <p className="text-slate-600 mb-4">
            {language === 'tr' 
              ? 'Kişisel verilerinizle ilgili sorularınız için bizimle iletişime geçin.'
              : 'Contact us for questions about your personal data.'
            }
          </p>
          <div className="space-y-2">
            <a 
              href="mailto:privacy@lumeo.com"
              className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>privacy@lumeo.com</span>
            </a>
            <p className="text-sm text-slate-500">
              {language === 'tr' 
                ? 'Talebinize 30 gün içinde yanıt vereceğiz'
                : 'We will respond to your request within 30 days'
              }
            </p>
          </div>
        </div>

        {/* GDPR Notice */}
        <div className="mt-6 glass-card rounded-2xl p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                {language === 'tr' ? 'GDPR Uyumluluğu' : 'GDPR Compliance'}
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                {language === 'tr' 
                  ? 'Avrupa Birliği vatandaşları için GDPR (Genel Veri Koruma Yönetmeliği) haklarınız korunmaktadır. Verilerinizin silinmesi, düzeltilmesi veya taşınması konularında talebinizi privacy@lumeo.com adresine iletebilirsiniz.'
                  : 'For European Union citizens, your GDPR (General Data Protection Regulation) rights are protected. You can send your request for deletion, correction or portability of your data to privacy@lumeo.com.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;