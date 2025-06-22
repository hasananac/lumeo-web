import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Search, Filter, Plus, Upload, Download, Folder, File, Share } from 'lucide-react';
import { Language } from '../../types';
import SearchToolbar from '../SearchToolbar';

interface DocumentsPageProps {
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

const DocumentsPage: React.FC<DocumentsPageProps> = ({ 
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

  const handleAddDocument = () => {
    // Implement add document functionality
    console.log('Add document');
  };

  const handleUpload = () => {
    // Implement upload functionality
    console.log('Upload document');
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
              {language === 'tr' ? 'Belgeler' : 'Documents'}
            </h1>
            
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Toolbar */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className={`flex items-center space-x-4 ${isMobile ? 'flex-col space-y-4 space-x-0' : ''}`}>
              <div className={`relative ${isMobile ? 'w-full' : 'flex-1'}`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 glass-input rounded-xl text-sm"
                  placeholder={language === 'tr' ? 'Belgelerde ara...' : 'Search documents...'}
                />
              </div>

              <button
                onClick={toggleFilters}
                className={`flex items-center space-x-2 px-4 py-2 bg-white/50 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors duration-300 ${isMobile ? 'w-full justify-center' : ''}`}
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filtreler</span>
              </button>

              <button 
                onClick={handleUpload}
                className={`flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full justify-center' : ''}`}
              >
                <Upload className="w-4 h-4" />
                <span className="font-medium">{language === 'tr' ? 'Yükle' : 'Upload'}</span>
              </button>

              <button 
                onClick={handleAddDocument}
                className={`flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full justify-center' : ''}`}
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">{language === 'tr' ? 'Belge Ekle' : 'Add Document'}</span>
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-slate-200 animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Belge Türü
                    </label>
                    <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                      <option value="all">Tüm Türler</option>
                      <option value="document">Doküman</option>
                      <option value="image">Görsel</option>
                      <option value="spreadsheet">Hesap Tablosu</option>
                      <option value="presentation">Sunum</option>
                      <option value="pdf">PDF</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Klasör
                    </label>
                    <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                      <option value="all">Tüm Klasörler</option>
                      <option value="projects">Projeler</option>
                      <option value="contracts">Sözleşmeler</option>
                      <option value="reports">Raporlar</option>
                      <option value="templates">Şablonlar</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Sıralama
                    </label>
                    <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                      <option value="date-desc">En Yeni</option>
                      <option value="date-asc">En Eski</option>
                      <option value="name">İsme Göre</option>
                      <option value="size">Boyuta Göre</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {language === 'tr' ? 'Belgeler' : 'Documents'}
            </h2>
            <p className="text-slate-600">
              {language === 'tr' ? 'Belge paylaşımı ve yönetim merkezi.' : 'Document sharing and management center.'}
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

export default DocumentsPage;