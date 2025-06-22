import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Search, Filter, Plus, Clock, Activity, Users, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { Language } from '../../types';
import SearchToolbar from '../SearchToolbar';

interface TasksPageProps {
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

const TasksPage: React.FC<TasksPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout,
  onNavigateToPage
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

  const t = {
    tr: {
      tasks: {
        title: 'Görev Yönetimi',
        subtitle: 'Görevlerinizi takip edin ve yönetin',
        search: 'Görevlerde ara...',
        addTask: 'Yeni Görev',
        quickActions: {
          pending: 'Bekleyen Görevler',
          inProgress: 'Devam Eden Görevler',
          pendingDesc: 'Atanmayı bekleyen görevler',
          inProgressDesc: 'Aktif çalışılan görevler'
        },
        stats: {
          totalTasks: 'Toplam Görev',
          pendingTasks: 'Bekleyen Görev',
          inProgressTasks: 'Devam Eden',
          completedTasks: 'Tamamlanan'
        }
      }
    },
    en: {
      tasks: {
        title: 'Task Management',
        subtitle: 'Track and manage your tasks',
        search: 'Search tasks...',
        addTask: 'Add Task',
        quickActions: {
          pending: 'Pending Tasks',
          inProgress: 'In Progress Tasks',
          pendingDesc: 'Tasks waiting to be assigned',
          inProgressDesc: 'Tasks currently being worked on'
        },
        stats: {
          totalTasks: 'Total Tasks',
          pendingTasks: 'Pending Tasks',
          inProgressTasks: 'In Progress',
          completedTasks: 'Completed'
        }
      }
    }
  };

  const currentT = t[language];

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
                {language === 'tr' ? 'Dashboard\'a Dön' : 'Back to Dashboard'}
              </span>
            </button>
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.tasks.title}</h1>
            
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.tasks.title}</h1>
            <p className="text-slate-600">{currentT.tasks.subtitle}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => onNavigateToPage('tasks')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">156</p>
                  <p className="text-sm text-slate-600">{currentT.tasks.stats.totalTasks}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('pending-tasks')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">15</p>
                  <p className="text-sm text-slate-600">{currentT.tasks.stats.pendingTasks}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('in-progress-tasks')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">30</p>
                  <p className="text-sm text-slate-600">{currentT.tasks.stats.inProgressTasks}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('tasks')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">111</p>
                  <p className="text-sm text-slate-600">{currentT.tasks.stats.completedTasks}</p>
                </div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => onNavigateToPage('pending-tasks')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.tasks.quickActions.pending}</h3>
              <p className="text-sm text-slate-600">{currentT.tasks.quickActions.pendingDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-amber-600">15</span>
                <span className="text-xs text-slate-500">Bekleyen görev</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateToPage('in-progress-tasks')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.tasks.quickActions.inProgress}</h3>
              <p className="text-sm text-slate-600">{currentT.tasks.quickActions.inProgressDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-blue-600">30</span>
                <span className="text-xs text-slate-500">Devam eden görev</span>
              </div>
            </button>
          </div>

          {/* Toolbar */}
          <SearchToolbar
            placeholder={currentT.tasks.search}
            onSearch={handleSearch}
            onFilter={toggleFilters}
            onAdd={handleAddTask}
            addButtonText={currentT.tasks.addTask}
            addButtonColor="teal"
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
                    <option value="pending">Beklemede</option>
                    <option value="in-progress">Devam Ediyor</option>
                    <option value="completed">Tamamlandı</option>
                    <option value="cancelled">İptal Edildi</option>
                  </select>
                </div>
                
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
                    Atanan Kişi
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Herkes</option>
                    <option value="me">Bana Atananlar</option>
                    <option value="unassigned">Atanmamış</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="text-center py-16">
            <CheckCircle className="w-16 h-16 text-teal-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentT.tasks.title}</h2>
            <p className="text-slate-600">{currentT.tasks.subtitle}</p>
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

export default TasksPage;