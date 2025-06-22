import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Search, Filter, Plus, Calendar, DollarSign, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Language } from '../../types';
import SearchToolbar from '../SearchToolbar';

interface PaymentsPageProps {
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

const PaymentsPage: React.FC<PaymentsPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality here
    console.log('Searching for:', query);
  };

  const handleAddPayment = () => {
    // Implement add payment functionality
    console.log('Add payment');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

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
                {language === 'tr' ? 'Geri' : 'Back'}
              </span>
            </button>
            
            <h1 className="text-xl font-bold text-slate-800">
              {language === 'tr' ? 'Ödemeler' : 'Payments'}
            </h1>
            
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Toolbar */}
          <SearchToolbar
            placeholder={language === 'tr' ? 'Ödemelerde ara...' : 'Search payments...'}
            onSearch={handleSearch}
            onFilter={toggleFilters}
            onAdd={handleAddPayment}
            addButtonText={language === 'tr' ? 'Ödeme Ekle' : 'Add Payment'}
            addButtonColor="emerald"
            isMobile={isMobile}
            className="mb-8"
          />

          {/* Filters */}
          {showFilters && (
            <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Durum
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Durumlar</option>
                    <option value="completed">Tamamlandı</option>
                    <option value="pending">Beklemede</option>
                    <option value="failed">Başarısız</option>
                    <option value="refunded">İade Edildi</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ödeme Yöntemi
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Yöntemler</option>
                    <option value="credit-card">Kredi Kartı</option>
                    <option value="bank-transfer">Banka Transferi</option>
                    <option value="cash">Nakit</option>
                    <option value="other">Diğer</option>
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
                    <option value="this-year">Bu Yıl</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="text-center py-16">
            <CreditCard className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {language === 'tr' ? 'Ödemeler' : 'Payments'}
            </h2>
            <p className="text-slate-600">
              {language === 'tr' ? 'Ödeme işlemlerini ve takibini burada yapabilirsiniz.' : 'Process and track your payments here.'}
            </p>
            {searchQuery && (
              <p className="mt-4 text-slate-500">
                {language === 'tr' 
                  ? `"${searchQuery}" için arama sonuçları gösteriliyor` 
                  : `Showing search results for "${searchQuery}"`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;