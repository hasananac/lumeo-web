import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Monitor, 
  Sun, 
  Moon, 
  Type, 
  Zap, 
  ToggleLeft, 
  ToggleRight, 
  Save, 
  RotateCcw, 
  Check,
  Smartphone,
  Tablet,
  Layers,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Wifi,
  Download,
  Upload,
  HardDrive,
  Database,
  Lock,
  Key,
  UserCheck,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  Bookmark,
  Tag,
  Filter,
  Search,
  Plus,
  Minus,
  X,
  ChevronRight,
  ChevronDown,
  Info,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Sliders,
  FileText,
  CreditCard,
  Trash2,
  Edit3,
  Copy,
  Share2,
  ExternalLink,
  HelpCircle,
  MessageSquare,
  Video,
  Headphones,
  Mic,
  Camera,
  Image,
  File,
  Folder,
  Archive,
  Package,
  Truck,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Gift,
  Coffee,
  Umbrella,
  CloudRain,
  CloudSnow,
  Flame,
  Droplets,
  Wind,
  Thermometer,
  Battery,
  BatteryLow,
  Plug,
  Power,
  PowerOff
} from 'lucide-react';
import { Language } from '../types';
import { useAppearanceContext } from './AppearanceProvider';

interface SettingsPageProps {
  language: Language;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    phone: string;
  };
  onBack: () => void;
  onLogout: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('general');
  const [isMobile, setIsMobile] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    language: language,
    timezone: 'Europe/Istanbul',
    dateFormat: 'DD/MM/YYYY',
    currency: 'TRY',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    desktopNotifications: true,
    soundEnabled: true,
    
    // Privacy Settings
    analytics: true,
    marketing: false,
    thirdParty: true,
    profileVisibility: 'team',
    
    // Security Settings
    twoFactor: false,
    sessionTimeout: 30,
    
    // Advanced Settings
    apiAccess: false,
    webhooks: false,
    backup: true,
    debugMode: false
  });

  const { settings: appearanceSettings, updateSettings: updateAppearanceSettings } = useAppearanceContext();

  useEffect(() => {
    setIsLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const t = {
    tr: {
      settings: {
        title: 'Ayarlar',
        subtitle: 'Uygulama ayarlarınızı yönetin',
        sections: {
          general: {
            title: 'Genel Ayarlar',
            description: 'Temel uygulama ayarları',
            items: {
              language: {
                title: 'Dil',
                description: 'Uygulama dilini değiştirin',
                current: 'Türkçe'
              },
              timezone: {
                title: 'Saat Dilimi',
                description: 'Yerel saat diliminizi ayarlayın',
                current: 'İstanbul (GMT+3)'
              },
              dateFormat: {
                title: 'Tarih Formatı',
                description: 'Tarih görüntüleme formatını seçin',
                current: 'DD/MM/YYYY'
              },
              currency: {
                title: 'Para Birimi',
                description: 'Varsayılan para birimini seçin',
                current: 'Türk Lirası (₺)'
              }
            }
          },
          appearance: {
            title: 'Görünüm',
            description: 'Tema ve görünüm ayarları',
            items: {
              theme: {
                title: 'Tema',
                description: 'Açık, koyu veya sistem teması',
                options: {
                  light: 'Açık',
                  dark: 'Koyu',
                  system: 'Sistem'
                }
              },
              accentColor: {
                title: 'Vurgu Rengi',
                description: 'Ana renk temasını seçin'
              },
              fontSize: {
                title: 'Yazı Boyutu',
                description: 'Metin boyutunu ayarlayın',
                options: {
                  small: 'Küçük',
                  medium: 'Orta',
                  large: 'Büyük'
                }
              },
              density: {
                title: 'Yoğunluk',
                description: 'Arayüz yoğunluğunu ayarlayın',
                options: {
                  compact: 'Sıkışık',
                  normal: 'Normal',
                  comfortable: 'Rahat'
                }
              },
              animations: {
                title: 'Animasyonlar',
                description: 'Arayüz animasyonlarını etkinleştir'
              },
              glowEffects: {
                title: 'Işık Efektleri',
                description: 'Parlama efektlerini etkinleştir'
              }
            }
          },
          notifications: {
            title: 'Bildirim Ayarları',
            description: 'Bildirim tercihlerinizi yönetin',
            items: {
              email: {
                title: 'E-posta Bildirimleri',
                description: 'E-posta ile bildirim alın',
                enabled: true
              },
              push: {
                title: 'Anlık Bildirimler',
                description: 'Tarayıcı bildirimleri',
                enabled: true
              },
              sms: {
                title: 'SMS Bildirimleri',
                description: 'Önemli güncellemeler için SMS',
                enabled: false
              },
              desktop: {
                title: 'Masaüstü Bildirimleri',
                description: 'Sistem bildirimleri',
                enabled: true
              },
              sound: {
                title: 'Ses Bildirimleri',
                description: 'Bildirim sesleri'
              }
            }
          },
          security: {
            title: 'Güvenlik Ayarları',
            description: 'Hesap güvenliği ve gizlilik',
            items: {
              twoFactor: {
                title: 'İki Faktörlü Doğrulama',
                description: 'Hesabınızı ekstra güvenlik ile koruyun',
                enabled: false
              },
              sessionTimeout: {
                title: 'Oturum Zaman Aşımı',
                description: 'Otomatik çıkış süresi',
                current: '30 dakika'
              },
              loginHistory: {
                title: 'Giriş Geçmişi',
                description: 'Son giriş aktivitelerinizi görün',
                action: 'Görüntüle'
              },
              dataExport: {
                title: 'Veri Dışa Aktarma',
                description: 'Verilerinizi indirin',
                action: 'İndir'
              }
            }
          },
          privacy: {
            title: 'Gizlilik Ayarları',
            description: 'Veri paylaşımı ve gizlilik',
            items: {
              analytics: {
                title: 'Kullanım Analizi',
                description: 'Anonim kullanım verilerini paylaş',
                enabled: true
              },
              marketing: {
                title: 'Pazarlama E-postaları',
                description: 'Ürün güncellemeleri ve teklifler',
                enabled: false
              },
              thirdParty: {
                title: 'Üçüncü Taraf Entegrasyonlar',
                description: 'Harici hizmetlerle veri paylaşımı',
                enabled: true
              },
              profileVisibility: {
                title: 'Profil Görünürlüğü',
                description: 'Profilinizi kimler görebilir',
                current: 'Sadece takım üyeleri'
              }
            }
          },
          integrations: {
            title: 'Entegrasyonlar',
            description: 'Harici hizmet bağlantıları',
            items: {
              googleWorkspace: {
                title: 'Google Workspace',
                description: 'Gmail, Drive ve Calendar entegrasyonu',
                connected: false
              },
              microsoftOffice: {
                title: 'Microsoft 365',
                description: 'Outlook, OneDrive ve Teams',
                connected: true
              },
              slack: {
                title: 'Slack',
                description: 'Takım iletişimi entegrasyonu',
                connected: false
              },
              zapier: {
                title: 'Zapier',
                description: 'Otomasyon ve iş akışları',
                connected: false
              }
            }
          },
          advanced: {
            title: 'Gelişmiş Ayarlar',
            description: 'Sistem ve geliştirici ayarları',
            items: {
              apiAccess: {
                title: 'API Erişimi',
                description: 'Geliştirici API anahtarları',
                action: 'Yönet'
              },
              webhooks: {
                title: 'Webhook\'lar',
                description: 'Harici sistem bildirimleri',
                action: 'Yapılandır'
              },
              backup: {
                title: 'Otomatik Yedekleme',
                description: 'Veri yedekleme ayarları',
                enabled: true
              },
              debugMode: {
                title: 'Hata Ayıklama Modu',
                description: 'Geliştirici konsolu',
                enabled: false
              }
            }
          }
        }
      }
    },
    en: {
      settings: {
        title: 'Settings',
        subtitle: 'Manage your application settings',
        sections: {
          general: {
            title: 'General Settings',
            description: 'Basic application settings',
            items: {
              language: {
                title: 'Language',
                description: 'Change application language',
                current: 'English'
              },
              timezone: {
                title: 'Timezone',
                description: 'Set your local timezone',
                current: 'Istanbul (GMT+3)'
              },
              dateFormat: {
                title: 'Date Format',
                description: 'Choose date display format',
                current: 'MM/DD/YYYY'
              },
              currency: {
                title: 'Currency',
                description: 'Select default currency',
                current: 'Turkish Lira (₺)'
              }
            }
          },
          appearance: {
            title: 'Appearance',
            description: 'Theme and appearance settings',
            items: {
              theme: {
                title: 'Theme',
                description: 'Light, dark or system theme',
                options: {
                  light: 'Light',
                  dark: 'Dark',
                  system: 'System'
                }
              },
              accentColor: {
                title: 'Accent Color',
                description: 'Choose main color theme'
              },
              fontSize: {
                title: 'Font Size',
                description: 'Adjust text size',
                options: {
                  small: 'Small',
                  medium: 'Medium',
                  large: 'Large'
                }
              },
              density: {
                title: 'Density',
                description: 'Adjust interface density',
                options: {
                  compact: 'Compact',
                  normal: 'Normal',
                  comfortable: 'Comfortable'
                }
              },
              animations: {
                title: 'Animations',
                description: 'Enable interface animations'
              },
              glowEffects: {
                title: 'Glow Effects',
                description: 'Enable glow effects'
              }
            }
          },
          notifications: {
            title: 'Notification Settings',
            description: 'Manage your notification preferences',
            items: {
              email: {
                title: 'Email Notifications',
                description: 'Receive notifications via email',
                enabled: true
              },
              push: {
                title: 'Push Notifications',
                description: 'Browser notifications',
                enabled: true
              },
              sms: {
                title: 'SMS Notifications',
                description: 'SMS for important updates',
                enabled: false
              },
              desktop: {
                title: 'Desktop Notifications',
                description: 'System notifications',
                enabled: true
              },
              sound: {
                title: 'Sound Notifications',
                description: 'Notification sounds'
              }
            }
          },
          security: {
            title: 'Security Settings',
            description: 'Account security and privacy',
            items: {
              twoFactor: {
                title: 'Two-Factor Authentication',
                description: 'Protect your account with extra security',
                enabled: false
              },
              sessionTimeout: {
                title: 'Session Timeout',
                description: 'Automatic logout time',
                current: '30 minutes'
              },
              loginHistory: {
                title: 'Login History',
                description: 'View your recent login activities',
                action: 'View'
              },
              dataExport: {
                title: 'Data Export',
                description: 'Download your data',
                action: 'Download'
              }
            }
          },
          privacy: {
            title: 'Privacy Settings',
            description: 'Data sharing and privacy',
            items: {
              analytics: {
                title: 'Usage Analytics',
                description: 'Share anonymous usage data',
                enabled: true
              },
              marketing: {
                title: 'Marketing Emails',
                description: 'Product updates and offers',
                enabled: false
              },
              thirdParty: {
                title: 'Third-party Integrations',
                description: 'Data sharing with external services',
                enabled: true
              },
              profileVisibility: {
                title: 'Profile Visibility',
                description: 'Who can see your profile',
                current: 'Team members only'
              }
            }
          },
          integrations: {
            title: 'Integrations',
            description: 'External service connections',
            items: {
              googleWorkspace: {
                title: 'Google Workspace',
                description: 'Gmail, Drive and Calendar integration',
                connected: false
              },
              microsoftOffice: {
                title: 'Microsoft 365',
                description: 'Outlook, OneDrive and Teams',
                connected: true
              },
              slack: {
                title: 'Slack',
                description: 'Team communication integration',
                connected: false
              },
              zapier: {
                title: 'Zapier',
                description: 'Automation and workflows',
                connected: false
              }
            }
          },
          advanced: {
            title: 'Advanced Settings',
            description: 'System and developer settings',
            items: {
              apiAccess: {
                title: 'API Access',
                description: 'Developer API keys',
                action: 'Manage'
              },
              webhooks: {
                title: 'Webhooks',
                description: 'External system notifications',
                action: 'Configure'
              },
              backup: {
                title: 'Automatic Backup',
                description: 'Data backup settings',
                enabled: true
              },
              debugMode: {
                title: 'Debug Mode',
                description: 'Developer console',
                enabled: false
              }
            }
          }
        }
      }
    }
  };

  const currentT = t[language];

  const sections = [
    { id: 'general', title: currentT.settings.sections.general.title, icon: Settings },
    { id: 'appearance', title: currentT.settings.sections.appearance.title, icon: Palette },
    { id: 'notifications', title: currentT.settings.sections.notifications.title, icon: Bell },
    { id: 'security', title: currentT.settings.sections.security.title, icon: Shield },
    { id: 'privacy', title: currentT.settings.sections.privacy.title, icon: Eye },
    { id: 'integrations', title: currentT.settings.sections.integrations.title, icon: Globe },
    { id: 'advanced', title: currentT.settings.sections.advanced.title, icon: Sliders }
  ];

  const accentColors = [
    { id: 'teal', name: 'Teal', color: '#14b8a6' },
    { id: 'blue', name: 'Blue', color: '#3b82f6' },
    { id: 'emerald', name: 'Emerald', color: '#10b981' },
    { id: 'purple', name: 'Purple', color: '#8b5cf6' },
    { id: 'amber', name: 'Amber', color: '#f59e0b' },
    { id: 'rose', name: 'Rose', color: '#f43f5e' },
    { id: 'indigo', name: 'Indigo', color: '#6366f1' },
    { id: 'orange', name: 'Orange', color: '#f97316' }
  ];

  const renderToggle = (enabled: boolean, onChange: () => void) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
        enabled ? 'bg-teal-500' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentT.settings.sections.appearance.title}</h2>
        <p className="text-slate-600">{currentT.settings.sections.appearance.description}</p>
      </div>

      <div className="space-y-4">
        {/* Theme Selection */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 mb-1">{currentT.settings.sections.appearance.items.theme.title}</h3>
              <p className="text-sm text-slate-600">{currentT.settings.sections.appearance.items.theme.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'light', icon: Sun, label: currentT.settings.sections.appearance.items.theme.options.light },
              { id: 'dark', icon: Moon, label: currentT.settings.sections.appearance.items.theme.options.dark },
              { id: 'system', icon: Monitor, label: currentT.settings.sections.appearance.items.theme.options.system }
            ].map((theme) => {
              const IconComponent = theme.icon;
              return (
                <button
                  key={theme.id}
                  onClick={() => updateAppearanceSettings({ theme: theme.id as any })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    appearanceSettings.theme === theme.id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <IconComponent className={`w-6 h-6 mx-auto mb-2 ${
                    appearanceSettings.theme === theme.id ? 'text-teal-600' : 'text-slate-500'
                  }`} />
                  <p className={`text-sm font-medium ${
                    appearanceSettings.theme === theme.id ? 'text-teal-700' : 'text-slate-700'
                  }`}>
                    {theme.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accent Color */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 mb-1">{currentT.settings.sections.appearance.items.accentColor.title}</h3>
              <p className="text-sm text-slate-600">{currentT.settings.sections.appearance.items.accentColor.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {accentColors.map((color) => (
              <button
                key={color.id}
                onClick={() => updateAppearanceSettings({ accentColor: color.id as any })}
                className={`w-12 h-12 rounded-xl border-2 transition-all duration-300 ${
                  appearanceSettings.accentColor === color.id
                    ? 'border-slate-400 scale-110'
                    : 'border-slate-200 hover:scale-105'
                }`}
                style={{ backgroundColor: color.color }}
                title={color.name}
              >
                {appearanceSettings.accentColor === color.id && (
                  <Check className="w-6 h-6 text-white mx-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 mb-1">{currentT.settings.sections.appearance.items.fontSize.title}</h3>
              <p className="text-sm text-slate-600">{currentT.settings.sections.appearance.items.fontSize.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'small', label: currentT.settings.sections.appearance.items.fontSize.options.small },
              { id: 'medium', label: currentT.settings.sections.appearance.items.fontSize.options.medium },
              { id: 'large', label: currentT.settings.sections.appearance.items.fontSize.options.large }
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => updateAppearanceSettings({ fontSize: size.id as any })}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  appearanceSettings.fontSize === size.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Type className={`w-6 h-6 mx-auto mb-2 ${
                  appearanceSettings.fontSize === size.id ? 'text-teal-600' : 'text-slate-500'
                }`} />
                <p className={`text-sm font-medium ${
                  appearanceSettings.fontSize === size.id ? 'text-teal-700' : 'text-slate-700'
                }`}>
                  {size.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Density */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 mb-1">{currentT.settings.sections.appearance.items.density.title}</h3>
              <p className="text-sm text-slate-600">{currentT.settings.sections.appearance.items.density.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'compact', label: currentT.settings.sections.appearance.items.density.options.compact },
              { id: 'normal', label: currentT.settings.sections.appearance.items.density.options.normal },
              { id: 'comfortable', label: currentT.settings.sections.appearance.items.density.options.comfortable }
            ].map((density) => (
              <button
                key={density.id}
                onClick={() => updateAppearanceSettings({ density: density.id as any })}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  appearanceSettings.density === density.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Layers className={`w-6 h-6 mx-auto mb-2 ${
                  appearanceSettings.density === density.id ? 'text-teal-600' : 'text-slate-500'
                }`} />
                <p className={`text-sm font-medium ${
                  appearanceSettings.density === density.id ? 'text-teal-700' : 'text-slate-700'
                }`}>
                  {density.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Settings */}
        <div className="space-y-4">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 mb-1">{currentT.settings.sections.appearance.items.animations.title}</h3>
                <p className="text-sm text-slate-600">{currentT.settings.sections.appearance.items.animations.description}</p>
              </div>
              <div className="ml-6">
                {renderToggle(appearanceSettings.animations, () => 
                  updateAppearanceSettings({ animations: !appearanceSettings.animations })
                )}
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 mb-1">{currentT.settings.sections.appearance.items.glowEffects.title}</h3>
                <p className="text-sm text-slate-600">{currentT.settings.sections.appearance.items.glowEffects.description}</p>
              </div>
              <div className="ml-6">
                {renderToggle(appearanceSettings.glowEffects, () => 
                  updateAppearanceSettings({ glowEffects: !appearanceSettings.glowEffects })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    if (activeSection === 'appearance') {
      return renderAppearanceSection();
    }

    const section = currentT.settings.sections[activeSection as keyof typeof currentT.settings.sections];
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{section.title}</h2>
          <p className="text-slate-600">{section.description}</p>
        </div>

        <div className="space-y-4">
          {Object.entries(section.items).map(([key, item]) => (
            <div key={key} className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                  {item.current && (
                    <p className="text-sm text-teal-600 font-medium mt-1">
                      {language === 'tr' ? 'Mevcut:' : 'Current:'} {item.current}
                    </p>
                  )}
                </div>
                
                <div className="ml-6">
                  {typeof item.enabled === 'boolean' && (
                    renderToggle(item.enabled, () => handleSettingChange(key, !item.enabled))
                  )}
                  {item.action && (
                    <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors duration-300">
                      {item.action}
                    </button>
                  )}
                  {item.connected !== undefined && (
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.connected 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.connected 
                          ? (language === 'tr' ? 'Bağlı' : 'Connected')
                          : (language === 'tr' ? 'Bağlı Değil' : 'Not Connected')
                        }
                      </span>
                      <button className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                        item.connected
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-teal-500 hover:bg-teal-600 text-white'
                      }`}>
                        {item.connected 
                          ? (language === 'tr' ? 'Bağlantıyı Kes' : 'Disconnect')
                          : (language === 'tr' ? 'Bağlan' : 'Connect')
                        }
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="glass-card border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-slate-600 hover:text-teal-600 transition-colors duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="text-sm font-medium hidden sm:inline">
                  {language === 'tr' ? 'Dashboard\'a Dön' : 'Back to Dashboard'}
                </span>
                <span className="text-sm font-medium sm:hidden">
                  {language === 'tr' ? 'Geri' : 'Back'}
                </span>
              </button>
            </div>
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.settings.title}</h1>
            
            <div className="w-16 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.settings.title}</h1>
            <p className="text-slate-600">{currentT.settings.subtitle}</p>
          </div>

          <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'}`}>
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-4">
                <div className={`space-y-2 ${isMobile ? 'flex space-y-0 space-x-2 overflow-x-auto' : ''}`}>
                  {sections.map((section) => {
                    const IconComponent = section.icon;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                          isMobile ? 'flex-shrink-0 whitespace-nowrap' : ''
                        } ${
                          isActive 
                            ? 'bg-teal-500 text-white shadow-lg' 
                            : 'text-slate-700 hover:bg-teal-50 hover:text-teal-600'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{section.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                {renderSectionContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;