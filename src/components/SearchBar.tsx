import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
  initialQuery?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder, 
  onSearch, 
  initialQuery = '', 
  className = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        className="w-full pl-10 pr-4 py-2 glass-input rounded-xl text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;