import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Database, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  Users,
  Target,
  DollarSign,
  MessageSquare,
  Settings,
  Shield,
  Package,
  Building2,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Archive,
  HardDrive,
  Cloud,
  Server,
  RefreshCw,
  Play,
  Pause,
  X,
  Info,
  CheckSquare,
  Square,
  Filter,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  MoreHorizontal,
  Loader2
} from 'lucide-react';
import { Language } from '../../types';
import SearchToolbar from '../SearchToolbar';

interface BackupPageProps {
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

interface BackupCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  size: string;
  lastBackup: string;
  items: BackupItem[];
  selected: boolean;
}

interface BackupItem {
  id: string;
  name: string;
  description: string;
  size: string;
  selected: boolean;
  required?: boolean;
}

interface BackupHistory {
  id: string;
  name: string;
  date: string;
  size: string;
  format: string;
  status: 'completed' | 'failed' | 'in-progress';
  categories: string[];
}

const BackupPage: React.FC<BackupPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'history' | 'settings'>('create');
  const [isMobile, setIsMobile] = useState(false);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'csv' | 'xlsx' | 'pdf' | 'zip'>('json');
  const [backupName, setBackupName] = useState('');
  const [includeMedia, setIncludeMedia] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<'none' | 'low' | 'medium' | 'high'>('medium');
  const [encryptBackup, setEncryptBackup] = useState(false);
  const [backupPassword, setBackupPassword] = useState('');
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [autoBackupFrequency, setAutoBackupFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [categories, setCategories] = useState<BackupCategory[]>([
    {
      id: 'users',
      name: 'Kullanıcı Verileri',
      description: 'Kullanıcı profilleri, hesap bilgileri ve izinler',
      icon: Users,
      size: '2.4 MB',
      lastBackup: '2 gün önce',
      selected: true,
      items: [
        { id: 'profiles', name: 'Kullanıcı Profilleri', description: 'Kişisel bilgiler ve ayarlar', size: '1.2 MB', selected: true, required: true },
        { id: 'permissions', name: 'İzinler ve Roller', description: 'Kullanıcı yetkileri', size: '0.8 MB', selected: true },
        { id: 'preferences', name: 'Tercihler', description: 'Tema, dil ve kişisel ayarlar', size: '0.4 MB', selected: true }
      ]
    },
    {
      id: 'projects',
      name: 'Proje Verileri',
      description: 'Tüm projeler, görevler ve ilerleme durumları',
      icon: Target,
      size: '15.7 MB',
      lastBackup: '1 gün önce',
      selected: true,
      items: [
        { id: 'project-info', name: 'Proje Bilgileri', description: 'Proje detayları ve meta veriler', size: '8.2 MB', selected: true },
        { id: 'tasks', name: 'Görevler', description: 'Tüm görevler ve alt görevler', size: '5.1 MB', selected: true },
        { id: 'milestones', name: 'Kilometre Taşları', description: 'Proje kilometre taşları', size: '1.8 MB', selected: true },
        { id: 'timesheets', name: 'Zaman Çizelgeleri', description: 'Çalışma saatleri kayıtları', size: '0.6 MB', selected: false }
      ]
    },
    {
      id: 'financial',
      name: 'Finansal Veriler',
      description: 'Faturalar, ödemeler ve finansal raporlar',
      icon: DollarSign,
      size: '8.9 MB',
      lastBackup: '3 gün önce',
      selected: true,
      items: [
        { id: 'invoices', name: 'Faturalar', description: 'Tüm fatura kayıtları', size: '4.2 MB', selected: true },
        { id: 'payments', name: 'Ödemeler', description: 'Ödeme geçmişi ve durumları', size: '2.8 MB', selected: true },
        { id: 'expenses', name: 'Giderler', description: 'Gider kayıtları ve kategorileri', size: '1.5 MB', selected: true },
        { id: 'reports', name: 'Finansal Raporlar', description: 'Oluşturulan raporlar', size: '0.4 MB', selected: false }
      ]
    },
    {
      id: 'communications',
      name: 'İletişim Verileri',
      description: 'Mesajlar, toplantılar ve belgeler',
      icon: MessageSquare,
      size: '12.3 MB',
      lastBackup: '1 gün önce',
      selected: false,
      items: [
        { id: 'messages', name: 'Mesajlar', description: 'Dahili mesajlaşma geçmişi', size: '6.7 MB', selected: false },
        { id: 'meetings', name: 'Toplantılar', description: 'Toplantı kayıtları ve notları', size: '3.2 MB', selected: false },
        { id: 'documents', name: 'Belgeler', description: 'Paylaşılan dosyalar ve belgeler', size: '2.4 MB', selected: false }
      ]
    },
    {
      id: 'customers',
      name: 'Müşteri Verileri',
      description: 'Müşteri bilgileri ve iletişim geçmişi',
      icon: Building2,
      size: '5.6 MB',
      lastBackup: '2 gün önce',
      selected: true,
      items: [
        { id: 'customer-profiles', name: 'Müşteri Profilleri', description: 'Müşteri bilgileri ve iletişim', size: '3.1 MB', selected: true },
        { id: 'contracts', name: 'Sözleşmeler', description: 'Müşteri sözleşmeleri', size: '1.8 MB', selected: true },
        { id: 'support-tickets', name: 'Destek Talepleri', description: 'Müşteri destek geçmişi', size: '0.7 MB', selected: false }
      ]
    },
    {
      id: 'system',
      name: 'Sistem Ayarları',
      description: 'Uygulama ayarları ve konfigürasyonlar',
      icon: Settings,
      size: '1.2 MB',
      lastBackup: '1 hafta önce',
      selected: false,
      items: [
        { id: 'app-settings', name: 'Uygulama Ayarları', description: 'Genel sistem ayarları', size: '0.6 MB', selected: false },
        { id: 'integrations', name: 'Entegrasyonlar', description: 'Harici sistem bağlantıları', size: '0.4 MB', selected: false },
        { id: 'security-logs', name: 'Güvenlik Logları', description: 'Güvenlik olayları kayıtları', size: '0.2 MB', selected: false }
      ]
    }
  ]);

  const [backupHistory, setBackupHistory] = useState<BackupHistory[]>([
    {
      id: '1',
      name: 'Tam Yedekleme - Ocak 2025',
      date: '15 Ocak 2025, 14:30',
      size: '45.2 MB',
      format: 'ZIP',
      status: 'completed',
      categories: ['users', 'projects', 'financial', 'customers']
    },
    {
      id: '2',
      name: 'Proje Verileri Yedeklemesi',
      date: '12 Ocak 2025, 09:15',
      size: '15.7 MB',
      format: 'JSON',
      status: 'completed',
      categories: ['projects']
    },
    {
      id: '3',
      name: 'Haftalık Otomatik Yedekleme',
      date: '8 Ocak 2025, 02:00',
      size: '38.9 MB',
      format: 'ZIP',
      status: 'completed',
      categories: ['users', 'projects', 'financial']
    },
    {
      id: '4',
      name: 'Finansal Veriler',
      date: '5 Ocak 2025, 16:45',
      size: '8.9 MB',
      format: 'XLSX',
      status: 'failed',
      categories: ['financial']
    }
  ]);

  const [filteredBackupHistory, setFilteredBackupHistory] = useState<BackupHistory[]>([]);

  useEffect(() => {
    setIsLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const now = new Date();
    const defaultName = `Yedekleme_${now.getDate()}_${now.getMonth() + 1}_${now.getFullYear()}`;
    setBackupName(defaultName);
    
    setFilteredBackupHistory(backupHistory);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBackupHistory(backupHistory);
    } else {
      const filtered = backupHistory.filter(backup => 
        backup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        backup.format.toLowerCase().includes(searchQuery.toLowerCase()) ||
        backup.categories.some(cat => 
          categories.find(c => c.id === cat)?.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredBackupHistory(filtered);
    }
  }, [searchQuery, backupHistory, categories]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const renderBackupHistory = () => (
    <div className="space-y-6">
      {/* Toolbar */}
      <SearchToolbar
        placeholder={language === 'tr' ? 'Yedeklemelerde ara...' : 'Search backups...'}
        onSearch={handleSearch}
        onFilter={toggleFilters}
        showAddButton={false}
        isMobile={isMobile}
      />

      {/* Filters */}
      {showFilters && (
        <div className="glass-card rounded-2xl p-6 mb-6 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Durum
              </label>
              <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                <option value="all">Tüm Durumlar</option>
                <option value="completed">Tamamlandı</option>
                <option value="failed">Başarısız</option>
                <option value="in-progress">Devam Ediyor</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Format
              </label>
              <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                <option value="all">Tüm Formatlar</option>
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
                <option value="xlsx">XLSX</option>
                <option value="pdf">PDF</option>
                <option value="zip">ZIP</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tarih Aralığı
              </label>
              <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                <option value="all">Tüm Tarihler</option>
                <option value="today">Bugün</option>
                <option value="this-week">Bu Hafta</option>
                <option value="this-month">Bu Ay</option>
                <option value="last-month">Geçen Ay</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {filteredBackupHistory.length > 0 ? (
        filteredBackupHistory.map(backup => (
          <div key={backup.id} className="glass-card rounded-xl p-4 sm:p-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <h3 className="font-semibold text-slate-800 truncate">{backup.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    backup.status === 'completed' ? 'text-emerald-600 bg-emerald-100' :
                    backup.status === 'failed' ? 'text-red-600 bg-red-100' :
                    'text-blue-600 bg-blue-100'
                  }`}>
                    {backup.status === 'completed' ? (language === 'tr' ? 'Tamamlandı' : 'Completed') :
                     backup.status === 'failed' ? (language === 'tr' ? 'Başarısız' : 'Failed') :
                     (language === 'tr' ? 'Devam Ediyor' : 'In Progress')}
                  </span>
                </div>
                <div className={`grid gap-2 sm:gap-4 text-sm text-slate-600 ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{backup.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 flex-shrink-0" />
                    <span>{backup.size}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Archive className="w-4 h-4 flex-shrink-0" />
                    <span>{backup.format}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {language === 'tr' ? 'Kategoriler: ' : 'Categories: '}
                    {backup.categories.map(catId => 
                      categories.find(cat => cat.id === catId)?.name
                    ).filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {backup.status === 'completed' && (
                  <button
                    onClick={() => {
                      const blob = new Blob([`Backup: ${backup.name}\nDate: ${backup.date}\nSize: ${backup.size}`], 
                        { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${backup.name}.${backup.format.toLowerCase()}`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors duration-200"
                    title={language === 'tr' ? 'İndir' : 'Download'}
                    aria-label={`${backup.name} ${language === 'tr' ? 'yedeklemesini indir' : 'download backup'}`}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                )}
                
                <button
                  onClick={() => {
                    if (confirm(language === 'tr' ? 'Bu yedeklemeyi silmek istediğinizden emin misiniz?' : 'Are you sure you want to delete this backup?')) {
                      setBackupHistory(prev => prev.filter(b => b.id !== backup.id));
                    }
                  }}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors duration-200"
                  title={language === 'tr' ? 'Sil' : 'Delete'}
                  aria-label={`${backup.name} ${language === 'tr' ? 'yedeklemesini sil' : 'delete backup'}`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 sm:py-16">
          <Archive className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            {language === 'tr' ? 'Yedekleme bulunamadı' : 'No backups found'}
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            {searchQuery 
              ? (language === 'tr' 
                ? `"${searchQuery}" araması için sonuç bulunamadı.` 
                : `No results found for "${searchQuery}".`)
              : (language === 'tr' 
                ? 'Henüz hiç yedekleme yapmadınız. Verilerinizi korumak için düzenli yedeklemeler yapmanızı öneririz.' 
                : 'You haven\'t made any backups yet. We recommend regular backups to protect your data.')}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
            
            <h1 className="text-xl font-bold text-slate-800">{language === 'tr' ? 'Veri Yedekleme' : 'Data Backup'}</h1>
            
            <div className="w-16 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">{language === 'tr' ? 'Veri Yedekleme' : 'Data Backup'}</h1>
            <p className="text-slate-600">{language === 'tr' ? 'Verilerinizi güvenli bir şekilde yedekleyin ve geri yükleyin' : 'Securely backup and restore your data'}</p>
          </div>

          <div className="glass-card rounded-2xl p-2 mb-6 sm:mb-8">
            <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
              {[
                { id: 'create', label: language === 'tr' ? 'Yedekleme Oluştur' : 'Create Backup', icon: Plus },
                { id: 'history', label: language === 'tr' ? 'Yedekleme Geçmişi' : 'Backup History', icon: Clock },
                { id: 'settings', label: language === 'tr' ? 'Yedekleme Ayarları' : 'Backup Settings', icon: Settings }
              ].map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-teal-500 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-teal-50 hover:text-teal-600'
                    }`}
                    aria-label={`${tab.label} sekmesine geç`}
                    aria-selected={activeTab === tab.id}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8">
            {activeTab === 'history' && renderBackupHistory()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupPage;