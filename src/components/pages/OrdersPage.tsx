import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Search, 
  Filter, 
  Plus, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  DollarSign,
  User,
  MapPin,
  Building2,
  FileText,
  BarChart3,
  Tag,
  CreditCard,
  Printer,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  X
} from 'lucide-react';
import { Language } from '../../types';
import SearchToolbar from '../SearchToolbar';

interface OrdersPageProps {
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

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerCompany?: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  total: number;
  items: number;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  tags?: string[];
}

const OrdersPage: React.FC<OrdersPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    loadMockOrders();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add search effect
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.customerCompany && order.customerCompany.toLowerCase().includes(searchQuery.toLowerCase())) ||
        order.shippingAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.trackingNumber && order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.tags && order.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
      setFilteredOrders(filtered);
    }
  }, [searchQuery, orders]);

  const t = {
    tr: {
      orders: {
        title: 'Sipariş Yönetimi',
        subtitle: 'Siparişlerinizi takip edin ve yönetin',
        search: 'Siparişlerde ara...',
        addOrder: 'Yeni Sipariş',
        noOrders: 'Sipariş bulunamadı',
        stats: {
          totalOrders: 'Toplam Sipariş',
          pendingOrders: 'Bekleyen Siparişler',
          shippedOrders: 'Kargodaki Siparişler',
          completedOrders: 'Tamamlanan Siparişler'
        },
        status: {
          pending: 'Beklemede',
          processing: 'İşleniyor',
          shipped: 'Kargoya Verildi',
          delivered: 'Teslim Edildi',
          cancelled: 'İptal Edildi',
          returned: 'İade Edildi'
        },
        paymentStatus: {
          paid: 'Ödendi',
          pending: 'Beklemede',
          failed: 'Başarısız',
          refunded: 'İade Edildi'
        },
        orderDetails: 'Sipariş Detayları',
        customer: 'Müşteri',
        orderDate: 'Sipariş Tarihi',
        shippingAddress: 'Teslimat Adresi',
        paymentMethod: 'Ödeme Yöntemi',
        trackingNumber: 'Takip Numarası',
        notes: 'Notlar',
        printOrder: 'Siparişi Yazdır',
        downloadInvoice: 'Faturayı İndir',
        updateStatus: 'Durumu Güncelle',
        deleteOrder: 'Siparişi Sil',
        confirmDelete: 'Bu siparişi silmek istediğinizden emin misiniz?',
        orderItems: 'Sipariş Kalemleri',
        totalAmount: 'Toplam Tutar',
        actions: 'İşlemler'
      }
    },
    en: {
      orders: {
        title: 'Order Management',
        subtitle: 'Track and manage your orders',
        search: 'Search orders...',
        addOrder: 'Add Order',
        noOrders: 'No orders found',
        stats: {
          totalOrders: 'Total Orders',
          pendingOrders: 'Pending Orders',
          shippedOrders: 'Shipped Orders',
          completedOrders: 'Completed Orders'
        },
        status: {
          pending: 'Pending',
          processing: 'Processing',
          shipped: 'Shipped',
          delivered: 'Delivered',
          cancelled: 'Cancelled',
          returned: 'Returned'
        },
        paymentStatus: {
          paid: 'Paid',
          pending: 'Pending',
          failed: 'Failed',
          refunded: 'Refunded'
        },
        orderDetails: 'Order Details',
        customer: 'Customer',
        orderDate: 'Order Date',
        shippingAddress: 'Shipping Address',
        paymentMethod: 'Payment Method',
        trackingNumber: 'Tracking Number',
        notes: 'Notes',
        printOrder: 'Print Order',
        downloadInvoice: 'Download Invoice',
        updateStatus: 'Update Status',
        deleteOrder: 'Delete Order',
        confirmDelete: 'Are you sure you want to delete this order?',
        orderItems: 'Order Items',
        totalAmount: 'Total Amount',
        actions: 'Actions'
      }
    }
  };

  const currentT = t[language];

  const loadMockOrders = () => {
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'ORD-2025-001',
        customerName: 'Ahmet Yılmaz',
        customerCompany: 'ABC Teknoloji Ltd.',
        date: '2025-01-15',
        status: 'delivered',
        paymentStatus: 'paid',
        total: 2500,
        items: 3,
        shippingAddress: 'Atatürk Mah. Cumhuriyet Cad. No:123 Kat:4 D:8, Şişli, İstanbul',
        paymentMethod: 'Kredi Kartı',
        trackingNumber: 'TR123456789',
        tags: ['VIP', 'Kurumsal']
      },
      {
        id: '2',
        orderNumber: 'ORD-2025-002',
        customerName: 'Ayşe Demir',
        date: '2025-01-18',
        status: 'shipped',
        paymentStatus: 'paid',
        total: 1750,
        items: 2,
        shippingAddress: 'Bahçelievler Mah. Adnan Menderes Bulvarı No:45, Bahçelievler, İstanbul',
        paymentMethod: 'Havale/EFT',
        trackingNumber: 'TR987654321',
        notes: 'Müşteri kapıda telefon edilmesini istiyor'
      },
      {
        id: '3',
        orderNumber: 'ORD-2025-003',
        customerName: 'Mehmet Kaya',
        customerCompany: 'Kaya İnşaat A.Ş.',
        date: '2025-01-20',
        status: 'processing',
        paymentStatus: 'paid',
        total: 5800,
        items: 7,
        shippingAddress: 'Çankaya Mah. Atatürk Bulvarı No:78, Çankaya, Ankara',
        paymentMethod: 'Kredi Kartı',
        tags: ['Kurumsal', 'Acil']
      },
      {
        id: '4',
        orderNumber: 'ORD-2025-004',
        customerName: 'Zeynep Özkan',
        date: '2025-01-22',
        status: 'pending',
        paymentStatus: 'pending',
        total: 950,
        items: 1,
        shippingAddress: 'Karşıyaka Mah. İnönü Cad. No:56 D:3, Karşıyaka, İzmir',
        paymentMethod: 'Kapıda Ödeme',
        notes: 'Mesai saatleri içinde teslimat yapılmalı'
      },
      {
        id: '5',
        orderNumber: 'ORD-2025-005',
        customerName: 'Ali Yıldız',
        customerCompany: 'Yıldız Market',
        date: '2025-01-25',
        status: 'cancelled',
        paymentStatus: 'refunded',
        total: 3200,
        items: 4,
        shippingAddress: 'Merkez Mah. Atatürk Cad. No:34, Antakya, Hatay',
        paymentMethod: 'Kredi Kartı',
        notes: 'Müşteri tarafından iptal edildi'
      }
    ];

    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddOrder = () => {
    // Implement add order functionality
    console.log('Add order');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'returned': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'refunded': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm(currentT.orders.confirmDelete)) {
      setOrders(prev => prev.filter(order => order.id !== orderId));
      if (showOrderModal) {
        handleCloseModal();
      }
    }
  };

  const renderOrderCard = (order: Order) => (
    <div
      key={order.id}
      className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => handleViewOrder(order)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-slate-800">{order.orderNumber}</h3>
            {order.tags && order.tags.length > 0 && (
              <div className="flex space-x-1">
                {order.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm text-slate-600 mt-1">{order.customerName}</p>
          {order.customerCompany && (
            <p className="text-xs text-slate-500">{order.customerCompany}</p>
          )}
        </div>
        <div className="flex flex-col items-end">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {currentT.orders.status[order.status as keyof typeof currentT.orders.status]}
          </span>
          <span className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
            {currentT.orders.paymentStatus[order.paymentStatus as keyof typeof currentT.orders.paymentStatus]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500">{currentT.orders.orderDate}</p>
          <p className="text-sm font-medium text-slate-700">{formatDate(order.date)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">{currentT.orders.totalAmount}</p>
          <p className="text-sm font-bold text-slate-800">{formatCurrency(order.total)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Package className="w-3 h-3" />
          <span>{order.items} {language === 'tr' ? 'ürün' : 'items'}</span>
        </div>
        
        {order.trackingNumber && (
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Truck className="w-3 h-3" />
            <span>{order.trackingNumber}</span>
          </div>
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
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.orders.title}</h1>
            
            <div className="w-16 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.orders.title}</h1>
            <p className="text-slate-600">{currentT.orders.subtitle}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{orders.length}</p>
                  <p className="text-sm text-slate-600">{currentT.orders.stats.totalOrders}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{orders.filter(o => o.status === 'pending').length}</p>
                  <p className="text-sm text-slate-600">{currentT.orders.stats.pendingOrders}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{orders.filter(o => o.status === 'shipped').length}</p>
                  <p className="text-sm text-slate-600">{currentT.orders.stats.shippedOrders}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{orders.filter(o => o.status === 'delivered').length}</p>
                  <p className="text-sm text-slate-600">{currentT.orders.stats.completedOrders}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <SearchToolbar
            placeholder={currentT.orders.search}
            onSearch={handleSearch}
            onFilter={toggleFilters}
            onAdd={handleAddOrder}
            addButtonText={currentT.orders.addOrder}
            addButtonColor="blue"
            isMobile={isMobile}
            className="mb-8"
          />

          {/* Filters */}
          {showFilters && (
            <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sipariş Durumu
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Durumlar</option>
                    {Object.entries(currentT.orders.status).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ödeme Durumu
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Durumlar</option>
                    {Object.entries(currentT.orders.paymentStatus).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tarih Aralığı
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Tarihler</option>
                    <option value="today">Bugün</option>
                    <option value="yesterday">Dün</option>
                    <option value="this-week">Bu Hafta</option>
                    <option value="this-month">Bu Ay</option>
                    <option value="last-month">Geçen Ay</option>
                    <option value="custom">Özel Aralık</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Müşteri Türü
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Müşteriler</option>
                    <option value="individual">Bireysel</option>
                    <option value="corporate">Kurumsal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ödeme Yöntemi
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="all">Tüm Yöntemler</option>
                    <option value="credit-card">Kredi Kartı</option>
                    <option value="bank-transfer">Havale/EFT</option>
                    <option value="cash-on-delivery">Kapıda Ödeme</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sıralama
                  </label>
                  <select className="w-full px-3 py-2 glass-input rounded-lg text-sm">
                    <option value="date-desc">En Yeni</option>
                    <option value="date-asc">En Eski</option>
                    <option value="total-desc">Tutar (Azalan)</option>
                    <option value="total-asc">Tutar (Artan)</option>
                    <option value="status">Duruma Göre</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Orders List */}
          <div>
            {filteredOrders.length > 0 ? (
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {filteredOrders.map(renderOrderCard)}
              </div>
            ) : (
              <div className="text-center py-16">
                <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  {currentT.orders.noOrders}
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

      {/* Order Detail Modal */}
      {selectedOrder && showOrderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`glass-card rounded-2xl p-6 w-full max-h-[90vh] overflow-y-auto animate-fade-in-up ${
            isMobile ? 'max-w-full' : 'max-w-4xl'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-slate-800">{selectedOrder.orderNumber}</h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {currentT.orders.status[selectedOrder.status as keyof typeof currentT.orders.status]}
                  </span>
                </div>
                <p className="text-slate-600 mt-1">{formatDate(selectedOrder.date)}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 border-b border-slate-200 pb-2">{currentT.orders.customer}</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-800">{selectedOrder.customerName}</p>
                      {selectedOrder.customerCompany && (
                        <p className="text-sm text-slate-600">{selectedOrder.customerCompany}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">{currentT.orders.shippingAddress}</p>
                      <p className="text-sm text-slate-600">{selectedOrder.shippingAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 border-b border-slate-200 pb-2">{currentT.orders.orderDetails}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">{currentT.orders.paymentMethod}</p>
                    <p className="text-sm font-medium text-slate-800">{selectedOrder.paymentMethod}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">{currentT.orders.paymentStatus.paid}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                      {currentT.orders.paymentStatus[selectedOrder.paymentStatus as keyof typeof currentT.orders.paymentStatus]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">{currentT.orders.totalAmount}</p>
                    <p className="text-lg font-bold text-slate-800">{formatCurrency(selectedOrder.total)}</p>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-600">{currentT.orders.trackingNumber}</p>
                      <p className="text-sm font-medium text-slate-800">{selectedOrder.trackingNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedOrder.notes && (
              <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                <h3 className="font-semibold text-amber-800 mb-2">{currentT.orders.notes}</h3>
                <p className="text-sm text-amber-700">{selectedOrder.notes}</p>
              </div>
            )}

            {/* Tags */}
            {selectedOrder.tags && selectedOrder.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-slate-800 mb-2">Etiketler</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedOrder.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className={`flex space-x-3 pt-6 mt-6 border-t border-slate-200 ${isMobile ? 'flex-col space-y-3 space-x-0' : ''}`}>
              <button className={`flex items-center justify-center space-x-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}>
                <Printer className="w-4 h-4" />
                <span>{currentT.orders.printOrder}</span>
              </button>
              
              <button className={`flex items-center justify-center space-x-2 py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}>
                <Download className="w-4 h-4" />
                <span>{currentT.orders.downloadInvoice}</span>
              </button>
              
              <button className={`flex items-center justify-center space-x-2 py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}>
                <Edit className="w-4 h-4" />
                <span>{currentT.orders.updateStatus}</span>
              </button>
              
              <button 
                onClick={() => handleDeleteOrder(selectedOrder.id)}
                className={`flex items-center justify-center space-x-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors duration-300 ${isMobile ? 'w-full' : ''}`}
              >
                <Trash2 className="w-4 h-4" />
                <span>{currentT.orders.deleteOrder}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;