import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Target, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Users, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  X,
  Play,
  Pause,
  Archive,
  Star,
  MapPin,
  Briefcase,
  Activity,
  BarChart3,
  PieChart,
  Grid,
  List
} from 'lucide-react';
import { Language } from '../../types';
import SearchToolbar from '../SearchToolbar';

interface ProjectsPageProps {
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

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled' | 'planning';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  teamSize: number;
  manager: string;
  client?: string;
  tags: string[];
  category: string;
  location?: string;
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
  };
  milestones: {
    total: number;
    completed: number;
  };
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdate: string;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout,
  onNavigateToPage
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    loadMockProjects();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add search effect
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.client && project.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.location && project.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery, projects]);

  const t = {
    tr: {
      projects: {
        title: 'Proje Yönetimi',
        subtitle: 'Projelerinizi takip edin ve yönetin',
        search: 'Projelerde ara...',
        addProject: 'Yeni Proje',
        noProjects: 'Proje bulunamadı',
        quickActions: {
          active: 'Aktif Projeler',
          completed: 'Tamamlanan Projeler',
          archived: 'Arşivlenen Projeler',
          activeDesc: 'Devam eden projeleri görüntüle',
          completedDesc: 'Başarıyla tamamlanan projeler',
          archivedDesc: 'Arşivlenen proje geçmişi'
        },
        stats: {
          totalProjects: 'Toplam Proje',
          activeProjects: 'Aktif Proje',
          completedProjects: 'Tamamlanan Proje',
          totalBudget: 'Toplam Bütçe'
        },
        status: {
          active: 'Aktif',
          completed: 'Tamamlandı',
          'on-hold': 'Beklemede',
          cancelled: 'İptal Edildi',
          planning: 'Planlanıyor'
        },
        priority: {
          high: 'Yüksek',
          medium: 'Orta',
          low: 'Düşük'
        }
      }
    },
    en: {
      projects: {
        title: 'Project Management',
        subtitle: 'Track and manage your projects',
        search: 'Search projects...',
        addProject: 'Add Project',
        noProjects: 'No projects found',
        quickActions: {
          active: 'Active Projects',
          completed: 'Completed Projects',
          archived: 'Archived Projects',
          activeDesc: 'View ongoing projects',
          completedDesc: 'Successfully completed projects',
          archivedDesc: 'Archived project history'
        },
        stats: {
          totalProjects: 'Total Projects',
          activeProjects: 'Active Projects',
          completedProjects: 'Completed Projects',
          totalBudget: 'Total Budget'
        },
        status: {
          active: 'Active',
          completed: 'Completed',
          'on-hold': 'On Hold',
          cancelled: 'Cancelled',
          planning: 'Planning'
        },
        priority: {
          high: 'High',
          medium: 'Medium',
          low: 'Low'
        }
      }
    }
  };

  const currentT = t[language];

  const loadMockProjects = () => {
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'Lumeo Platform v2.0',
        description: 'Yeni nesil iş yönetimi platformunun geliştirilmesi',
        status: 'active',
        priority: 'high',
        progress: 65,
        startDate: '2024-01-15',
        endDate: '2024-06-30',
        budget: 500000,
        spent: 325000,
        teamSize: 8,
        manager: 'Ayşe Demir',
        client: 'İç Proje',
        tags: ['Platform', 'Geliştirme', 'v2.0'],
        category: 'Yazılım Geliştirme',
        location: 'İstanbul',
        tasks: {
          total: 45,
          completed: 29,
          inProgress: 12,
          pending: 4
        },
        milestones: {
          total: 6,
          completed: 4
        },
        riskLevel: 'medium',
        lastUpdate: '2 gün önce'
      },
      {
        id: '2',
        name: 'Müşteri Portal Entegrasyonu',
        description: 'Mevcut CRM sisteminin yeni platforma entegrasyonu',
        status: 'active',
        priority: 'medium',
        progress: 30,
        startDate: '2024-02-01',
        endDate: '2024-04-15',
        budget: 150000,
        spent: 45000,
        teamSize: 4,
        manager: 'Mehmet Kaya',
        client: 'TechCorp A.Ş.',
        tags: ['CRM', 'Entegrasyon', 'Müşteri'],
        category: 'Entegrasyon',
        location: 'Ankara',
        tasks: {
          total: 28,
          completed: 8,
          inProgress: 15,
          pending: 5
        },
        milestones: {
          total: 4,
          completed: 1
        },
        riskLevel: 'low',
        lastUpdate: '1 gün önce'
      },
      {
        id: '3',
        name: 'Mobil Uygulama Geliştirme',
        description: 'iOS ve Android için mobil uygulama',
        status: 'completed',
        priority: 'high',
        progress: 100,
        startDate: '2023-09-01',
        endDate: '2023-12-31',
        budget: 300000,
        spent: 285000,
        teamSize: 6,
        manager: 'Zeynep Özkan',
        client: 'Retail Plus Ltd.',
        tags: ['Mobil', 'iOS', 'Android'],
        category: 'Mobil Geliştirme',
        location: 'İzmir',
        tasks: {
          total: 52,
          completed: 52,
          inProgress: 0,
          pending: 0
        },
        milestones: {
          total: 5,
          completed: 5
        },
        riskLevel: 'low',
        lastUpdate: '1 hafta önce'
      }
    ];

    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddProject = () => {
    // Implement add project functionality
    console.log('Add project');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'on-hold': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'planning': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-amber-600';
      case 'low': return 'text-emerald-600';
      default: return 'text-slate-600';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-emerald-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const renderProjectCard = (project: Project) => (
    <div
      key={project.id}
      className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => {
        setSelectedProject(project);
        setShowProjectModal(true);
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 truncate mb-1">{project.name}</h3>
          <p className="text-sm text-slate-600 line-clamp-2">{project.description}</p>
        </div>
        <div className="flex flex-col items-end space-y-2 ml-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {currentT.projects.status[project.status as keyof typeof currentT.projects.status]}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
            {currentT.projects.priority[project.priority as keyof typeof currentT.projects.priority]}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">İlerleme</span>
          <span className="text-sm font-bold text-slate-800">{project.progress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-800">{project.teamSize}</p>
          <p className="text-xs text-slate-500">Takım Üyesi</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-slate-800">{project.tasks.completed}/{project.tasks.total}</p>
          <p className="text-xs text-slate-500">Görev</p>
        </div>
      </div>

      {/* Budget */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-600">Bütçe</span>
          <span className="text-sm font-medium text-slate-800">
            ₺{project.spent.toLocaleString()} / ₺{project.budget.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-1">
          <div 
            className="h-1 bg-blue-500 rounded-full"
            style={{ width: `${(project.spent / project.budget) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Manager & Client */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Users className="w-4 h-4" />
          <span>Yönetici: {project.manager}</span>
        </div>
        {project.client && (
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Briefcase className="w-4 h-4" />
            <span>Müşteri: {project.client}</span>
          </div>
        )}
        {project.location && (
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {project.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
            +{project.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Son güncelleme: {project.lastUpdate}</span>
        <div className="flex items-center space-x-1">
          <AlertTriangle className={`w-3 h-3 ${getRiskColor(project.riskLevel)}`} />
          <span className={getRiskColor(project.riskLevel)}>
            {project.riskLevel === 'high' ? 'Yüksek Risk' : 
             project.riskLevel === 'medium' ? 'Orta Risk' : 'Düşük Risk'}
          </span>
        </div>
      </div>
    </div>
  );

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
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.projects.title}</h1>
            
            <div className="w-16 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.projects.title}</h1>
            <p className="text-slate-600">{currentT.projects.subtitle}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => onNavigateToPage('projects')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{projects.length}</p>
                  <p className="text-sm text-slate-600">{currentT.projects.stats.totalProjects}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('active-projects')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{projects.filter(p => p.status === 'active').length}</p>
                  <p className="text-sm text-slate-600">{currentT.projects.stats.activeProjects}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('completed-projects')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{projects.filter(p => p.status === 'completed').length}</p>
                  <p className="text-sm text-slate-600">{currentT.projects.stats.completedProjects}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('finance')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">₺{projects.reduce((acc, p) => acc + p.budget, 0).toLocaleString()}</p>
                  <p className="text-sm text-slate-600">{currentT.projects.stats.totalBudget}</p>
                </div>
              </div>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => onNavigateToPage('active-projects')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.projects.quickActions.active}</h3>
              <p className="text-sm text-slate-600">{currentT.projects.quickActions.activeDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-emerald-600">{projects.filter(p => p.status === 'active').length}</span>
                <span className="text-xs text-slate-500">Aktif proje</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateToPage('completed-projects')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.projects.quickActions.completed}</h3>
              <p className="text-sm text-slate-600">{currentT.projects.quickActions.completedDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-blue-600">{projects.filter(p => p.status === 'completed').length}</span>
                <span className="text-xs text-slate-500">Tamamlanan</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateToPage('archived-projects')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Archive className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.projects.quickActions.archived}</h3>
              <p className="text-sm text-slate-600">{currentT.projects.quickActions.archivedDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-purple-600">5</span>
                <span className="text-xs text-slate-500">Arşivlenen</span>
              </div>
            </button>
          </div>

          {/* Toolbar */}
          <SearchToolbar
            placeholder={currentT.projects.search}
            onSearch={handleSearch}
            onFilter={toggleFilters}
            onAdd={handleAddProject}
            addButtonText={currentT.projects.addProject}
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
                    {Object.entries(currentT.projects.status).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Öncelik
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Öncelikler</option>
                    {Object.entries(currentT.projects.priority).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sıralama
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="name">İsme Göre</option>
                    <option value="date">Tarihe Göre</option>
                    <option value="progress">İlerlemeye Göre</option>
                    <option value="budget">Bütçeye Göre</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* View Mode Toggle */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center space-x-2 bg-white/50 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-teal-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-teal-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Project List */}
          <div>
            {filteredProjects.length > 0 ? (
              <div className={`grid gap-6 ${
                isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {filteredProjects.map(renderProjectCard)}
              </div>
            ) : (
              <div className="text-center py-16">
                <Target className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  {currentT.projects.noProjects}
                </h3>
                {searchQuery && (
                  <p className="text-slate-500 max-w-md mx-auto">
                    {language === 'tr' 
                      ? `"${searchQuery}" için sonuç bulunamadı.` 
                      : `No results found for "${searchQuery}".`}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && showProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`glass-card rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto animate-fade-in-up ${
            isMobile ? 'max-w-full' : 'max-w-6xl'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{selectedProject.name}</h2>
                <p className="text-lg text-slate-600 mt-2">{selectedProject.description}</p>
                <div className="flex items-center space-x-3 mt-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                    {currentT.projects.status[selectedProject.status as keyof typeof currentT.projects.status]}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedProject.priority)}`}>
                    {currentT.projects.priority[selectedProject.priority as keyof typeof currentT.projects.priority]}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowProjectModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
              {/* Progress */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">İlerleme</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Genel İlerleme</span>
                      <span className="text-sm font-bold text-slate-800">{selectedProject.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${getProgressColor(selectedProject.progress)}`}
                        style={{ width: `${selectedProject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-lg font-bold text-slate-800">{selectedProject.tasks.completed}</p>
                      <p className="text-xs text-slate-600">Tamamlanan Görev</p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-lg font-bold text-slate-800">{selectedProject.milestones.completed}</p>
                      <p className="text-xs text-slate-600">Tamamlanan Kilometre Taşı</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">Bütçe</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Harcanan</span>
                      <span className="text-sm font-bold text-slate-800">
                        ₺{selectedProject.spent.toLocaleString()} / ₺{selectedProject.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className="h-3 bg-blue-500 rounded-full"
                        style={{ width: `${(selectedProject.spent / selectedProject.budget) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-lg font-bold text-blue-600">₺{selectedProject.spent.toLocaleString()}</p>
                      <p className="text-xs text-slate-600">Harcanan</p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-lg font-bold text-emerald-600">₺{(selectedProject.budget - selectedProject.spent).toLocaleString()}</p>
                      <p className="text-xs text-slate-600">Kalan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team & Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">Proje Detayları</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Proje Yöneticisi</p>
                      <p className="text-xs text-slate-600">{selectedProject.manager}</p>
                    </div>
                  </div>
                  
                  {selectedProject.client && (
                    <div className="flex items-center space-x-3">
                      <Briefcase className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">Müşteri</p>
                        <p className="text-xs text-slate-600">{selectedProject.client}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Tarih Aralığı</p>
                      <p className="text-xs text-slate-600">{selectedProject.startDate} - {selectedProject.endDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className={`w-5 h-5 ${getRiskColor(selectedProject.riskLevel)}`} />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Risk Seviyesi</p>
                      <p className={`text-xs ${getRiskColor(selectedProject.riskLevel)}`}>
                        {selectedProject.riskLevel === 'high' ? 'Yüksek Risk' : 
                         selectedProject.riskLevel === 'medium' ? 'Orta Risk' : 'Düşük Risk'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">Etiketler</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className={`flex space-x-3 pt-6 mt-6 border-t border-slate-200 ${isMobile ? 'flex-col space-y-3 space-x-0' : ''}`}>
              <button className={`flex items-center justify-center space-x-2 py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}>
                <Edit className="w-4 h-4" />
                <span>Projeyi Düzenle</span>
              </button>
              
              <button className={`flex items-center justify-center space-x-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}>
                <Eye className="w-4 h-4" />
                <span>Detaylı Görünüm</span>
              </button>
              
              <button className={`flex items-center justify-center space-x-2 py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}>
                <BarChart3 className="w-4 h-4" />
                <span>Raporlar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;