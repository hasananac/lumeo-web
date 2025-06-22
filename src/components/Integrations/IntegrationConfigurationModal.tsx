import React, { useState } from 'react';
import { 
  X, 
  RefreshCw, 
  Info, 
  AlertTriangle, 
  Bell, 
  Send, 
  Save, 
  Trash2, 
  Link, 
  Copy, 
  Eye, 
  Check 
} from 'lucide-react';
import { Language } from '../../types';

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

interface IntegrationConfigurationModalProps {
  integration: Integration;
  language: Language;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  onSyncNow: (integrationId: string) => void;
  isSyncing: string | null;
}

const IntegrationConfigurationModal: React.FC<IntegrationConfigurationModalProps> = ({
  integration,
  language,
  onClose,
  onSave,
  onDelete,
  onSyncNow,
  isSyncing
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [syncFrequency, setSyncFrequency] = useState('daily');
  const [notifyOn, setNotifyOn] = useState(['errors']);
  const [notifyVia, setNotifyVia] = useState('both');
  const [isSaving, setIsSaving] = useState(false);

  const t = {
    tr: {
      integrations: {
        configureIntegration: {
          title: 'Entegrasyon Yapılandırması',
          generalSettings: 'Genel Ayarlar',
          dataSync: 'Veri Senkronizasyonu',
          notifications: 'Bildirimler',
          permissions: 'İzinler',
          webhooks: 'Webhook Ayarları',
          apiSettings: 'API Ayarları',
          authentication: 'Kimlik Doğrulama',
          save: 'Değişiklikleri Kaydet',
          cancel: 'İptal',
          testConnection: 'Bağlantıyı Test Et',
          deleteIntegration: 'Entegrasyonu Sil',
          deleteConfirm: 'Bu entegrasyonu silmek istediğinizden emin misiniz?',
          deleteWarning: 'Bu işlem geri alınamaz ve tüm bağlantı ayarlarını kaldıracaktır.',
          syncFrequency: 'Senkronizasyon Sıklığı',
          syncOptions: {
            realtime: 'Gerçek Zamanlı',
            hourly: 'Saatlik',
            daily: 'Günlük',
            weekly: 'Haftalık',
            manual: 'Manuel'
          },
          notifyOn: 'Bildirim Gönder',
          notifyOptions: {
            errors: 'Hatalar',
            warnings: 'Uyarılar',
            updates: 'Güncellemeler',
            all: 'Tüm Olaylar'
          },
          notifyVia: 'Bildirim Kanalı',
          notifyViaOptions: {
            email: 'E-posta',
            inApp: 'Uygulama İçi',
            both: 'Her İkisi'
          },
          webhookUrl: 'Webhook URL',
          webhookSecret: 'Webhook Gizli Anahtarı',
          regenerateSecret: 'Yeni Anahtar Oluştur',
          apiKey: 'API Anahtarı',
          apiSecret: 'API Gizli Anahtarı',
          regenerateKeys: 'Anahtarları Yenile',
          saveSuccess: 'Ayarlar başarıyla kaydedildi',
          saveError: 'Ayarlar kaydedilirken hata oluştu'
        },
        categories: {
          productivity: 'Üretkenlik',
          communication: 'İletişim',
          crm: 'CRM',
          finance: 'Finans',
          ecommerce: 'E-Ticaret',
          analytics: 'Analitik',
          development: 'Geliştirme',
          security: 'Güvenlik'
        },
        syncNow: 'Şimdi Senkronize Et',
        syncInProgress: 'Senkronizasyon devam ediyor...',
        requiredPermissions: 'Gerekli İzinler',
        optionalPermissions: 'İsteğe Bağlı İzinler'
      }
    },
    en: {
      integrations: {
        configureIntegration: {
          title: 'Integration Configuration',
          generalSettings: 'General Settings',
          dataSync: 'Data Synchronization',
          notifications: 'Notifications',
          permissions: 'Permissions',
          webhooks: 'Webhook Settings',
          apiSettings: 'API Settings',
          authentication: 'Authentication',
          save: 'Save Changes',
          cancel: 'Cancel',
          testConnection: 'Test Connection',
          deleteIntegration: 'Delete Integration',
          deleteConfirm: 'Are you sure you want to delete this integration?',
          deleteWarning: 'This action cannot be undone and will remove all connection settings.',
          syncFrequency: 'Sync Frequency',
          syncOptions: {
            realtime: 'Real-time',
            hourly: 'Hourly',
            daily: 'Daily',
            weekly: 'Weekly',
            manual: 'Manual'
          },
          notifyOn: 'Notify On',
          notifyOptions: {
            errors: 'Errors',
            warnings: 'Warnings',
            updates: 'Updates',
            all: 'All Events'
          },
          notifyVia: 'Notify Via',
          notifyViaOptions: {
            email: 'Email',
            inApp: 'In-App',
            both: 'Both'
          },
          webhookUrl: 'Webhook URL',
          webhookSecret: 'Webhook Secret',
          regenerateSecret: 'Regenerate Secret',
          apiKey: 'API Key',
          apiSecret: 'API Secret',
          regenerateKeys: 'Regenerate Keys',
          saveSuccess: 'Settings saved successfully',
          saveError: 'Error saving settings'
        },
        categories: {
          productivity: 'Productivity',
          communication: 'Communication',
          crm: 'CRM',
          finance: 'Finance',
          ecommerce: 'E-Commerce',
          analytics: 'Analytics',
          development: 'Development',
          security: 'Security'
        },
        syncNow: 'Sync Now',
        syncInProgress: 'Sync in progress...',
        requiredPermissions: 'Required Permissions',
        optionalPermissions: 'Optional Permissions'
      }
    }
  };

  const currentT = t[language];

  const handleSaveConfig = async () => {
    setIsSaving(true);
    
    // Simüle edilmiş kaydetme
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSaving(false);
    onSave();
    
    // Başarı bildirimi
    alert(currentT.integrations.configureIntegration.saveSuccess);
  };

  const handleDelete = () => {
    if (confirm(currentT.integrations.configureIntegration.deleteConfirm)) {
      onDelete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glass-card rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto animate-fade-in-up max-w-4xl">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
              {React.createElement(integration.icon, { className: 'w-6 h-6 text-white' })}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{integration.name} {currentT.integrations.configureIntegration.title}</h2>
              <p className="text-slate-600 mt-1">{integration.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
            aria-label="Kapat"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <div className="flex overflow-x-auto hide-scrollbar">
            {[
              { id: 'general', label: currentT.integrations.configureIntegration.generalSettings },
              { id: 'sync', label: currentT.integrations.configureIntegration.dataSync },
              { id: 'notifications', label: currentT.integrations.configureIntegration.notifications },
              { id: 'webhooks', label: currentT.integrations.configureIntegration.webhooks },
              { id: 'api', label: currentT.integrations.configureIntegration.apiSettings },
              { id: 'permissions', label: currentT.integrations.configureIntegration.permissions }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-teal-600 border-b-2 border-teal-500'
                    : 'text-slate-600 hover:text-teal-600 hover:border-b-2 hover:border-teal-200'
                }`}
                aria-selected={activeTab === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="mb-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Entegrasyon Adı
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                  defaultValue={integration.name}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                  rows={3}
                  defaultValue={integration.description}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Kategori
                </label>
                <select className="w-full px-3 py-2 glass-input rounded-lg text-sm" defaultValue={integration.category}>
                  {Object.entries(currentT.integrations.categories).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700 mb-1">Bağlantı Durumu</h4>
                    <p className="text-sm text-blue-600 mb-2">
                      {integration.status === 'connected' 
                        ? `${integration.connectedSince || '2024-01-01'} tarihinden beri bağlı` 
                        : 'Bu entegrasyon şu anda bağlı değil'}
                    </p>
                    {integration.status === 'connected' && (
                      <p className="text-sm text-blue-600">
                        Son senkronizasyon: {integration.lastSync || 'Bilinmiyor'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'sync' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentT.integrations.configureIntegration.syncFrequency}
                </label>
                <select 
                  className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                  value={syncFrequency}
                  onChange={(e) => setSyncFrequency(e.target.value)}
                >
                  <option value="realtime">{currentT.integrations.configureIntegration.syncOptions.realtime}</option>
                  <option value="hourly">{currentT.integrations.configureIntegration.syncOptions.hourly}</option>
                  <option value="daily">{currentT.integrations.configureIntegration.syncOptions.daily}</option>
                  <option value="weekly">{currentT.integrations.configureIntegration.syncOptions.weekly}</option>
                  <option value="manual">{currentT.integrations.configureIntegration.syncOptions.manual}</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Senkronize Edilecek Veriler
                  </label>
                  <div className="space-y-2">
                    {['Kullanıcılar', 'Projeler', 'Görevler', 'Dosyalar', 'Takvim'].map(item => (
                      <label key={item} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded text-teal-600" defaultChecked />
                        <span className="text-sm text-slate-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Senkronizasyon Yönü
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="sync-direction" className="text-teal-600" defaultChecked />
                      <span className="text-sm text-slate-700">İki Yönlü (Gönder ve Al)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="sync-direction" className="text-teal-600" />
                      <span className="text-sm text-slate-700">Sadece Gönder</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="sync-direction" className="text-teal-600" />
                      <span className="text-sm text-slate-700">Sadece Al</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-slate-800 mb-2">Manuel Senkronizasyon</h4>
                <p className="text-sm text-slate-600 mb-3">
                  İstediğiniz zaman verileri manuel olarak senkronize edebilirsiniz.
                </p>
                <button
                  onClick={() => onSyncNow(integration.id)}
                  disabled={isSyncing === integration.id}
                  className="flex items-center space-x-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors duration-300 disabled:opacity-70"
                >
                  {isSyncing === integration.id ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{currentT.integrations.syncInProgress}</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      <span>{currentT.integrations.syncNow}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentT.integrations.configureIntegration.notifyOn}
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'errors', label: currentT.integrations.configureIntegration.notifyOptions.errors },
                    { id: 'warnings', label: currentT.integrations.configureIntegration.notifyOptions.warnings },
                    { id: 'updates', label: currentT.integrations.configureIntegration.notifyOptions.updates },
                    { id: 'all', label: currentT.integrations.configureIntegration.notifyOptions.all }
                  ].map(option => (
                    <label key={option.id} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        className="rounded text-teal-600" 
                        checked={notifyOn.includes(option.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNotifyOn([...notifyOn, option.id]);
                          } else {
                            setNotifyOn(notifyOn.filter(id => id !== option.id));
                          }
                        }}
                      />
                      <span className="text-sm text-slate-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentT.integrations.configureIntegration.notifyVia}
                </label>
                <select 
                  className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                  value={notifyVia}
                  onChange={(e) => setNotifyVia(e.target.value)}
                >
                  <option value="email">{currentT.integrations.configureIntegration.notifyViaOptions.email}</option>
                  <option value="inApp">{currentT.integrations.configureIntegration.notifyViaOptions.inApp}</option>
                  <option value="both">{currentT.integrations.configureIntegration.notifyViaOptions.both}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Bildirim Alıcıları
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-teal-600" defaultChecked />
                    <span className="text-sm text-slate-700">Sistem Yöneticileri</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-teal-600" defaultChecked />
                    <span className="text-sm text-slate-700">Entegrasyon Yöneticileri</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-teal-600" />
                    <span className="text-sm text-slate-700">Tüm Kullanıcılar</span>
                  </label>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-slate-800 mb-2">Bildirim Testi</h4>
                <p className="text-sm text-slate-600 mb-3">
                  Bildirim ayarlarınızı test etmek için bir test bildirimi gönderebilirsiniz.
                </p>
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors duration-300"
                >
                  <Bell className="w-4 h-4" />
                  <span>Test Bildirimi Gönder</span>
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'webhooks' && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg mb-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700 mb-1">Webhook Nedir?</h4>
                    <p className="text-sm text-blue-600">
                      Webhook'lar, entegrasyon olayları gerçekleştiğinde sistemimizin belirttiğiniz URL'ye otomatik olarak bildirim göndermesini sağlar. Bu, gerçek zamanlı veri güncellemeleri almanıza olanak tanır.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentT.integrations.configureIntegration.webhookUrl}
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                  placeholder="https://example.com/webhook/callback"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentT.integrations.configureIntegration.webhookSecret}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="password"
                    className="flex-1 px-3 py-2 glass-input rounded-lg text-sm"
                    value="whsec_abcdefghijklmnopqrstuvwxyz123456"
                    readOnly
                  />
                  <button className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm transition-colors duration-300">
                    {currentT.integrations.configureIntegration.regenerateSecret}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Webhook Olayları
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-teal-600" defaultChecked />
                    <span className="text-sm text-slate-700">Veri Değişiklikleri</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-teal-600" defaultChecked />
                    <span className="text-sm text-slate-700">Senkronizasyon Tamamlandı</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-teal-600" defaultChecked />
                    <span className="text-sm text-slate-700">Bağlantı Durumu Değişiklikleri</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-teal-600" />
                    <span className="text-sm text-slate-700">Hata Olayları</span>
                  </label>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-slate-800 mb-2">Webhook Testi</h4>
                <p className="text-sm text-slate-600 mb-3">
                  Webhook yapılandırmanızı test etmek için bir test olayı gönderebilirsiniz.
                </p>
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors duration-300"
                >
                  <Send className="w-4 h-4" />
                  <span>Test Webhook'u Gönder</span>
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'api' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentT.integrations.configureIntegration.apiKey}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 glass-input rounded-lg text-sm"
                    value="pk_live_abcdefghijklmnopqrstuvwxyz123456"
                    readOnly
                  />
                  <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200">
                    <Copy className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {currentT.integrations.configureIntegration.apiSecret}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="password"
                    className="flex-1 px-3 py-2 glass-input rounded-lg text-sm"
                    value="sk_live_abcdefghijklmnopqrstuvwxyz123456"
                    readOnly
                  />
                  <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200">
                    <Eye className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors duration-300">
                  <RefreshCw className="w-4 h-4" />
                  <span>{currentT.integrations.configureIntegration.regenerateKeys}</span>
                </button>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-700 mb-1">API Güvenlik Uyarısı</h4>
                    <p className="text-sm text-amber-600">
                      API anahtarlarınızı güvende tutun ve asla paylaşmayın. Anahtar güvenliğinden şüpheleniyorsanız, hemen yeni anahtarlar oluşturun.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  API Hız Limiti
                </label>
                <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                  <option value="100">100 istek/dakika (Varsayılan)</option>
                  <option value="500">500 istek/dakika</option>
                  <option value="1000">1000 istek/dakika</option>
                  <option value="5000">5000 istek/dakika</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  API Sürüm
                </label>
                <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                  <option value="v2">v2 (Önerilen)</option>
                  <option value="v1">v1 (Eski)</option>
                </select>
              </div>
            </div>
          )}
          
          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-slate-800 mb-3">{currentT.integrations.requiredPermissions}</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-700">Temel Veri Okuma</p>
                        <p className="text-xs text-slate-500">Temel kullanıcı ve hesap bilgilerine erişim</p>
                      </div>
                      <div className="text-emerald-600 flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-xs">Gerekli</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-700">Profil Bilgileri</p>
                        <p className="text-xs text-slate-500">Kullanıcı profil bilgilerine erişim</p>
                      </div>
                      <div className="text-emerald-600 flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-xs">Gerekli</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-800 mb-3">{currentT.integrations.optionalPermissions}</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-700">Veri Yazma</p>
                        <p className="text-xs text-slate-500">Veri oluşturma ve güncelleme izni</p>
                      </div>
                      <label className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300">
                        <input type="checkbox" className="peer sr-only" defaultChecked />
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 translate-x-6 peer-checked:translate-x-6 peer-checked:bg-white peer-checked:[&+.bg-slate-300]:bg-teal-500"></span>
                      </label>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-700">Dosya Erişimi</p>
                        <p className="text-xs text-slate-500">Dosya ve belgelere erişim</p>
                      </div>
                      <label className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300">
                        <input type="checkbox" className="peer sr-only" />
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 translate-x-1 peer-checked:translate-x-6 peer-checked:bg-white peer-checked:[&+.bg-slate-300]:bg-teal-500"></span>
                      </label>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-700">Kullanıcı Yönetimi</p>
                        <p className="text-xs text-slate-500">Kullanıcı hesaplarını yönetme izni</p>
                      </div>
                      <label className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300">
                        <input type="checkbox" className="peer sr-only" />
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 translate-x-1 peer-checked:translate-x-6 peer-checked:bg-white peer-checked:[&+.bg-slate-300]:bg-teal-500"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-700 mb-1">İzin Uyarısı</h4>
                    <p className="text-sm text-amber-600">
                      Entegrasyona verdiğiniz izinler, verilerinize erişim sağlar. Yalnızca gerekli olan izinleri etkinleştirin ve güvendiğiniz entegrasyonları kullanın.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-between pt-4 border-t border-slate-200">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors duration-300"
            >
              <Trash2 className="w-4 h-4" />
              <span>{currentT.integrations.configureIntegration.deleteIntegration}</span>
            </button>
            
            <button
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors duration-300"
            >
              <X className="w-4 h-4" />
              <span>{currentT.integrations.configureIntegration.cancel}</span>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors duration-300"
            >
              <Link className="w-4 h-4" />
              <span>{currentT.integrations.configureIntegration.testConnection}</span>
            </button>
            
            <button
              onClick={handleSaveConfig}
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors duration-300 disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Kaydediliyor...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{currentT.integrations.configureIntegration.save}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationConfigurationModal;