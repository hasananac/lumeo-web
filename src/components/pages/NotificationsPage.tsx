import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  Check, 
  X, 
  Filter, 
  Search, 
  MoreHorizontal,
  User, 
  Target, 
  CheckCircle, 
  Calendar, 
  FileText, 
  Mail, 
  Phone, 
  Building2, 
  TrendingUp, 
  AlertTriangle, 
  Info, 
  Clock, 
  Star,
  Archive,
  Trash2,
  Settings,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Download,
  Share,
  Bookmark,
  Tag,
  Users,
  Briefcase,
  DollarSign,
  Shield,
  Zap,
  Globe,
  Activity,
  MessageSquare,
  Video,
  Image,
  Paperclip,
  Send,
  Reply,
  Forward,
  Flag,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh
} from 'lucide-react';
import { Language } from '../types';
import SearchToolbar from '../SearchToolbar';

interface NotificationsPageProps {
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

interface Notification {
  id: string;
  type: 'user' | 'project' | 'task' | 'meeting' | 'document' | 'system' | 'security' | 'payment' | 'message' | 'approval';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  actionRequired: boolean;
  sender?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  metadata?: {
    [key: string]: any;
  };
  actions?: Array<{
    id: string;
    label: string;
    type: 'primary' | 'secondary' | 'danger';
    action: string;
  }>;
}

interface FilterOptions {
  types: string[];
  priorities: string[];
  status: 'all' | 'unread' | 'read' | 'starred' | 'archived';
  dateRange: 'all' | 'today' | 'week' | 'month';
  actionRequired: boolean | null;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    types: [],
    priorities: [],
    status: 'all',
    dateRange: 'all',
    actionRequired: null
  });

  useEffect(() => {
    setIsLoaded(true);
    
    // Mobil kontrolü
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Mock bildirimler yükle
    loadMockNotifications();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const t = {
    tr: {
      notifications: {
        title: 'Bildirimler',
        subtitle: 'Tüm bildirimlerinizi yönetin',
        search: 'Bildirimlerde ara...',
        filters: 'Filtreler',
        markAllRead: 'Tümünü Okundu İşaretle',
        markAllUnread: 'Tümünü Okunmadı İşaretle',
        deleteSelected: 'Seçilenleri Sil',
        archiveSelected: 'Seçilenleri Arşivle',
        selectAll: 'Tümünü Seç',
        deselectAll: 'Seçimi Kaldır',
        noNotifications: 'Bildirim bulunamadı',
        noNotificationsDesc: 'Henüz hiç bildiriminiz yok veya tüm bildirimler filtrelendi.',
        loadMore: 'Daha Fazla Yükle',
        markAsRead: 'Okundu İşaretle',
        markAsUnread: 'Okunmadı İşaretle',
        star: 'Yıldızla',
        unstar: 'Yıldızı Kaldır',
        archive: 'Arşivle',
        delete: 'Sil',
        reply: 'Yanıtla',
        forward: 'İlet',
        share: 'Paylaş',
        download: 'İndir',
        viewDetails: 'Detayları Görüntüle',
        approve: 'Onayla',
        reject: 'Reddet',
        accept: 'Kabul Et',
        decline: 'Reddet',
        types: {
          user: 'Kullanıcı',
          project: 'Proje',
          task: 'Görev',
          meeting: 'Toplantı',
          document: 'Belge',
          system: 'Sistem',
          security: 'Güvenlik',
          payment: 'Ödeme',
          message: 'Mesaj',
          approval: 'Onay'
        },
        priorities: {
          low: 'Düşük',
          medium: 'Orta',
          high: 'Yüksek',
          urgent: 'Acil'
        },
        status: {
          all: 'Tümü',
          unread: 'Okunmamış',
          read: 'Okunmuş',
          starred: 'Yıldızlı',
          archived: 'Arşivlenmiş'
        },
        dateRange: {
          all: 'Tüm Zamanlar',
          today: 'Bugün',
          week: 'Bu Hafta',
          month: 'Bu Ay'
        },
        actionRequired: 'İşlem Gerekli',
        settings: {
          title: 'Bildirim Ayarları',
          emailNotifications: 'E-posta Bildirimleri',
          pushNotifications: 'Anlık Bildirimler',
          soundEnabled: 'Ses Bildirimleri',
          frequency: 'Bildirim Sıklığı',
          categories: 'Bildirim Kategorileri'
        },
        stats: {
          totalNotifications: 'Toplam Bildirim',
          unreadNotifications: 'Okunmamış',
          actionRequired: 'İşlem Gerekli',
          highPriority: 'Yüksek Öncelikli'
        }
      }
    },
    en: {
      notifications: {
        title: 'Notifications',
        subtitle: 'Manage all your notifications',
        search: 'Search notifications...',
        filters: 'Filters',
        markAllRead: 'Mark All as Read',
        markAllUnread: 'Mark All as Unread',
        deleteSelected: 'Delete Selected',
        archiveSelected: 'Archive Selected',
        selectAll: 'Select All',
        deselectAll: 'Deselect All',
        noNotifications: 'No notifications found',
        noNotificationsDesc: 'You have no notifications yet or all notifications are filtered.',
        loadMore: 'Load More',
        markAsRead: 'Mark as Read',
        markAsUnread: 'Mark as Unread',
        star: 'Star',
        unstar: 'Unstar',
        archive: 'Archive',
        delete: 'Delete',
        reply: 'Reply',
        forward: 'Forward',
        share: 'Share',
        download: 'Download',
        viewDetails: 'View Details',
        approve: 'Approve',
        reject: 'Reject',
        accept: 'Accept',
        decline: 'Decline',
        types: {
          user: 'User',
          project: 'Project',
          task: 'Task',
          meeting: 'Meeting',
          document: 'Document',
          system: 'System',
          security: 'Security',
          payment: 'Payment',
          message: 'Message',
          approval: 'Approval'
        },
        priorities: {
          low: 'Low',
          medium: 'Medium',
          high: 'High',
          urgent: 'Urgent'
        },
        status: {
          all: 'All',
          unread: 'Unread',
          read: 'Read',
          starred: 'Starred',
          archived: 'Archived'
        },
        dateRange: {
          all: 'All Time',
          today: 'Today',
          week: 'This Week',
          month: 'This Month'
        },
        actionRequired: 'Action Required',
        settings: {
          title: 'Notification Settings',
          emailNotifications: 'Email Notifications',
          pushNotifications: 'Push Notifications',
          soundEnabled: 'Sound Notifications',
          frequency: 'Notification Frequency',
          categories: 'Notification Categories'
        },
        stats: {
          totalNotifications: 'Total Notifications',
          unreadNotifications: 'Unread',
          actionRequired: 'Action Required',
          highPriority: 'High Priority'
        }
      }
    }
  };

  const currentT = t[language];

  const loadMockNotifications = () => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'approval',
        priority: 'urgent',
        title: 'Proje Onayı Bekleniyor',
        message: 'Lumeo Platform v2.0 projesi için bütçe onayınız bekleniyor. Toplam bütçe: ₺500,000',
        timestamp: '5 dakika önce',
        isRead: false,
        isStarred: true,
        isArchived: false,
        actionRequired: true,
        sender: {
          name: 'Ayşe Demir',
          role: 'Proje Yöneticisi'
        },
        actions: [
          { id: 'approve', label: currentT.notifications.approve, type: 'primary', action: 'approve' },
          { id: 'reject', label: currentT.notifications.reject, type: 'danger', action: 'reject' }
        ]
      },
      {
        id: '2',
        type: 'task',
        priority: 'high',
        title: 'Görev Tamamlandı',
        message: 'UI Tasarımı görevi Zeynep Özkan tarafından tamamlandı ve incelemenizi bekliyor.',
        timestamp: '15 dakika önce',
        isRead: false,
        isStarred: false,
        isArchived: false,
        actionRequired: true,
        sender: {
          name: 'Zeynep Özkan',
          role: 'UI/UX Tasarımcı'
        },
        actions: [
          { id: 'review', label: 'İncele', type: 'primary', action: 'review' },
          { id: 'approve', label: currentT.notifications.approve, type: 'secondary', action: 'approve' }
        ]
      },
      {
        id: '3',
        type: 'meeting',
        priority: 'medium',
        title: 'Toplantı Hatırlatması',
        message: 'Haftalık değerlendirme toplantısı 30 dakika sonra başlayacak. Toplantı Odası A\'da.',
        timestamp: '30 dakika önce',
        isRead: false,
        isStarred: false,
        isArchived: false,
        actionRequired: false,
        sender: {
          name: 'Sistem',
          role: 'Otomatik Hatırlatma'
        }
      },
      {
        id: '4',
        type: 'user',
        priority: 'low',
        title: 'Yeni Takım Üyesi',
        message: 'Can Yıldız teknoloji takımına katıldı. Hoş geldin mesajınızı gönderebilirsiniz.',
        timestamp: '1 saat önce',
        isRead: true,
        isStarred: false,
        isArchived: false,
        actionRequired: false,
        sender: {
          name: 'İnsan Kaynakları',
          role: 'Sistem'
        }
      },
      {
        id: '5',
        type: 'security',
        priority: 'high',
        title: 'Güvenlik Uyarısı',
        message: 'Hesabınıza yeni bir cihazdan giriş yapıldı. Ankara, Türkiye konumundan Chrome tarayıcısı.',
        timestamp: '2 saat önce',
        isRead: true,
        isStarred: true,
        isArchived: false,
        actionRequired: true,
        sender: {
          name: 'Güvenlik Sistemi',
          role: 'Otomatik'
        },
        actions: [
          { id: 'verify', label: 'Bu Benim', type: 'primary', action: 'verify' },
          { id: 'block', label: 'Engelle', type: 'danger', action: 'block' }
        ]
      },
      {
        id: '6',
        type: 'document',
        priority: 'medium',
        title: 'Belge Paylaşıldı',
        message: 'Proje Gereksinim Dokümanı sizinle paylaşıldı. İncelemeniz ve geri bildiriminiz bekleniyor.',
        timestamp: '3 saat önce',
        isRead: true,
        isStarred: false,
        isArchived: false,
        actionRequired: false,
        sender: {
          name: 'Mehmet Kaya',
          role: 'Sistem Analisti'
        }
      },
      {
        id: '7',
        type: 'payment',
        priority: 'urgent',
        title: 'Ödeme Hatırlatması',
        message: 'Lumeo Premium aboneliğiniz 3 gün içinde sona erecek. Kesintisiz hizmet için yenileyin.',
        timestamp: '4 saat önce',
        isRead: false,
        isStarred: false,
        isArchived: false,
        actionRequired: true,
        sender: {
          name: 'Faturalandırma',
          role: 'Sistem'
        },
        actions: [
          { id: 'renew', label: 'Yenile', type: 'primary', action: 'renew' },
          { id: 'change_plan', label: 'Plan Değiştir', type: 'secondary', action: 'change_plan' }
        ]
      },
      {
        id: '8',
        type: 'message',
        priority: 'low',
        title: 'Yeni Mesaj',
        message: 'Fatma Şen size özel bir mesaj gönderdi. "Proje hakkında konuşmak istiyorum."',
        timestamp: '5 saat önce',
        isRead: true,
        isStarred: false,
        isArchived: false,
        actionRequired: false,
        sender: {
          name: 'Fatma Şen',
          role: 'İK Uzmanı'
        }
      },
      {
        id: '9',
        type: 'project',
        priority: 'medium',
        title: 'Proje Güncellemesi',
        message: 'Müşteri Portal Entegrasyonu projesi %45 tamamlandı. Yeni milestone başarıyla geçildi.',
        timestamp: '1 gün önce',
        isRead: true,
        isStarred: false,
        isArchived: false,
        actionRequired: false,
        sender: {
          name: 'Proje Sistemi',
          role: 'Otomatik'
        }
      },
      {
        id: '10',
        type: 'system',
        priority: 'low',
        title: 'Sistem Bakımı',
        message: 'Planlı sistem bakımı bu gece 02:00-04:00 saatleri arasında gerçekleştirilecek.',
        timestamp: '1 gün önce',
        isRead: true,
        isStarred: false,
        isArchived: false,
        actionRequired: false,
        sender: {
          name: 'Sistem Yöneticisi',
          role: 'IT'
        }
      }
    ];

    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
  };

  // Filtreleme ve arama
  useEffect(() => {
    let filtered = notifications;

    // Arama filtresi
    if (searchQuery.trim()) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.sender?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Tür filtresi
    if (filters.types.length > 0) {
      filtered = filtered.filter(notification => filters.types.includes(notification.type));
    }

    // Öncelik filtresi
    if (filters.priorities.length > 0) {
      filtered = filtered.filter(notification => filters.priorities.includes(notification.priority));
    }

    // Durum filtresi
    switch (filters.status) {
      case 'unread':
        filtered = filtered.filter(notification => !notification.isRead);
        break;
      case 'read':
        filtered = filtered.filter(notification => notification.isRead);
        break;
      case 'starred':
        filtered = filtered.filter(notification => notification.isStarred);
        break;
      case 'archived':
        filtered = filtered.filter(notification => notification.isArchived);
        break;
    }

    // İşlem gerekli filtresi
    if (filters.actionRequired !== null) {
      filtered = filtered.filter(notification => notification.actionRequired === filters.actionRequired);
    }

    // Tarih filtresi (basit implementasyon)
    if (filters.dateRange !== 'all') {
      // Gerçek uygulamada tarih karşılaştırması yapılır
      // Şimdilik tüm bildirimleri göster
    }

    setFilteredNotifications(filtered);
  }, [notifications, searchQuery, filters]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'user': return User;
      case 'project': return Target;
      case 'task': return CheckCircle;
      case 'meeting': return Calendar;
      case 'document': return FileText;
      case 'system': return Settings;
      case 'security': return Shield;
      case 'payment': return DollarSign;
      case 'message': return MessageSquare;
      case 'approval': return CheckCircle;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'user': return 'bg-blue-100 text-blue-600';
      case 'project': return 'bg-emerald-100 text-emerald-600';
      case 'task': return 'bg-amber-100 text-amber-600';
      case 'meeting': return 'bg-purple-100 text-purple-600';
      case 'document': return 'bg-indigo-100 text-indigo-600';
      case 'system': return 'bg-slate-100 text-slate-600';
      case 'security': return 'bg-red-100 text-red-600';
      case 'payment': return 'bg-green-100 text-green-600';
      case 'message': return 'bg-pink-100 text-pink-600';
      case 'approval': return 'bg-orange-100 text-orange-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    setSelectedNotification(notification);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === id ? { ...notification, isRead: false } : notification
    ));
  };

  const toggleStar = (id: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === id ? { ...notification, isStarred: !notification.isStarred } : notification
    ));
  };

  const archiveNotification = (id: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === id ? { ...notification, isArchived: true } : notification
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleBulkAction = (action: string) => {
    const selectedIds = Array.from(selectedNotifications);
    
    switch (action) {
      case 'markRead':
        selectedIds.forEach(id => markAsRead(id));
        break;
      case 'markUnread':
        selectedIds.forEach(id => markAsUnread(id));
        break;
      case 'archive':
        selectedIds.forEach(id => archiveNotification(id));
        break;
      case 'delete':
        selectedIds.forEach(id => deleteNotification(id));
        break;
    }
    
    setSelectedNotifications(new Set());
  };

  const toggleSelectNotification = (id: string) => {
    const newSelected = new Set(selectedNotifications);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedNotifications(newSelected);
  };

  const selectAllNotifications = () => {
    const allIds = new Set(filteredNotifications.map(n => n.id));
    setSelectedNotifications(allIds);
  };

  const deselectAllNotifications = () => {
    setSelectedNotifications(new Set());
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const renderNotificationItem = (notification: Notification) => {
    const TypeIcon = getTypeIcon(notification.type);
    const isSelected = selectedNotifications.has(notification.id);
    
    return (
      <div
        key={notification.id}
        className={`glass-card rounded-xl p-4 transition-all duration-300 cursor-pointer group relative ${
          !notification.isRead ? 'border-l-4 border-l-teal-500' : ''
        } ${isSelected ? 'ring-2 ring-teal-500 bg-teal-50/50' : 'hover:shadow-lg'}`}
        onClick={() => handleNotificationClick(notification)}
      >
        {/* Seçim checkbox'ı */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              toggleSelectNotification(notification.id);
            }}
            className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
          />
        </div>

        <div className={`flex items-start space-x-4 ${selectedNotifications.size > 0 ? 'ml-6' : ''}`}>
          {/* Tür ikonu */}
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(notification.type)}`}>
            <TypeIcon className="w-5 h-5" />
          </div>

          {/* İçerik */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className={`font-semibold truncate ${!notification.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                    {notification.title}
                  </h3>
                  {notification.actionRequired && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      {currentT.notifications.actionRequired}
                    </span>
                  )}
                  {notification.isStarred && (
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                  )}
                </div>
                
                <p className={`text-sm mb-2 line-clamp-2 ${!notification.isRead ? 'text-slate-700' : 'text-slate-600'}`}>
                  {notification.message}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  {notification.sender && (
                    <span className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{notification.sender.name}</span>
                      {notification.sender.role && (
                        <span className="text-slate-400">• {notification.sender.role}</span>
                      )}
                    </span>
                  )}
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{notification.timestamp}</span>
                  </span>
                </div>
              </div>

              {/* Öncelik göstergesi */}
              <div className="flex items-center space-x-2 ml-4">
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`}></div>
                {!isMobile && (
                  <span className="text-xs text-slate-500 capitalize">
                    {currentT.notifications.priorities[notification.priority as keyof typeof currentT.notifications.priorities]}
                  </span>
                )}
              </div>
            </div>

            {/* Eylem butonları */}
            {notification.actions && notification.actions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {notification.actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Action:', action.action, 'for notification:', notification.id);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200 ${
                      action.type === 'primary' ? 'bg-teal-500 hover:bg-teal-600 text-white' :
                      action.type === 'danger' ? 'bg-red-500 hover:bg-red-600 text-white' :
                      'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hızlı eylemler */}
          {!isMobile && (
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  notification.isRead ? markAsUnread(notification.id) : markAsRead(notification.id);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                title={notification.isRead ? currentT.notifications.markAsUnread : currentT.notifications.markAsRead}
              >
                {notification.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStar(notification.id);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                title={notification.isStarred ? currentT.notifications.unstar : currentT.notifications.star}
              >
                <Star className={`w-4 h-4 ${notification.isStarred ? 'text-amber-500 fill-current' : 'text-slate-400'}`} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  archiveNotification(notification.id);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                title={currentT.notifications.archive}
              >
                <Archive className="w-4 h-4 text-slate-400" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notification.id);
                }}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title={currentT.notifications.delete}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          )}
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
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.notifications.title}</h1>
            
            <div className="w-16 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.notifications.title}</h1>
            <p className="text-slate-600">{currentT.notifications.subtitle}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => setFilters(prev => ({ ...prev, status: 'all' }))}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{notifications.length}</p>
                  <p className="text-sm text-slate-600">{currentT.notifications.stats.totalNotifications}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setFilters(prev => ({ ...prev, status: 'unread' }))}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{notifications.filter(n => !n.isRead).length}</p>
                  <p className="text-sm text-slate-600">{currentT.notifications.stats.unreadNotifications}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setFilters(prev => ({ ...prev, actionRequired: true }))}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{notifications.filter(n => n.actionRequired).length}</p>
                  <p className="text-sm text-slate-600">{currentT.notifications.stats.actionRequired}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setFilters(prev => ({ ...prev, priorities: ['high', 'urgent'] }))}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{notifications.filter(n => n.priority === 'high' || n.priority === 'urgent').length}</p>
                  <p className="text-sm text-slate-600">{currentT.notifications.stats.highPriority}</p>
                </div>
              </div>
            </button>
          </div>

          {/* Toolbar */}
          <SearchToolbar
            placeholder={currentT.notifications.search}
            onSearch={handleSearch}
            onFilter={toggleFilters}
            showAddButton={false}
            isMobile={isMobile}
            className="mb-6"
          />

          {/* Bulk Actions */}
          {selectedNotifications.size > 0 && (
            <div className="glass-card rounded-2xl p-4 mb-6 animate-fade-in-up">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-slate-700">
                    {selectedNotifications.size} {language === 'tr' ? 'öğe seçildi' : 'items selected'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleBulkAction('markRead')}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm transition-colors duration-300"
                  >
                    <Check className="w-4 h-4" />
                    <span>{currentT.notifications.markAllRead}</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction('archive')}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-slate-500 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors duration-300"
                  >
                    <Archive className="w-4 h-4" />
                    <span>{currentT.notifications.archiveSelected}</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{currentT.notifications.deleteSelected}</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={selectAllNotifications}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors duration-300"
                  >
                    {currentT.notifications.selectAll}
                  </button>
                  <button
                    onClick={deselectAllNotifications}
                    className="text-sm text-slate-600 hover:text-slate-700 font-medium transition-colors duration-300"
                  >
                    {currentT.notifications.deselectAll}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          {showFilters && (
            <div className="glass-card rounded-2xl p-6 mb-6 animate-fade-in-up">
              <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                {/* Durum Filtresi */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Durum</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                  >
                    {Object.entries(currentT.notifications.status).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Tür Filtresi */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tür</label>
                  <select
                    multiple={!isMobile}
                    value={filters.types}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      types: Array.from(e.target.selectedOptions, option => option.value) 
                    }))}
                    className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                    size={isMobile ? 1 : 4}
                  >
                    {Object.entries(currentT.notifications.types).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Öncelik Filtresi */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Öncelik</label>
                  <select
                    multiple={!isMobile}
                    value={filters.priorities}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priorities: Array.from(e.target.selectedOptions, option => option.value) 
                    }))}
                    className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                    size={isMobile ? 1 : 4}
                  >
                    {Object.entries(currentT.notifications.priorities).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                {/* Tarih Filtresi */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tarih</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value as any }))}
                    className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                  >
                    {Object.entries(currentT.notifications.dateRange).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* İşlem Gerekli Filtresi */}
              <div className="mt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.actionRequired === true}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      actionRequired: e.target.checked ? true : null 
                    }))}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {currentT.notifications.actionRequired}
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Bildirimler Listesi */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              <>
                {filteredNotifications.map(renderNotificationItem)}
                
                {/* Daha Fazla Yükle */}
                <div className="text-center py-8">
                  <button className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold transition-all duration-300">
                    {currentT.notifications.loadMore}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  {currentT.notifications.noNotifications}
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  {searchQuery 
                    ? (language === 'tr' 
                      ? `"${searchQuery}" için sonuç bulunamadı.` 
                      : `No results found for "${searchQuery}".`)
                    : currentT.notifications.noNotificationsDesc}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bildirim Detay Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`glass-card rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto animate-fade-in-up ${
            isMobile ? 'max-w-full' : 'max-w-2xl'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4 flex-1 min-w-0">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getTypeColor(selectedNotification.type)}`}>
                  {React.createElement(getTypeIcon(selectedNotification.type), { className: 'w-6 h-6' })}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-slate-800 mb-2">{selectedNotification.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                    {selectedNotification.sender && (
                      <span className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{selectedNotification.sender.name}</span>
                        {selectedNotification.sender.role && (
                          <span className="text-slate-400">• {selectedNotification.sender.role}</span>
                        )}
                      </span>
                    )}
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedNotification.timestamp}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedNotification.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                      selectedNotification.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                      selectedNotification.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {currentT.notifications.priorities[selectedNotification.priority as keyof typeof currentT.notifications.priorities]}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200 flex-shrink-0 ml-4"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Mesaj</h3>
                <p className="text-slate-600 leading-relaxed">{selectedNotification.message}</p>
              </div>

              {selectedNotification.actions && selectedNotification.actions.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Eylemler</h3>
                  <div className={`flex space-x-3 ${isMobile ? 'flex-col space-y-3 space-x-0' : ''}`}>
                    {selectedNotification.actions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => {
                          console.log('Action:', action.action, 'for notification:', selectedNotification.id);
                          setSelectedNotification(null);
                        }}
                        className={`px-4 py-2 rounded-xl font-semibold transition-colors duration-300 ${isMobile ? 'w-full' : 'flex-1'} ${
                          action.type === 'primary' ? 'bg-teal-500 hover:bg-teal-600 text-white' :
                          action.type === 'danger' ? 'bg-red-500 hover:bg-red-600 text-white' :
                          'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className={`flex space-x-3 pt-4 border-t border-slate-200 ${isMobile ? 'flex-col space-y-3 space-x-0' : ''}`}>
                <button
                  onClick={() => {
                    selectedNotification.isRead ? markAsUnread(selectedNotification.id) : markAsRead(selectedNotification.id);
                    setSelectedNotification(null);
                  }}
                  className={`flex items-center justify-center space-x-2 py-2 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : 'flex-1'}`}
                >
                  {selectedNotification.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{selectedNotification.isRead ? currentT.notifications.markAsUnread : currentT.notifications.markAsRead}</span>
                </button>
                
                <button
                  onClick={() => {
                    toggleStar(selectedNotification.id);
                    setSelectedNotification(null);
                  }}
                  className={`flex items-center justify-center space-x-2 py-2 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : 'flex-1'}`}
                >
                  <Star className={`w-4 h-4 ${selectedNotification.isStarred ? 'text-amber-500 fill-current' : ''}`} />
                  <span>{selectedNotification.isStarred ? currentT.notifications.unstar : currentT.notifications.star}</span>
                </button>
                
                <button
                  onClick={() => {
                    archiveNotification(selectedNotification.id);
                    setSelectedNotification(null);
                  }}
                  className={`flex items-center justify-center space-x-2 py-2 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : 'flex-1'}`}
                >
                  <Archive className="w-4 h-4" />
                  <span>{currentT.notifications.archive}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;