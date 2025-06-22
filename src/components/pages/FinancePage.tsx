import React, { useState, useEffect } from 'react';
import { ArrowLeft, DollarSign, Search, Plus, TrendingUp, FileText, CreditCard, Receipt, BarChart3, PieChart, ShoppingCart } from 'lucide-react';
import { Language } from '../../types';

interface FinancePageProps {
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

const FinancePage: React.FC<FinancePageProps> = ({ 
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
      finance: {
        title: 'Finans Yönetimi',
        subtitle: 'Finansal işlemlerinizi takip edin ve yönetin',
        quickActions: {
          invoices: 'Faturalar',
          payments: 'Ödemeler',
          expenses: 'Giderler',
          orders: 'Siparişler',
          invoicesDesc: 'Fatura yönetimi ve takibi',
          paymentsDesc: 'Ödeme işlemleri ve takibi',
          expensesDesc: 'Gider yönetimi ve raporlama',
          ordersDesc: 'Sipariş yönetimi ve takibi'
        }
      }
    },
    en: {
      finance: {
        title: 'Finance Management',
        subtitle: 'Track and manage your financial operations',
        quickActions: {
          invoices: 'Invoices',
          payments: 'Payments',
          expenses: 'Expenses',
          orders: 'Orders',
          invoicesDesc: 'Invoice management and tracking',
          paymentsDesc: 'Payment processing and tracking',
          expensesDesc: 'Expense management and reporting',
          ordersDesc: 'Order management and tracking'
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
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.finance.title}</h1>
            
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.finance.title}</h1>
            <p className="text-slate-600">{currentT.finance.subtitle}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => onNavigateToPage('invoices')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">24</p>
                  <p className="text-sm text-slate-600">Aktif Fatura</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('payments')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">₺125K</p>
                  <p className="text-sm text-slate-600">Bu Ay</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('expenses')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">₺85K</p>
                  <p className="text-sm text-slate-600">Giderler</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('orders')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">18</p>
                  <p className="text-sm text-slate-600">Aktif Sipariş</p>
                </div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => onNavigateToPage('invoices')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.finance.quickActions.invoices}</h3>
              <p className="text-sm text-slate-600">{currentT.finance.quickActions.invoicesDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-blue-600">24</span>
                <span className="text-xs text-slate-500">Aktif fatura</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateToPage('payments')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.finance.quickActions.payments}</h3>
              <p className="text-sm text-slate-600">{currentT.finance.quickActions.paymentsDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-emerald-600">₺125K</span>
                <span className="text-xs text-slate-500">Bu ay</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateToPage('expenses')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.finance.quickActions.expenses}</h3>
              <p className="text-sm text-slate-600">{currentT.finance.quickActions.expensesDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-red-600">₺85K</span>
                <span className="text-xs text-slate-500">Bu ay</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateToPage('orders')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.finance.quickActions.orders}</h3>
              <p className="text-sm text-slate-600">{currentT.finance.quickActions.ordersDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-amber-600">18</span>
                <span className="text-xs text-slate-500">Aktif sipariş</span>
              </div>
            </button>
          </div>

          <div className="text-center py-16">
            <DollarSign className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentT.finance.title}</h2>
            <p className="text-slate-600">{currentT.finance.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;