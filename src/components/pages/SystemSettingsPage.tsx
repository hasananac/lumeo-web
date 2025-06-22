import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  Server, 
  Database, 
  Globe, 
  Monitor, 
  Cpu, 
  HardDrive,
  MemoryStick,
  Wifi,
  Shield,
  Key,
  Lock,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Info,
  RefreshCw,
  Download,
  Upload,
  FileText,
  Mail,
  Bell,
  Clock,
  Calendar,
  Users,
  Building2,
  MapPin,
  Phone,
  Palette,
  Type,
  Layers,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  Target,
  Filter,
  Search,
  Plus,
  Minus,
  X,
  ChevronRight,
  ChevronDown,
  Trash2,
  Edit,
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
  CreditCard,
  Receipt,
  Bookmark,
  Tag,
  Star,
  Heart,
  ThumbsUp,
  Award,
  Gift,
  Coffee,
  Umbrella,
  Sun,
  Moon,
  CloudRain,
  Snowflake,
  Flame,
  Droplets,
  Wind,
  Thermometer,
  Battery,
  Plug,
  Power,
  PowerOff,
  ToggleLeft,
  ToggleRight,
  Sliders,
  Volume2,
  VolumeX,
  Bluetooth,
  Cast,
  Radio,
  Tv,
  Speaker,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Maximize,
  Minimize
} from 'lucide-react';
import { Language } from '../../types';
import SearchToolbar from '../SearchToolbar';

interface SystemSettingsPageProps {
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

interface SystemSetting {
  id: string;
  category: string;
  name: string;
  description: string;
  type: 'toggle' | 'select' | 'input' | 'number' | 'password' | 'textarea';
  value: any;
  options?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
  unit?: string;
  required?: boolean;
  sensitive?: boolean;
  restart_required?: boolean;
}

interface SettingCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  settings: SystemSetting[];
}

const SystemSettingsPage: React.FC<SystemSettingsPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');
  const [isMobile, setIsMobile] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSensitive, setShowSensitive] = useState<Record<string, boolean>>({});
  const [filteredCategories, setFilteredCategories] = useState<SettingCategory[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const [categories, setCategories] = useState<SettingCategory[]>([
    // Your existing categories...
  ]);

  useEffect(() => {
    setIsLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Initialize filtered categories
    setFilteredCategories(categories);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [categories]);

  // Add search effect
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.map(category => ({
        ...category,
        settings: category.settings.filter(setting =>
          setting.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          setting.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.settings.length > 0);
      
      setFilteredCategories(filtered);
      
      // If there's a match in a category that's not active, switch to the first category with matches
      if (filtered.length > 0 && !filtered.some(cat => cat.id === activeCategory)) {
        setActiveCategory(filtered[0].id);
      }
    }
  }, [searchQuery, categories, activeCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const t = {
    tr: {
      systemSettings: {
        title: 'Sistem Ayarları',
        subtitle: 'Sistem konfigürasyonlarını yönetin',
        search: 'Ayarlarda ara...',
        saveChanges: 'Değişiklikleri Kaydet',
        resetToDefaults: 'Varsayılanlara Sıfırla',
        unsavedChanges: 'Kaydedilmemiş değişiklikler var',
        saveSuccess: 'Ayarlar başarıyla kaydedildi',
        saveError: 'Ayarlar kaydedilirken hata oluştu',
        restartRequired: 'Bu değişiklik için sistem yeniden başlatılması gerekiyor',
        categories: {
          general: 'Genel',
          performance: 'Performans',
          database: 'Veritabanı',
          email: 'E-posta',
          notifications: 'Bildirimler',
          security: 'Güvenlik',
          logging: 'Günlük Kayıtları',
          backup: 'Yedekleme'
        }
      }
    },
    en: {
      systemSettings: {
        title: 'System Settings',
        subtitle: 'Manage system configurations',
        search: 'Search settings...',
        saveChanges: 'Save Changes',
        resetToDefaults: 'Reset to Defaults',
        unsavedChanges: 'You have unsaved changes',
        saveSuccess: 'Settings saved successfully',
        saveError: 'Error saving settings',
        restartRequired: 'System restart required for this change',
        categories: {
          general: 'General',
          performance: 'Performance',
          database: 'Database',
          email: 'Email',
          notifications: 'Notifications',
          security: 'Security',
          logging: 'Logging',
          backup: 'Backup'
        }
      }
    }
  };

  const currentT = t[language];

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
                aria-label="Geri dön"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="text-sm font-medium hidden sm:inline">
                  {language === 'tr' ? 'Geri' : 'Back'}
                </span>
              </button>
            </div>
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.systemSettings.title}</h1>
            
            <div className="w-16 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">{currentT.systemSettings.title}</h1>
            <p className="text-slate-600">{currentT.systemSettings.subtitle}</p>
          </div>

          {/* Search and Actions */}
          <SearchToolbar
            placeholder={currentT.systemSettings.search}
            onSearch={handleSearch}
            onFilter={toggleFilters}
            showAddButton={false}
            isMobile={isMobile}
            className="mb-6 sm:mb-8"
          />

          {/* Filters */}
          {showFilters && (
            <div className="glass-card rounded-2xl p-6 mb-6 sm:mb-8 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Kategori
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Kategoriler</option>
                    {Object.entries(currentT.systemSettings.categories).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ayar Türü
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Türler</option>
                    <option value="toggle">Açma/Kapama</option>
                    <option value="select">Seçim</option>
                    <option value="input">Metin</option>
                    <option value="number">Sayı</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Durum
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Durumlar</option>
                    <option value="modified">Değiştirilmiş</option>
                    <option value="default">Varsayılan</option>
                    <option value="required">Gerekli</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {hasChanges && (
            <div className="glass-card rounded-2xl p-4 mb-6 sm:mb-8 animate-fade-in-up">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700">{currentT.systemSettings.unsavedChanges}</span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {/* Save settings */}}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white rounded-xl transition-colors duration-300 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span className="font-medium">{currentT.systemSettings.saveChanges}</span>
                  </button>

                  <button
                    onClick={() => {/* Reset to defaults */}}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-xl transition-colors duration-300"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="font-medium">{currentT.systemSettings.resetToDefaults}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className={`grid gap-6 sm:gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'}`}>
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-4">
                <div className={`space-y-2 ${isMobile ? 'flex flex-wrap gap-2 space-y-0' : ''}`}>
                  {filteredCategories.map((category) => {
                    const IconComponent = category.icon;
                    const isActive = activeCategory === category.id;
                    
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                          isMobile ? 'flex-auto min-w-[45%]' : ''
                        } ${
                          isActive 
                            ? 'bg-teal-500 text-white shadow-lg' 
                            : 'text-slate-700 hover:bg-teal-50 hover:text-teal-600'
                        }`}
                        aria-label={`${category.name} kategorisine geç`}
                        aria-selected={isActive}
                      >
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium truncate">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8">
                {filteredCategories.length > 0 ? (
                  (() => {
                    const activeCategory_obj = filteredCategories.find(cat => cat.id === activeCategory);
                    return activeCategory_obj ? (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">{activeCategory_obj.name}</h2>
                          <p className="text-slate-600">{activeCategory_obj.description}</p>
                        </div>
                        
                        {/* Settings would be rendered here */}
                        <div className="space-y-4">
                          {/* Settings items */}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 sm:py-16">
                        <Settings className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">
                          Kategori bulunamadı
                        </h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                          Arama kriterlerinize uygun ayar bulunamadı. Lütfen farklı bir arama terimi deneyin veya filtreleri temizleyin.
                        </p>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-center py-12 sm:py-16">
                    <Search className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">
                      {language === 'tr' ? 'Sonuç bulunamadı' : 'No results found'}
                    </h3>
                    <p className="text-slate-500 max-w-md mx-auto">
                      {language === 'tr' 
                        ? `"${searchQuery}" için sonuç bulunamadı. Lütfen farklı bir arama terimi deneyin.` 
                        : `No results found for "${searchQuery}". Please try a different search term.`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPage;