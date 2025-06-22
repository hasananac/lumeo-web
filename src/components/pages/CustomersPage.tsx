import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star, 
  Download, 
  Upload, 
  UserPlus, 
  MapPin,
  Globe,
  Briefcase,
  TrendingUp,
  BarChart3,
  Target,
  Award,
  Heart,
  Zap,
  Crown,
  AlertTriangle,
  Info,
  RefreshCw,
  FileText,
  Send,
  MessageSquare,
  Video,
  UserX,
  Lock,
  Unlock,
  Copy,
  Share,
  Bookmark,
  Tag,
  Layers,
  Grid,
  List,
  SortAsc,
  SortDesc,
  X,
  DollarSign,
  ShoppingCart,
  Package
} from 'lucide-react';
import { Language } from '../../types';
import SearchToolbar from '../SearchToolbar';

interface CustomersPageProps {
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

interface Customer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  status: 'active' | 'inactive' | 'potential' | 'lost';
  location: string;
  joinDate: string;
  lastContact: string;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  satisfactionScore: number;
  projects: number;
  contractType: 'monthly' | 'yearly' | 'project-based' | 'one-time';
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  notes?: string;
  website?: string;
  taxId?: string;
  paymentTerms?: string;
  creditLimit?: number;
  assignedRepresentative?: string;
  addresses?: {
    type: 'billing' | 'shipping' | 'headquarters' | 'branch';
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    isPrimary: boolean;
  }[];
  contacts?: {
    name: string;
    position: string;
    email: string;
    phone: string;
    isPrimary: boolean;
  }[];
  socialMedia?: {
    platform: string;
    url: string;
  }[];
  customFields?: {
    name: string;
    value: string;
  }[];
}

interface FilterOptions {
  status: string;
  industry: string;
  priority: string;
  contractType: string;
  location: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const CustomersPage: React.FC<CustomersPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'contact' | 'financial' | 'additional'>('basic');
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    industry: 'all',
    priority: 'all',
    contractType: 'all',
    location: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  
  // New customer form state
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    status: 'potential',
    location: '',
    tags: [],
    priority: 'medium',
    contractType: 'monthly',
    website: '',
    taxId: '',
    paymentTerms: '30 days',
    creditLimit: 10000,
    assignedRepresentative: '',
    addresses: [
      {
        type: 'billing',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Türkiye',
        isPrimary: true
      }
    ],
    contacts: [
      {
        name: '',
        position: '',
        email: '',
        phone: '',
        isPrimary: true
      }
    ],
    socialMedia: [],
    customFields: []
  });
  
  // Form validation state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [newTag, setNewTag] = useState('');
  const [newSocialMedia, setNewSocialMedia] = useState({ platform: 'LinkedIn', url: '' });
  const [newCustomField, setNewCustomField] = useState({ name: '', value: '' });

  useEffect(() => {
    setIsLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    loadMockCustomers();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add search and filter effect
  useEffect(() => {
    let filtered = [...customers];
    
    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(customer =>
        customer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(customer => customer.status === filters.status);
    }
    
    // Industry filter
    if (filters.industry !== 'all') {
      filtered = filtered.filter(customer => customer.industry === filters.industry);
    }
    
    // Priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter(customer => customer.priority === filters.priority);
    }
    
    // Contract type filter
    if (filters.contractType !== 'all') {
      filtered = filtered.filter(customer => customer.contractType === filters.contractType);
    }
    
    // Location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(customer => customer.location.includes(filters.location));
    }
    
    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'name':
          comparison = a.companyName.localeCompare(b.companyName);
          break;
        case 'revenue':
          comparison = a.totalRevenue - b.totalRevenue;
          break;
        case 'orders':
          comparison = a.totalOrders - b.totalOrders;
          break;
        case 'satisfaction':
          comparison = a.satisfactionScore - b.satisfactionScore;
          break;
        case 'date':
          comparison = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
          break;
        default:
          comparison = a.companyName.localeCompare(b.companyName);
      }
      
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredCustomers(filtered);
  }, [customers, searchQuery, filters]);

  const t = {
    tr: {
      customers: {
        title: 'Müşteri Yönetimi',
        subtitle: 'Müşteri ilişkilerinizi yönetin ve takip edin',
        search: 'Müşterilerde ara...',
        addCustomer: 'Yeni Müşteri',
        noCustomers: 'Müşteri bulunamadı',
        stats: {
          totalCustomers: 'Toplam Müşteri',
          activeCustomers: 'Aktif Müşteri',
          totalRevenue: 'Toplam Gelir',
          averageSatisfaction: 'Ortalama Memnuniyet'
        },
        status: {
          active: 'Aktif',
          inactive: 'Pasif',
          potential: 'Potansiyel',
          lost: 'Kaybedilen'
        },
        addModal: {
          title: 'Yeni Müşteri Ekle',
          tabs: {
            basic: 'Temel Bilgiler',
            contact: 'İletişim',
            financial: 'Finansal',
            additional: 'Ek Bilgiler'
          },
          fields: {
            companyName: 'Şirket Adı',
            contactPerson: 'İletişim Kişisi',
            email: 'E-posta',
            phone: 'Telefon',
            industry: 'Sektör',
            status: 'Durum',
            location: 'Konum',
            tags: 'Etiketler',
            priority: 'Öncelik',
            contractType: 'Sözleşme Türü',
            website: 'Web Sitesi',
            taxId: 'Vergi No',
            paymentTerms: 'Ödeme Koşulları',
            creditLimit: 'Kredi Limiti',
            assignedRepresentative: 'Atanan Temsilci',
            addresses: 'Adresler',
            contacts: 'İletişim Kişileri',
            socialMedia: 'Sosyal Medya',
            customFields: 'Özel Alanlar',
            addTag: 'Etiket Ekle',
            addAddress: 'Adres Ekle',
            addContact: 'Kişi Ekle',
            addSocialMedia: 'Sosyal Medya Ekle',
            addCustomField: 'Özel Alan Ekle',
            addressType: 'Adres Türü',
            street: 'Cadde/Sokak',
            city: 'Şehir',
            state: 'İlçe/Eyalet',
            postalCode: 'Posta Kodu',
            country: 'Ülke',
            isPrimary: 'Birincil',
            contactName: 'Ad Soyad',
            position: 'Pozisyon',
            platform: 'Platform',
            url: 'URL',
            fieldName: 'Alan Adı',
            fieldValue: 'Değer'
          },
          buttons: {
            save: 'Kaydet',
            cancel: 'İptal',
            add: 'Ekle',
            remove: 'Kaldır'
          },
          placeholders: {
            companyName: 'ABC Teknoloji Ltd.',
            contactPerson: 'Ahmet Yılmaz',
            email: 'ahmet@sirket.com',
            phone: '0555 123 45 67',
            industry: 'Teknoloji',
            location: 'İstanbul, Türkiye',
            website: 'https://www.sirket.com',
            taxId: '1234567890',
            street: 'Atatürk Cad. No:123',
            city: 'İstanbul',
            state: 'Kadıköy',
            postalCode: '34000',
            contactName: 'Mehmet Kaya',
            position: 'Satın Alma Müdürü',
            fieldName: 'Sektör Kodu',
            fieldValue: 'TECH-001'
          }
        }
      }
    },
    en: {
      customers: {
        title: 'Customer Management',
        subtitle: 'Manage and track your customer relationships',
        search: 'Search customers...',
        addCustomer: 'Add Customer',
        noCustomers: 'No customers found',
        stats: {
          totalCustomers: 'Total Customers',
          activeCustomers: 'Active Customers',
          totalRevenue: 'Total Revenue',
          averageSatisfaction: 'Average Satisfaction'
        },
        status: {
          active: 'Active',
          inactive: 'Inactive',
          potential: 'Potential',
          lost: 'Lost'
        },
        addModal: {
          title: 'Add New Customer',
          tabs: {
            basic: 'Basic Information',
            contact: 'Contact',
            financial: 'Financial',
            additional: 'Additional'
          },
          fields: {
            companyName: 'Company Name',
            contactPerson: 'Contact Person',
            email: 'Email',
            phone: 'Phone',
            industry: 'Industry',
            status: 'Status',
            location: 'Location',
            tags: 'Tags',
            priority: 'Priority',
            contractType: 'Contract Type',
            website: 'Website',
            taxId: 'Tax ID',
            paymentTerms: 'Payment Terms',
            creditLimit: 'Credit Limit',
            assignedRepresentative: 'Assigned Representative',
            addresses: 'Addresses',
            contacts: 'Contacts',
            socialMedia: 'Social Media',
            customFields: 'Custom Fields',
            addTag: 'Add Tag',
            addAddress: 'Add Address',
            addContact: 'Add Contact',
            addSocialMedia: 'Add Social Media',
            addCustomField: 'Add Custom Field',
            addressType: 'Address Type',
            street: 'Street',
            city: 'City',
            state: 'State/Province',
            postalCode: 'Postal Code',
            country: 'Country',
            isPrimary: 'Primary',
            contactName: 'Full Name',
            position: 'Position',
            platform: 'Platform',
            url: 'URL',
            fieldName: 'Field Name',
            fieldValue: 'Value'
          },
          buttons: {
            save: 'Save',
            cancel: 'Cancel',
            add: 'Add',
            remove: 'Remove'
          },
          placeholders: {
            companyName: 'ABC Technology Inc.',
            contactPerson: 'John Smith',
            email: 'john@company.com',
            phone: '(555) 123-4567',
            industry: 'Technology',
            location: 'New York, USA',
            website: 'https://www.company.com',
            taxId: '1234567890',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            postalCode: '10001',
            contactName: 'Jane Doe',
            position: 'Purchasing Manager',
            fieldName: 'Industry Code',
            fieldValue: 'TECH-001'
          }
        }
      }
    }
  };

  const currentT = t[language];

  const loadMockCustomers = () => {
    const mockCustomers: Customer[] = [
      {
        id: '1',
        companyName: 'TechCorp A.Ş.',
        contactPerson: 'Emre Çelik',
        email: 'emre@techcorp.com',
        phone: '+90 555 147 25 83',
        industry: 'Teknoloji',
        status: 'active',
        location: 'İstanbul, Türkiye',
        joinDate: '2023-01-15',
        lastContact: '2 gün önce',
        totalOrders: 24,
        totalRevenue: 450000,
        averageOrderValue: 18750,
        satisfactionScore: 92,
        projects: 3,
        contractType: 'yearly',
        priority: 'high',
        tags: ['VIP', 'Teknoloji', 'Büyük Müşteri'],
        notes: 'Stratejik ortaklık potansiyeli var'
      },
      {
        id: '2',
        companyName: 'Retail Plus Ltd.',
        contactPerson: 'Ayşe Kaya',
        email: 'ayse@retailplus.com',
        phone: '+90 555 963 74 18',
        industry: 'Perakende',
        status: 'active',
        location: 'Ankara, Türkiye',
        joinDate: '2022-08-20',
        lastContact: '1 hafta önce',
        totalOrders: 18,
        totalRevenue: 280000,
        averageOrderValue: 15555,
        satisfactionScore: 88,
        projects: 2,
        contractType: 'monthly',
        priority: 'medium',
        tags: ['Perakende', 'Düzenli Müşteri'],
        notes: 'Aylık düzenli siparişler veriyor'
      }
    ];

    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddCustomer = () => {
    setShowAddCustomerModal(true);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'inactive': return 'bg-slate-100 text-slate-700';
      case 'potential': return 'bg-blue-100 text-blue-700';
      case 'lost': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const renderCustomerCard = (customer: Customer) => (
    <div
      key={customer.id}
      className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => {
        setSelectedCustomer(customer);
        setShowCustomerModal(true);
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{customer.companyName}</h3>
            <p className="text-sm text-slate-600">{customer.contactPerson}</p>
            <p className="text-xs text-slate-500">{customer.industry}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
          {currentT.customers.status[customer.status as keyof typeof currentT.customers.status]}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Mail className="w-4 h-4" />
          <span className="truncate">{customer.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Phone className="w-4 h-4" />
          <span>{customer.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4" />
          <span>{customer.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-800">{customer.totalOrders}</p>
          <p className="text-xs text-slate-500">Sipariş</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-emerald-600">₺{customer.totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-slate-500">Gelir</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {customer.tags.slice(0, 2).map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
            {tag}
          </span>
        ))}
        {customer.tags.length > 2 && (
          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
            +{customer.tags.length - 2}
          </span>
        )}
      </div>
    </div>
  );
  
  const handleAddNewCustomer = () => {
    // Validate form
    const errors: Record<string, string> = {};
    
    if (!newCustomer.companyName) errors.companyName = 'Şirket adı gereklidir';
    if (!newCustomer.contactPerson) errors.contactPerson = 'İletişim kişisi gereklidir';
    if (!newCustomer.email) errors.email = 'E-posta gereklidir';
    if (!newCustomer.phone) errors.phone = 'Telefon gereklidir';
    if (!newCustomer.industry) errors.industry = 'Sektör gereklidir';
    if (!newCustomer.location) errors.location = 'Konum gereklidir';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Create new customer
    const newCustomerId = (customers.length + 1).toString();
    const currentDate = new Date().toISOString().split('T')[0];
    
    const customerToAdd: Customer = {
      id: newCustomerId,
      companyName: newCustomer.companyName || '',
      contactPerson: newCustomer.contactPerson || '',
      email: newCustomer.email || '',
      phone: newCustomer.phone || '',
      industry: newCustomer.industry || '',
      status: newCustomer.status as 'active' | 'inactive' | 'potential' | 'lost' || 'potential',
      location: newCustomer.location || '',
      joinDate: currentDate,
      lastContact: 'Bugün',
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      satisfactionScore: 0,
      projects: 0,
      contractType: newCustomer.contractType as 'monthly' | 'yearly' | 'project-based' | 'one-time' || 'monthly',
      priority: newCustomer.priority as 'high' | 'medium' | 'low' || 'medium',
      tags: newCustomer.tags || [],
      notes: newCustomer.notes,
      website: newCustomer.website,
      taxId: newCustomer.taxId,
      paymentTerms: newCustomer.paymentTerms,
      creditLimit: newCustomer.creditLimit,
      assignedRepresentative: newCustomer.assignedRepresentative,
      addresses: newCustomer.addresses,
      contacts: newCustomer.contacts,
      socialMedia: newCustomer.socialMedia,
      customFields: newCustomer.customFields
    };
    
    setCustomers(prev => [...prev, customerToAdd]);
    
    // Reset form
    setNewCustomer({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      industry: '',
      status: 'potential',
      location: '',
      tags: [],
      priority: 'medium',
      contractType: 'monthly',
      website: '',
      taxId: '',
      paymentTerms: '30 days',
      creditLimit: 10000,
      assignedRepresentative: '',
      addresses: [
        {
          type: 'billing',
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'Türkiye',
          isPrimary: true
        }
      ],
      contacts: [
        {
          name: '',
          position: '',
          email: '',
          phone: '',
          isPrimary: true
        }
      ],
      socialMedia: [],
      customFields: []
    });
    setFormErrors({});
    setShowAddCustomerModal(false);
  };
  
  const handleAddTag = () => {
    if (newTag.trim() && !newCustomer.tags?.includes(newTag.trim())) {
      setNewCustomer(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setNewCustomer(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };
  
  const handleAddSocialMedia = () => {
    if (newSocialMedia.url.trim()) {
      setNewCustomer(prev => ({
        ...prev,
        socialMedia: [...(prev.socialMedia || []), { ...newSocialMedia }]
      }));
      setNewSocialMedia({ platform: 'LinkedIn', url: '' });
    }
  };
  
  const handleRemoveSocialMedia = (index: number) => {
    setNewCustomer(prev => ({
      ...prev,
      socialMedia: prev.socialMedia?.filter((_, i) => i !== index) || []
    }));
  };
  
  const handleAddCustomField = () => {
    if (newCustomField.name.trim() && newCustomField.value.trim()) {
      setNewCustomer(prev => ({
        ...prev,
        customFields: [...(prev.customFields || []), { ...newCustomField }]
      }));
      setNewCustomField({ name: '', value: '' });
    }
  };
  
  const handleRemoveCustomField = (index: number) => {
    setNewCustomer(prev => ({
      ...prev,
      customFields: prev.customFields?.filter((_, i) => i !== index) || []
    }));
  };
  
  const handleAddAddress = () => {
    setNewCustomer(prev => ({
      ...prev,
      addresses: [...(prev.addresses || []), {
        type: 'shipping',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Türkiye',
        isPrimary: false
      }]
    }));
  };
  
  const handleRemoveAddress = (index: number) => {
    setNewCustomer(prev => ({
      ...prev,
      addresses: prev.addresses?.filter((_, i) => i !== index) || []
    }));
  };
  
  const handleAddContact = () => {
    setNewCustomer(prev => ({
      ...prev,
      contacts: [...(prev.contacts || []), {
        name: '',
        position: '',
        email: '',
        phone: '',
        isPrimary: false
      }]
    }));
  };
  
  const handleRemoveContact = (index: number) => {
    setNewCustomer(prev => ({
      ...prev,
      contacts: prev.contacts?.filter((_, i) => i !== index) || []
    }));
  };
  
  const handleUpdateAddress = (index: number, field: string, value: any) => {
    setNewCustomer(prev => {
      const updatedAddresses = [...(prev.addresses || [])];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        [field]: value
      };
      return {
        ...prev,
        addresses: updatedAddresses
      };
    });
  };
  
  const handleUpdateContact = (index: number, field: string, value: any) => {
    setNewCustomer(prev => {
      const updatedContacts = [...(prev.contacts || [])];
      updatedContacts[index] = {
        ...updatedContacts[index],
        [field]: value
      };
      return {
        ...prev,
        contacts: updatedContacts
      };
    });
  };
  
  const handleSetPrimaryAddress = (index: number) => {
    setNewCustomer(prev => {
      const updatedAddresses = (prev.addresses || []).map((address, i) => ({
        ...address,
        isPrimary: i === index
      }));
      return {
        ...prev,
        addresses: updatedAddresses
      };
    });
  };
  
  const handleSetPrimaryContact = (index: number) => {
    setNewCustomer(prev => {
      const updatedContacts = (prev.contacts || []).map((contact, i) => ({
        ...contact,
        isPrimary: i === index
      }));
      return {
        ...prev,
        contacts: updatedContacts
      };
    });
  };

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
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.customers.title}</h1>
            
            <div className="w-16 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.customers.title}</h1>
            <p className="text-slate-600">{currentT.customers.subtitle}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => setFilters(prev => ({ ...prev, status: 'all' }))}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{filteredCustomers.length}</p>
                  <p className="text-sm text-slate-600">{currentT.customers.stats.totalCustomers}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setFilters(prev => ({ ...prev, status: 'active' }))}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{filteredCustomers.filter(c => c.status === 'active').length}</p>
                  <p className="text-sm text-slate-600">{currentT.customers.stats.activeCustomers}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setFilters(prev => ({ ...prev, sortBy: 'revenue', sortOrder: 'desc' }))}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">₺{customers.reduce((acc, c) => acc + c.totalRevenue, 0).toLocaleString()}</p>
                  <p className="text-sm text-slate-600">{currentT.customers.stats.totalRevenue}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setFilters(prev => ({ ...prev, sortBy: 'satisfaction', sortOrder: 'desc' }))}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{Math.round(customers.reduce((acc, c) => acc + c.satisfactionScore, 0) / customers.length)}%</p>
                  <p className="text-sm text-slate-600">{currentT.customers.stats.averageSatisfaction}</p>
                </div>
              </div>
            </button>
          </div>

          {/* Toolbar */}
          <SearchToolbar
            placeholder={currentT.customers.search}
            onSearch={handleSearch}
            onFilter={toggleFilters}
            onAdd={handleAddCustomer}
            addButtonText={currentT.customers.addCustomer}
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
                  <select 
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                  >
                    <option value="all">Tüm Durumlar</option>
                    {Object.entries(currentT.customers.status).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sektör
                  </label>
                  <select 
                    value={filters.industry}
                    onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                    className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                  >
                    <option value="all">Tüm Sektörler</option>
                    <option value="Teknoloji">Teknoloji</option>
                    <option value="Perakende">Perakende</option>
                    <option value="Üretim">Üretim</option>
                    <option value="Finans">Finans</option>
                    <option value="Sağlık">Sağlık</option>
                    <option value="Eğitim">Eğitim</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Öncelik
                  </label>
                  <select 
                    value={filters.priority}
                    onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                  >
                    <option value="all">Tüm Öncelikler</option>
                    <option value="high">Yüksek</option>
                    <option value="medium">Orta</option>
                    <option value="low">Düşük</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sözleşme Türü
                  </label>
                  <select 
                    value={filters.contractType}
                    onChange={(e) => setFilters(prev => ({ ...prev, contractType: e.target.value }))}
                    className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                  >
                    <option value="all">Tüm Sözleşmeler</option>
                    <option value="monthly">Aylık</option>
                    <option value="yearly">Yıllık</option>
                    <option value="project-based">Proje Bazlı</option>
                    <option value="one-time">Tek Seferlik</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Konum
                  </label>
                  <select 
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                  >
                    <option value="all">Tüm Konumlar</option>
                    <option value="İstanbul">İstanbul</option>
                    <option value="Ankara">Ankara</option>
                    <option value="İzmir">İzmir</option>
                    <option value="Bursa">Bursa</option>
                    <option value="Antalya">Antalya</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sıralama
                  </label>
                  <div className="flex space-x-2">
                    <select 
                      value={filters.sortBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                      className="flex-1 px-3 py-2 glass-input rounded-lg text-sm"
                    >
                      <option value="name">İsme Göre</option>
                      <option value="revenue">Gelire Göre</option>
                      <option value="orders">Sipariş Sayısına Göre</option>
                      <option value="satisfaction">Memnuniyete Göre</option>
                      <option value="date">Katılım Tarihine Göre</option>
                    </select>
                    <button
                      onClick={() => setFilters(prev => ({ 
                        ...prev, 
                        sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' 
                      }))}
                      className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
                      title={filters.sortOrder === 'asc' ? 'Artan Sıralama' : 'Azalan Sıralama'}
                    >
                      {filters.sortOrder === 'asc' ? (
                        <SortAsc className="w-5 h-5 text-slate-600" />
                      ) : (
                        <SortDesc className="w-5 h-5 text-slate-600" />
                      )}
                    </button>
                  </div>
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
                  viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Customer List */}
          <div>
            {filteredCustomers.length > 0 ? (
              <div className={`grid gap-6 ${
                isMobile ? 'grid-cols-1' : 
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}>
                {filteredCustomers.map(renderCustomerCard)}
              </div>
            ) : (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  {currentT.customers.noCustomers}
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

      {/* Customer Detail Modal */}
      {selectedCustomer && showCustomerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`glass-card rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto animate-fade-in-up ${
            isMobile ? 'max-w-full' : 'max-w-4xl'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{selectedCustomer.companyName}</h2>
                <p className="text-lg text-slate-600">{selectedCustomer.contactPerson}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedCustomer.status)}`}>
                  {currentT.customers.status[selectedCustomer.status as keyof typeof currentT.customers.status]}
                </span>
              </div>
              <button
                onClick={() => setShowCustomerModal(false)}
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
                    <span className="text-slate-700">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-slate-500" />
                    <span className="text-slate-700">{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-slate-500" />
                    <span className="text-slate-700">{selectedCustomer.location}</span>
                  </div>
                  {selectedCustomer.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-slate-500" />
                      <a href={selectedCustomer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {selectedCustomer.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800">İş Bilgileri</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-lg font-bold text-slate-800">{selectedCustomer.totalOrders}</p>
                    <p className="text-sm text-slate-600">Toplam Sipariş</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-lg font-bold text-emerald-600">₺{selectedCustomer.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-slate-600">Toplam Gelir</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-lg font-bold text-amber-600">{selectedCustomer.satisfactionScore}%</p>
                    <p className="text-sm text-slate-600">Memnuniyet</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">{selectedCustomer.projects}</p>
                    <p className="text-sm text-slate-600">Proje</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">Detaylar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Sektör:</span>
                    <span className="text-sm font-medium text-slate-800">{selectedCustomer.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Öncelik:</span>
                    <span className="text-sm font-medium text-slate-800">
                      {selectedCustomer.priority === 'high' ? 'Yüksek' : 
                       selectedCustomer.priority === 'medium' ? 'Orta' : 'Düşük'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Sözleşme Türü:</span>
                    <span className="text-sm font-medium text-slate-800">
                      {selectedCustomer.contractType === 'monthly' ? 'Aylık' : 
                       selectedCustomer.contractType === 'yearly' ? 'Yıllık' : 
                       selectedCustomer.contractType === 'project-based' ? 'Proje Bazlı' : 'Tek Seferlik'}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Katılım Tarihi:</span>
                    <span className="text-sm font-medium text-slate-800">{selectedCustomer.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Son İletişim:</span>
                    <span className="text-sm font-medium text-slate-800">{selectedCustomer.lastContact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Ortalama Sipariş Değeri:</span>
                    <span className="text-sm font-medium text-slate-800">₺{selectedCustomer.averageOrderValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {selectedCustomer.notes && (
              <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                <h3 className="font-semibold text-amber-800 mb-2">Notlar</h3>
                <p className="text-sm text-amber-700">{selectedCustomer.notes}</p>
              </div>
            )}
            
            {selectedCustomer.tags && selectedCustomer.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-slate-800 mb-2">Etiketler</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCustomer.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={`flex space-x-3 pt-6 mt-6 border-t border-slate-200 ${isMobile ? 'flex-col space-y-3 space-x-0' : ''}`}>
              <button className={`flex items-center justify-center space-x-2 py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}>
                <Edit className="w-4 h-4" />
                <span>Düzenle</span>
              </button>
              
              <button className={`flex items-center justify-center space-x-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}>
                <MessageSquare className="w-4 h-4" />
                <span>Mesaj Gönder</span>
              </button>
              
              <button className={`flex items-center justify-center space-x-2 py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}>
                <FileText className="w-4 h-4" />
                <span>Fatura Oluştur</span>
              </button>
              
              <button className={`flex items-center justify-center space-x-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}>
                <Trash2 className="w-4 h-4" />
                <span>Sil</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`glass-card rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto animate-fade-in-up ${
            isMobile ? 'max-w-full' : 'max-w-5xl'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{currentT.customers.addModal.title}</h2>
              </div>
              <button
                onClick={() => setShowAddCustomerModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="mb-6 border-b border-slate-200">
              <div className="flex overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setActiveTab('basic')}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'basic'
                      ? 'text-emerald-600 border-b-2 border-emerald-500'
                      : 'text-slate-600 hover:text-emerald-600 hover:border-b-2 hover:border-emerald-200'
                  }`}
                >
                  {currentT.customers.addModal.tabs.basic}
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'contact'
                      ? 'text-emerald-600 border-b-2 border-emerald-500'
                      : 'text-slate-600 hover:text-emerald-600 hover:border-b-2 hover:border-emerald-200'
                  }`}
                >
                  {currentT.customers.addModal.tabs.contact}
                </button>
                <button
                  onClick={() => setActiveTab('financial')}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'financial'
                      ? 'text-emerald-600 border-b-2 border-emerald-500'
                      : 'text-slate-600 hover:text-emerald-600 hover:border-b-2 hover:border-emerald-200'
                  }`}
                >
                  {currentT.customers.addModal.tabs.financial}
                </button>
                <button
                  onClick={() => setActiveTab('additional')}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeTab === 'additional'
                      ? 'text-emerald-600 border-b-2 border-emerald-500'
                      : 'text-slate-600 hover:text-emerald-600 hover:border-b-2 hover:border-emerald-200'
                  }`}
                >
                  {currentT.customers.addModal.tabs.additional}
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="mb-6">
              {/* Basic Information Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.companyName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newCustomer.companyName}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, companyName: e.target.value }))}
                        className={`w-full px-3 py-2 glass-input rounded-lg text-sm ${formErrors.companyName ? 'border-red-300' : ''}`}
                        placeholder={currentT.customers.addModal.placeholders.companyName}
                      />
                      {formErrors.companyName && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.companyName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.contactPerson} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newCustomer.contactPerson}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, contactPerson: e.target.value }))}
                        className={`w-full px-3 py-2 glass-input rounded-lg text-sm ${formErrors.contactPerson ? 'border-red-300' : ''}`}
                        placeholder={currentT.customers.addModal.placeholders.contactPerson}
                      />
                      {formErrors.contactPerson && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.contactPerson}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.email} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                        className={`w-full px-3 py-2 glass-input rounded-lg text-sm ${formErrors.email ? 'border-red-300' : ''}`}
                        placeholder={currentT.customers.addModal.placeholders.email}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.phone} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
                        className={`w-full px-3 py-2 glass-input rounded-lg text-sm ${formErrors.phone ? 'border-red-300' : ''}`}
                        placeholder={currentT.customers.addModal.placeholders.phone}
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.industry} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newCustomer.industry}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, industry: e.target.value }))}
                        className={`w-full px-3 py-2 glass-input rounded-lg text-sm ${formErrors.industry ? 'border-red-300' : ''}`}
                        placeholder={currentT.customers.addModal.placeholders.industry}
                      />
                      {formErrors.industry && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.industry}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.location} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newCustomer.location}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, location: e.target.value }))}
                        className={`w-full px-3 py-2 glass-input rounded-lg text-sm ${formErrors.location ? 'border-red-300' : ''}`}
                        placeholder={currentT.customers.addModal.placeholders.location}
                      />
                      {formErrors.location && (
                        <p className="mt-1 text-xs text-red-500">{formErrors.location}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.status}
                      </label>
                      <select
                        value={newCustomer.status}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                      >
                        {Object.entries(currentT.customers.status).map(([key, value]) => (
                          <option key={key} value={key}>{value}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.priority}
                      </label>
                      <select
                        value={newCustomer.priority}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, priority: e.target.value }))}
                        className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                      >
                        <option value="high">Yüksek</option>
                        <option value="medium">Orta</option>
                        <option value="low">Düşük</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.contractType}
                      </label>
                      <select
                        value={newCustomer.contractType}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, contractType: e.target.value }))}
                        className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                      >
                        <option value="monthly">Aylık</option>
                        <option value="yearly">Yıllık</option>
                        <option value="project-based">Proje Bazlı</option>
                        <option value="one-time">Tek Seferlik</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.website}
                      </label>
                      <input
                        type="url"
                        value={newCustomer.website}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, website: e.target.value }))}
                        className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                        placeholder={currentT.customers.addModal.placeholders.website}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {currentT.customers.addModal.fields.tags}
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newCustomer.tags?.map((tag, index) => (
                        <div key={index} className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-emerald-700 hover:text-emerald-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="flex-1 px-3 py-2 glass-input rounded-lg text-sm"
                        placeholder={language === 'tr' ? 'Yeni etiket...' : 'New tag...'}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm transition-colors duration-300"
                      >
                        {currentT.customers.addModal.fields.addTag}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {language === 'tr' ? 'Notlar' : 'Notes'}
                    </label>
                    <textarea
                      value={newCustomer.notes}
                      onChange={(e) => setNewCustomer(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                      rows={4}
                      placeholder={language === 'tr' ? 'Müşteri hakkında notlar...' : 'Notes about the customer...'}
                    />
                  </div>
                </div>
              )}
              
              {/* Contact Tab */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  {/* Addresses */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-800">{currentT.customers.addModal.fields.addresses}</h3>
                      <button
                        type="button"
                        onClick={handleAddAddress}
                        className="flex items-center space-x-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs transition-colors duration-300"
                      >
                        <Plus className="w-3 h-3" />
                        <span>{currentT.customers.addModal.fields.addAddress}</span>
                      </button>
                    </div>
                    
                    {newCustomer.addresses?.map((address, index) => (
                      <div key={index} className="glass-card rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-slate-700">
                              {language === 'tr' ? 'Adres #' : 'Address #'}{index + 1}
                            </span>
                            {address.isPrimary && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                                {language === 'tr' ? 'Birincil' : 'Primary'}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveAddress(index)}
                            className="text-red-500 hover:text-red-700"
                            disabled={newCustomer.addresses?.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">
                              {currentT.customers.addModal.fields.addressType}
                            </label>
                            <select
                              value={address.type}
                              onChange={(e) => handleUpdateAddress(index, 'type', e.target.value)}
                              className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                            >
                              <option value="billing">{language === 'tr' ? 'Fatura Adresi' : 'Billing'}</option>
                              <option value="shipping">{language === 'tr' ? 'Teslimat Adresi' : 'Shipping'}</option>
                              <option value="headquarters">{language === 'tr' ? 'Merkez' : 'Headquarters'}</option>
                              <option value="branch">{language === 'tr' ? 'Şube' : 'Branch'}</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center space-x-2 h-full">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={address.isPrimary}
                                onChange={() => handleSetPrimaryAddress(index)}
                                className="rounded text-emerald-600 focus:ring-emerald-500"
                              />
                              <span className="text-sm text-slate-700">{currentT.customers.addModal.fields.isPrimary}</span>
                            </label>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">
                              {currentT.customers.addModal.fields.street}
                            </label>
                            <input
                              type="text"
                              value={address.street}
                              onChange={(e) => handleUpdateAddress(index, 'street', e.target.value)}
                              className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                              placeholder={currentT.customers.addModal.placeholders.street}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">
                                {currentT.customers.addModal.fields.city}
                              </label>
                              <input
                                type="text"
                                value={address.city}
                                onChange={(e) => handleUpdateAddress(index, 'city', e.target.value)}
                                className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                                placeholder={currentT.customers.addModal.placeholders.city}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">
                                {currentT.customers.addModal.fields.state}
                              </label>
                              <input
                                type="text"
                                value={address.state}
                                onChange={(e) => handleUpdateAddress(index, 'state', e.target.value)}
                                className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                                placeholder={currentT.customers.addModal.placeholders.state}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">
                                {currentT.customers.addModal.fields.postalCode}
                              </label>
                              <input
                                type="text"
                                value={address.postalCode}
                                onChange={(e) => handleUpdateAddress(index, 'postalCode', e.target.value)}
                                className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                                placeholder={currentT.customers.addModal.placeholders.postalCode}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">
                                {currentT.customers.addModal.fields.country}
                              </label>
                              <input
                                type="text"
                                value={address.country}
                                onChange={(e) => handleUpdateAddress(index, 'country', e.target.value)}
                                className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                                defaultValue="Türkiye"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Additional Contacts */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-800">{currentT.customers.addModal.fields.contacts}</h3>
                      <button
                        type="button"
                        onClick={handleAddContact}
                        className="flex items-center space-x-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs transition-colors duration-300"
                      >
                        <Plus className="w-3 h-3" />
                        <span>{currentT.customers.addModal.fields.addContact}</span>
                      </button>
                    </div>
                    
                    {newCustomer.contacts?.map((contact, index) => (
                      <div key={index} className="glass-card rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-slate-700">
                              {language === 'tr' ? 'Kişi #' : 'Contact #'}{index + 1}
                            </span>
                            {contact.isPrimary && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                                {language === 'tr' ? 'Birincil' : 'Primary'}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveContact(index)}
                            className="text-red-500 hover:text-red-700"
                            disabled={newCustomer.contacts?.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">
                              {currentT.customers.addModal.fields.contactName}
                            </label>
                            <input
                              type="text"
                              value={contact.name}
                              onChange={(e) => handleUpdateContact(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                              placeholder={currentT.customers.addModal.placeholders.contactName}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">
                              {currentT.customers.addModal.fields.position}
                            </label>
                            <input
                              type="text"
                              value={contact.position}
                              onChange={(e) => handleUpdateContact(index, 'position', e.target.value)}
                              className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                              placeholder={currentT.customers.addModal.placeholders.position}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">
                              {currentT.customers.addModal.fields.email}
                            </label>
                            <input
                              type="email"
                              value={contact.email}
                              onChange={(e) => handleUpdateContact(index, 'email', e.target.value)}
                              className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                              placeholder={currentT.customers.addModal.placeholders.email}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">
                              {currentT.customers.addModal.fields.phone}
                            </label>
                            <input
                              type="tel"
                              value={contact.phone}
                              onChange={(e) => handleUpdateContact(index, 'phone', e.target.value)}
                              className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                              placeholder={currentT.customers.addModal.placeholders.phone}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={contact.isPrimary}
                              onChange={() => handleSetPrimaryContact(index)}
                              className="rounded text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-slate-700">{currentT.customers.addModal.fields.isPrimary}</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Social Media */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-800">{currentT.customers.addModal.fields.socialMedia}</h3>
                      <button
                        type="button"
                        onClick={handleAddSocialMedia}
                        className="flex items-center space-x-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs transition-colors duration-300"
                      >
                        <Plus className="w-3 h-3" />
                        <span>{currentT.customers.addModal.fields.addSocialMedia}</span>
                      </button>
                    </div>
                    
                    <div className="flex space-x-3 mb-3">
                      <select
                        value={newSocialMedia.platform}
                        onChange={(e) => setNewSocialMedia(prev => ({ ...prev, platform: e.target.value }))}
                        className="w-1/3 px-3 py-2 glass-input rounded-lg text-sm"
                      >
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Instagram">Instagram</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Website">Website</option>
                      </select>
                      
                      <div className="flex-1 flex space-x-2">
                        <input
                          type="url"
                          value={newSocialMedia.url}
                          onChange={(e) => setNewSocialMedia(prev => ({ ...prev, url: e.target.value }))}
                          className="flex-1 px-3 py-2 glass-input rounded-lg text-sm"
                          placeholder="https://"
                        />
                        
                        <button
                          type="button"
                          onClick={handleAddSocialMedia}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm transition-colors duration-300"
                        >
                          {currentT.customers.addModal.buttons.add}
                        </button>
                      </div>
                    </div>
                    
                    {newCustomer.socialMedia && newCustomer.socialMedia.length > 0 ? (
                      <div className="space-y-2">
                        {newCustomer.socialMedia.map((social, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <span className="font-medium text-slate-700">{social.platform}:</span>
                              <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm truncate max-w-xs">
                                {social.url}
                              </a>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveSocialMedia(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 text-center py-3">
                        {language === 'tr' ? 'Henüz sosyal medya hesabı eklenmedi' : 'No social media accounts added yet'}
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Financial Tab */}
              {activeTab === 'financial' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.taxId}
                      </label>
                      <input
                        type="text"
                        value={newCustomer.taxId}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, taxId: e.target.value }))}
                        className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                        placeholder={currentT.customers.addModal.placeholders.taxId}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.paymentTerms}
                      </label>
                      <select
                        value={newCustomer.paymentTerms}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, paymentTerms: e.target.value }))}
                        className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                      >
                        <option value="immediate">{language === 'tr' ? 'Hemen Ödeme' : 'Immediate'}</option>
                        <option value="7 days">{language === 'tr' ? '7 Gün' : '7 Days'}</option>
                        <option value="15 days">{language === 'tr' ? '15 Gün' : '15 Days'}</option>
                        <option value="30 days">{language === 'tr' ? '30 Gün' : '30 Days'}</option>
                        <option value="45 days">{language === 'tr' ? '45 Gün' : '45 Days'}</option>
                        <option value="60 days">{language === 'tr' ? '60 Gün' : '60 Days'}</option>
                        <option value="90 days">{language === 'tr' ? '90 Gün' : '90 Days'}</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {currentT.customers.addModal.fields.creditLimit}
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="number"
                          value={newCustomer.creditLimit}
                          onChange={(e) => setNewCustomer(prev => ({ ...prev, creditLimit: Number(e.target.value) }))}
                          className="w-full pl-10 pr-4 py-2 glass-input rounded-lg text-sm"
                          min="0"
                          step="1000"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {language === 'tr' ? 'Ödeme Yöntemi' : 'Payment Method'}
                      </label>
                      <select
                        value={newCustomer.paymentMethod || 'bank_transfer'}
                        onChange={(e) => setNewCustomer(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                      >
                        <option value="bank_transfer">{language === 'tr' ? 'Banka Transferi' : 'Bank Transfer'}</option>
                        <option value="credit_card">{language === 'tr' ? 'Kredi Kartı' : 'Credit Card'}</option>
                        <option value="cash">{language === 'tr' ? 'Nakit' : 'Cash'}</option>
                        <option value="check">{language === 'tr' ? 'Çek' : 'Check'}</option>
                        <option value="paypal">PayPal</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {language === 'tr' ? 'Finansal Notlar' : 'Financial Notes'}
                    </label>
                    <textarea
                      value={newCustomer.financialNotes || ''}
                      onChange={(e) => setNewCustomer(prev => ({ ...prev, financialNotes: e.target.value }))}
                      className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                      rows={4}
                      placeholder={language === 'tr' ? 'Finansal bilgiler hakkında notlar...' : 'Notes about financial information...'}
                    />
                  </div>
                </div>
              )}
              
              {/* Additional Tab */}
              {activeTab === 'additional' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {currentT.customers.addModal.fields.assignedRepresentative}
                    </label>
                    <input
                      type="text"
                      value={newCustomer.assignedRepresentative}
                      onChange={(e) => setNewCustomer(prev => ({ ...prev, assignedRepresentative: e.target.value }))}
                      className="w-full px-3 py-2 glass-input rounded-lg text-sm"
                      placeholder={language === 'tr' ? 'Temsilci adı...' : 'Representative name...'}
                    />
                  </div>
                  
                  {/* Custom Fields */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-800">{currentT.customers.addModal.fields.customFields}</h3>
                      <button
                        type="button"
                        onClick={handleAddCustomField}
                        className="flex items-center space-x-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs transition-colors duration-300"
                      >
                        <Plus className="w-3 h-3" />
                        <span>{currentT.customers.addModal.fields.addCustomField}</span>
                      </button>
                    </div>
                    
                    <div className="flex space-x-3 mb-3">
                      <input
                        type="text"
                        value={newCustomField.name}
                        onChange={(e) => setNewCustomField(prev => ({ ...prev, name: e.target.value }))}
                        className="w-1/2 px-3 py-2 glass-input rounded-lg text-sm"
                        placeholder={currentT.customers.addModal.placeholders.fieldName}
                      />
                      
                      <div className="flex-1 flex space-x-2">
                        <input
                          type="text"
                          value={newCustomField.value}
                          onChange={(e) => setNewCustomField(prev => ({ ...prev, value: e.target.value }))}
                          className="flex-1 px-3 py-2 glass-input rounded-lg text-sm"
                          placeholder={currentT.customers.addModal.placeholders.fieldValue}
                        />
                        
                        <button
                          type="button"
                          onClick={handleAddCustomField}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm transition-colors duration-300"
                        >
                          {currentT.customers.addModal.buttons.add}
                        </button>
                      </div>
                    </div>
                    
                    {newCustomer.customFields && newCustomer.customFields.length > 0 ? (
                      <div className="space-y-2">
                        {newCustomer.customFields.map((field, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="grid grid-cols-2 gap-4 flex-1">
                              <div>
                                <span className="text-xs text-slate-500">{language === 'tr' ? 'Alan' : 'Field'}</span>
                                <p className="font-medium text-slate-700">{field.name}</p>
                              </div>
                              <div>
                                <span className="text-xs text-slate-500">{language === 'tr' ? 'Değer' : 'Value'}</span>
                                <p className="font-medium text-slate-700">{field.value}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomField(index)}
                              className="text-red-500 hover:text-red-700 ml-4"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 text-center py-3">
                        {language === 'tr' ? 'Henüz özel alan eklenmedi' : 'No custom fields added yet'}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddCustomerModal(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors duration-300"
              >
                {currentT.customers.addModal.buttons.cancel}
              </button>
              
              <button
                type="button"
                onClick={handleAddNewCustomer}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors duration-300"
              >
                {currentT.customers.addModal.buttons.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;