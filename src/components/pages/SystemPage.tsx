import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, Search, Plus, Shield, Globe, Cog, Database, Server, HardDrive } from 'lucide-react';
import { Language } from '../../types';

interface SystemPageProps {
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
  onNavigateToPage: (page: string) => void;
}

const SystemPage: React.FC<SystemPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout,
  onNavigateToPage
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const t = {
    tr: {
      system: {
        title: 'Sistem Yönetimi',
        subtitle: 'Sistem ayarlarını yönetin',
        quickActions: {
          settings: 'Ayarlar',
          security: 'Güvenlik',
          integrations: 'Entegrasyonlar',
          backup: 'Yedekleme',
          settingsDesc: 'Sistem ayarları ve konfigürasyon',
          securityDesc: 'Güvenlik ayarları ve izinler',
          integrationsDesc: 'Harici sistem entegrasyonları',
          backupDesc: 'Veri yedekleme ve geri yükleme'
        },
        stats: {
          systemHealth: 'Sistem Sağlığı',
          securityScore: 'Güvenlik Skoru',
          activeUsers: 'Aktif Kullanıcı',
          diskUsage: 'Disk Kullanımı'
        }
      }
    },
    en: {
      system: {
        title: 'System Management',
        subtitle: 'Manage system settings',
        quickActions: {
          settings: 'Settings',
          security: 'Security',
          integrations: 'Integrations',
          backup: 'Backup',
          settingsDesc: 'System settings and configuration',
          securityDesc: 'Security settings and permissions',
          integrationsDesc: 'External system integrations',
          backupDesc: 'Data backup and restore'
        },
        stats: {
          systemHealth: 'System Health',
          securityScore: 'Security Score',
          activeUsers: 'Active Users',
          diskUsage: 'Disk Usage'
        }
      }
    }
  };

  const currentT = t[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="glass-card border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-slate-600 hover:text-teal-600 transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">
                {language === 'tr' ? 'Dashboard\'a Dön' : 'Back to Dashboard'}
              </span>
            </button>
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.system.title}</h1>
            
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.system.title}</h1>
            <p className="text-slate-600">{currentT.system.subtitle}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => onNavigateToPage('system-settings')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">98%</p>
                  <p className="text-sm text-slate-600">{currentT.system.stats.systemHealth}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('security')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">85%</p>
                  <p className="text-sm text-slate-600">{currentT.system.stats.securityScore}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('users')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">32</p>
                  <p className="text-sm text-slate-600">{currentT.system.stats.activeUsers}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('backup')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <HardDrive className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">42%</p>
                  <p className="text-sm text-slate-600">{currentT.system.stats.diskUsage}</p>
                </div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => onNavigateToPage('system-settings')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.system.quickActions.settings}</h3>
              <p className="text-sm text-slate-600">{currentT.system.quickActions.settingsDesc}</p>
            </button>

            <button
              onClick={() => onNavigateToPage('security')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.system.quickActions.security}</h3>
              <p className="text-sm text-slate-600">{currentT.system.quickActions.securityDesc}</p>
            </button>

            <button
              onClick={() => onNavigateToPage('integrations')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.system.quickActions.integrations}</h3>
              <p className="text-sm text-slate-600">{currentT.system.quickActions.integrationsDesc}</p>
            </button>

            <button
              onClick={() => onNavigateToPage('backup')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <HardDrive className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.system.quickActions.backup}</h3>
              <p className="text-sm text-slate-600">{currentT.system.quickActions.backupDesc}</p>
            </button>
          </div>

          <div className="text-center py-16">
            <Settings className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentT.system.title}</h2>
            <p className="text-slate-600">{currentT.system.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemPage;