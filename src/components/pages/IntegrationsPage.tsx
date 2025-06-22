import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Globe, 
  Search, 
  Filter, 
  Plus, 
  Settings, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  RefreshCw,
  Star,
  Zap,
  Building2,
  MessageSquare,
  Mail,
  Calendar,
  FileText,
  CreditCard,
  BarChart3,
  Shield,
  Code,
  Smartphone,
  Users,
  Package,
  Truck,
  ShoppingCart,
  Database,
  Cloud,
  Wifi,
  Monitor,
  Headphones,
  Camera,
  Video,
  Mic,
  Speaker,
  Radio,
  Tv,
  Phone,
  Tablet,
  Laptop,
  Server,
  HardDrive,
  Cpu,
  MemoryStick,
  Router,
  Bluetooth,
  Cast,
  Power,
  Battery,
  Plug,
  Layers,
  Grid,
  List,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Copy,
  Share2,
  Download,
  Upload,
  Save,
  X,
  Info,
  ExternalLink,
  Link,
  Bookmark,
  Tag,
  Flag,
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
  Target
} from 'lucide-react';
import { Language } from '../../types';
import IntegrationConfigurationModal from '../Integrations/IntegrationConfigurationModal';

interface IntegrationsPageProps {
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

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'communication' | 'crm' | 'finance' | 'ecommerce' | 'analytics' | 'development' | 'security';
  icon: React.ComponentType<any>;
  status: 'connected' | 'disconnected' | 'pending' | 'error';
  isPopular: boolean;
  isNew: boolean;
  lastSync?: string;
  connectedSince?: string;
  features: string[];
  website: string;
  docsUrl: string;
}

const IntegrationsPage: React.FC<IntegrationsPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    loadMockIntegrations();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    filterIntegrations();
  }, [integrations, searchQuery, selectedCategory, selectedStatus]);

  const t = {
    tr: {
      integrations: {
        title: 'Entegrasyonlar',
        subtitle: 'Harici hizmetlerle bağlantılarınızı yönetin',
        search: 'Entegrasyonlarda ara...',
        filters: 'Filtreler',
        addIntegration: 'Yeni Entegrasyon',
        noIntegrations: 'Entegrasyon bulunamadı',
        categories: {
          all: 'Tümü',
          productivity: 'Üretkenlik',
          communication: 'İletişim',
          crm: 'CRM',
          finance: 'Finans',
          ecommerce: 'E-Ticaret',
          analytics: 'Analitik',
          development: 'Geliştirme',
          security: 'Güvenlik'
        },
        status: {
          all: 'Tüm Durumlar',
          connected: 'Bağlı',
          disconnected: 'Bağlı Değil',
          pending: 'Beklemede',
          error: 'Hata'
        },
        connect: 'Bağlan',
        disconnect: 'Bağlantıyı Kes',
        configure: 'Yapılandır',
        syncNow: 'Şimdi Senkronize Et',
        viewDocs: 'Dokümantas yon',
        popular: 'Popüler',
        new: 'Yeni',
        lastSync: 'Son senkronizasyon',
        connectedSince: 'Bağlı olduğu tarih',
        features: 'Özellikler',
        connecting: 'Bağlanıyor...',
        syncInProgress: 'Senkronizasyon devam ediyor...',
        stats: {
          totalIntegrations: 'Toplam Entegrasyon',
          connectedIntegrations: 'Bağlı Entegrasyon',
          pendingIntegrations: 'Bekleyen Entegrasyon',
          lastSyncTime: 'Son Senkronizasyon'
        }
      }
    },
    en: {
      integrations: {
        title: 'Integrations',
        subtitle: 'Manage your connections with external services',
        search: 'Search integrations...',
        filters: 'Filters',
        addIntegration: 'Add Integration',
        noIntegrations: 'No integrations found',
        categories: {
          all: 'All',
          productivity: 'Productivity',
          communication: 'Communication',
          crm: 'CRM',
          finance: 'Finance',
          ecommerce: 'E-Commerce',
          analytics: 'Analytics',
          development: 'Development',
          security: 'Security'
        },
        status: {
          all: 'All Status',
          connected: 'Connected',
          disconnected: 'Disconnected',
          pending: 'Pending',
          error: 'Error'
        },
        connect: 'Connect',
        disconnect: 'Disconnect',
        configure: 'Configure',
        syncNow: 'Sync Now',
        viewDocs: 'Documentation',
        popular: 'Popular',
        new: 'New',
        lastSync: 'Last sync',
        connectedSince: 'Connected since',
        features: 'Features',
        connecting: 'Connecting...',
        syncInProgress: 'Sync in progress...',
        stats: {
          totalIntegrations: 'Total Integrations',
          connectedIntegrations: 'Connected Integrations',
          pendingIntegrations: 'Pending Integrations',
          lastSyncTime: 'Last Sync Time'
        }
      }
    }
  };

  const currentT = t[language];

  const loadMockIntegrations = () => {
    const mockIntegrations: Integration[] = [
      {
        id: 'google-workspace',
        name: 'Google Workspace',
        description: 'Gmail, Drive, Calendar ve diğer Google hizmetleriyle entegrasyon',
        category: 'productivity',
        icon: Mail,
        status: 'connected',
        isPopular: true,
        isNew: false,
        lastSync: '2 saat önce',
        connectedSince: '15 Ocak 2024',
        features: ['E-posta senkronizasyonu', 'Takvim entegrasyonu', 'Dosya paylaşımı', 'Doküman işbirliği'],
        website: 'https://workspace.google.com',
        docsUrl: 'https://developers.google.com/workspace'
      },
      {
        id: 'microsoft-365',
        name: 'Microsoft 365',
        description: 'Outlook, OneDrive, Teams ve Office uygulamaları entegrasyonu',
        category: 'productivity',
        icon: Building2,
        status: 'connected',
        isPopular: true,
        isNew: false,
        lastSync: '1 gün önce',
        connectedSince: '10 Ocak 2024',
        features: ['Outlook entegrasyonu', 'OneDrive senkronizasyonu', 'Teams toplantıları', 'Office dokümanları'],
        website: 'https://www.microsoft.com/microsoft-365',
        docsUrl: 'https://docs.microsoft.com/graph'
      },
      {
        id: 'slack',
        name: 'Slack',
        description: 'Takım iletişimi ve bildirimler için Slack entegrasyonu',
        category: 'communication',
        icon: MessageSquare,
        status: 'disconnected',
        isPopular: true,
        isNew: false,
        features: ['Kanal bildirimleri', 'Direkt mesajlar', 'Bot entegrasyonu', 'Dosya paylaşımı'],
        website: 'https://slack.com',
        docsUrl: 'https://api.slack.com'
      },
      {
        id: 'whatsapp',
        name: 'WhatsApp Business',
        description: 'WhatsApp Business API ile müşteri iletişimi',
        category: 'communication',
        icon: Phone,
        status: 'disconnected',
        isPopular: true,
        isNew: true,
        features: ['Otomatik mesajlar', 'Müşteri desteği', 'Grup yönetimi', 'Medya paylaşımı'],
        website: 'https://business.whatsapp.com',
        docsUrl: 'https://developers.facebook.com/docs/whatsapp'
      },
      {
        id: 'salesforce',
        name: 'Salesforce',
        description: 'CRM verileri ve müşteri yönetimi entegrasyonu',
        category: 'crm',
        icon: Users,
        status: 'pending',
        isPopular: true,
        isNew: false,
        features: ['Müşteri verileri', 'Satış fırsatları', 'Raporlama', 'Otomasyon'],
        website: 'https://salesforce.com',
        docsUrl: 'https://developer.salesforce.com'
      },
      {
        id: 'hubspot',
        name: 'HubSpot',
        description: 'Marketing, satış ve müşteri hizmetleri platformu',
        category: 'crm',
        icon: Target,
        status: 'disconnected',
        isPopular: true,
        isNew: false,
        features: ['Lead yönetimi', 'E-posta pazarlama', 'Analitik', 'CRM'],
        website: 'https://hubspot.com',
        docsUrl: 'https://developers.hubspot.com'
      },
      {
        id: 'stripe',
        name: 'Stripe',
        description: 'Online ödeme işleme ve abonelik yönetimi',
        category: 'finance',
        icon: CreditCard,
        status: 'connected',
        isPopular: true,
        isNew: false,
        lastSync: '3 saat önce',
        connectedSince: '5 Ocak 2024',
        features: ['Ödeme işleme', 'Abonelik yönetimi', 'Fatura oluşturma', 'Ödeme sayfaları'],
        website: 'https://stripe.com',
        docsUrl: 'https://stripe.com/docs'
      },
      {
        id: 'shopify',
        name: 'Shopify',
        description: 'E-ticaret platformu entegrasyonu',
        category: 'ecommerce',
        icon: ShoppingCart,
        status: 'disconnected',
        isPopular: true,
        isNew: false,
        features: ['Ürün senkronizasyonu', 'Sipariş yönetimi', 'Müşteri verileri', 'Envanter takibi'],
        website: 'https://shopify.com',
        docsUrl: 'https://shopify.dev'
      },
      {
        id: 'google-analytics',
        name: 'Google Analytics',
        description: 'Web sitesi ve uygulama analitik entegrasyonu',
        category: 'analytics',
        icon: BarChart3,
        status: 'connected',
        isPopular: true,
        isNew: false,
        lastSync: '1 gün önce',
        connectedSince: '20 Aralık 2023',
        features: ['Ziyaretçi analizi', 'Davranış takibi', 'Dönüşüm izleme', 'Raporlama'],
        website: 'https://analytics.google.com',
        docsUrl: 'https://developers.google.com/analytics'
      },
      {
        id: 'github',
        name: 'GitHub',
        description: 'Kod depoları ve geliştirme iş akışı entegrasyonu',
        category: 'development',
        icon: Code,
        status: 'disconnected',
        isPopular: false,
        isNew: false,
        features: ['Kod senkronizasyonu', 'Issue takibi', 'Pull request yönetimi', 'CI/CD entegrasyonu'],
        website: 'https://github.com',
        docsUrl: 'https://docs.github.com'
      },
      {
        id: 'aws',
        name: 'Amazon Web Services',
        description: 'AWS bulut hizmetleri entegrasyonu',
        category: 'development',
        icon: Cloud,
        status: 'error',
        isPopular: false,
        isNew: false,
        features: ['S3 depolama', 'EC2 yönetimi', 'Lambda fonksiyonları', 'CloudWatch izleme'],
        website: 'https://aws.amazon.com',
        docsUrl: 'https://docs.aws.amazon.com'
      },
      {
        id: 'twilio',
        name: 'Twilio',
        description: 'SMS, ses ve video iletişim API\'leri',
        category: 'communication',
        icon: Phone,
        status: 'disconnected',
        isPopular: false,
        isNew: false,
        features: ['SMS gönderimi', 'Sesli aramalar', 'Video görüşmeleri', 'WhatsApp entegrasyonu'],
        website: 'https://twilio.com',
        docsUrl: 'https://www.twilio.com/docs'
      }
    ];

    setIntegrations(mockIntegrations);
    setFilteredIntegrations(mockIntegrations);
  };

  const filterIntegrations = () => {
    let filtered = [...integrations];
    
    // Arama filtresi
    if (searchQuery) {
      filtered = filtered.filter(integration => 
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(integration => integration.category === selectedCategory);
    }
    
    // Durum filtresi
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(integration => integration.status === selectedStatus);
    }
    
    setFilteredIntegrations(filtered);
  };

  const handleConnect = async (integrationId: string) => {
    setIsConnecting(integrationId);
    
    // Simüle edilmiş bağlantı işlemi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: 'connected',
            connectedSince: new Date().toLocaleDateString('tr-TR'),
            lastSync: 'Henüz senkronize edilmedi'
          } 
        : integration
    ));
    
    setIsConnecting(null);
  };

  const handleDisconnect = (integrationId: string) => {
    if (confirm('Bu entegrasyonun bağlantısını kesmek istediğinizden emin misiniz?')) {
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: 'disconnected',
              connectedSince: undefined,
              lastSync: undefined
            } 
          : integration
      ));
    }
  };

  const handleSyncNow = async (integrationId: string) => {
    setIsSyncing(integrationId);
    
    // Simüle edilmiş senkronizasyon işlemi
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            lastSync: 'Az önce'
          } 
        : integration
    ));
    
    setIsSyncing(null);
  };

  const handleConfigure = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowConfigModal(true);
  };

  const handleSaveConfig = () => {
    // Burada gerçek bir uygulamada yapılandırma ayarlarını kaydedersiniz
    setShowConfigModal(false);
  };

  const handleDeleteIntegration = () => {
    if (selectedIntegration) {
      setIntegrations(prev => prev.filter(integration => integration.id !== selectedIntegration.id));
      setShowConfigModal(false);
    }
  };

  const handleAddIntegration = () => {
    setShowAddModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-emerald-100 text-emerald-700';
      case 'disconnected': return 'bg-slate-100 text-slate-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'productivity': return Mail;
      case 'communication': return MessageSquare;
      case 'crm': return Users;
      case 'finance': return CreditCard;
      case 'ecommerce': return ShoppingCart;
      case 'analytics': return BarChart3;
      case 'development': return Code;
      case 'security': return Shield;
      default: return Globe;
    }
  };

  const renderIntegrationCard = (integration: Integration) => {
    const IconComponent = integration.icon;
    
    return (
      <div key={integration.id} className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-slate-800">{integration.name}</h3>
                {integration.isPopular && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    {currentT.integrations.popular}
                  </span>
                )}
                {integration.isNew && (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    {currentT.integrations.new}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 mt-1">{integration.description}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
            {currentT.integrations.status[integration.status as keyof typeof currentT.integrations.status]}
          </span>
        </div>
        
        {integration.status === 'connected' && (
          <div className="mb-4 space-y-1">
            <div className="flex items-center space-x-2 text-xs text-slate-600">
              <Clock className="w-3 h-3" />
              <span>{currentT.integrations.lastSync}: {integration.lastSync}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-600">
              <Calendar className="w-3 h-3" />
              <span>{currentT.integrations.connectedSince}: {integration.connectedSince}</span>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-4">
          {integration.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
              {feature}
            </span>
          ))}
          {integration.features.length > 3 && (
            <span className="px-2 py-1 bg-slate-50 text-slate-600 rounded-full text-xs">
              +{integration.features.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {integration.status === 'connected' ? (
            <>
              <button
                onClick={() => handleConfigure(integration)}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors duration-300"
              >
                <Settings className="w-3 h-3" />
                <span>{currentT.integrations.configure}</span>
              </button>
              <button
                onClick={() => handleSyncNow(integration.id)}
                disabled={isSyncing === integration.id}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition-colors duration-300 disabled:opacity-70"
              >
                {isSyncing === integration.id ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>{currentT.integrations.syncInProgress}</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3 h-3" />
                    <span>{currentT.integrations.syncNow}</span>
                  </>
                )}
              </button>
              <button
                onClick={() => handleDisconnect(integration.id)}
                className="flex items-center justify-center space-x-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors duration-300"
              >
                <XCircle className="w-3 h-3" />
                <span>{currentT.integrations.disconnect}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleConnect(integration.id)}
                disabled={isConnecting === integration.id}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-xs font-medium transition-colors duration-300 disabled:opacity-70"
              >
                {isConnecting === integration.id ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>{currentT.integrations.connecting}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    <span>{currentT.integrations.connect}</span>
                  </>
                )}
              </button>
              <a
                href={integration.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors duration-300"
              >
                <FileText className="w-3 h-3" />
                <span>{currentT.integrations.viewDocs}</span>
              </a>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderAddIntegrationModal = () => {
    if (!showAddModal) return null;

    const availableIntegrations = integrations.filter(i => i.status === 'disconnected');
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="glass-card rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto animate-fade-in-up max-w-4xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">{currentT.integrations.addIntegration}</h2>
              <p className="text-slate-600 mt-1">Yeni bir entegrasyon ekleyin ve harici hizmetlerle bağlantı kurun</p>
            </div>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 glass-input rounded-xl"
                placeholder="Entegrasyon ara..."
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-slate-800 mb-3">Kategoriler</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(currentT.integrations.categories).map(([key, value]) => (
                <button
                  key={key}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-300 ${
                    key === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableIntegrations.map(integration => {
              const IconComponent = integration.icon;
              return (
                <button
                  key={integration.id}
                  onClick={() => {
                    setShowAddModal(false);
                    handleConnect(integration.id);
                  }}
                  className="flex items-center space-x-3 p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-all duration-300 text-left"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-slate-800 truncate">{integration.name}</h4>
                      {integration.isNew && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          {currentT.integrations.new}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 truncate">{integration.description}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                </button>
              );
            })}
          </div>
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
                  {language === 'tr' ? 'Geri' : 'Back'}
                </span>
              </button>
            </div>
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.integrations.title}</h1>
            
            <div className="w-16 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.integrations.title}</h1>
            <p className="text-slate-600">{currentT.integrations.subtitle}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{integrations.length}</p>
                  <p className="text-sm text-slate-600">{currentT.integrations.stats.totalIntegrations}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{integrations.filter(i => i.status === 'connected').length}</p>
                  <p className="text-sm text-slate-600">{currentT.integrations.stats.connectedIntegrations}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{integrations.filter(i => i.status === 'pending').length}</p>
                  <p className="text-sm text-slate-600">{currentT.integrations.stats.pendingIntegrations}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">2 saat önce</p>
                  <p className="text-sm text-slate-600">{currentT.integrations.stats.lastSyncTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className={`flex items-center space-x-4 ${isMobile ? 'flex-col space-y-4 space-x-0' : ''}`}>
              <div className={`relative ${isMobile ? 'w-full' : 'flex-1'}`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 glass-input rounded-xl text-sm"
                  placeholder={currentT.integrations.search}
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${isMobile ? 'w-full justify-center' : ''} ${
                  showFilters ? 'bg-blue-500 text-white' : 'bg-white/50 text-slate-600 hover:bg-blue-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">{currentT.integrations.filters}</span>
              </button>

              <button 
                onClick={handleAddIntegration}
                className={`flex items-center space-x-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full justify-center' : ''}`}
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">{currentT.integrations.addIntegration}</span>
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-slate-200 animate-fade-in-up">
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Kategori
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                    >
                      {Object.entries(currentT.integrations.categories).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Durum
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                    >
                      {Object.entries(currentT.integrations.status).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.length > 0 ? (
              filteredIntegrations.map(renderIntegrationCard)
            ) : (
              <div className="col-span-full text-center py-16">
                <Globe className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  {currentT.integrations.noIntegrations}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Integration Modal */}
      {renderAddIntegrationModal()}

      {/* Configuration Modal */}
      {showConfigModal && selectedIntegration && (
        <IntegrationConfigurationModal
          integration={selectedIntegration}
          language={language}
          onClose={() => setShowConfigModal(false)}
          onSave={handleSaveConfig}
          onDelete={handleDeleteIntegration}
          onSyncNow={handleSyncNow}
          isSyncing={isSyncing}
        />
      )}
    </div>
  );
};

export default IntegrationsPage;