import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';

interface SearchToolbarProps {
  placeholder: string;
  onSearch: (query: string) => void;
  onFilter?: () => void;
  onAdd?: () => void;
  addButtonText?: string;
  addButtonColor?: string;
  initialQuery?: string;
  showFilters?: boolean;
  showAddButton?: boolean;
  className?: string;
  isMobile?: boolean;
}

const SearchToolbar: React.FC<SearchToolbarProps> = ({ 
  placeholder, 
  onSearch, 
  onFilter,
  onAdd,
  addButtonText = 'Ekle',
  addButtonColor = 'teal',
  initialQuery = '', 
  showFilters = true,
  showAddButton = true,
  className = '',
  isMobile = false
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const getButtonColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500 hover:bg-blue-600';
      case 'red': return 'bg-red-500 hover:bg-red-600';
      case 'green': return 'bg-green-500 hover:bg-green-600';
      case 'purple': return 'bg-purple-500 hover:bg-purple-600';
      case 'amber': return 'bg-amber-500 hover:bg-amber-600';
      case 'emerald': return 'bg-emerald-500 hover:bg-emerald-600';
      default: return 'bg-teal-500 hover:bg-teal-600';
    }
  };

  return (
    <div className={`glass-card rounded-2xl p-6 ${className}`}>
      <div className={`flex items-center space-x-4 ${isMobile ? 'flex-col space-y-4 space-x-0' : ''}`}>
        <div className={`relative ${isMobile ? 'w-full' : 'flex-1'}`}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 glass-input rounded-xl text-sm"
            placeholder={placeholder}
          />
        </div>

        {showFilters && onFilter && (
          <button
            onClick={onFilter}
            className={`flex items-center space-x-2 px-4 py-2 bg-white/50 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors duration-300 ${isMobile ? 'w-full justify-center' : ''}`}
          >
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filtreler</span>
          </button>
        )}

        {showAddButton && onAdd && (
          <button 
            onClick={onAdd}
            className={`flex items-center space-x-2 px-4 py-2 ${getButtonColor(addButtonColor)} text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full justify-center' : ''}`}
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">{addButtonText}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchToolbar;