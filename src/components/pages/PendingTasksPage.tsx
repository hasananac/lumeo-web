import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Search, Filter, Plus, Users, Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Language } from '../../types';
import SearchToolbar from '../SearchToolbar';

interface PendingTasksPageProps {
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

const PendingTasksPage: React.FC<PendingTasksPageProps> = ({ 
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

  const handleAddTask = () => {
    // Implement add task functionality
    console.log('Add task');
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
              {language === 'tr' ? 'Bekleyen Görevler' : 'Pending Tasks'}
            </h1>
            
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Toolbar */}
          <SearchToolbar
            placeholder={language === 'tr' ? 'Bekleyen görevlerde ara...' : 'Search pending tasks...'}
            onSearch={handleSearch}
            onFilter={toggleFilters}
            onAdd={handleAddTask}
            addButtonText={language === 'tr' ? 'Görev Ekle' : 'Add Task'}
            addButtonColor="amber"
            isMobile={isMobile}
            className="mb-8"
          />

          {/* Filters */}
          {showFilters && (
            <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Öncelik
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Öncelikler</option>
                    <option value="high">Yüksek</option>
                    <option value="medium">Orta</option>
                    <option value="low">Düşük</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Proje
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Projeler</option>
                    <option value="project1">Lumeo Platform v2.0</option>
                    <option value="project2">Müşteri Portal Entegrasyonu</option>
                    <option value="project3">Mobil Uygulama Geliştirme</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sıralama
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="created">Oluşturma Tarihine Göre</option>
                    <option value="priority">Önceliğe Göre</option>
                    <option value="name">İsme Göre</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="text-center py-16">
            <Clock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {language === 'tr' ? 'Bekleyen Görevler' : 'Pending Tasks'}
            </h2>
            <p className="text-slate-600">
              {language === 'tr' ? 'Atanmayı bekleyen görevlerinizi burada görüntüleyebilirsiniz.' : 'View your tasks waiting to be assigned here.'}
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

export default PendingTasksPage;