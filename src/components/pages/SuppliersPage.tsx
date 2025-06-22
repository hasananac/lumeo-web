import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Mail, 
  Phone, 
  Building2, 
  MapPin,
  Package,
  Truck,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  DollarSign,
  Calendar,
  FileText,
  MessageSquare
} from 'lucide-react';
import { Language } from '../../types';
import SearchToolbar from '../SearchToolbar';

interface SuppliersPageProps {
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

interface Supplier {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  location: string;
  joinDate: string;
  lastDelivery: string;
  totalOrders: number;
  totalSpent: number;
  averageDeliveryTime: number;
  qualityRating: number;
  reliabilityScore: number;
  contractType: 'long-term' | 'short-term' | 'project-based' | 'one-time';
  paymentTerms: string;
  tags: string[];
  notes?: string;
}

const SuppliersPage: React.FC<SuppliersPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    loadMockSuppliers();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add search effect
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSuppliers(suppliers);
    } else {
      const filtered = suppliers.filter(supplier => 
        supplier.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredSuppliers(filtered);
    }
  }, [searchQuery, suppliers]);

  const t = {
    tr: {
      suppliers: {
        title: 'Tedarikçi Yönetimi',
        subtitle: 'Tedarikçi ağınızı yönetin ve takip edin',
        search: 'Tedarikçilerde ara...',
        addSupplier: 'Yeni Tedarikçi',
        noSuppliers: 'Tedarikçi bulunamadı',
        stats: {
          totalSuppliers: 'Toplam Tedarikçi',
          activeSuppliers: 'Aktif Tedarikçi',
          totalSpent: 'Toplam Harcama',
          averageRating: 'Ortalama Değerlendirme'
        },
        status: {
          active: 'Aktif',
          inactive: 'Pasif',
          pending: 'Beklemede',
          suspended: 'Askıda'
        }
      }
    },
    en: {
      suppliers: {
        title: 'Supplier Management',
        subtitle: 'Manage and track your supplier network',
        search: 'Search suppliers...',
        addSupplier: 'Add Supplier',
        noSuppliers: 'No suppliers found',
        stats: {
          totalSuppliers: 'Total Suppliers',
          activeSuppliers: 'Active Suppliers',
          totalSpent: 'Total Spent',
          averageRating: 'Average Rating'
        },
        status: {
          active: 'Active',
          inactive: 'Inactive',
          pending: 'Pending',
          suspended: 'Suspended'
        }
      }
    }
  };

  const currentT = t[language];

  const loadMockSuppliers = () => {
    const mockSuppliers: Supplier[] = [
      {
        id: '1',
        companyName: 'TechSupply Ltd.',
        contactPerson: 'Mehmet Özkan',
        email: 'mehmet@techsupply.com',
        phone: '+90 555 789 12 34',
        category: 'Teknoloji',
        status: 'active',
        location: 'İstanbul, Türkiye',
        joinDate: '2022-03-15',
        lastDelivery: '1 hafta önce',
        totalOrders: 45,
        totalSpent: 850000,
        averageDeliveryTime: 3,
        qualityRating: 4.8,
        reliabilityScore: 95,
        contractType: 'long-term',
        paymentTerms: '30 gün',
        tags: ['Güvenilir', 'Hızlı Teslimat', 'Kaliteli'],
        notes: 'Uzun vadeli stratejik tedarikçi'
      },
      {
        id: '2',
        companyName: 'Office Solutions Inc.',
        contactPerson: 'Fatma Yıldız',
        email: 'fatma@officesolutions.com',
        phone: '+90 555 456 78 90',
        category: 'Ofis Malzemeleri',
        status: 'active',
        location: 'Ankara, Türkiye',
        joinDate: '2022-07-20',
        lastDelivery: '3 gün önce',
        totalOrders: 32,
        totalSpent: 420000,
        averageDeliveryTime: 2,
        qualityRating: 4.5,
        reliabilityScore: 88,
        contractType: 'short-term',
        paymentTerms: '15 gün',
        tags: ['Ofis', 'Düzenli', 'Uygun Fiyat'],
        notes: 'Aylık ofis malzemesi tedarikçisi'
      }
    ];

    setSuppliers(mockSuppliers);
    setFilteredSuppliers(mockSuppliers);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddSupplier = () => {
    // Implement add supplier functionality
    console.log('Add supplier');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'inactive': return 'bg-slate-100 text-slate-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const renderSupplierCard = (supplier: Supplier) => (
    <div
      key={supplier.id}
      className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => {
        setSelectedSupplier(supplier);
        setShowSupplierModal(true);
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{supplier.companyName}</h3>
            <p className="text-sm text-slate-600">{supplier.contactPerson}</p>
            <p className="text-xs text-slate-500">{supplier.category}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier.status)}`}>
          {currentT.suppliers.status[supplier.status as keyof typeof currentT.suppliers.status]}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Mail className="w-4 h-4" />
          <span className="truncate">{supplier.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Phone className="w-4 h-4" />
          <span>{supplier.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4" />
          <span>{supplier.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-800">{supplier.totalOrders}</p>
          <p className="text-xs text-slate-500">Sipariş</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-purple-600">₺{supplier.totalSpent.toLocaleString()}</p>
          <p className="text-xs text-slate-500">Harcama</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-amber-400 fill-current" />
          <span className="text-sm font-medium text-slate-700">{supplier.qualityRating}</span>
        </div>
        <div className="text-sm text-slate-600">
          {supplier.averageDeliveryTime} gün teslimat
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {supplier.tags.slice(0, 2).map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
            {tag}
          </span>
        ))}
        {supplier.tags.length > 2 && (
          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
            +{supplier.tags.length - 2}
          </span>
        )}
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
                  {language === 'tr' ? 'Geri' : 'Back'}
                </span>
              </button>
            </div>
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.suppliers.title}</h1>
            
            <div className="w-16 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.suppliers.title}</h1>
            <p className="text-slate-600">{currentT.suppliers.subtitle}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{filteredSuppliers.length}</p>
                  <p className="text-sm text-slate-600">{currentT.suppliers.stats.totalSuppliers}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{filteredSuppliers.filter(s => s.status === 'active').length}</p>
                  <p className="text-sm text-slate-600">{currentT.suppliers.stats.activeSuppliers}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">₺{suppliers.reduce((acc, s) => acc + s.totalSpent, 0).toLocaleString()}</p>
                  <p className="text-sm text-slate-600">{currentT.suppliers.stats.totalSpent}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{(suppliers.reduce((acc, s) => acc + s.qualityRating, 0) / suppliers.length).toFixed(1)}</p>
                  <p className="text-sm text-slate-600">{currentT.suppliers.stats.averageRating}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <SearchToolbar
            placeholder={currentT.suppliers.search}
            onSearch={handleSearch}
            onFilter={toggleFilters}
            onAdd={handleAddSupplier}
            addButtonText={currentT.suppliers.addSupplier}
            addButtonColor="purple"
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
                    {Object.entries(currentT.suppliers.status).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Kategori
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Kategoriler</option>
                    <option value="technology">Teknoloji</option>
                    <option value="office">Ofis Malzemeleri</option>
                    <option value="manufacturing">Üretim</option>
                    <option value="logistics">Lojistik</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sıralama
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="name">İsme Göre</option>
                    <option value="rating">Değerlendirmeye Göre</option>
                    <option value="spent">Harcamaya Göre</option>
                    <option value="delivery">Teslimat Süresine Göre</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Supplier List */}
          <div>
            {filteredSuppliers.length > 0 ? (
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {filteredSuppliers.map(renderSupplierCard)}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  {currentT.suppliers.noSuppliers}
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

      {/* Supplier Detail Modal */}
      {selectedSupplier && showSupplierModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`glass-card rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto animate-fade-in-up ${
            isMobile ? 'max-w-full' : 'max-w-4xl'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{selectedSupplier.companyName}</h2>
                <p className="text-lg text-slate-600">{selectedSupplier.contactPerson}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedSupplier.status)}`}>
                  {currentT.suppliers.status[selectedSupplier.status as keyof typeof currentT.suppliers.status]}
                </span>
              </div>
              <button
                onClick={() => setShowSupplierModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">İletişim Bilgileri</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-slate-500" />
                    <span className="text-slate-700">{selectedSupplier.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-slate-500" />
                    <span className="text-slate-700">{selectedSupplier.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-slate-500" />
                    <span className="text-slate-700">{selectedSupplier.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">Performans</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800">{selectedSupplier.totalOrders}</p>
                    <p className="text-sm text-slate-600">Toplam Sipariş</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">₺{selectedSupplier.totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-slate-600">Toplam Harcama</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">{selectedSupplier.qualityRating}</p>
                    <p className="text-sm text-slate-600">Kalite Puanı</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-emerald-600">{selectedSupplier.averageDeliveryTime}</p>
                    <p className="text-sm text-slate-600">Ortalama Teslimat (gün)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`flex space-x-3 pt-6 mt-6 border-t border-slate-200 ${isMobile ? 'flex-col space-y-3 space-x-0' : ''}`}>
              <button className={`flex items-center justify-center space-x-2 py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}>
                <Edit className="w-4 h-4" />
                <span>Düzenle</span>
              </button>
              
              <button className={`flex items-center justify-center space-x-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}>
                <MessageSquare className="w-4 h-4" />
                <span>Mesaj Gönder</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuppliersPage;