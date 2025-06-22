import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Building2, Shield, UserPlus, UserCheck, Package } from 'lucide-react';
import { Language } from '../../types';

interface UsersPageProps {
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

const UsersPage: React.FC<UsersPageProps> = ({ 
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
      users: {
        title: 'Kullanıcı Yönetimi',
        subtitle: 'Kullanıcıları ve erişim izinlerini yönetin',
        quickActions: {
          employees: 'Çalışanlar',
          customers: 'Müşteriler',
          suppliers: 'Tedarikçiler',
          employeesDesc: 'Şirket çalışanları ve yönetimi',
          customersDesc: 'Müşteri ilişkileri yönetimi',
          suppliersDesc: 'Tedarikçi ağı yönetimi'
        },
        stats: {
          totalUsers: 'Toplam Kullanıcı',
          activeUsers: 'Aktif Kullanıcı',
          pendingInvites: 'Bekleyen Davet',
          adminUsers: 'Yönetici'
        }
      }
    },
    en: {
      users: {
        title: 'User Management',
        subtitle: 'Manage users and access permissions',
        quickActions: {
          employees: 'Employees',
          customers: 'Customers',
          suppliers: 'Suppliers',
          employeesDesc: 'Company employees and management',
          customersDesc: 'Customer relationship management',
          suppliersDesc: 'Supplier network management'
        },
        stats: {
          totalUsers: 'Total Users',
          activeUsers: 'Active Users',
          pendingInvites: 'Pending Invites',
          adminUsers: 'Admins'
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
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.users.title}</h1>
            
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.users.title}</h1>
            <p className="text-slate-600">{currentT.users.subtitle}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => onNavigateToPage('users')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">128</p>
                  <p className="text-sm text-slate-600">{currentT.users.stats.totalUsers}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('users')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">112</p>
                  <p className="text-sm text-slate-600">{currentT.users.stats.activeUsers}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('users')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">8</p>
                  <p className="text-sm text-slate-600">{currentT.users.stats.pendingInvites}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('users')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">5</p>
                  <p className="text-sm text-slate-600">{currentT.users.stats.adminUsers}</p>
                </div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => onNavigateToPage('employees')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.users.quickActions.employees}</h3>
              <p className="text-sm text-slate-600">{currentT.users.quickActions.employeesDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-blue-600">32</span>
                <span className="text-xs text-slate-500">Çalışan</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateToPage('customers')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.users.quickActions.customers}</h3>
              <p className="text-sm text-slate-600">{currentT.users.quickActions.customersDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-emerald-600">86</span>
                <span className="text-xs text-slate-500">Müşteri</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateToPage('suppliers')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.users.quickActions.suppliers}</h3>
              <p className="text-sm text-slate-600">{currentT.users.quickActions.suppliersDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-purple-600">10</span>
                <span className="text-xs text-slate-500">Tedarikçi</span>
              </div>
            </button>
          </div>

          <div className="text-center py-16">
            <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentT.users.title}</h2>
            <p className="text-slate-600">{currentT.users.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;