import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  UserCheck, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Users,
  Globe,
  Server,
  Database,
  Wifi,
  Monitor,
  Smartphone,
  Tablet,
  Settings,
  Bell,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  Plus,
  Minus,
  X,
  Edit,
  Trash2,
  Copy,
  Share2,
  ExternalLink,
  Info,
  HelpCircle,
  Calendar,
  MapPin,
  Building2,
  Target,
  Award,
  Star,
  Heart,
  Bookmark,
  Tag,
  Flag,
  Zap,
  Power,
  PowerOff,
  Cpu,
  HardDrive,
  MemoryStick,
  Router,
  Bluetooth,
  Cast,
  Radio,
  Tv,
  Speaker,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Save,
  Folder,
  File,
  Archive,
  Package,
  Truck,
  ShoppingCart,
  DollarSign,
  CreditCard,
  Receipt,
  TrendingUp,
  BarChart3,
  PieChart,
  Layers,
  Grid,
  List,
  Columns,
  Rows,
  Loader2
} from 'lucide-react';
import { Language } from '../../types';
import SearchToolbar from '../SearchToolbar';

interface SystemSecurityPageProps {
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

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'password_change' | 'permission_change' | 'data_access' | 'system_change';
  severity: 'low' | 'medium' | 'high' | 'critical';
  user: string;
  action: string;
  details: string;
  timestamp: string;
  ip_address: string;
  device: string;
  location: string;
  status: 'success' | 'failed' | 'blocked';
}

interface SecurityPolicy {
  id: string;
  category: string;
  name: string;
  description: string;
  enabled: boolean;
  level: 'low' | 'medium' | 'high' | 'critical';
  last_updated: string;
  config?: {
    [key: string]: any;
  };
}

interface ActiveSession {
  id: string;
  user: string;
  device: string;
  browser: string;
  ip_address: string;
  location: string;
  login_time: string;
  last_activity: string;
  is_current: boolean;
}

const SystemSecurityPage: React.FC<SystemSecurityPageProps> = ({ 
  language, 
  userInfo, 
  onBack,
  onLogout 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'policies' | 'sessions' | 'settings'>('overview');
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('24h');
  const [isUpdatingPolicy, setIsUpdatingPolicy] = useState<string | null>(null);
  const [showPolicyConfig, setShowPolicyConfig] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState<SecurityEvent[]>([]);

  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      type: 'failed_login',
      severity: 'high',
      user: 'unknown',
      action: 'Başarısız Giriş Denemesi',
      details: 'Yanlış şifre ile 5 kez deneme',
      timestamp: '2025-01-19 14:30:25',
      ip_address: '192.168.1.100',
      device: 'Windows PC',
      location: 'İstanbul, Türkiye',
      status: 'blocked'
    },
    {
      id: '2',
      type: 'login',
      severity: 'low',
      user: 'Ahmet Yılmaz',
      action: 'Başarılı Giriş',
      details: 'Normal giriş işlemi',
      timestamp: '2025-01-19 14:25:10',
      ip_address: '192.168.1.50',
      device: 'iPhone 15',
      location: 'İstanbul, Türkiye',
      status: 'success'
    },
    {
      id: '3',
      type: 'permission_change',
      severity: 'medium',
      user: 'Admin',
      action: 'Yetki Değişikliği',
      details: 'Zeynep Özkan kullanıcısına yönetici yetkisi verildi',
      timestamp: '2025-01-19 13:45:30',
      ip_address: '192.168.1.10',
      device: 'MacBook Pro',
      location: 'İstanbul, Türkiye',
      status: 'success'
    },
    {
      id: '4',
      type: 'data_access',
      severity: 'medium',
      user: 'Mehmet Kaya',
      action: 'Hassas Veri Erişimi',
      details: 'Finansal raporlara erişim',
      timestamp: '2025-01-19 12:20:15',
      ip_address: '192.168.1.75',
      device: 'Windows PC',
      location: 'Ankara, Türkiye',
      status: 'success'
    },
    {
      id: '5',
      type: 'system_change',
      severity: 'critical',
      user: 'System Admin',
      action: 'Sistem Konfigürasyonu Değişikliği',
      details: 'Güvenlik politikaları güncellendi',
      timestamp: '2025-01-19 11:15:45',
      ip_address: '192.168.1.1',
      device: 'Linux Server',
      location: 'İstanbul, Türkiye',
      status: 'success'
    }
  ]);

  const [securityPolicies, setSecurityPolicies] = useState<SecurityPolicy[]>([
    {
      id: '1',
      category: 'authentication',
      name: 'İki Faktörlü Doğrulama',
      description: 'Tüm kullanıcılar için 2FA zorunluluğu',
      enabled: true,
      level: 'high',
      last_updated: '2025-01-15',
      config: {
        enforce_for_all: true,
        grace_period_days: 7,
        allowed_methods: ['sms', 'email', 'authenticator']
      }
    },
    {
      id: '2',
      category: 'password',
      name: 'Güçlü Şifre Politikası',
      description: 'Minimum 8 karakter, büyük/küçük harf, sayı ve özel karakter',
      enabled: true,
      level: 'high',
      last_updated: '2025-01-10',
      config: {
        min_length: 8,
        require_uppercase: true,
        require_lowercase: true,
        require_numbers: true,
        require_special_chars: true,
        password_history: 5
      }
    },
    {
      id: '3',
      category: 'session',
      name: 'Oturum Zaman Aşımı',
      description: '30 dakika hareketsizlik sonrası otomatik çıkış',
      enabled: true,
      level: 'medium',
      last_updated: '2025-01-12',
      config: {
        timeout_minutes: 30,
        warning_minutes: 5,
        extend_on_activity: true
      }
    },
    {
      id: '4',
      category: 'access',
      name: 'IP Kısıtlaması',
      description: 'Belirli IP adreslerinden erişim kısıtlaması',
      enabled: false,
      level: 'medium',
      last_updated: '2025-01-08',
      config: {
        whitelist_enabled: false,
        allowed_ips: ['192.168.1.0/24'],
        block_vpn: false,
        geo_restrictions: []
      }
    },
    {
      id: '5',
      category: 'monitoring',
      name: 'Gerçek Zamanlı İzleme',
      description: 'Şüpheli aktivitelerin anlık tespiti',
      enabled: true,
      level: 'high',
      last_updated: '2025-01-18',
      config: {
        failed_login_threshold: 5,
        suspicious_activity_detection: true,
        auto_block_enabled: true,
        notification_enabled: true
      }
    },
    {
      id: '6',
      category: 'encryption',
      name: 'Veri Şifreleme',
      description: 'Hassas verilerin AES-256 ile şifrelenmesi',
      enabled: true,
      level: 'critical',
      last_updated: '2025-01-05',
      config: {
        encryption_algorithm: 'AES-256',
        key_rotation_days: 90,
        encrypt_at_rest: true,
        encrypt_in_transit: true
      }
    }
  ]);

  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([
    {
      id: '1',
      user: 'Ahmet Yılmaz',
      device: 'iPhone 15',
      browser: 'Safari 17.2',
      ip_address: '192.168.1.50',
      location: 'İstanbul, Türkiye',
      login_time: '2025-01-19 14:25:10',
      last_activity: '2025-01-19 15:30:25',
      is_current: true
    },
    {
      id: '2',
      user: 'Zeynep Özkan',
      device: 'MacBook Pro',
      browser: 'Chrome 120.0',
      ip_address: '192.168.1.45',
      location: 'İstanbul, Türkiye',
      login_time: '2025-01-19 13:15:30',
      last_activity: '2025-01-19 15:28:15',
      is_current: false
    },
    {
      id: '3',
      user: 'Mehmet Kaya',
      device: 'Windows PC',
      browser: 'Edge 120.0',
      ip_address: '192.168.1.75',
      location: 'Ankara, Türkiye',
      login_time: '2025-01-19 12:20:15',
      last_activity: '2025-01-19 15:25:40',
      is_current: false
    }
  ]);

  useEffect(() => {
    setIsLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Initialize filtered events
    setFilteredEvents(securityEvents);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [securityEvents]);

  // Add search effect
  useEffect(() => {
    let filtered = [...securityEvents];
    
    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(event =>
        event.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.ip_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Severity filter
    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(event => event.severity === selectedSeverity);
    }
    
    // Time range filter (simplified for demo)
    // In a real app, you would compare actual dates
    
    setFilteredEvents(filtered);
  }, [searchQuery, selectedSeverity, selectedTimeRange, securityEvents]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const t = {
    tr: {
      security: {
        title: 'Sistem Güvenliği',
        subtitle: 'Güvenlik durumunu izleyin ve yönetin',
        search: 'Güvenlik olaylarında ara...',
        tabs: {
          overview: 'Genel Bakış',
          events: 'Güvenlik Olayları',
          policies: 'Güvenlik Politikaları',
          sessions: 'Aktif Oturumlar',
          settings: 'Güvenlik Ayarları'
        },
        overview: {
          securityScore: 'Güvenlik Skoru',
          threatLevel: 'Tehdit Seviyesi',
          activeThreats: 'Aktif Tehditler',
          lastScan: 'Son Tarama',
          recentEvents: 'Son Olaylar',
          criticalAlerts: 'Kritik Uyarılar'
        },
        events: {
          noEvents: 'Güvenlik olayı bulunamadı',
          severity: {
            low: 'Düşük',
            medium: 'Orta',
            high: 'Yüksek',
            critical: 'Kritik'
          },
          status: {
            success: 'Başarılı',
            failed: 'Başarısız',
            blocked: 'Engellendi'
          },
          types: {
            login: 'Giriş',
            logout: 'Çıkış',
            failed_login: 'Başarısız Giriş',
            password_change: 'Şifre Değişikliği',
            permission_change: 'Yetki Değişikliği',
            data_access: 'Veri Erişimi',
            system_change: 'Sistem Değişikliği'
          }
        },
        policies: {
          noPolicies: 'Güvenlik politikası bulunamadı',
          enable: 'Etkinleştir',
          disable: 'Devre Dışı Bırak',
          edit: 'Düzenle',
          configure: 'Yapılandır',
          save: 'Kaydet',
          cancel: 'İptal',
          updating: 'Güncelleniyor...',
          updated: 'Politika güncellendi',
          level: {
            low: 'Düşük',
            medium: 'Orta',
            high: 'Yüksek',
            critical: 'Kritik'
          },
          categories: {
            authentication: 'Kimlik Doğrulama',
            password: 'Şifre Politikası',
            session: 'Oturum Yönetimi',
            access: 'Erişim Kontrolü',
            monitoring: 'İzleme',
            encryption: 'Şifreleme',
            backup: 'Yedekleme',
            audit: 'Denetim',
            api: 'API Güvenliği',
            device: 'Cihaz Yönetimi'
          }
        },
        sessions: {
          noSessions: 'Aktif oturum bulunamadı',
          terminate: 'Oturumu Sonlandır',
          current: 'Mevcut Oturum',
          terminateAll: 'Tüm Oturumları Sonlandır'
        }
      }
    },
    en: {
      security: {
        title: 'System Security',
        subtitle: 'Monitor and manage security status',
        search: 'Search security events...',
        tabs: {
          overview: 'Overview',
          events: 'Security Events',
          policies: 'Security Policies',
          sessions: 'Active Sessions',
          settings: 'Security Settings'
        },
        overview: {
          securityScore: 'Security Score',
          threatLevel: 'Threat Level',
          activeThreats: 'Active Threats',
          lastScan: 'Last Scan',
          recentEvents: 'Recent Events',
          criticalAlerts: 'Critical Alerts'
        },
        events: {
          noEvents: 'No security events found',
          severity: {
            low: 'Low',
            medium: 'Medium',
            high: 'High',
            critical: 'Critical'
          },
          status: {
            success: 'Success',
            failed: 'Failed',
            blocked: 'Blocked'
          },
          types: {
            login: 'Login',
            logout: 'Logout',
            failed_login: 'Failed Login',
            password_change: 'Password Change',
            permission_change: 'Permission Change',
            data_access: 'Data Access',
            system_change: 'System Change'
          }
        },
        policies: {
          noPolicies: 'No security policies found',
          enable: 'Enable',
          disable: 'Disable',
          edit: 'Edit',
          configure: 'Configure',
          save: 'Save',
          cancel: 'Cancel',
          updating: 'Updating...',
          updated: 'Policy updated',
          level: {
            low: 'Low',
            medium: 'Medium',
            high: 'High',
            critical: 'Critical'
          },
          categories: {
            authentication: 'Authentication',
            password: 'Password Policy',
            session: 'Session Management',
            access: 'Access Control',
            monitoring: 'Monitoring',
            encryption: 'Encryption',
            backup: 'Backup',
            audit: 'Audit',
            api: 'API Security',
            device: 'Device Management'
          }
        },
        sessions: {
          noSessions: 'No active sessions found',
          terminate: 'Terminate Session',
          current: 'Current Session',
          terminateAll: 'Terminate All Sessions'
        }
      }
    }
  };

  const currentT = t[language];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-emerald-600';
      case 'failed': return 'text-red-600';
      case 'blocked': return 'text-orange-600';
      default: return 'text-slate-600';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return UserCheck;
      case 'logout': return Power;
      case 'failed_login': return XCircle;
      case 'password_change': return Key;
      case 'permission_change': return Shield;
      case 'data_access': return Database;
      case 'system_change': return Settings;
      default: return AlertTriangle;
    }
  };

  const togglePolicy = async (policyId: string) => {
    setIsUpdatingPolicy(policyId);
    
    // Simüle edilmiş API çağrısı
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSecurityPolicies(prev => prev.map(policy => {
      if (policy.id === policyId) {
        const newEnabled = !policy.enabled;
        
        // Güvenlik olayı ekle
        const newEvent: SecurityEvent = {
          id: Date.now().toString(),
          type: 'system_change',
          severity: 'medium',
          user: `${userInfo.firstName} ${userInfo.lastName}`,
          action: `Güvenlik Politikası ${newEnabled ? 'Etkinleştirildi' : 'Devre Dışı Bırakıldı'}`,
          details: `${policy.name} politikası ${newEnabled ? 'etkinleştirildi' : 'devre dışı bırakıldı'}`,
          timestamp: new Date().toLocaleString('tr-TR'),
          ip_address: '192.168.1.10',
          device: 'Web Browser',
          location: 'İstanbul, Türkiye',
          status: 'success'
        };
        
        setSecurityEvents(prev => [newEvent, ...prev]);
        
        return { 
          ...policy, 
          enabled: newEnabled, 
          last_updated: new Date().toISOString().split('T')[0] 
        };
      }
      return policy;
    }));
    
    setIsUpdatingPolicy(null);
    
    // Başarı bildirimi
    setTimeout(() => {
      alert(currentT.security.policies.updated);
    }, 100);
  };

  const renderEvents = () => (
    <div className="space-y-6">
      {/* Filters */}
      <SearchToolbar
        placeholder={language === 'tr' ? 'Güvenlik olaylarında ara...' : 'Search security events...'}
        onSearch={handleSearch}
        onFilter={toggleFilters}
        showAddButton={false}
        isMobile={isMobile}
      />

      {/* Advanced Filters */}
      {showFilters && (
        <div className="glass-card rounded-xl p-4 mb-6 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Önem Seviyesi
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full px-3 py-2 glass-input rounded-lg text-sm"
              >
                <option value="all">Tüm Seviyeler</option>
                {Object.entries(currentT.security.events.severity).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Olay Türü
              </label>
              <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                <option value="all">Tüm Türler</option>
                {Object.entries(currentT.security.events.types).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Zaman Aralığı
              </label>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="w-full px-3 py-2 glass-input rounded-lg text-sm"
              >
                <option value="1h">Son 1 Saat</option>
                <option value="24h">Son 24 Saat</option>
                <option value="7d">Son 7 Gün</option>
                <option value="30d">Son 30 Gün</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="glass-card rounded-xl p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getSeverityColor(event.severity)}`}>
                  {(() => {
                    const IconComponent = getEventIcon(event.type);
                    return <IconComponent className="w-5 h-5" />;
                  })()}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h4 className="font-semibold text-slate-800">{event.action}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                      {currentT.security.events.severity[event.severity]}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3">{event.details}</p>
                  
                  <div className={`grid gap-2 text-xs text-slate-500 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span className="truncate">{event.user}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="w-3 h-3" />
                      <span className="truncate">{event.ip_address}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Monitor className="w-3 h-3" />
                      <span className="truncate">{event.device}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right flex-shrink-0 ml-2">
                  <span className={`text-sm font-medium ${getStatusColor(event.status)}`}>
                    {currentT.security.events.status[event.status]}
                  </span>
                  <p className="text-xs text-slate-500 mt-1 whitespace-nowrap">{event.timestamp}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              {currentT.security.events.noEvents}
            </h3>
            {searchQuery && (
              <p className="text-slate-500 max-w-md mx-auto">
                {language === 'tr' 
                  ? `"${searchQuery}" için sonuç bulunamadı.` 
                  : `No results found for "${searchQuery}".`}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

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
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.security.title}</h1>
            
            <div className="w-16 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">{currentT.security.title}</h1>
            <p className="text-slate-600">{currentT.security.subtitle}</p>
          </div>

          {/* Tabs */}
          <div className="glass-card rounded-2xl p-2 mb-6 sm:mb-8">
            <div className={`grid gap-2 ${isMobile ? 'grid-cols-2 grid-rows-3' : 'grid-cols-5'}`}>
              {[
                { id: 'overview', label: currentT.security.tabs.overview, icon: Shield },
                { id: 'events', label: currentT.security.tabs.events, icon: Activity },
                { id: 'policies', label: currentT.security.tabs.policies, icon: Lock },
                { id: 'sessions', label: currentT.security.tabs.sessions, icon: Users },
                { id: 'settings', label: currentT.security.tabs.settings, icon: Settings }
              ].map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center justify-center space-x-2 py-3 px-2 sm:px-4 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-teal-500 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-teal-50 hover:text-teal-600'
                    }`}
                    aria-label={`${tab.label} sekmesine geç`}
                    aria-selected={activeTab === tab.id}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium text-xs sm:text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8">
            {activeTab === 'events' && renderEvents()}
            {/* Other tabs remain the same */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSecurityPage;