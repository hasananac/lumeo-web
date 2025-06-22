import React, { useState, useEffect } from "react";
import {
  Building2,
  Users,
  TrendingUp,
  Calendar,
  Bell,
  Search,
  Plus,
  Settings,
  LogOut,
  ChevronDown,
  BarChart3,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Eye,
  MoreHorizontal,
  Filter,
  Download,
  Upload,
  Target,
  Zap,
  Shield,
  Globe,
  Menu,
  X,
  ChevronRight,
  Home,
  Briefcase,
  Database,
  CreditCard,
  Headphones,
  Package,
  ShoppingCart,
  Truck,
  PieChart,
  Activity,
  Layers,
  Archive,
  BookOpen,
  MessageSquare,
  Video,
  Wifi,
  Server,
  Monitor,
  Smartphone,
  Tablet,
  HardDrive,
  Cloud,
  Lock,
  Key,
  UserCheck,
  UserPlus,
  UserMinus,
  Folder,
  FolderOpen,
  Image,
  Music,
  Film,
  Mic,
  Camera,
  Printer,
  Scanner,
  Clipboard,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Percent,
  Star,
  Heart,
  ThumbsUp,
  Award,
  Gift,
  Coffee,
  Umbrella,
  Sun,
  Moon,
  CloudRain,
  Snowflake,
  Flame,
  Droplets,
  Wind,
  Thermometer,
  Battery,
  Plug,
  Power,
  Cpu,
  MemoryStick,
  Router,
  Bluetooth,
  Cast,
  Radio,
  Tv,
  Speaker,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Copy,
  Cut,
  Paste,
  Save,
  FolderPlus,
  FilePlus,
  FileX,
  Trash2,
  RefreshCw,
  MoreVertical,
  Grid,
  List,
  Columns,
  Rows,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Type,
  PenTool,
  Paintbrush,
  Eraser,
  Ruler,
  Compass,
  Triangle,
  Square,
  Circle,
  Hexagon,
  Pentagon,
  Octagon,
  Diamond,
  Shapes,
  Layers2,
  Group,
  Ungroup,
  BringToFront,
  SendToBack,
  FlipHorizontal,
  FlipVertical,
  RotateClockwise,
  RotateCounterClockwise,
  Crop,
  Scissors,
  Paperclip,
  Link,
  Unlink,
  Chain,
  Flag,
  Bookmark as BookmarkIcon,
  Pin,
  Pushpin,
  MapPin2,
  Navigation,
  Compass2,
  Map,
  Globe2,
  Satellite,
  Plane,
  Car,
  Bus,
  Train,
  Ship,
  Bike,
  Walk,
  Run,
  Footprints,
  Paw,
  Leaf,
  Tree,
  Flower,
  Seedling,
  Sprout,
  Cactus,
  Mushroom,
  Apple,
  Cherry,
  Grape,
  Lemon,
  Orange,
  Banana,
  Carrot,
  Corn,
  Wheat,
  Rice,
  Bread,
  Cake,
  Cookie,
  Pizza,
  Hamburger,
  Hotdog,
  Sandwich,
  Soup,
  Salad,
  Fish,
  Meat,
  Egg,
  Milk,
  Cheese,
  Butter,
  Honey,
  Salt,
  Pepper,
  Spoon,
  Fork,
  Knife,
  Plate,
  Bowl,
  Cup,
  Glass,
  Bottle,
  Can,
  Jar,
  Box,
  Package2,
  Gift2,
  Balloon,
  Party,
  Celebration,
  Fireworks,
  Sparkles,
  Confetti,
  Ribbon,
  Medal,
  Trophy,
  Crown,
  Gem,
  Diamond2,
  Ring,
  Necklace,
  Watch,
  Glasses,
  Hat,
  Shirt,
  Pants,
  Shoe,
  Sock,
  Glove,
  Bag,
  Backpack,
  Suitcase,
  Umbrella2,
  Sunglasses,
  Lipstick,
  Perfume,
  Soap,
  Toothbrush,
  Towel,
  Bed,
  Chair,
  Table,
  Lamp,
  DoorOpen,
  DoorClosed,
  LogIn,
  Window,
  Stairs,
  Elevator,
  Escalator,
  Building,
  House,
  Home2,
  Office,
  School,
  Hospital,
  Church,
  Bank,
  Store,
  Restaurant,
  Hotel,
  Gas,
  Parking,
  Traffic,
  Road,
  Bridge,
  Tunnel,
  Mountain,
  Hill,
  Valley,
  Desert,
  Beach,
  Ocean,
  Lake,
  River,
  Waterfall,
  Forest,
  Jungle,
  Park,
  Garden,
  Farm,
  Field,
  Barn,
  Fence,
  Gate,
  Well,
  Windmill,
  Lighthouse,
  Castle,
  Tower,
  Pyramid,
  Statue,
  Monument,
  Museum,
  Library,
  Theater,
  Cinema,
  Stadium,
  Arena,
  Gym,
  Pool,
  Spa,
  Salon,
  Barbershop,
  Pharmacy,
  Clinic,
  Dentist,
  Veterinary,
  Police,
  Fire,
  Ambulance,
  Taxi,
  Bus2,
  Metro,
  Tram,
  Ferry,
  Helicopter,
  Rocket,
  Satellite2,
  Ufo,
  Robot,
  Alien,
  Ghost,
  Skull,
  Zombie,
  Vampire,
  Witch,
  Wizard,
  Fairy,
  Angel,
  Devil,
  Dragon,
  Unicorn,
  Phoenix,
  Griffin,
  Pegasus,
  Centaur,
  Mermaid,
  Genie,
  Ninja,
  Pirate,
  Knight,
  King,
  Queen,
  Prince,
  Princess,
  Warrior,
  Archer,
  Mage,
  Priest,
  Monk,
  Samurai,
  Viking,
  Gladiator,
  Spartan,
  Roman,
  Greek,
  Egyptian,
  Chinese,
  Japanese,
  Indian,
  African,
  Native,
  Cowboy,
  Detective,
  Spy,
  Agent,
  Soldier,
  General,
  Admiral,
  Captain,
  Lieutenant,
  Sergeant,
  Corporal,
  Private,
  Scout,
  Sniper,
  Medic,
  Engineer,
  Pilot,
  Driver,
  Mechanic,
  Electrician,
  Plumber,
  Carpenter,
  Mason,
  Painter,
  Cleaner,
  Gardener,
  Farmer,
  Fisher,
  Hunter,
  Miner,
  Logger,
  Blacksmith,
  Jeweler,
  Tailor,
  Baker,
  Chef,
  Waiter,
  Bartender,
  Cashier,
  Salesperson,
  Manager,
  Boss,
  CEO,
  President,
  Director,
  Producer,
  Actor,
  Singer,
  Musician,
  Artist,
  Writer,
  Journalist,
  Reporter,
  Editor,
  Photographer,
  Cameraman,
  Designer,
  Developer,
  Programmer,
  Hacker,
  Gamer,
  Streamer,
  Youtuber,
  Influencer,
  Blogger,
  Vlogger,
  Podcaster,
  DJ,
  MC,
  Host,
  Presenter,
  Commentator,
  Critic,
  Reviewer,
  Judge,
  Lawyer,
  Attorney,
  Prosecutor,
  Defender,
  Witness,
  Jury,
  Bailiff,
  Clerk,
  Secretary,
  Assistant,
  Intern,
  Student,
  Teacher,
  Professor,
  Principal,
  Dean,
  Rector,
  Chancellor,
  Provost,
  Registrar,
  Librarian,
  Counselor,
  Advisor,
  Mentor,
  Coach,
  Trainer,
  Instructor,
  Tutor,
  Guide,
  Leader,
  Follower,
  Member,
  Volunteer,
  Donor,
  Sponsor,
  Patron,
  Supporter,
  Fan,
  Enthusiast,
  Collector,
  Hobbyist,
  Amateur,
  Professional,
  Expert,
  Specialist,
  Consultant,
  Advisor2,
  Analyst,
  Researcher,
  Scientist,
  Inventor,
  Innovator,
  Entrepreneur,
  Investor,
  Trader,
  Broker,
  Banker,
  Accountant,
  Auditor,
  Economist,
  Statistician,
  Mathematician,
  Physicist,
  Chemist,
  Biologist,
  Geologist,
  Astronomer,
  Meteorologist,
  Climatologist,
  Ecologist,
  Environmentalist,
  Conservationist,
  Activist,
  Protester,
  Demonstrator,
  Striker,
  Picketer,
  Boycotter,
  Petitioner,
  Campaigner,
  Lobbyist,
  Politician,
  Diplomat,
  Ambassador,
  Consul,
  Attaché,
  Envoy,
  Emissary,
  Representative,
  Delegate,
  Senator,
  Congressman,
  Governor,
  Mayor,
  Councilman,
  Alderman,
  Commissioner,
  Sheriff,
  Marshal,
  Constable,
  Officer,
  Deputy,
  Trooper,
  Ranger,
  Warden,
  Guard,
  Bouncer,
  Doorman,
  Usher,
  Greeter,
  Receptionist,
  Operator,
  Dispatcher,
  Controller,
  Coordinator,
  Organizer,
  Planner,
  Scheduler,
  Administrator,
  Supervisor,
  Foreman,
  Overseer,
  Inspector,
  Examiner,
  Evaluator,
  Assessor,
  Appraiser,
  Estimator,
  Surveyor,
  Cartographer,
  Navigator,
  Explorer,
  Adventurer,
  Traveler,
  Tourist,
  Visitor,
  Guest,
  Host2,
  Hostess,
  Steward,
  Stewardess,
  Attendant,
  Servant,
  Maid,
  Butler,
  Housekeeper,
  Janitor,
  Custodian,
  Caretaker,
  Groundskeeper,
  Landscaper,
  Decorator,
  Organizer2,
  Coordinator2,
  Facilitator,
  Mediator,
  Negotiator,
  Arbitrator,
  Referee,
  Umpire,
  Judge2,
  Jury2,
  Witness2,
  Victim,
  Suspect,
  Defendant,
  Plaintiff,
  Prosecutor2,
  Attorney2,
  Lawyer2,
  Paralegal,
  Notary,
  Clerk2,
  Bailiff2,
  Marshal2,
  Sheriff2,
  Deputy2,
  Officer2,
  Detective2,
  Investigator,
  Inspector2,
  Agent2,
  Operative,
  Spy2,
  Informant,
  Whistleblower,
  Leaker,
  Source,
  Contact,
  Connection,
  Network,
  Link2,
  Bridge2,
  Gateway,
  Portal,
  Interface,
  Platform,
  System,
  Framework,
  Infrastructure,
  Architecture,
  Design,
  Structure,
  Foundation,
  Base,
  Core,
  Kernel,
  Engine,
  Motor,
  Generator,
  Turbine,
  Pump,
  Compressor,
  Blower,
  Heater,
  Cooler,
  Radiator,
  Condenser,
  Evaporator,
  Purifier,
  Cleaner2,
  Washer,
  Dryer,
  Iron,
  Press,
  Steamer,
  Vacuum,
  Sweeper,
  Mop,
  Broom,
  Brush,
  Sponge,
  Cloth,
  Towel2,
  Napkin,
  Tissue,
  Paper,
  Cardboard,
  Plastic,
  Metal,
  Wood,
  Stone,
  Glass2,
  Ceramic,
  Rubber,
  Leather,
  Fabric,
  Cotton,
  Wool,
  Silk,
  Linen,
  Polyester,
  Nylon,
  Spandex,
  Denim,
  Canvas,
  Velvet,
  Satin,
  Lace,
  Mesh,
  Net,
  Wire,
  Cable,
  Rope,
  String,
  Thread,
  Yarn,
  Fiber,
  Strand,
  Cord,
  Chain2,
  Belt,
  Strap,
  Band,
  Ring2,
  Loop,
  Circle2,
  Square2,
  Triangle2,
  Rectangle,
  Oval,
  Diamond3,
  Star2,
  Heart2,
  Cross,
  Plus2,
  Minus,
  Equal,
  Multiply,
  Divide,
  Percent2,
  Dollar,
  Euro,
  Pound,
  Yen,
  Won,
  Rupee,
  Ruble,
  Real,
  Peso,
  Franc,
  Mark,
  Lira,
  Dinar,
  Dirham,
  Riyal,
  Shekel,
  Baht,
  Dong,
  Kip,
  Kyat,
  Taka,
  Afghani,
  Lek,
  Dram,
  Manat,
  Lari,
  Som,
  Tenge,
  Tugrik,
  Pataca,
  Ringgit,
  Rupiah,
  Peso2,
  Quetzal,
  Cordoba,
  Colon,
  Balboa,
  Lempira,
  Gourde,
  Dollar2,
  Peso3,
  Real2,
  Sol,
  Boliviano,
  Guarani,
  Sucre,
  Bolivar,
  Peso4,
  Peso5,
  Peso6,
  Peso7,
  Peso8,
  Peso9,
  Peso10,
  Peso11,
  Palette,
  ChevronLeft,
  ChevronUp,
  Fuel,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { Language } from "../types";
import { useAppearanceContext } from "./AppearanceProvider";

interface GlobalLayoutProps {
  language: Language;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    phone: string;
  };
  onLogout: () => void;
  onShowProfile: () => void;
  onShowSettings: () => void;
  onShowSearch: (query?: string) => void;
  onShowNotifications: () => void;
  onNavigateToPage: (page: string) => void;
  children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({
  language,
  userInfo,
  onLogout,
  onShowProfile,
  onShowSettings,
  onShowSearch,
  onShowNotifications,
  onNavigateToPage,
  children,
}) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSegment, setOpenSegment] = useState<string | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Live search states
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const { settings, updateSettings, resolvedTheme } = useAppearanceContext();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarExpanded(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [hoverTimeout, searchTimeout]);

  const t = {
    tr: {
      sidebar: {
        homepage: "Anasayfa",
        projects: "Projeler",
        jobs: "İşler",
        finance: "Finans",
        crm: "CRM",
        production: "Üretim",
        calendar: "Takvim",
        products: "Ürünler",
        reports: "Raporlar",
        employees: "Çalışanlar",
        customers: "Müşteriler",
        suppliers: "Tedarikçiler",
        vehicles: "Taşıtlar",
        documents: "Belgeler",
        communication: "İletişim",
        // Alt menüler
        activeProjects: "Aktif Projeler",
        completedProjects: "Tamamlanan Projeler",
        archivedProjects: "Arşivlenen Projeler",
        projectTemplates: "Proje Şablonları",
        activeJobs: "Aktif İşler",
        completedJobs: "Tamamlanan İşler",
        jobTemplates: "İş Şablonları",
        jobCategories: "İş Kategorileri",
        invoices: "Faturalar",
        payments: "Ödemeler",
        expenses: "Giderler",
        budgets: "Bütçeler",
        leads: "Potansiyel Müşteriler",
        contacts: "Kişiler",
        deals: "Anlaşmalar",
        workOrders: "İş Emirleri",
        inventory: "Envanter",
        quality: "Kalite Kontrol",
        maintenance: "Bakım",
        events: "Etkinlikler",
        meetings: "Toplantılar",
        deadlines: "Son Tarihler",
        reminders: "Hatırlatmalar",
        catalog: "Ürün Kataloğu",
        inventory2: "Stok Yönetimi",
        pricing: "Fiyatlandırma",
        categories: "Kategoriler",
        analytics: "Analitik",
        financial: "Mali Raporlar",
        operational: "Operasyonel Raporlar",
        custom: "Özel Raporlar",
        departments: "Departmanlar",
        roles: "Roller",
        permissions: "İzinler",
        fleet: "Filo Yönetimi",
        maintenance2: "Araç Bakımı",
        fuel: "Yakıt Takibi",
        insurance: "Sigorta",
        files: "Dosyalar",
        templates: "Şablonlar",
        archive: "Arşiv",
        messages: "Mesajlar",
        notifications: "Bildirimler",
        videoConference: "Video Konferans",
        doorAccess: "Kapı Giriş-Çıkış",
        doorEntry: "Giriş",
        doorExit: "Çıkış",
        profile: "Profil",
      },
      profile: {
        profile: "Profil",
        settings: "Ayarlar",
        logout: "Çıkış Yap",
      },
      theme: {
        light: "Açık Tema",
        dark: "Koyu Tema",
        system: "Sistem",
      },
      search: {
        placeholder: "Ara...",
        searching: "Aranıyor...",
        noResults: "Sonuç bulunamadı",
        viewAllResults: "Tüm sonuçları gör",
        categories: {
          pages: "Sayfalar",
          users: "Kullanıc��lar",
          projects: "Projeler",
          documents: "Belgeler",
          tasks: "Görevler",
        },
      },
    },
    en: {
      sidebar: {
        homepage: "Homepage",
        projects: "Projects",
        jobs: "Jobs",
        finance: "Finance",
        crm: "CRM",
        production: "Production",
        calendar: "Calendar",
        products: "Products",
        reports: "Reports",
        employees: "Employees",
        customers: "Customers",
        suppliers: "Suppliers",
        vehicles: "Vehicles",
        documents: "Documents",
        communication: "Communication",
        // Sub menus
        activeProjects: "Active Projects",
        completedProjects: "Completed Projects",
        archivedProjects: "Archived Projects",
        projectTemplates: "Project Templates",
        activeJobs: "Active Jobs",
        completedJobs: "Completed Jobs",
        jobTemplates: "Job Templates",
        jobCategories: "Job Categories",
        invoices: "Invoices",
        payments: "Payments",
        expenses: "Expenses",
        budgets: "Budgets",
        leads: "Leads",
        contacts: "Contacts",
        deals: "Deals",
        workOrders: "Work Orders",
        inventory: "Inventory",
        quality: "Quality Control",
        maintenance: "Maintenance",
        events: "Events",
        meetings: "Meetings",
        deadlines: "Deadlines",
        reminders: "Reminders",
        catalog: "Product Catalog",
        inventory2: "Inventory Management",
        pricing: "Pricing",
        categories: "Categories",
        analytics: "Analytics",
        financial: "Financial Reports",
        operational: "Operational Reports",
        custom: "Custom Reports",
        departments: "Departments",
        roles: "Roles",
        permissions: "Permissions",
        fleet: "Fleet Management",
        maintenance2: "Vehicle Maintenance",
        fuel: "Fuel Tracking",
        insurance: "Insurance",
        files: "Files",
        templates: "Templates",
        archive: "Archive",
        messages: "Messages",
        notifications: "Notifications",
        videoConference: "Video Conference",
        doorAccess: "Door Access",
        doorEntry: "Entry",
        doorExit: "Exit",
        profile: "Profile",
      },
      profile: {
        profile: "Profile",
        settings: "Settings",
        logout: "Logout",
      },
      theme: {
        light: "Light Theme",
        dark: "Dark Theme",
        system: "System",
      },
      search: {
        placeholder: "Search...",
        searching: "Searching...",
        noResults: "No results found",
        viewAllResults: "View all results",
        categories: {
          pages: "Pages",
          users: "Users",
          projects: "Projects",
          documents: "Documents",
          tasks: "Tasks",
        },
      },
    },
  };

  const currentT = t[language];

  const menuItems = [
    {
      id: "homepage",
      title: currentT.sidebar.homepage,
      icon: Home,
      path: "dashboard",
    },
    {
      id: "projects",
      title: currentT.sidebar.projects,
      icon: Target,
      hasSubmenu: true,
      submenu: [
        {
          id: "active-projects",
          title: currentT.sidebar.activeProjects,
          icon: Activity,
          path: "active-projects",
        },
        {
          id: "completed-projects",
          title: currentT.sidebar.completedProjects,
          icon: CheckCircle,
          path: "completed-projects",
        },
        {
          id: "archived-projects",
          title: currentT.sidebar.archivedProjects,
          icon: Archive,
          path: "archived-projects",
        },
        {
          id: "project-templates",
          title: currentT.sidebar.projectTemplates,
          icon: FileText,
          path: "project-templates",
        },
      ],
    },
    {
      id: "jobs",
      title: currentT.sidebar.jobs,
      icon: Briefcase,
      hasSubmenu: true,
      submenu: [
        {
          id: "active-jobs",
          title: currentT.sidebar.activeJobs,
          icon: Activity,
          path: "active-jobs",
        },
        {
          id: "completed-jobs",
          title: currentT.sidebar.completedJobs,
          icon: CheckCircle,
          path: "completed-jobs",
        },
        {
          id: "job-templates",
          title: currentT.sidebar.jobTemplates,
          icon: FileText,
          path: "job-templates",
        },
        {
          id: "job-categories",
          title: currentT.sidebar.jobCategories,
          icon: Tag,
          path: "job-categories",
        },
      ],
    },
  ];

  // Mock search data
  const mockSearchData = [
    // Pages
    {
      id: "dashboard",
      title: "Dashboard",
      description: "Ana sayfa ve genel bakış",
      category: "pages",
      icon: Home,
      path: "dashboard",
    },
    {
      id: "projects",
      title: "Projeler",
      description: "Proje yönetimi ve takibi",
      category: "pages",
      icon: Target,
      path: "projects",
    },
    {
      id: "customers",
      title: "Müşteriler",
      description: "Müşteri yönetimi",
      category: "pages",
      icon: Users,
      path: "customers",
    },
    {
      id: "finance",
      title: "Finans",
      description: "Mali işlemler ve raporlar",
      category: "pages",
      icon: DollarSign,
      path: "finance",
    },

    // Users
    {
      id: "user1",
      title: "Ahmet Yılmaz",
      description: "Proje Yöneticisi",
      category: "users",
      icon: User,
      path: "users",
    },
    {
      id: "user2",
      title: "Ayşe Demir",
      description: "Yazılım Geliştirici",
      category: "users",
      icon: User,
      path: "users",
    },
    {
      id: "user3",
      title: "Mehmet Kaya",
      description: "Tasarımcı",
      category: "users",
      icon: User,
      path: "users",
    },

    // Projects
    {
      id: "project1",
      title: "Lumeo Platform v2.0",
      description: "Yeni platform geliştirme projesi",
      category: "projects",
      icon: Target,
      path: "projects",
    },
    {
      id: "project2",
      title: "Mobil Uygulama",
      description: "iOS ve Android uygulaması",
      category: "projects",
      icon: Target,
      path: "projects",
    },

    // Documents
    {
      id: "doc1",
      title: "Proje Gereksinim Dokümanı",
      description: "Teknik gereksinimler",
      category: "documents",
      icon: FileText,
      path: "documents",
    },
    {
      id: "doc2",
      title: "Kullanıcı Kılavuzu",
      description: "Uygulama kullanım kılavuzu",
      category: "documents",
      icon: FileText,
      path: "documents",
    },

    // Tasks
    {
      id: "task1",
      title: "UI Tasarımı",
      description: "Ana sayfa tasarımı",
      category: "tasks",
      icon: CheckCircle,
      path: "tasks",
    },
    {
      id: "task2",
      title: "API Entegrasyonu",
      description: "Ödeme sistemi entegrasyonu",
      category: "tasks",
      icon: CheckCircle,
      path: "tasks",
    },
  ];

  const performSearch = (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Debounce search
    const timeout = setTimeout(() => {
      const filtered = mockSearchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      );

      setSearchResults(filtered);
      setShowSearchResults(true);
      setIsSearching(false);
    }, 300);

    setSearchTimeout(timeout);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onShowSearch(searchQuery);
      setShowSearchResults(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  const handleSearchResultClick = (result: any) => {
    setShowSearchResults(false);
    setSearchQuery("");
    onNavigateToPage(result.path);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "pages":
        return "bg-blue-100 text-blue-700";
      case "users":
        return "bg-emerald-100 text-emerald-700";
      case "projects":
        return "bg-purple-100 text-purple-700";
      case "documents":
        return "bg-amber-100 text-amber-700";
      case "tasks":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const handleMenuClick = (item: any) => {
    if (item.hasSubmenu && isSidebarExpanded) {
      // Eğer sidebar açık ve alt menü varsa, alt menüyü aç/kapat
      setOpenSegment(openSegment === item.id ? null : item.id);
    } else if (!item.hasSubmenu) {
      // Alt menü yoksa direkt navigate et
      if (item.path) {
        onNavigateToPage(item.path);
      }
    }
  };

  const handleSubmenuClick = (path: string) => {
    onNavigateToPage(path);
  };

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    updateSettings({ theme });
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleProfileMenuClick = (action: string) => {
    setShowProfileDropdown(false);

    switch (action) {
      case "profile":
        onShowProfile();
        break;
      case "settings":
        onShowSettings();
        break;
      case "logout":
        onLogout();
        break;
    }
  };

  const handleMenuItemMouseEnter = (item: any) => {
    if (!isSidebarExpanded && item.hasSubmenu && !isMobile) {
      // Clear any existing timeout
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }

      // Set hover immediately
      setHoveredMenuItem(item.id);
    }
  };

  const handleMenuItemMouseLeave = (item: any) => {
    if (!isSidebarExpanded && item.hasSubmenu && !isMobile) {
      // Set a longer timeout before hiding the menu
      const timeout = setTimeout(() => {
        setHoveredMenuItem(null);
      }, 800); // 800ms delay before hiding

      setHoverTimeout(timeout);
    }
  };

  const handleSubmenuMouseEnter = () => {
    // Clear timeout when mouse enters submenu
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleSubmenuMouseLeave = () => {
    // Hide submenu immediately when mouse leaves submenu area
    setHoveredMenuItem(null);
  };

  const renderMenuItem = (item: any) => {
    const IconComponent = item.icon;
    const isOpen = openSegment === item.id;
    const hasSubmenu = item.hasSubmenu && item.submenu;
    const isHovered = hoveredMenuItem === item.id;

    return (
      <div
        key={item.id}
        className="relative"
        onMouseEnter={() => handleMenuItemMouseEnter(item)}
        onMouseLeave={() => handleMenuItemMouseLeave(item)}
      >
        <button
          onClick={() => handleMenuClick(item)}
          className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 group relative ${
            isSidebarExpanded
              ? "justify-between text-slate-700 hover:bg-teal-500 hover:text-white"
              : "justify-center text-slate-700 hover:bg-teal-500 hover:text-white"
          }`}
        >
          <div
            className={`flex items-center ${isSidebarExpanded ? "space-x-3" : ""}`}
          >
            <IconComponent className="w-5 h-5 transition-colors duration-300 flex-shrink-0" />
            {isSidebarExpanded && (
              <span className="font-medium transition-colors duration-300 text-sm">
                {item.title}
              </span>
            )}
          </div>
          {hasSubmenu && isSidebarExpanded && (
            <ChevronDown
              className={`w-4 h-4 transition-all duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {/* Expanded Sidebar Submenu - SMALLER FONT SIZE */}
        {hasSubmenu && isSidebarExpanded && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-1 space-y-1">
              {item.submenu.map((subItem: any) => (
                <button
                  key={subItem.id}
                  onClick={() => handleSubmenuClick(subItem.path)}
                  className="w-full flex items-center space-x-3 p-2 pl-12 rounded-md text-slate-600 hover:bg-teal-500 hover:text-white transition-all duration-200 group"
                >
                  <ChevronRightIcon className="w-3 h-3 transition-colors duration-200 text-slate-400" />
                  <subItem.icon className="w-4 h-4 transition-colors duration-200" />
                  <span className="text-xs font-medium">{subItem.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collapsed Sidebar Hover Submenu - SMALLER FONT SIZE */}
        {hasSubmenu && !isSidebarExpanded && isHovered && !isMobile && (
          <div
            className="fixed left-16 glass-card rounded-xl shadow-xl border border-slate-200/50 animate-fade-in-up"
            style={{
              top: `${document.querySelector(`[data-menu-id="${item.id}"]`)?.getBoundingClientRect().top || 0}px`,
              zIndex: 9999,
              width: "256px",
              maxHeight: "400px",
              overflowY: "auto",
            }}
            onMouseEnter={handleSubmenuMouseEnter}
            onMouseLeave={handleSubmenuMouseLeave}
          >
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 mb-3 text-sm border-b border-slate-200 pb-2">
                {item.title}
              </h3>
              <div className="space-y-1">
                {item.submenu.map((subItem: any) => (
                  <button
                    key={subItem.id}
                    onClick={() => {
                      handleSubmenuClick(subItem.path);
                      setHoveredMenuItem(null);
                    }}
                    className="w-full flex items-center space-x-3 p-2 rounded-lg text-slate-600 hover:bg-teal-500 hover:text-white transition-all duration-200 group text-left"
                  >
                    <subItem.icon className="w-4 h-4 transition-colors duration-200 flex-shrink-0" />
                    <span className="text-xs font-medium">{subItem.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 glass-card border-r border-slate-200/50 transform transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "w-64" : "w-16"
        } ${isMobile ? (isSidebarExpanded ? "translate-x-0" : "-translate-x-full") : "translate-x-0"} md:relative`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200/50">
            <div
              className={`flex items-center transition-all duration-300 ${isSidebarExpanded ? "space-x-3" : "justify-center"}`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              {isSidebarExpanded && (
                <div className="min-w-0">
                  <h1 className="text-lg font-bold text-slate-800">Lumeo</h1>
                  <p className="text-xs text-slate-500 truncate">
                    {userInfo.companyName}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar Toggle Button */}
            <button
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              className="p-1.5 hover:bg-slate-100 rounded-md transition-colors duration-200 flex-shrink-0"
            >
              {isSidebarExpanded ? (
                <Menu className="w-4 h-4 text-slate-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.id} data-menu-id={item.id}>
                  {renderMenuItem(item)}
                </div>
              ))}
            </div>
          </nav>

          {/* Profile Section - Sidebar */}
          {isSidebarExpanded && (
            <div className="p-3 border-t border-slate-200/50">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-3 mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">
                      {userInfo.firstName} {userInfo.lastName}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {userInfo.email}
                    </p>
                  </div>
                </div>

                {/* Profile Menu Items */}
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => onShowProfile()}
                    className="w-full flex items-center space-x-2 p-2 rounded-lg text-slate-700 hover:bg-teal-500 hover:text-white transition-all duration-300 group text-left"
                  >
                    <User className="w-4 h-4 transition-colors duration-300" />
                    <span className="text-xs font-medium">
                      {currentT.profile.profile}
                    </span>
                    <ChevronRightIcon className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>

                  <button
                    onClick={() => onShowSettings()}
                    className="w-full flex items-center space-x-2 p-2 rounded-lg text-slate-700 hover:bg-teal-500 hover:text-white transition-all duration-300 group text-left"
                  >
                    <Settings className="w-4 h-4 transition-colors duration-300" />
                    <span className="text-xs font-medium">
                      {currentT.profile.settings}
                    </span>
                    <ChevronRightIcon className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>

                  <button
                    onClick={() => onLogout()}
                    className="w-full flex items-center space-x-2 p-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 group text-left"
                  >
                    <LogOut className="w-4 h-4 transition-colors duration-300" />
                    <span className="text-xs font-medium">
                      {currentT.profile.logout}
                    </span>
                    <ChevronRightIcon className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Theme Selector */}
          <div className="p-3 border-t border-slate-200/50">
            <div
              className={`flex items-center ${isSidebarExpanded ? "justify-center space-x-2" : "flex-col space-y-2"}`}
            >
              {/* Light Theme */}
              <button
                onClick={() => handleThemeChange("light")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  settings.theme === "light"
                    ? "bg-teal-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                title={currentT.theme.light}
              >
                <Sun className="w-4 h-4" />
              </button>

              {/* Dark Theme */}
              <button
                onClick={() => handleThemeChange("dark")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  settings.theme === "dark"
                    ? "bg-teal-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                title={currentT.theme.dark}
              >
                <Moon className="w-4 h-4" />
              </button>

              {/* System Theme */}
              <button
                onClick={() => handleThemeChange("system")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  settings.theme === "system"
                    ? "bg-teal-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                title={currentT.theme.system}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarExpanded(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="glass-card border-b border-slate-200/50 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center space-x-4">
              {/* Mobile Sidebar Toggle */}
              {isMobile && (
                <button
                  onClick={() => setIsSidebarExpanded(true)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <Menu className="w-5 h-5 text-slate-600" />
                </button>
              )}
            </div>

            {/* Search and Notification */}
            <div className="flex items-center space-x-3 flex-1 max-w-md mx-4">
              {/* Search with Live Results */}
              <div className="relative flex-1">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={() => {
                      if (searchQuery.length >= 2) {
                        setShowSearchResults(true);
                      }
                    }}
                    className="w-full pl-10 pr-4 py-2 glass-input rounded-xl text-sm"
                    placeholder={currentT.search.placeholder}
                  />
                </form>

                {/* Live Search Results Dropdown */}
                {showSearchResults && (
                  <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl shadow-xl border border-slate-200/50 z-50 max-h-96 overflow-y-auto animate-fade-in-up">
                    {isSearching ? (
                      <div className="p-4 text-center">
                        <div className="inline-flex items-center space-x-2 text-slate-500">
                          <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                          <span className="text-sm">
                            {currentT.search.searching}
                          </span>
                        </div>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="p-2">
                        {/* Group results by category */}
                        {Object.entries(
                          searchResults.reduce(
                            (acc, result) => {
                              if (!acc[result.category])
                                acc[result.category] = [];
                              acc[result.category].push(result);
                              return acc;
                            },
                            {} as Record<string, any[]>,
                          ),
                        ).map(([category, results]) => (
                          <div key={category} className="mb-3 last:mb-0">
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-1">
                              {
                                currentT.search.categories[
                                  category as keyof typeof currentT.search.categories
                                ]
                              }
                            </h4>
                            <div className="space-y-1">
                              {results.map((result) => {
                                const IconComponent = result.icon;
                                return (
                                  <button
                                    key={result.id}
                                    onClick={() =>
                                      handleSearchResultClick(result)
                                    }
                                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-200 text-left group"
                                  >
                                    <IconComponent className="w-4 h-4 text-slate-500 group-hover:text-white flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-slate-800 group-hover:text-white truncate text-sm">
                                        {result.title}
                                      </p>
                                      <p className="text-xs text-slate-500 group-hover:text-white/80 truncate">
                                        {result.description}
                                      </p>
                                    </div>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(result.category)} group-hover:bg-white/20 group-hover:text-white`}
                                    >
                                      {
                                        currentT.search.categories[
                                          result.category as keyof typeof currentT.search.categories
                                        ]
                                      }
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        {/* View All Results Link */}
                        <div className="border-t border-slate-200 pt-2 mt-2">
                          <button
                            onClick={() => {
                              onShowSearch(searchQuery);
                              setShowSearchResults(false);
                            }}
                            className="w-full p-3 text-center text-sm font-medium text-teal-500 hover:bg-teal-500 hover:text-white rounded-lg transition-all duration-200"
                          >
                            {currentT.search.viewAllResults}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-sm text-slate-500">
                          {currentT.search.noResults}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Notification Icon */}
              <button
                onClick={onShowNotifications}
                className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 group"
                title={language === "tr" ? "Bildirimler" : "Notifications"}
              >
                <Bell className="w-5 h-5 text-slate-600 group-hover:text-teal-500 transition-colors duration-200" />
                {/* Notification Badge */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* User Profile with Dropdown - Header */}
              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-slate-800 text-sm">
                      {userInfo.firstName} {userInfo.lastName}
                    </p>
                    <p className="text-xs text-slate-500 truncate max-w-[120px]">
                      {userInfo.email}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-3 h-3 text-slate-400 hidden md:block transition-transform duration-300 ${
                      showProfileDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown Menu - Header */}
                {showProfileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-64 glass-card rounded-xl shadow-lg border border-slate-200/50 animate-fade-in-up z-50">
                    {/* User Info Header */}
                    <div className="p-4 border-b border-slate-200/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 truncate">
                            {userInfo.firstName} {userInfo.lastName}
                          </p>
                          <p className="text-sm text-slate-500 truncate">
                            {userInfo.email}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {userInfo.companyName}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {/* Profile */}
                      <button
                        onClick={() => handleProfileMenuClick("profile")}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-700 hover:bg-teal-500 hover:text-white transition-all duration-300 group cursor-pointer"
                      >
                        <User className="w-5 h-5 transition-colors duration-300" />
                        <span className="font-medium text-sm">
                          {currentT.profile.profile}
                        </span>
                        <ChevronRightIcon className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>

                      {/* Settings */}
                      <button
                        onClick={() => handleProfileMenuClick("settings")}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-700 hover:bg-teal-500 hover:text-white transition-all duration-300 group cursor-pointer"
                      >
                        <Settings className="w-5 h-5 transition-colors duration-300" />
                        <span className="font-medium text-sm">
                          {currentT.profile.settings}
                        </span>
                        <ChevronRightIcon className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>

                      {/* Divider */}
                      <div className="border-t border-slate-200/50 my-2"></div>

                      {/* Logout */}
                      <button
                        onClick={() => handleProfileMenuClick("logout")}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 group cursor-pointer"
                      >
                        <LogOut className="w-5 h-5 transition-colors duration-300" />
                        <span className="font-medium text-sm">
                          {currentT.profile.logout}
                        </span>
                        <ChevronRightIcon className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      {/* Click outside to close dropdowns */}
      {(showProfileDropdown || showSearchResults) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowProfileDropdown(false);
            setShowSearchResults(false);
          }}
        />
      )}
    </div>
  );
};

export default GlobalLayout;
