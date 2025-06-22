import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  X, 
  User, 
  Building2, 
  FileText, 
  Calendar, 
  Target, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Tag, 
  Folder, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  Eye, 
  Edit, 
  MoreHorizontal, 
  ArrowLeft,
  Users,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Star,
  Download,
  Share,
  Bookmark,
  TrendingUp,
  Activity,
  Database,
  Globe,
  Shield,
  Zap,
  Menu,
  Bell,
  Palette,
  Monitor,
  Sun,
  Moon,
  Key,
  Lock,
  Archive,
  Trash2,
  Plus,
  Minus,
  RefreshCw,
  Send,
  MessageSquare,
  Video,
  Image,
  DollarSign,
  CreditCard,
  BarChart3,
  PieChart,
  Layers,
  Package,
  ShoppingCart,
  Truck,
  Headphones,
  HardDrive,
  Cloud,
  Smartphone,
  Tablet,
  Wifi,
  Server,
  Code,
  Terminal,
  GitBranch,
  Bug,
  Lightbulb,
  Rocket,
  Flag,
  Award,
  Gift,
  Coffee,
  Home,
  MapPin as Location,
  Navigation,
  Compass
} from 'lucide-react';
import { Language } from '../types';

interface SearchPageProps {
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
  initialSearchQuery?: string;
}

interface SearchResult {
  id: string;
  type: 'user' | 'project' | 'task' | 'document' | 'meeting' | 'contact' | 'company' | 'report' | 'setting' | 'page' | 'feature' | 'notification' | 'theme' | 'profile' | 'security' | 'payment' | 'integration' | 'api' | 'backup' | 'export' | 'import' | 'analytics' | 'dashboard' | 'menu' | 'button' | 'form' | 'field' | 'option';
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  content?: string; // Tam içerik metni
  path?: string; // Sayfadaki konum
  metadata: {
    [key: string]: any;
  };
  relevanceScore: number;
  lastModified: string;
  status?: 'active' | 'inactive' | 'pending' | 'completed' | 'draft';
  tags?: string[];
  owner?: string;
  department?: string;
  searchableText?: string; // Arama için optimize edilmiş metin
}

interface FilterOptions {
  types: string[];
  categories: string[];
  dateRange: 'all' | 'today' | 'week' | 'month' | 'year';
  status: string[];
  departments: string[];
  sortBy: 'relevance' | 'date' | 'title' | 'type' | 'category';
  sortOrder: 'asc' | 'desc';
}

const SearchPage: React.FC<SearchPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout, 
  initialSearchQuery = '' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['user', 'project', 'task', 'page', 'setting']));
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [allSearchableContent, setAllSearchableContent] = useState<SearchResult[]>([]);

  const [filters, setFilters] = useState<FilterOptions>({
    types: [],
    categories: [],
    dateRange: 'all',
    status: [],
    departments: [],
    sortBy: 'relevance',
    sortOrder: 'desc'
  });

  useEffect(() => {
    setIsLoaded(true);
    
    // Mobil kontrolü
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Tüm aranabilir içeriği yükle
    loadAllSearchableContent();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const t = {
    tr: {
      search: {
        title: 'Arama',
        placeholder: 'Tüm içerikte ara... (kullanıcılar, projeler, ayarlar, sayfalar)',
        filters: 'Filtreler',
        sortBy: 'Sırala',
        results: 'sonuç bulundu',
        noResults: 'Sonuç bulunamadı',
        searching: 'Aranıyor...',
        searchingFor: 'için',
        showFilters: 'Filtreleri Göster',
        hideFilters: 'Filtreleri Gizle',
        clearFilters: 'Filtreleri Temizle',
        categories: {
          user: 'Kullanıcılar',
          project: 'Projeler',
          task: 'Görevler',
          document: 'Belgeler',
          meeting: 'Toplantılar',
          contact: 'Kişiler',
          company: 'Şirketler',
          report: 'Raporlar',
          setting: 'Ayarlar',
          page: 'Sayfalar',
          feature: 'Özellikler',
          notification: 'Bildirimler',
          theme: 'Tema',
          profile: 'Profil',
          security: 'Güvenlik',
          payment: 'Ödeme',
          integration: 'Entegrasyonlar',
          api: 'API',
          backup: 'Yedekleme',
          export: 'Dışa Aktarma',
          import: 'İçe Aktarma',
          analytics: 'Analitik',
          dashboard: 'Dashboard',
          menu: 'Menü',
          button: 'Butonlar',
          form: 'Formlar',
          field: 'Alanlar',
          option: 'Seçenekler'
        },
        filterOptions: {
          allTypes: 'Tüm Türler',
          allCategories: 'Tüm Kategoriler',
          dateRange: 'Tarih Aralığı',
          status: 'Durum',
          department: 'Departman',
          today: 'Bugün',
          week: 'Bu Hafta',
          month: 'Bu Ay',
          year: 'Bu Yıl',
          all: 'Tümü',
          relevance: 'İlgililik',
          date: 'Tarih',
          title: 'Başlık',
          type: 'Tür',
          category: 'Kategori'
        },
        actions: {
          view: 'Görüntüle',
          edit: 'Düzenle',
          share: 'Paylaş',
          download: 'İndir',
          bookmark: 'Yer İmi',
          more: 'Daha Fazla',
          close: 'Kapat',
          goTo: 'Git',
          open: 'Aç'
        },
        emptyState: {
          title: 'Global Arama',
          description: 'Tüm sistem içeriğinde arama yapın. Kullanıcılar, projeler, ayarlar, sayfalar, özellikler ve daha fazlasını bulun.'
        },
        noResultsState: {
          description: 'Farklı anahtar kelimeler deneyin veya filtreleri değiştirin. Tüm içerik taranmaktadır.'
        },
        suggestions: {
          title: 'Önerilen Aramalar',
          items: [
            'bildirimler',
            'tema ayarları',
            'profil düzenle',
            'güvenlik',
            'iki faktörlü doğrulama',
            'şifre değiştir',
            'kullanıcı ekle',
            'proje oluştur',
            'görev ata',
            'toplantı planla',
            'rapor oluştur',
            'ayarlar',
            'dashboard',
            'analitik'
          ]
        }
      }
    },
    en: {
      search: {
        title: 'Search',
        placeholder: 'Search all content... (users, projects, settings, pages)',
        filters: 'Filters',
        sortBy: 'Sort By',
        results: 'results found',
        noResults: 'No results found',
        searching: 'Searching...',
        searchingFor: 'for',
        showFilters: 'Show Filters',
        hideFilters: 'Hide Filters',
        clearFilters: 'Clear Filters',
        categories: {
          user: 'Users',
          project: 'Projects',
          task: 'Tasks',
          document: 'Documents',
          meeting: 'Meetings',
          contact: 'Contacts',
          company: 'Companies',
          report: 'Reports',
          setting: 'Settings',
          page: 'Pages',
          feature: 'Features',
          notification: 'Notifications',
          theme: 'Theme',
          profile: 'Profile',
          security: 'Security',
          payment: 'Payment',
          integration: 'Integrations',
          api: 'API',
          backup: 'Backup',
          export: 'Export',
          import: 'Import',
          analytics: 'Analytics',
          dashboard: 'Dashboard',
          menu: 'Menu',
          button: 'Buttons',
          form: 'Forms',
          field: 'Fields',
          option: 'Options'
        },
        filterOptions: {
          allTypes: 'All Types',
          allCategories: 'All Categories',
          dateRange: 'Date Range',
          status: 'Status',
          department: 'Department',
          today: 'Today',
          week: 'This Week',
          month: 'This Month',
          year: 'This Year',
          all: 'All',
          relevance: 'Relevance',
          date: 'Date',
          title: 'Title',
          type: 'Type',
          category: 'Category'
        },
        actions: {
          view: 'View',
          edit: 'Edit',
          share: 'Share',
          download: 'Download',
          bookmark: 'Bookmark',
          more: 'More',
          close: 'Close',
          goTo: 'Go To',
          open: 'Open'
        },
        emptyState: {
          title: 'Global Search',
          description: 'Search across all system content. Find users, projects, settings, pages, features and more.'
        },
        noResultsState: {
          description: 'Try different keywords or adjust your filters. All content is being searched.'
        },
        suggestions: {
          title: 'Suggested Searches',
          items: [
            'notifications',
            'theme settings',
            'edit profile',
            'security',
            'two factor authentication',
            'change password',
            'add user',
            'create project',
            'assign task',
            'schedule meeting',
            'create report',
            'settings',
            'dashboard',
            'analytics'
          ]
        }
      }
    }
  };

  const currentT = t[language];

  // Tüm aranabilir içeriği yükle
  const loadAllSearchableContent = () => {
    const allContent: SearchResult[] = [
      // Kullanıcılar
      {
        id: 'user-1',
        type: 'user',
        category: 'Kullanıcılar',
        title: 'Ahmet Yılmaz',
        subtitle: 'Genel Müdür',
        description: 'Teknoloji departmanı lideri, 10+ yıl deneyim',
        content: 'Ahmet Yılmaz genel müdür teknoloji departmanı lideri deneyim yönetici',
        path: '/users/ahmet-yilmaz',
        metadata: {
          email: 'ahmet@lumeo.com',
          phone: '+90 555 123 45 67',
          department: 'Yönetim',
          location: 'İstanbul',
          role: 'Genel Müdür'
        },
        relevanceScore: 95,
        lastModified: '2 saat önce',
        status: 'active',
        tags: ['yönetici', 'teknoloji', 'lider'],
        owner: 'Sistem',
        department: 'Yönetim',
        searchableText: 'ahmet yılmaz genel müdür teknoloji departmanı lideri deneyim yönetici istanbul'
      },
      {
        id: 'user-2',
        type: 'user',
        category: 'Kullanıcılar',
        title: 'Ayşe Demir',
        subtitle: 'Proje Yöneticisi',
        description: 'Yazılım geliştirme projelerinde uzman',
        content: 'Ayşe Demir proje yöneticisi yazılım geliştirme projeler uzman',
        path: '/users/ayse-demir',
        metadata: {
          email: 'ayse@lumeo.com',
          phone: '+90 555 987 65 43',
          department: 'Teknoloji',
          location: 'Ankara'
        },
        relevanceScore: 88,
        lastModified: '1 gün önce',
        status: 'active',
        tags: ['proje', 'yazılım', 'yönetici'],
        owner: 'Sistem',
        department: 'Teknoloji',
        searchableText: 'ayşe demir proje yöneticisi yazılım geliştirme projeler uzman ankara teknoloji'
      },

      // Projeler
      {
        id: 'project-1',
        type: 'project',
        category: 'Projeler',
        title: 'Lumeo Platform v2.0',
        subtitle: 'Ana Platform Geliştirme',
        description: 'Yeni nesil iş yönetimi platformunun geliştirilmesi',
        content: 'Lumeo Platform v2.0 ana platform geliştirme yeni nesil iş yönetimi geliştirilmesi',
        path: '/projects/lumeo-platform-v2',
        metadata: {
          startDate: '2024-01-15',
          endDate: '2024-06-30',
          budget: '₺500,000',
          team: 8,
          progress: 65
        },
        relevanceScore: 92,
        lastModified: '3 saat önce',
        status: 'active',
        tags: ['platform', 'geliştirme', 'v2'],
        owner: 'Ayşe Demir',
        department: 'Teknoloji',
        searchableText: 'lumeo platform v2.0 ana platform geliştirme yeni nesil iş yönetimi geliştirilmesi'
      },

      // Görevler
      {
        id: 'task-1',
        type: 'task',
        category: 'Görevler',
        title: 'Kullanıcı Arayüzü Tasarımı',
        subtitle: 'Dashboard Yenileme',
        description: 'Ana dashboard ekranının yeni tasarımının oluşturulması',
        content: 'kullanıcı arayüzü tasarımı dashboard yenileme ana dashboard ekranı yeni tasarım oluşturulması',
        path: '/tasks/ui-design',
        metadata: {
          priority: 'Yüksek',
          assignee: 'Zeynep Özkan',
          dueDate: '2024-02-20',
          estimatedHours: 16
        },
        relevanceScore: 85,
        lastModified: '30 dk önce',
        status: 'active',
        tags: ['ui', 'tasarım', 'dashboard'],
        owner: 'Ayşe Demir',
        department: 'Tasarım',
        searchableText: 'kullanıcı arayüzü tasarımı dashboard yenileme ana dashboard ekranı yeni tasarım oluşturulması ui'
      },

      // Sayfalar ve Özellikler
      {
        id: 'page-notifications',
        type: 'page',
        category: 'Sayfalar',
        title: 'Bildirimler Sayfası',
        subtitle: 'Bildirim Yönetimi',
        description: 'Tüm sistem bildirimlerini görüntüleme ve yönetme sayfası',
        content: 'bildirimler sayfası bildirim yönetimi tüm sistem bildirimleri görüntüleme yönetme notifications',
        path: '/notifications',
        metadata: {
          pageType: 'Management',
          features: ['Filtreleme', 'Arama', 'Toplu İşlemler'],
          lastUpdate: '2024-02-15'
        },
        relevanceScore: 90,
        lastModified: '1 saat önce',
        status: 'active',
        tags: ['bildirimler', 'notifications', 'yönetim'],
        owner: 'Sistem',
        department: 'Platform',
        searchableText: 'bildirimler sayfası bildirim yönetimi tüm sistem bildirimleri görüntüleme yönetme notifications filtreleme arama toplu işlemler'
      },

      // Ayarlar
      {
        id: 'setting-theme',
        type: 'setting',
        category: 'Ayarlar',
        title: 'Tema Ayarları',
        subtitle: 'Görünüm Özelleştirme',
        description: 'Açık, koyu ve sistem teması seçenekleri',
        content: 'tema ayarları görünüm özelleştirme açık koyu sistem teması seçenekleri theme settings light dark',
        path: '/settings/appearance',
        metadata: {
          options: ['Açık Tema', 'Koyu Tema', 'Sistem Teması'],
          category: 'Görünüm',
          type: 'Dropdown'
        },
        relevanceScore: 88,
        lastModified: '2 gün önce',
        status: 'active',
        tags: ['tema', 'theme', 'görünüm', 'appearance'],
        owner: 'Sistem',
        department: 'Platform',
        searchableText: 'tema ayarları görünüm özelleştirme açık koyu sistem teması seçenekleri theme settings light dark appearance'
      },
      {
        id: 'setting-profile',
        type: 'setting',
        category: 'Ayarlar',
        title: 'Profil Ayarları',
        subtitle: 'Kişisel Bilgiler',
        description: 'Ad, soyad, e-posta ve şirket bilgilerini düzenleme',
        content: 'profil ayarları kişisel bilgiler ad soyad e-posta şirket bilgileri düzenleme profile settings personal information',
        path: '/profile',
        metadata: {
          fields: ['Ad', 'Soyad', 'E-posta', 'Telefon', 'Şirket'],
          category: 'Profil',
          type: 'Form'
        },
        relevanceScore: 85,
        lastModified: '1 gün önce',
        status: 'active',
        tags: ['profil', 'profile', 'kişisel', 'bilgiler'],
        owner: 'Kullanıcı',
        department: 'Kullanıcı',
        searchableText: 'profil ayarları kişisel bilgiler ad soyad e-posta şirket bilgileri düzenleme profile settings personal information'
      },
      {
        id: 'setting-security',
        type: 'setting',
        category: 'Güvenlik',
        title: 'Güvenlik Ayarları',
        subtitle: 'Hesap Güvenliği',
        description: 'Şifre değiştirme, iki faktörlü doğrulama ve oturum yönetimi',
        content: 'güvenlik ayarları hesap güvenliği şifre değiştirme iki faktörlü doğrulama oturum yönetimi security settings password two factor authentication',
        path: '/settings/security',
        metadata: {
          features: ['Şifre Değiştirme', '2FA', 'Oturum Yönetimi', 'Güvenlik Geçmişi'],
          category: 'Güvenlik',
          type: 'Security'
        },
        relevanceScore: 92,
        lastModified: '3 saat önce',
        status: 'active',
        tags: ['güvenlik', 'security', 'şifre', 'password', '2fa', 'iki faktörlü'],
        owner: 'Sistem',
        department: 'Güvenlik',
        searchableText: 'güvenlik ayarları hesap güvenliği şifre değiştirme iki faktörlü doğrulama oturum yönetimi security settings password two factor authentication 2fa'
      },
      {
        id: 'setting-notifications',
        type: 'setting',
        category: 'Ayarlar',
        title: 'Bildirim Ayarları',
        subtitle: 'Bildirim Tercihleri',
        description: 'E-posta, push ve ses bildirimlerini yönetme',
        content: 'bildirim ayarları bildirim tercihleri e-posta push ses bildirimleri yönetme notification settings preferences email',
        path: '/settings/notifications',
        metadata: {
          types: ['E-posta', 'Push', 'Ses', 'SMS'],
          category: 'Bildirimler',
          type: 'Preferences'
        },
        relevanceScore: 87,
        lastModified: '4 saat önce',
        status: 'active',
        tags: ['bildirim', 'notification', 'e-posta', 'push', 'ses'],
        owner: 'Kullanıcı',
        department: 'Platform',
        searchableText: 'bildirim ayarları bildirim tercihleri e-posta push ses bildirimleri yönetme notification settings preferences email'
      },

      // Dashboard Öğeleri
      {
        id: 'dashboard-main',
        type: 'page',
        category: 'Dashboard',
        title: 'Ana Dashboard',
        subtitle: 'Genel Bakış',
        description: 'İstatistikler, hızlı işlemler ve son aktiviteler',
        content: 'ana dashboard genel bakış istatistikler hızlı işlemler son aktiviteler main dashboard overview statistics quick actions recent activities',
        path: '/dashboard',
        metadata: {
          widgets: ['İstatistikler', 'Hızlı İşlemler', 'Son Aktiviteler', 'Yaklaşan Görevler'],
          category: 'Dashboard',
          type: 'Overview'
        },
        relevanceScore: 95,
        lastModified: '1 saat önce',
        status: 'active',
        tags: ['dashboard', 'ana sayfa', 'genel bakış', 'istatistik'],
        owner: 'Sistem',
        department: 'Platform',
        searchableText: 'ana dashboard genel bakış istatistikler hızlı işlemler son aktiviteler main dashboard overview statistics quick actions recent activities'
      },

      // Menü Öğeleri
      {
        id: 'menu-users',
        type: 'menu',
        category: 'Menü',
        title: 'Kullanıcılar Menüsü',
        subtitle: 'Kullanıcı Yönetimi',
        description: 'Çalışanlar, müşteriler ve tedarikçiler alt menüleri',
        content: 'kullanıcılar menüsü kullanıcı yönetimi çalışanlar müşteriler tedarikçiler alt menüleri users menu management employees customers suppliers',
        path: '/menu/users',
        metadata: {
          subMenus: ['Çalışanlar', 'Müşteriler', 'Tedarikçiler'],
          category: 'Menü',
          type: 'Navigation'
        },
        relevanceScore: 80,
        lastModified: '2 gün önce',
        status: 'active',
        tags: ['kullanıcılar', 'users', 'menü', 'çalışanlar', 'müşteriler'],
        owner: 'Sistem',
        department: 'Platform',
        searchableText: 'kullanıcılar menüsü kullanıcı yönetimi çalışanlar müşteriler tedarikçiler alt menüleri users menu management employees customers suppliers'
      },

      // API ve Entegrasyonlar
      {
        id: 'api-settings',
        type: 'api',
        category: 'API',
        title: 'API Ayarları',
        subtitle: 'API Anahtar Yönetimi',
        description: 'API anahtarları oluşturma ve yönetme',
        content: 'api ayarları api anahtar yönetimi api anahtarları oluşturma yönetme api settings key management',
        path: '/settings/api',
        metadata: {
          features: ['Anahtar Oluşturma', 'Anahtar Yenileme', 'İzinler', 'Kullanım İstatistikleri'],
          category: 'API',
          type: 'Management'
        },
        relevanceScore: 75,
        lastModified: '1 hafta önce',
        status: 'active',
        tags: ['api', 'anahtar', 'key', 'entegrasyon', 'integration'],
        owner: 'Sistem',
        department: 'Teknoloji',
        searchableText: 'api ayarları api anahtar yönetimi api anahtarları oluşturma yönetme api settings key management integration'
      },

      // Yedekleme ve Dışa Aktarma
      {
        id: 'backup-settings',
        type: 'backup',
        category: 'Yedekleme',
        title: 'Yedekleme Ayarları',
        subtitle: 'Veri Yedekleme',
        description: 'Otomatik yedekleme ve veri dışa aktarma seçenekleri',
        content: 'yedekleme ayarları veri yedekleme otomatik yedekleme veri dışa aktarma seçenekleri backup settings data export',
        path: '/settings/backup',
        metadata: {
          options: ['Otomatik Yedekleme', 'Manuel Yedekleme', 'Veri Dışa Aktarma'],
          category: 'Yedekleme',
          type: 'Data'
        },
        relevanceScore: 70,
        lastModified: '3 gün önce',
        status: 'active',
        tags: ['yedekleme', 'backup', 'dışa aktarma', 'export', 'veri'],
        owner: 'Sistem',
        department: 'IT',
        searchableText: 'yedekleme ayarları veri yedekleme otomatik yedekleme veri dışa aktarma seçenekleri backup settings data export'
      },

      // Form Alanları
      {
        id: 'form-login',
        type: 'form',
        category: 'Formlar',
        title: 'Giriş Formu',
        subtitle: 'Kullanıcı Girişi',
        description: 'E-posta ve şifre ile giriş yapma formu',
        content: 'giriş formu kullanıcı girişi e-posta şifre giriş yapma formu login form user authentication email password',
        path: '/auth/login',
        metadata: {
          fields: ['E-posta', 'Şifre'],
          validations: ['E-posta formatı', 'Şifre uzunluğu'],
          category: 'Kimlik Doğrulama',
          type: 'Authentication'
        },
        relevanceScore: 85,
        lastModified: '1 gün önce',
        status: 'active',
        tags: ['giriş', 'login', 'form', 'e-posta', 'şifre'],
        owner: 'Sistem',
        department: 'Platform',
        searchableText: 'giriş formu kullanıcı girişi e-posta şifre giriş yapma formu login form user authentication email password'
      },

      // Butonlar ve UI Öğeleri
      {
        id: 'button-save',
        type: 'button',
        category: 'UI Öğeleri',
        title: 'Kaydet Butonu',
        subtitle: 'Form Kaydetme',
        description: 'Formlarda değişiklikleri kaydetmek için kullanılan buton',
        content: 'kaydet butonu form kaydetme formlarda değişiklikleri kaydetmek kullanılan buton save button form saving',
        path: '/ui/buttons/save',
        metadata: {
          type: 'Primary Button',
          actions: ['Kaydet', 'Save'],
          category: 'Butonlar',
          usage: 'Forms'
        },
        relevanceScore: 60,
        lastModified: '1 hafta önce',
        status: 'active',
        tags: ['kaydet', 'save', 'buton', 'button', 'form'],
        owner: 'Sistem',
        department: 'UI/UX',
        searchableText: 'kaydet butonu form kaydetme formlarda değişiklikleri kaydetmek kullanılan buton save button form saving'
      },

      // Analitik ve Raporlar
      {
        id: 'analytics-dashboard',
        type: 'analytics',
        category: 'Analitik',
        title: 'Analitik Dashboard',
        subtitle: 'Veri Analizi',
        description: 'Kullanıcı aktiviteleri ve sistem performans metrikleri',
        content: 'analitik dashboard veri analizi kullanıcı aktiviteleri sistem performans metrikleri analytics data analysis user activities system performance',
        path: '/analytics',
        metadata: {
          metrics: ['Kullanıcı Aktivitesi', 'Sistem Performansı', 'Proje İlerlemesi'],
          category: 'Analitik',
          type: 'Dashboard'
        },
        relevanceScore: 88,
        lastModified: '2 saat önce',
        status: 'active',
        tags: ['analitik', 'analytics', 'dashboard', 'metrik', 'performans'],
        owner: 'Sistem',
        department: 'Analitik',
        searchableText: 'analitik dashboard veri analizi kullanıcı aktiviteleri sistem performans metrikleri analytics data analysis user activities system performance'
      }
    ];

    setAllSearchableContent(allContent);
  };

  // Gelişmiş arama fonksiyonu
  const performSearch = (query: string): SearchResult[] => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return allSearchableContent.filter(item => {
      // Ana arama metni
      const searchableText = item.searchableText || '';
      const titleText = item.title.toLowerCase();
      const descriptionText = item.description.toLowerCase();
      const contentText = item.content?.toLowerCase() || '';
      
      // Etiketler
      const tagsText = (item.tags || []).join(' ').toLowerCase();
      
      // Metadata
      const metadataText = Object.values(item.metadata || {})
        .map(v => String(v).toLowerCase())
        .join(' ');

      // Tüm metinleri birleştir
      const allText = [
        searchableText,
        titleText,
        descriptionText,
        contentText,
        tagsText,
        metadataText,
        item.owner?.toLowerCase() || '',
        item.department?.toLowerCase() || '',
        item.category.toLowerCase(),
        item.type.toLowerCase()
      ].join(' ');

      // Fuzzy matching ve exact matching
      return searchTerms.every(term => {
        // Exact match
        if (allText.includes(term)) return true;
        
        // Fuzzy matching - benzer kelimeler
        const words = allText.split(' ');
        return words.some(word => {
          // Kelime içinde geçiyor mu?
          if (word.includes(term) || term.includes(word)) return true;
          
          // Levenshtein distance için basit kontrol
          if (Math.abs(word.length - term.length) <= 2) {
            let distance = 0;
            const maxLen = Math.max(word.length, term.length);
            for (let i = 0; i < maxLen; i++) {
              if (word[i] !== term[i]) distance++;
            }
            return distance <= 2; // 2 karakter fark tolere et
          }
          
          return false;
        });
      });
    }).map(item => ({
      ...item,
      relevanceScore: calculateAdvancedRelevance(item, searchTerms, query)
    }));
  };

  // Gelişmiş relevans hesaplama
  const calculateAdvancedRelevance = (item: SearchResult, searchTerms: string[], originalQuery: string): number => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const contentLower = item.content?.toLowerCase() || '';
    const searchableText = item.searchableText?.toLowerCase() || '';
    const originalQueryLower = originalQuery.toLowerCase();

    // Tam sorgu eşleşmesi (en yüksek puan)
    if (titleLower.includes(originalQueryLower)) score += 50;
    if (descLower.includes(originalQueryLower)) score += 30;
    if (contentLower.includes(originalQueryLower)) score += 20;

    searchTerms.forEach(term => {
      // Başlık eşleşmeleri
      if (titleLower === term) score += 25; // Tam eşleşme
      else if (titleLower.includes(term)) score += 15; // Kısmi eşleşme
      else if (titleLower.startsWith(term)) score += 20; // Başlangıç eşleşmesi
      
      // Açıklama eşleşmeleri
      if (descLower.includes(term)) score += 10;
      
      // İçerik eşleşmeleri
      if (contentLower.includes(term)) score += 8;
      
      // Aranabilir metin eşleşmeleri
      if (searchableText.includes(term)) score += 12;
      
      // Etiket eşleşmeleri
      if (item.tags?.some(tag => tag.toLowerCase().includes(term))) score += 15;
      
      // Kategori ve tür eşleşmeleri
      if (item.category.toLowerCase().includes(term)) score += 12;
      if (item.type.toLowerCase().includes(term)) score += 10;
      
      // Metadata eşleşmeleri
      if (Object.values(item.metadata || {}).some(v => 
        String(v).toLowerCase().includes(term)
      )) score += 8;
      
      // Sahip ve departman eşleşmeleri
      if (item.owner?.toLowerCase().includes(term)) score += 6;
      if (item.department?.toLowerCase().includes(term)) score += 6;
    });

    // Bonus puanlar
    if (item.status === 'active') score += 5;
    if (item.tags?.length) score += 2;
    
    // Tür bazlı bonus
    const typeBonus = {
      'page': 10,
      'setting': 15,
      'user': 12,
      'project': 12,
      'notification': 8,
      'feature': 8
    };
    score += typeBonus[item.type as keyof typeof typeBonus] || 0;

    return Math.min(score, 100);
  };

  // Filtreleme ve sıralama
  const filteredResults = useMemo(() => {
    let results = searchResults;

    // Tür filtresi
    if (filters.types.length > 0) {
      results = results.filter(item => filters.types.includes(item.type));
    }

    // Kategori filtresi
    if (filters.categories.length > 0) {
      results = results.filter(item => filters.categories.includes(item.category));
    }

    // Durum filtresi
    if (filters.status.length > 0) {
      results = results.filter(item => item.status && filters.status.includes(item.status));
    }

    // Departman filtresi
    if (filters.departments.length > 0) {
      results = results.filter(item => item.department && filters.departments.includes(item.department));
    }

    // Sıralama
    results.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'relevance':
          comparison = b.relevanceScore - a.relevanceScore;
          break;
        case 'date':
          comparison = a.lastModified.localeCompare(b.lastModified);
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }
      
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return results;
  }, [searchResults, filters]);

  // Kategoriye göre gruplama
  const groupedResults = useMemo(() => {
    const groups: { [key: string]: SearchResult[] } = {};
    
    filteredResults.forEach(result => {
      const key = result.category;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(result);
    });
    
    return groups;
  }, [filteredResults]);

  // Arama işlemi
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate API delay
      const timer = setTimeout(() => {
        const results = performSearch(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, allSearchableContent]);

  // Enter tuşu ile arama
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      console.log('Enter pressed, searching for:', searchQuery);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'user': return User;
      case 'project': return Target;
      case 'task': return CheckCircle;
      case 'document': return FileText;
      case 'meeting': return Calendar;
      case 'contact': return Phone;
      case 'company': return Building2;
      case 'report': return TrendingUp;
      case 'setting': return Settings;
      case 'page': return Globe;
      case 'feature': return Zap;
      case 'notification': return Bell;
      case 'theme': return Palette;
      case 'profile': return User;
      case 'security': return Shield;
      case 'payment': return DollarSign;
      case 'integration': return Globe;
      case 'api': return Code;
      case 'backup': return Archive;
      case 'export': return Download;
      case 'import': return Upload;
      case 'analytics': return BarChart3;
      case 'dashboard': return Home;
      case 'menu': return Menu;
      case 'button': return Plus;
      case 'form': return FileText;
      case 'field': return Edit;
      case 'option': return Settings;
      default: return Database;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'text-emerald-600 bg-emerald-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-amber-600 bg-amber-50';
      case 'inactive': return 'text-slate-600 bg-slate-50';
      case 'draft': return 'text-purple-600 bg-purple-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      types: [],
      categories: [],
      dateRange: 'all',
      status: [],
      departments: [],
      sortBy: 'relevance',
      sortOrder: 'desc'
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const renderSearchResult = (result: SearchResult) => {
    const IconComponent = getTypeIcon(result.type);
    
    return (
      <div
        key={result.id}
        className="glass-card rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group"
        onClick={() => setSelectedResult(result)}
      >
        <div className="flex items-start space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            result.type === 'user' ? 'bg-blue-100 text-blue-600' :
            result.type === 'project' ? 'bg-emerald-100 text-emerald-600' :
            result.type === 'task' ? 'bg-amber-100 text-amber-600' :
            result.type === 'document' ? 'bg-purple-100 text-purple-600' :
            result.type === 'meeting' ? 'bg-pink-100 text-pink-600' :
            result.type === 'setting' ? 'bg-slate-100 text-slate-600' :
            result.type === 'page' ? 'bg-indigo-100 text-indigo-600' :
            result.type === 'notification' ? 'bg-red-100 text-red-600' :
            'bg-slate-100 text-slate-600'
          }`}>
            <IconComponent className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors duration-300 truncate">
                  {result.title}
                </h3>
                {result.subtitle && (
                  <p className="text-sm text-slate-600 mt-1 truncate">{result.subtitle}</p>
                )}
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{result.description}</p>
                
                {result.path && (
                  <p className="text-xs text-slate-400 mt-2 font-mono">{result.path}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                {result.status && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                    {result.status}
                  </span>
                )}
                <div className="text-xs text-slate-400">
                  {Math.round(result.relevanceScore)}%
                </div>
              </div>
            </div>
            
            <div className={`flex items-center justify-between mt-3 ${isMobile ? 'flex-wrap gap-2' : ''}`}>
              <div className={`flex items-center space-x-4 text-xs text-slate-500 ${isMobile ? 'flex-wrap gap-1' : ''}`}>
                <span className="flex items-center space-x-1">
                  <Tag className="w-3 h-3" />
                  <span className="truncate max-w-20">{result.category}</span>
                </span>
                {result.owner && (
                  <span className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span className="truncate max-w-20">{result.owner}</span>
                  </span>
                )}
                {result.department && (
                  <span className="flex items-center space-x-1">
                    <Building2 className="w-3 h-3" />
                    <span className="truncate max-w-20">{result.department}</span>
                  </span>
                )}
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{result.lastModified}</span>
                </span>
              </div>
              
              {!isMobile && (
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-teal-600 transition-colors duration-200">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-teal-600 transition-colors duration-200">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-teal-600 transition-colors duration-200">
                    <Share className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-teal-600 transition-colors duration-200">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            {result.tags && result.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {result.tags.slice(0, isMobile ? 2 : 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {result.tags.length > (isMobile ? 2 : 3) && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-full text-xs">
                    +{result.tags.length - (isMobile ? 2 : 3)}
                  </span>
                )}
              </div>
            )}
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
                  {language === 'tr' ? 'Dashboard\'a Dön' : 'Back to Dashboard'}
                </span>
                <span className="text-sm font-medium sm:hidden">
                  {language === 'tr' ? 'Geri' : 'Back'}
                </span>
              </button>
            </div>
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.search.title}</h1>
            
            <div className="w-16 sm:w-32"></div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Search Bar */}
          <div className="glass-card rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className={`flex items-center space-x-3 sm:space-x-4 ${isMobile ? 'flex-col space-y-3 space-x-0' : ''}`}>
              <div className={`relative ${isMobile ? 'w-full' : 'flex-1'}`}>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className={`w-full pl-12 pr-4 py-3 sm:py-4 glass-input rounded-xl text-base sm:text-lg ${
                    searchQuery ? 'pr-12' : ''
                  }`}
                  placeholder={currentT.search.placeholder}
                  autoFocus={!!initialSearchQuery}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-3 sm:py-4 rounded-xl transition-all duration-300 ${isMobile ? 'w-full justify-center' : ''} ${
                  showFilters ? 'bg-teal-500 text-white' : 'bg-white/50 text-slate-600 hover:bg-teal-50'
                }`}
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">
                  {showFilters ? currentT.search.hideFilters : currentT.search.showFilters}
                </span>
              </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-slate-200 animate-fade-in-up">
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {currentT.search.filterOptions.allTypes}
                    </label>
                    <select
                      multiple={!isMobile}
                      value={filters.types}
                      onChange={(e) => handleFilterChange('types', Array.from(e.target.selectedOptions, option => option.value))}
                      className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                      size={isMobile ? 1 : 4}
                    >
                      {Object.entries(currentT.search.categories).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {currentT.search.filterOptions.allCategories}
                    </label>
                    <select
                      multiple={!isMobile}
                      value={filters.categories}
                      onChange={(e) => handleFilterChange('categories', Array.from(e.target.selectedOptions, option => option.value))}
                      className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                      size={isMobile ? 1 : 4}
                    >
                      {Array.from(new Set(allSearchableContent.map(item => item.category))).map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date Range Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {currentT.search.filterOptions.dateRange}
                    </label>
                    <select
                      value={filters.dateRange}
                      onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                      className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                    >
                      <option value="all">{currentT.search.filterOptions.all}</option>
                      <option value="today">{currentT.search.filterOptions.today}</option>
                      <option value="week">{currentT.search.filterOptions.week}</option>
                      <option value="month">{currentT.search.filterOptions.month}</option>
                      <option value="year">{currentT.search.filterOptions.year}</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {currentT.search.sortBy}
                    </label>
                    <div className="flex space-x-2">
                      <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        className="flex-1 px-3 py-2 glass-input rounded-lg text-sm"
                      >
                        <option value="relevance">{currentT.search.filterOptions.relevance}</option>
                        <option value="date">{currentT.search.filterOptions.date}</option>
                        <option value="title">{currentT.search.filterOptions.title}</option>
                        <option value="type">{currentT.search.filterOptions.type}</option>
                        <option value="category">{currentT.search.filterOptions.category}</option>
                      </select>
                      <button
                        onClick={() => handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="px-3 py-2 bg-white/50 hover:bg-teal-50 rounded-lg transition-colors duration-200"
                      >
                        {filters.sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200"
                  >
                    {currentT.search.clearFilters}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="space-y-6">
              {/* Results Summary */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-slate-800">
                    {isSearching ? (
                      <span className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
                        <span>{currentT.search.searching}</span>
                      </span>
                    ) : (
                      `${filteredResults.length} ${currentT.search.results}`
                    )}
                  </h2>
                  {searchQuery && !isMobile && (
                    <span className="text-sm text-slate-500">
                      "{searchQuery}" {currentT.search.searchingFor}
                    </span>
                  )}
                </div>
              </div>

              {/* Mobile Search Query Display */}
              {searchQuery && isMobile && (
                <div className="text-center">
                  <span className="text-sm text-slate-500">
                    "{searchQuery}" {currentT.search.searchingFor}
                  </span>
                </div>
              )}

              {/* Results by Category */}
              {!isSearching && Object.keys(groupedResults).length > 0 ? (
                <div className="space-y-6 sm:space-y-8">
                  {Object.entries(groupedResults).map(([category, results]) => {
                    const isExpanded = expandedCategories.has(category);
                    
                    return (
                      <div key={category} className="space-y-4">
                        <button
                          onClick={() => toggleCategory(category)}
                          className="flex items-center space-x-3 w-full text-left group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                            <Folder className="w-4 h-4" />
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-teal-600 transition-colors duration-300">
                            {category} ({results.length})
                          </h3>
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <div className={`grid gap-4 animate-fade-in-up ${
                            isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
                          }`}>
                            {results.map(renderSearchResult)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : !isSearching && searchQuery ? (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">{currentT.search.noResults}</h3>
                  <p className="text-slate-500 mb-6">
                    {currentT.search.noResultsState.description}
                  </p>
                  
                  {/* Önerilen aramalar */}
                  <div className="max-w-md mx-auto">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">{currentT.search.suggestions.title}:</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {currentT.search.suggestions.items.slice(0, 8).map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-1 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-full text-sm transition-colors duration-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Empty State */}
          {!searchQuery && (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                {currentT.search.emptyState.title}
              </h2>
              <p className="text-slate-600 max-w-md mx-auto px-4 mb-8">
                {currentT.search.emptyState.description}
              </p>
              
              {/* Önerilen aramalar */}
              <div className="max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">{currentT.search.suggestions.title}:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {currentT.search.suggestions.items.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="p-3 bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-200 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 transition-all duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Result Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`glass-card rounded-2xl p-4 sm:p-6 w-full max-h-[90vh] overflow-y-auto animate-fade-in-up ${
            isMobile ? 'max-w-full' : 'max-w-2xl'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  selectedResult.type === 'user' ? 'bg-blue-100 text-blue-600' :
                  selectedResult.type === 'project' ? 'bg-emerald-100 text-emerald-600' :
                  selectedResult.type === 'task' ? 'bg-amber-100 text-amber-600' :
                  selectedResult.type === 'setting' ? 'bg-slate-100 text-slate-600' :
                  selectedResult.type === 'page' ? 'bg-indigo-100 text-indigo-600' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {React.createElement(getTypeIcon(selectedResult.type), { className: `w-5 h-5 sm:w-6 sm:h-6` })}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-800 truncate">{selectedResult.title}</h2>
                  {selectedResult.subtitle && (
                    <p className="text-slate-600 mt-1 truncate">{selectedResult.subtitle}</p>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                      {selectedResult.category}
                    </span>
                    {selectedResult.status && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedResult.status)}`}>
                        {selectedResult.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200 flex-shrink-0 ml-4"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Açıklama</h3>
                <p className="text-slate-600">{selectedResult.description}</p>
              </div>

              {selectedResult.content && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">İçerik</h3>
                  <p className="text-slate-600">{selectedResult.content}</p>
                </div>
              )}

              {selectedResult.path && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Konum</h3>
                  <p className="text-slate-600 font-mono text-sm bg-slate-50 p-2 rounded">{selectedResult.path}</p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Detaylar</h3>
                <div className={`grid gap-3 sm:gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {Object.entries(selectedResult.metadata).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">{key}</p>
                      <p className="text-sm font-medium text-slate-800 mt-1 break-words">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedResult.tags && selectedResult.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Etiketler</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedResult.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={`flex space-x-3 pt-4 border-t border-slate-200 ${isMobile ? 'flex-col space-y-3 space-x-0' : ''}`}>
                <button className={`flex items-center justify-center space-x-2 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : 'flex-1'}`}>
                  <Eye className="w-4 h-4" />
                  <span>{currentT.search.actions.view}</span>
                </button>
                <button className={`flex items-center justify-center space-x-2 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : 'flex-1'}`}>
                  <Edit className="w-4 h-4" />
                  <span>{currentT.search.actions.edit}</span>
                </button>
                <button className={`flex items-center justify-center space-x-2 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : 'flex-1'}`}>
                  <Share className="w-4 h-4" />
                  <span>{currentT.search.actions.share}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;