import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Shield, 
  Key, 
  Bell, 
  Globe, 
  Eye, 
  EyeOff, 
  Check, 
  AlertTriangle,
  Settings,
  LogOut,
  Download,
  Upload,
  RefreshCw,
  Lock,
  Unlock,
  Star,
  Award,
  Target,
  Activity,
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle,
  Users,
  Briefcase,
  Heart,
  Bookmark,
  Flag,
  MessageSquare,
  Video,
  Image,
  FileText,
  Link,
  Share2,
  Copy,
  ExternalLink,
  Palette,
  Sun,
  Moon,
  Monitor,
  Type,
  Layers,
  Zap,
  Sparkles,
  PaintBucket,
  Sliders
} from 'lucide-react';
import { Language } from '../types';
import { useAppearanceContext } from './AppearanceProvider';

interface ProfilePageProps {
  language: Language;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    phone: string;
  };
  onBack: () => void;
  onUpdateProfile: (userInfo: any) => void;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onUpdateProfile, 
  onLogout 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    phone: userInfo.phone,
    companyName: userInfo.companyName,
    title: 'Genel Müdür',
    department: 'Yönetim',
    location: 'İstanbul, Türkiye',
    bio: 'Deneyimli iş lideri ve teknoloji tutkunu. 15+ yıllık sektör deneyimi.',
    website: 'https://lumeo.com',
    linkedin: 'https://linkedin.com/in/ahmetyilmaz',
    twitter: '@ahmetyilmaz'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#14b8a6');
  const [colorIntensity, setColorIntensity] = useState(100);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const { settings, updateSettings, resolvedTheme } = useAppearanceContext();

  useEffect(() => {
    setIsLoaded(true);
    
    // Eğer özel renk varsa, onu ayarla
    if (settings.customColor) {
      setCustomColor(settings.customColor);
    }
    
    // Renk yoğunluğunu ayarla
    setColorIntensity(settings.colorIntensity);
    
    // Renk seçici dışında bir yere tıklandığında renk seçiciyi kapat
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [settings]);

  const t = {
    tr: {
      profile: {
        title: 'Profil',
        subtitle: 'Kişisel bilgilerinizi yönetin',
        tabs: {
          profile: 'Profil Bilgileri',
          security: 'Güvenlik',
          appearance: 'Görünüm',
          activity: 'Aktivite',
          preferences: 'Tercihler'
        },
        personalInfo: {
          title: 'Kişisel Bilgiler',
          firstName: 'Ad',
          lastName: 'Soyad',
          email: 'E-posta',
          phone: 'Telefon',
          title: 'Ünvan',
          department: 'Departman',
          location: 'Konum',
          bio: 'Hakkında',
          website: 'Web Sitesi',
          linkedin: 'LinkedIn',
          twitter: 'Twitter'
        },
        companyInfo: {
          title: 'Şirket Bilgileri',
          companyName: 'Şirket Adı',
          joinDate: 'Katılım Tarihi',
          employeeId: 'Çalışan ID'
        },
        security: {
          title: 'Güvenlik Ayarları',
          changePassword: 'Şifre Değiştir',
          currentPassword: 'Mevcut Şifre',
          newPassword: 'Yeni Şifre',
          confirmPassword: 'Şifre Onayı',
          twoFactor: 'İki Faktörlü Doğrulama',
          twoFactorDesc: 'Hesabınızı ekstra güvenlik ile koruyun',
          loginHistory: 'Giriş Geçmişi',
          activeSessions: 'Aktif Oturumlar'
        },
        appearance: {
          title: 'Görünüm Ayarları',
          subtitle: 'Arayüz temasını ve görünümünü özelleştirin',
          fontSize: {
            title: 'Yazı Boyutu',
            description: 'Metin boyutunu ayarlayın',
            small: 'Küçük',
            medium: 'Orta',
            large: 'Büyük'
          },
          density: {
            title: 'Yoğunluk',
            description: 'Arayüz yoğunluğunu ayarlayın',
            compact: 'Sıkışık',
            normal: 'Normal',
            comfortable: 'Rahat'
          },
          theme: {
            title: 'Tema',
            description: 'Açık, koyu veya sistem teması seçin',
            light: 'Açık Tema',
            dark: 'Koyu Tema',
            system: 'Sistem Teması'
          },
          accentColor: {
            title: 'Vurgu Rengi',
            description: 'Ana renk temasını seçin',
            classic: 'Klasik Renkler',
            vibrant: 'Canlı Renkler',
            neon: 'Neon Renkler',
            metallic: 'Metalik Renkler',
            nature: 'Doğa Renkleri',
            pastel: 'Pastel Renkler',
            warm: 'Sıcak Renkler',
            cool: 'Soğuk Renkler',
            custom: 'Özel Renk',
            customDesc: 'Kendi renginizi seçin',
            intensity: 'Renk Yoğunluğu',
            intensityDesc: 'Renk canlılığını ayarlayın'
          },
          effects: {
            title: 'Görsel Efektler',
            animations: 'Animasyonlar',
            animationsDesc: 'Arayüz animasyonlarını etkinleştir',
            glowEffects: 'Işık Efektleri',
            glowEffectsDesc: 'Parlama efektlerini etkinleştir',
            gradientAnimation: 'Gradient Animasyonu',
            gradientAnimationDesc: 'Renk geçiş animasyonlarını etkinleştir'
          }
        },
        activity: {
          title: 'Son Aktiviteler',
          recentActions: 'Son İşlemler',
          projectsWorked: 'Çalışılan Projeler',
          tasksCompleted: 'Tamamlanan Görevler',
          documentsShared: 'Paylaşılan Belgeler'
        },
        stats: {
          projectsCompleted: 'Tamamlanan Proje',
          tasksFinished: 'Bitirilen Görev',
          hoursWorked: 'Çalışma Saati',
          teamMembers: 'Takım Üyesi'
        },
        actions: {
          edit: 'Düzenle',
          save: 'Kaydet',
          cancel: 'İptal',
          saving: 'Kaydediliyor...',
          changePhoto: 'Fotoğraf Değiştir',
          downloadData: 'Verilerimi İndir',
          deleteAccount: 'Hesabı Sil',
          selectColor: 'Renk Seç',
          apply: 'Uygula',
          reset: 'Sıfırla'
        },
        messages: {
          saveSuccess: 'Profil başarıyla güncellendi',
          passwordChanged: 'Şifre başarıyla değiştirildi',
          errorSaving: 'Kaydetme sırasında hata oluştu',
          appearanceUpdated: 'Görünüm ayarları güncellendi'
        }
      }
    },
    en: {
      profile: {
        title: 'Profile',
        subtitle: 'Manage your personal information',
        tabs: {
          profile: 'Profile Information',
          security: 'Security',
          appearance: 'Appearance',
          activity: 'Activity',
          preferences: 'Preferences'
        },
        personalInfo: {
          title: 'Personal Information',
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          phone: 'Phone',
          title: 'Title',
          department: 'Department',
          location: 'Location',
          bio: 'About',
          website: 'Website',
          linkedin: 'LinkedIn',
          twitter: 'Twitter'
        },
        companyInfo: {
          title: 'Company Information',
          companyName: 'Company Name',
          joinDate: 'Join Date',
          employeeId: 'Employee ID'
        },
        security: {
          title: 'Security Settings',
          changePassword: 'Change Password',
          currentPassword: 'Current Password',
          newPassword: 'New Password',
          confirmPassword: 'Confirm Password',
          twoFactor: 'Two-Factor Authentication',
          twoFactorDesc: 'Protect your account with extra security',
          loginHistory: 'Login History',
          activeSessions: 'Active Sessions'
        },
        appearance: {
          title: 'Appearance Settings',
          subtitle: 'Customize your interface theme and appearance',
          fontSize: {
            title: 'Font Size',
            description: 'Adjust text size',
            small: 'Small',
            medium: 'Medium',
            large: 'Large'
          },
          density: {
            title: 'Density',
            description: 'Adjust interface density',
            compact: 'Compact',
            normal: 'Normal',
            comfortable: 'Comfortable'
          },
          theme: {
            title: 'Theme',
            description: 'Choose light, dark or system theme',
            light: 'Light Theme',
            dark: 'Dark Theme',
            system: 'System Theme'
          },
          accentColor: {
            title: 'Accent Color',
            description: 'Choose your main color theme',
            classic: 'Classic Colors',
            vibrant: 'Vibrant Colors',
            neon: 'Neon Colors',
            metallic: 'Metallic Colors',
            nature: 'Nature Colors',
            pastel: 'Pastel Colors',
            warm: 'Warm Colors',
            cool: 'Cool Colors',
            custom: 'Custom Color',
            customDesc: 'Choose your own color',
            intensity: 'Color Intensity',
            intensityDesc: 'Adjust color vibrancy'
          },
          effects: {
            title: 'Visual Effects',
            animations: 'Animations',
            animationsDesc: 'Enable interface animations',
            glowEffects: 'Glow Effects',
            glowEffectsDesc: 'Enable glow effects',
            gradientAnimation: 'Gradient Animation',
            gradientAnimationDesc: 'Enable color transition animations'
          }
        },
        activity: {
          title: 'Recent Activity',
          recentActions: 'Recent Actions',
          projectsWorked: 'Projects Worked On',
          tasksCompleted: 'Tasks Completed',
          documentsShared: 'Documents Shared'
        },
        stats: {
          projectsCompleted: 'Projects Completed',
          tasksFinished: 'Tasks Finished',
          hoursWorked: 'Hours Worked',
          teamMembers: 'Team Members'
        },
        actions: {
          edit: 'Edit',
          save: 'Save',
          cancel: 'Cancel',
          saving: 'Saving...',
          changePhoto: 'Change Photo',
          downloadData: 'Download My Data',
          deleteAccount: 'Delete Account',
          selectColor: 'Select Color',
          apply: 'Apply',
          reset: 'Reset'
        },
        messages: {
          saveSuccess: 'Profile updated successfully',
          passwordChanged: 'Password changed successfully',
          errorSaving: 'Error occurred while saving',
          appearanceUpdated: 'Appearance settings updated'
        }
      }
    }
  };

  const currentT = t[language];

  // Renk kategorileri ve renkleri - Türkçe ve İngilizce adlarla
  const colorCategories = {
    classic: [
      { id: 'teal', name: language === 'tr' ? 'Deniz Yeşili' : 'Teal', color: '#14b8a6' },
      { id: 'blue', name: language === 'tr' ? 'Mavi' : 'Blue', color: '#3b82f6' },
      { id: 'emerald', name: language === 'tr' ? 'Zümrüt' : 'Emerald', color: '#10b981' },
      { id: 'purple', name: language === 'tr' ? 'Mor' : 'Purple', color: '#8b5cf6' },
      { id: 'amber', name: language === 'tr' ? 'Kehribar' : 'Amber', color: '#f59e0b' },
      { id: 'rose', name: language === 'tr' ? 'Gül Kurusu' : 'Rose', color: '#f43f5e' },
      { id: 'indigo', name: language === 'tr' ? 'Çivit Mavisi' : 'Indigo', color: '#6366f1' },
      { id: 'orange', name: language === 'tr' ? 'Turuncu' : 'Orange', color: '#f97316' }
    ],
    vibrant: [
      { id: 'red', name: language === 'tr' ? 'Kırmızı' : 'Red', color: '#ef4444' },
      { id: 'green', name: language === 'tr' ? 'Yeşil' : 'Green', color: '#22c55e' },
      { id: 'yellow', name: language === 'tr' ? 'Sarı' : 'Yellow', color: '#eab308' },
      { id: 'pink', name: language === 'tr' ? 'Pembe' : 'Pink', color: '#ec4899' },
      { id: 'cyan', name: language === 'tr' ? 'Camgöbeği' : 'Cyan', color: '#06b6d4' },
      { id: 'lime', name: language === 'tr' ? 'Limon' : 'Lime', color: '#84cc16' },
      { id: 'violet', name: language === 'tr' ? 'Menekşe' : 'Violet', color: '#7c3aed' },
      { id: 'fuchsia', name: language === 'tr' ? 'Fuşya' : 'Fuchsia', color: '#d946ef' }
    ],
    neon: [
      { id: 'neon-blue', name: language === 'tr' ? 'Neon Mavi' : 'Neon Blue', color: '#00d4ff' },
      { id: 'neon-green', name: language === 'tr' ? 'Neon Yeşil' : 'Neon Green', color: '#00ff88' },
      { id: 'neon-pink', name: language === 'tr' ? 'Neon Pembe' : 'Neon Pink', color: '#ff0080' },
      { id: 'neon-yellow', name: language === 'tr' ? 'Neon Sarı' : 'Neon Yellow', color: '#ffff00' },
      { id: 'neon-purple', name: language === 'tr' ? 'Neon Mor' : 'Neon Purple', color: '#bf00ff' },
      { id: 'neon-orange', name: language === 'tr' ? 'Neon Turuncu' : 'Neon Orange', color: '#ff4500' }
    ],
    metallic: [
      { id: 'gold', name: language === 'tr' ? 'Altın' : 'Gold', color: '#ffd700' },
      { id: 'silver', name: language === 'tr' ? 'Gümüş' : 'Silver', color: '#c0c0c0' },
      { id: 'bronze', name: language === 'tr' ? 'Bronz' : 'Bronze', color: '#cd7f32' },
      { id: 'copper', name: language === 'tr' ? 'Bakır' : 'Copper', color: '#b87333' },
      { id: 'platinum', name: language === 'tr' ? 'Platin' : 'Platinum', color: '#e5e4e2' },
      { id: 'titanium', name: language === 'tr' ? 'Titanyum' : 'Titanium', color: '#878681' }
    ],
    nature: [
      { id: 'sunset', name: language === 'tr' ? 'Gün Batımı' : 'Sunset', color: '#ff6b35' },
      { id: 'ocean', name: language === 'tr' ? 'Okyanus' : 'Ocean', color: '#006994' },
      { id: 'forest', name: language === 'tr' ? 'Orman' : 'Forest', color: '#228b22' },
      { id: 'mountain', name: language === 'tr' ? 'Dağ' : 'Mountain', color: '#8b7355' },
      { id: 'sky', name: language === 'tr' ? 'Gökyüzü' : 'Sky', color: '#87ceeb' },
      { id: 'earth', name: language === 'tr' ? 'Toprak' : 'Earth', color: '#8b4513' }
    ],
    pastel: [
      { id: 'lavender', name: language === 'tr' ? 'Lavanta' : 'Lavender', color: '#b19cd9' },
      { id: 'mint', name: language === 'tr' ? 'Nane' : 'Mint', color: '#98fb98' },
      { id: 'peach', name: language === 'tr' ? 'Şeftali' : 'Peach', color: '#ffcba4' },
      { id: 'baby-blue', name: language === 'tr' ? 'Bebek Mavisi' : 'Baby Blue', color: '#89cff0' },
      { id: 'soft-pink', name: language === 'tr' ? 'Yumuşak Pembe' : 'Soft Pink', color: '#f8bbd9' },
      { id: 'cream', name: language === 'tr' ? 'Krem' : 'Cream', color: '#f5f5dc' }
    ],
    warm: [
      { id: 'coral', name: language === 'tr' ? 'Mercan' : 'Coral', color: '#ff7f50' },
      { id: 'terracotta', name: language === 'tr' ? 'Kiremit' : 'Terracotta', color: '#e2725b' },
      { id: 'burgundy', name: language === 'tr' ? 'Bordo' : 'Burgundy', color: '#800020' },
      { id: 'rust', name: language === 'tr' ? 'Pas' : 'Rust', color: '#b7410e' },
      { id: 'cinnamon', name: language === 'tr' ? 'Tarçın' : 'Cinnamon', color: '#d2691e' },
      { id: 'paprika', name: language === 'tr' ? 'Kırmızı Biber' : 'Paprika', color: '#cc6600' }
    ],
    cool: [
      { id: 'steel', name: language === 'tr' ? 'Çelik' : 'Steel', color: '#4682b4' },
      { id: 'slate', name: language === 'tr' ? 'Arduvaz' : 'Slate', color: '#708090' },
      { id: 'navy', name: language === 'tr' ? 'Lacivert' : 'Navy', color: '#000080' },
      { id: 'arctic', name: language === 'tr' ? 'Kutup' : 'Arctic', color: '#b0e0e6' },
      { id: 'glacier', name: language === 'tr' ? 'Buzul' : 'Glacier', color: '#7dd3c0' },
      { id: 'storm', name: language === 'tr' ? 'Fırtına' : 'Storm', color: '#4f666a' }
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrors({});

    // Simulate API call
    setTimeout(() => {
      try {
        onUpdateProfile({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName
        });
        
        setSuccess(currentT.profile.messages.saveSuccess);
        setIsEditing(false);
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setErrors({ general: currentT.profile.messages.errorSaving });
      } finally {
        setIsSaving(false);
      }
    }, 1500);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors({ confirmPassword: 'Şifreler eşleşmiyor' });
      return;
    }

    setIsSaving(true);
    // Simulate password change
    setTimeout(() => {
      setSuccess(currentT.profile.messages.passwordChanged);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordChange(false);
      setIsSaving(false);
      setTimeout(() => setSuccess(''), 3000);
    }, 1500);
  };

  const handleAppearanceChange = (newSettings: any) => {
    updateSettings(newSettings);
    setSuccess(currentT.profile.messages.appearanceUpdated);
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
  };

  const applyCustomColor = () => {
    updateSettings({ 
      accentColor: 'custom', 
      customColor: customColor 
    });
    setShowColorPicker(false);
  };

  const handleColorIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setColorIntensity(value);
    updateSettings({ colorIntensity: value });
  };

  const renderToggle = (enabled: boolean, onChange: () => void) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
        enabled ? 'bg-teal-500' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors duration-300">
              <Camera className="w-4 h-4 text-slate-600" />
            </button>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-lg text-slate-600 mb-2">{formData.title}</p>
            <p className="text-sm text-slate-500 mb-4">{formData.companyName} • {formData.department}</p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4" />
                <span>{formData.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>Katıldı: Ocak 2023</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors duration-300"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? currentT.profile.actions.cancel : currentT.profile.actions.edit}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: currentT.profile.stats.projectsCompleted, value: '24', icon: Target, color: 'from-blue-400 to-blue-500' },
          { title: currentT.profile.stats.tasksFinished, value: '156', icon: CheckCircle, color: 'from-emerald-400 to-emerald-500' },
          { title: currentT.profile.stats.hoursWorked, value: '1,240', icon: Clock, color: 'from-purple-400 to-purple-500' },
          { title: currentT.profile.stats.teamMembers, value: '32', icon: Users, color: 'from-amber-400 to-amber-500' }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="glass-card rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Personal Information */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">{currentT.profile.personalInfo.title}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {currentT.profile.personalInfo.firstName}
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 glass-input rounded-xl disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {currentT.profile.personalInfo.lastName}
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 glass-input rounded-xl disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {currentT.profile.personalInfo.email}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 glass-input rounded-xl disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {currentT.profile.personalInfo.phone}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 glass-input rounded-xl disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {currentT.profile.personalInfo.title}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 glass-input rounded-xl disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {currentT.profile.personalInfo.department}
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-3 glass-input rounded-xl disabled:opacity-60"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {currentT.profile.personalInfo.bio}
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={3}
            className="w-full px-4 py-3 glass-input rounded-xl disabled:opacity-60 resize-none"
          />
        </div>

        {isEditing && (
          <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors duration-300 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{currentT.profile.actions.saving}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{currentT.profile.actions.save}</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors duration-300"
            >
              {currentT.profile.actions.cancel}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{currentT.profile.security.changePassword}</h3>
            <p className="text-sm text-slate-600 mt-1">Hesabınızın güvenliği için düzenli olarak şifrenizi değiştirin</p>
          </div>
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-300"
          >
            <Key className="w-4 h-4" />
            <span>{currentT.profile.security.changePassword}</span>
          </button>
        </div>

        {showPasswordChange && (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {currentT.profile.security.currentPassword}
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full px-4 py-3 glass-input rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {currentT.profile.security.newPassword}
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full px-4 py-3 glass-input rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {currentT.profile.security.confirmPassword}
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-4 py-3 glass-input rounded-xl"
              />
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={handlePasswordChange}
                disabled={isSaving}
                className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors duration-300 disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Check className="w-4 h-4" />
                )}
                <span>Şifreyi Değiştir</span>
              </button>
              
              <button
                onClick={() => setShowPasswordChange(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors duration-300"
              >
                İptal
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{currentT.profile.security.twoFactor}</h3>
            <p className="text-sm text-slate-600">{currentT.profile.security.twoFactorDesc}</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              Devre Dışı
            </span>
            <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors duration-300">
              Etkinleştir
            </button>
          </div>
        </div>
      </div>

      {/* Login History */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">{currentT.profile.security.loginHistory}</h3>
        
        <div className="space-y-4">
          {[
            { device: 'Chrome - Windows', location: 'İstanbul, Türkiye', time: '2 dakika önce', current: true },
            { device: 'Safari - iPhone', location: 'İstanbul, Türkiye', time: '2 saat önce', current: false },
            { device: 'Firefox - macOS', location: 'Ankara, Türkiye', time: '1 gün önce', current: false }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{session.device}</p>
                  <p className="text-sm text-slate-500">{session.location} • {session.time}</p>
                </div>
              </div>
              {session.current && (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  Mevcut Oturum
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentT.profile.appearance.title}</h2>
        <p className="text-slate-600">{currentT.profile.appearance.subtitle}</p>
      </div>

      {/* Theme Selection */}
      <div className="glass-card rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{currentT.profile.appearance.theme.title}</h3>
          <p className="text-sm text-slate-600">{currentT.profile.appearance.theme.description}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'light', icon: Sun, label: currentT.profile.appearance.theme.light },
            { id: 'dark', icon: Moon, label: currentT.profile.appearance.theme.dark },
            { id: 'system', icon: Monitor, label: currentT.profile.appearance.theme.system }
          ].map((theme) => {
            const IconComponent = theme.icon;
            return (
              <button
                key={theme.id}
                onClick={() => handleAppearanceChange({ theme: theme.id as any })}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  settings.theme === theme.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <IconComponent className={`w-6 h-6 mx-auto mb-2 ${
                  settings.theme === theme.id ? 'text-teal-600' : 'text-slate-500'
                }`} />
                <p className={`text-sm font-medium ${
                  settings.theme === theme.id ? 'text-teal-700' : 'text-slate-700'
                }`}>
                  {theme.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Font Size */}
      <div className="glass-card rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{currentT.profile.appearance.fontSize.title}</h3>
          <p className="text-sm text-slate-600">{currentT.profile.appearance.fontSize.description}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'small', label: currentT.profile.appearance.fontSize.small },
            { id: 'medium', label: currentT.profile.appearance.fontSize.medium },
            { id: 'large', label: currentT.profile.appearance.fontSize.large }
          ].map((size) => (
            <button
              key={size.id}
              onClick={() => handleAppearanceChange({ fontSize: size.id })}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                settings.fontSize === size.id
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Type className={`w-6 h-6 mx-auto mb-2 ${
                settings.fontSize === size.id ? 'text-teal-600' : 'text-slate-500'
              }`} />
              <p className={`text-sm font-medium ${
                settings.fontSize === size.id ? 'text-teal-700' : 'text-slate-700'
              }`}>
                {size.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Density */}
      <div className="glass-card rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{currentT.profile.appearance.density.title}</h3>
          <p className="text-sm text-slate-600">{currentT.profile.appearance.density.description}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'compact', label: currentT.profile.appearance.density.compact },
            { id: 'normal', label: currentT.profile.appearance.density.normal },
            { id: 'comfortable', label: currentT.profile.appearance.density.comfortable }
          ].map((density) => (
            <button
              key={density.id}
              onClick={() => handleAppearanceChange({ density: density.id })}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                settings.density === density.id
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Layers className={`w-6 h-6 mx-auto mb-2 ${
                settings.density === density.id ? 'text-teal-600' : 'text-slate-500'
              }`} />
              <p className={`text-sm font-medium ${
                settings.density === density.id ? 'text-teal-700' : 'text-slate-700'
              }`}>
                {density.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Colors - Renk adları ve kategorileri */}
      <div className="glass-card rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{currentT.profile.appearance.accentColor.title}</h3>
          <p className="text-sm text-slate-600">{currentT.profile.appearance.accentColor.description}</p>
        </div>

        <div className="space-y-6">
          {/* Klasik Renkler */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              {currentT.profile.appearance.accentColor.classic}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {colorCategories.classic.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleAppearanceChange({ accentColor: color.id })}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                    settings.accentColor === color.id
                      ? 'border-slate-400 bg-slate-50 scale-105 shadow-lg'
                      : 'border-slate-200 hover:scale-105 hover:border-slate-300'
                  }`}
                  title={color.name}
                >
                  <div 
                    className={`w-8 h-8 rounded-lg mb-2 relative ${
                      settings.accentColor === color.id ? 'ring-2 ring-slate-400' : ''
                    }`}
                    style={{ backgroundColor: color.color }}
                  >
                    {settings.accentColor === color.id && (
                      <Check className="w-5 h-5 text-white absolute inset-0 m-auto" />
                    )}
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    settings.accentColor === color.id ? 'text-slate-800' : 'text-slate-600'
                  }`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Canlı Renkler */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              {currentT.profile.appearance.accentColor.vibrant}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {colorCategories.vibrant.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleAppearanceChange({ accentColor: color.id })}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                    settings.accentColor === color.id
                      ? 'border-slate-400 bg-slate-50 scale-105 shadow-lg'
                      : 'border-slate-200 hover:scale-105 hover:border-slate-300'
                  }`}
                  title={color.name}
                >
                  <div 
                    className={`w-8 h-8 rounded-lg mb-2 relative ${
                      settings.accentColor === color.id ? 'ring-2 ring-slate-400' : ''
                    }`}
                    style={{ backgroundColor: color.color }}
                  >
                    {settings.accentColor === color.id && (
                      <Check className="w-5 h-5 text-white absolute inset-0 m-auto" />
                    )}
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    settings.accentColor === color.id ? 'text-slate-800' : 'text-slate-600'
                  }`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Neon Renkler */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              {currentT.profile.appearance.accentColor.neon}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {colorCategories.neon.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleAppearanceChange({ accentColor: color.id })}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                    settings.accentColor === color.id
                      ? 'border-slate-400 bg-slate-50 scale-105 shadow-lg'
                      : 'border-slate-200 hover:scale-105 hover:border-slate-300'
                  }`}
                  title={color.name}
                >
                  <div 
                    className={`w-8 h-8 rounded-lg mb-2 relative ${
                      settings.accentColor === color.id ? 'ring-2 ring-slate-400' : ''
                    }`}
                    style={{ backgroundColor: color.color }}
                  >
                    {settings.accentColor === color.id && (
                      <Check className="w-5 h-5 text-white absolute inset-0 m-auto" />
                    )}
                    <Sparkles className="w-3 h-3 text-white absolute top-0 right-0" />
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    settings.accentColor === color.id ? 'text-slate-800' : 'text-slate-600'
                  }`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Metalik Renkler */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              {currentT.profile.appearance.accentColor.metallic}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {colorCategories.metallic.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleAppearanceChange({ accentColor: color.id })}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                    settings.accentColor === color.id
                      ? 'border-slate-400 bg-slate-50 scale-105 shadow-lg'
                      : 'border-slate-200 hover:scale-105 hover:border-slate-300'
                  }`}
                  title={color.name}
                >
                  <div 
                    className={`w-8 h-8 rounded-lg mb-2 relative ${
                      settings.accentColor === color.id ? 'ring-2 ring-slate-400' : ''
                    }`}
                    style={{ backgroundColor: color.color }}
                  >
                    {settings.accentColor === color.id && (
                      <Check className="w-5 h-5 text-white absolute inset-0 m-auto" />
                    )}
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    settings.accentColor === color.id ? 'text-slate-800' : 'text-slate-600'
                  }`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Doğa Renkleri */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              {currentT.profile.appearance.accentColor.nature}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {colorCategories.nature.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleAppearanceChange({ accentColor: color.id })}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                    settings.accentColor === color.id
                      ? 'border-slate-400 bg-slate-50 scale-105 shadow-lg'
                      : 'border-slate-200 hover:scale-105 hover:border-slate-300'
                  }`}
                  title={color.name}
                >
                  <div 
                    className={`w-8 h-8 rounded-lg mb-2 relative ${
                      settings.accentColor === color.id ? 'ring-2 ring-slate-400' : ''
                    }`}
                    style={{ backgroundColor: color.color }}
                  >
                    {settings.accentColor === color.id && (
                      <Check className="w-5 h-5 text-white absolute inset-0 m-auto" />
                    )}
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    settings.accentColor === color.id ? 'text-slate-800' : 'text-slate-600'
                  }`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Pastel Renkler */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              {currentT.profile.appearance.accentColor.pastel}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {colorCategories.pastel.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleAppearanceChange({ accentColor: color.id })}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                    settings.accentColor === color.id
                      ? 'border-slate-400 bg-slate-50 scale-105 shadow-lg'
                      : 'border-slate-200 hover:scale-105 hover:border-slate-300'
                  }`}
                  title={color.name}
                >
                  <div 
                    className={`w-8 h-8 rounded-lg mb-2 relative ${
                      settings.accentColor === color.id ? 'ring-2 ring-slate-400' : ''
                    }`}
                    style={{ backgroundColor: color.color }}
                  >
                    {settings.accentColor === color.id && (
                      <Check className="w-5 h-5 text-white absolute inset-0 m-auto" />
                    )}
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    settings.accentColor === color.id ? 'text-slate-800' : 'text-slate-600'
                  }`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sıcak Renkler */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              {currentT.profile.appearance.accentColor.warm}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {colorCategories.warm.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleAppearanceChange({ accentColor: color.id })}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                    settings.accentColor === color.id
                      ? 'border-slate-400 bg-slate-50 scale-105 shadow-lg'
                      : 'border-slate-200 hover:scale-105 hover:border-slate-300'
                  }`}
                  title={color.name}
                >
                  <div 
                    className={`w-8 h-8 rounded-lg mb-2 relative ${
                      settings.accentColor === color.id ? 'ring-2 ring-slate-400' : ''
                    }`}
                    style={{ backgroundColor: color.color }}
                  >
                    {settings.accentColor === color.id && (
                      <Check className="w-5 h-5 text-white absolute inset-0 m-auto" />
                    )}
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    settings.accentColor === color.id ? 'text-slate-800' : 'text-slate-600'
                  }`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Soğuk Renkler */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              {currentT.profile.appearance.accentColor.cool}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {colorCategories.cool.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleAppearanceChange({ accentColor: color.id })}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                    settings.accentColor === color.id
                      ? 'border-slate-400 bg-slate-50 scale-105 shadow-lg'
                      : 'border-slate-200 hover:scale-105 hover:border-slate-300'
                  }`}
                  title={color.name}
                >
                  <div 
                    className={`w-8 h-8 rounded-lg mb-2 relative ${
                      settings.accentColor === color.id ? 'ring-2 ring-slate-400' : ''
                    }`}
                    style={{ backgroundColor: color.color }}
                  >
                    {settings.accentColor === color.id && (
                      <Check className="w-5 h-5 text-white absolute inset-0 m-auto" />
                    )}
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    settings.accentColor === color.id ? 'text-slate-800' : 'text-slate-600'
                  }`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Özel Renk Seçimi */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              {currentT.profile.appearance.accentColor.custom}
            </h4>
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className={`flex items-center justify-between w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                  settings.accentColor === 'custom'
                    ? 'border-slate-400 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-lg"
                    style={{ backgroundColor: customColor }}
                  ></div>
                  <span className="font-medium text-slate-700">
                    {currentT.profile.appearance.accentColor.customDesc}
                  </span>
                </div>
                <PaintBucket className="w-5 h-5 text-slate-500" />
              </button>

              {/* Renk Seçici */}
              {showColorPicker && (
                <div 
                  ref={colorPickerRef}
                  className="absolute z-50 mt-2 p-4 glass-card rounded-xl shadow-xl border border-slate-200 animate-fade-in-up"
                >
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-slate-700 mb-2">
                      {currentT.profile.actions.selectColor}
                    </h5>
                    <input
                      type="color"
                      value={customColor}
                      onChange={handleCustomColorChange}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-6 h-6 rounded-md"
                        style={{ backgroundColor: customColor }}
                      ></div>
                      <span className="text-sm font-mono text-slate-700 uppercase">
                        {customColor}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={applyCustomColor}
                        className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors duration-300"
                      >
                        {currentT.profile.actions.apply}
                      </button>
                      <button
                        onClick={() => setShowColorPicker(false)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors duration-300"
                      >
                        {currentT.profile.actions.cancel}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Renk Yoğunluğu Ayarı */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              {currentT.profile.appearance.accentColor.intensity}
            </h4>
            <p className="text-xs text-slate-600 mb-3">
              {currentT.profile.appearance.accentColor.intensityDesc}
            </p>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="50"
                max="150"
                step="5"
                value={colorIntensity}
                onChange={handleColorIntensityChange}
                className="flex-1 h-2 bg-slate-200 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500"
              />
              <span className="text-sm font-medium text-slate-700 min-w-[40px] text-center">
                {colorIntensity}%
              </span>
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>50%</span>
              <span>100%</span>
              <span>150%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Effects */}
      <div className="glass-card rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{currentT.profile.appearance.effects.title}</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <h4 className="font-semibold text-slate-800">{currentT.profile.appearance.effects.animations}</h4>
              <p className="text-sm text-slate-600">{currentT.profile.appearance.effects.animationsDesc}</p>
            </div>
            {renderToggle(settings.animations, () => 
              handleAppearanceChange({ animations: !settings.animations })
            )}
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <h4 className="font-semibold text-slate-800">{currentT.profile.appearance.effects.glowEffects}</h4>
              <p className="text-sm text-slate-600">{currentT.profile.appearance.effects.glowEffectsDesc}</p>
            </div>
            {renderToggle(settings.glowEffects, () => 
              handleAppearanceChange({ glowEffects: !settings.glowEffects })
            )}
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <h4 className="font-semibold text-slate-800">{currentT.profile.appearance.effects.gradientAnimation}</h4>
              <p className="text-sm text-slate-600">{currentT.profile.appearance.effects.gradientAnimationDesc}</p>
            </div>
            {renderToggle(settings.gradientAnimation, () => 
              handleAppearanceChange({ gradientAnimation: !settings.gradientAnimation })
            )}
          </div>
        </div>
      </div>

      {/* Ayarları Sıfırla */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            updateSettings({
              theme: 'system',
              fontSize: 'medium',
              animations: true,
              density: 'normal',
              accentColor: 'teal',
              customColor: '#14b8a6',
              colorIntensity: 100,
              glowEffects: false,
              gradientAnimation: false
            });
            setCustomColor('#14b8a6');
            setColorIntensity(100);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors duration-300"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{currentT.profile.actions.reset}</span>
        </button>
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
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.profile.title}</h1>
            
            <div className="w-16 sm:w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.profile.title}</h1>
            <p className="text-slate-600">{currentT.profile.subtitle}</p>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-emerald-700">
              <CheckCircle className="w-5 h-5" />
              <span>{success}</span>
            </div>
          )}

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Tabs */}
          <div className="glass-card rounded-2xl p-2 mb-8">
            <div className="flex space-x-2 overflow-x-auto">
              {[
                { id: 'profile', title: currentT.profile.tabs.profile, icon: User },
                { id: 'security', title: currentT.profile.tabs.security, icon: Shield },
                { id: 'appearance', title: currentT.profile.tabs.appearance, icon: Palette }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-teal-500 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium">{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'security' && renderSecurityTab()}
          {activeTab === 'appearance' && renderAppearanceTab()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;