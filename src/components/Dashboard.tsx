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
  Door,
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
} from "lucide-react";
import { Language } from "../types";

interface DashboardProps {
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
}

const Dashboard: React.FC<DashboardProps> = ({
  language,
  userInfo,
  onLogout,
  onShowProfile,
  onShowSettings,
  onShowSearch,
  onShowNotifications,
  onNavigateToPage,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const t = {
    tr: {
      dashboard: {
        title: "İş Merkezi",
        welcome: "Hoş geldiniz",
        overview: "Genel Bakış",
        quickActions: "Hızlı İşlemler",
        recentActivity: "Son Aktiviteler",
        stats: {
          totalProjects: "Toplam Proje",
          activeTasks: "Aktif Görev",
          teamMembers: "Takım Üyesi",
          completedTasks: "Tamamlanan Görev",
        },
      },
    },
    en: {
      dashboard: {
        title: "Business Hub",
        welcome: "Welcome",
        overview: "Overview",
        quickActions: "Quick Actions",
        recentActivity: "Recent Activity",
        stats: {
          totalProjects: "Total Projects",
          activeTasks: "Active Tasks",
          teamMembers: "Team Members",
          completedTasks: "Completed Tasks",
        },
      },
    },
  };

  const currentT = t[language];

  return (
    <div className="flex p-4 sm:p-6 gap-6">
      {/* Main Dashboard Content */}
      <div
        className={`flex-1 transition-all duration-1000 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
      >
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {currentT.dashboard.welcome}, {userInfo.firstName}
          </h2>
          <p className="text-slate-600">{currentT.dashboard.overview}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: currentT.dashboard.stats.totalProjects,
              value: "24",
              icon: Target,
              color: "from-blue-400 to-blue-500",
              change: "+12%",
              action: () => onNavigateToPage("projects"),
            },
            {
              title: currentT.dashboard.stats.activeTasks,
              value: "156",
              icon: CheckCircle,
              color: "from-emerald-400 to-emerald-500",
              change: "+8%",
              action: () => onNavigateToPage("tasks"),
            },
            {
              title: currentT.dashboard.stats.teamMembers,
              value: "32",
              icon: Users,
              color: "from-purple-400 to-purple-500",
              change: "+3%",
              action: () => onNavigateToPage("users"),
            },
            {
              title: currentT.dashboard.stats.completedTasks,
              value: "89",
              icon: TrendingUp,
              color: "from-amber-400 to-amber-500",
              change: "+15%",
              action: () => onNavigateToPage("tasks"),
            },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <button
                key={index}
                onClick={stat.action}
                className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-emerald-600">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-slate-600">{stat.title}</p>
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              {currentT.dashboard.quickActions}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: "Yeni Proje",
                  icon: Plus,
                  color: "bg-blue-500",
                  action: () => onNavigateToPage("projects"),
                },
                {
                  title: "Görev Ekle",
                  icon: CheckCircle,
                  color: "bg-emerald-500",
                  action: () => onNavigateToPage("tasks"),
                },
                {
                  title: "Fatura Oluştur",
                  icon: FileText,
                  color: "bg-purple-500",
                  action: () => onNavigateToPage("invoices"),
                },
                {
                  title: "Rapor Görüntüle",
                  icon: BarChart3,
                  color: "bg-amber-500",
                  action: () => onNavigateToPage("reports"),
                },
              ].map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-all duration-300 hover:shadow-md group"
                  >
                    <div
                      className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      {action.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              {currentT.dashboard.recentActivity}
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Proje X tamamlandı",
                  time: "2 saat önce",
                  type: "success",
                },
                {
                  title: "Yeni görev atandı",
                  time: "4 saat önce",
                  type: "info",
                },
                {
                  title: "Fatura #1234 ödendi",
                  time: "1 gün önce",
                  type: "success",
                },
                {
                  title: "Toplantı hatırlatması",
                  time: "2 gün önce",
                  type: "warning",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "success"
                        ? "bg-emerald-500"
                        : activity.type === "warning"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      {activity.title}
                    </p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Tips Panel */}
      <div className="w-64 flex-shrink-0">
        <div className="sticky top-6">
          <div className="glass-card rounded-2xl p-4 border border-slate-200/50 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-teal-100 hover:scrollbar-thumb-teal-600">
            {/* Header */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  {language === "tr" ? "Kullanım İpuçları" : "Usage Tips"}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === "tr" ? "Hızlı Başlangıç" : "Quick Start"}
                </p>
              </div>
            </div>

            {/* Tips List */}
            <div className="space-y-3">
              {[
                {
                  icon: Target,
                  title:
                    language === "tr"
                      ? "Yeni Proje Başlat"
                      : "Start New Project",
                  desc:
                    language === "tr"
                      ? '"Yeni Proje" butonuna tıklayın ve hedeflerinizi belirleyin. Proje şablonları kullanarak zamandan tasarruf edin.'
                      : 'Click "New Project" and set your goals. Use project templates to save time.',
                  color: "bg-blue-500",
                  badge: language === "tr" ? "Temel" : "Basic",
                },
                {
                  icon: BarChart3,
                  title:
                    language === "tr"
                      ? "Performans Takibi"
                      : "Performance Tracking",
                  desc:
                    language === "tr"
                      ? "İstatistik kartlarındaki sayılara tıklayarak detaylı analiz ve grafiklere ulaşabilirsiniz."
                      : "Click on statistics cards numbers for detailed analytics and charts.",
                  color: "bg-emerald-500",
                  badge: language === "tr" ? "Önemli" : "Important",
                },
                {
                  icon: Users,
                  title:
                    language === "tr" ? "Ekip Yönetimi" : "Team Management",
                  desc:
                    language === "tr"
                      ? 'Sol menüden "Çalışanlar" bölümüne giderek ekip üyelerinizi yönetebilir, yetkilendirmeler yapabilirsiniz.'
                      : 'Go to "Employees" from left menu to manage team members and permissions.',
                  color: "bg-purple-500",
                  badge: language === "tr" ? "Gelişmiş" : "Advanced",
                },
                {
                  icon: Bell,
                  title:
                    language === "tr"
                      ? "Akıllı Bildirimler"
                      : "Smart Notifications",
                  desc:
                    language === "tr"
                      ? "Sağ üstteki zil simgesi size önemli olayları bildirir. Bildirimleri filtreleyebilir ve öncelik verebilirsiniz."
                      : "Bell icon shows important events. You can filter and prioritize notifications.",
                  color: "bg-amber-500",
                  badge: language === "tr" ? "İpucu" : "Tip",
                },
                {
                  icon: Search,
                  title: language === "tr" ? "Küresel Arama" : "Global Search",
                  desc:
                    language === "tr"
                      ? "Üst arama çubuğuna yazarak projeler, görevler, kişiler ve dosyalarda arama yapabilirsiniz."
                      : "Use top search bar to find projects, tasks, people and files instantly.",
                  color: "bg-teal-500",
                  badge: language === "tr" ? "Pro" : "Pro",
                },
                {
                  icon: Settings,
                  title:
                    language === "tr" ? "Kişiselleştirme" : "Customization",
                  desc:
                    language === "tr"
                      ? "Sağ üst profil menüsünden ayarlara girerek tema, dil ve bildirim tercihlerinizi değiştirebilirsiniz."
                      : "Access settings from top-right profile menu to change theme, language and notification preferences.",
                  color: "bg-slate-500",
                  badge: language === "tr" ? "Ayar" : "Setup",
                },
                {
                  icon: Briefcase,
                  title: language === "tr" ? "İş Akışları" : "Workflows",
                  desc:
                    language === "tr"
                      ? 'Sol menüdeki "İşler" bölümünden iş süreçlerinizi otomatikleştirebilir ve şablonlar oluşturabilirsiniz.'
                      : 'Use "Jobs" section from left menu to automate workflows and create templates.',
                  color: "bg-indigo-500",
                  badge: language === "tr" ? "Otomasyon" : "Automation",
                },
              ].map((tip, index) => {
                const IconComponent = tip.icon;
                return (
                  <div
                    key={index}
                    className="p-3 bg-gradient-to-r from-white to-slate-50/80 rounded-lg border border-slate-200/40 hover:shadow-lg hover:border-teal-300/60 hover:bg-gradient-to-r hover:from-teal-50/30 hover:to-slate-50/80 transition-all duration-300 group cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-start space-x-2">
                      <div
                        className={`w-6 h-6 ${tip.color} rounded-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-xs font-semibold text-slate-800">
                            {tip.title}
                          </h4>
                          <span
                            className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
                              tip.badge === "Temel" || tip.badge === "Basic"
                                ? "bg-blue-100 text-blue-700"
                                : tip.badge === "Önemli" ||
                                    tip.badge === "Important"
                                  ? "bg-green-100 text-green-700"
                                  : tip.badge === "Gelişmiş" ||
                                      tip.badge === "Advanced"
                                    ? "bg-purple-100 text-purple-700"
                                    : tip.badge === "Pro"
                                      ? "bg-teal-100 text-teal-700"
                                      : tip.badge === "İpucu" ||
                                          tip.badge === "Tip"
                                        ? "bg-amber-100 text-amber-700"
                                        : tip.badge === "Ayar" ||
                                            tip.badge === "Setup"
                                          ? "bg-slate-100 text-slate-700"
                                          : "bg-indigo-100 text-indigo-700"
                            }`}
                          >
                            {tip.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {tip.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-slate-200/50">
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-2">
                  {language === "tr"
                    ? "Bu ipuçları güncellenecektir"
                    : "Tips will be updated"}
                </p>
                <button className="w-full py-2 text-xs text-teal-600 hover:text-white hover:bg-teal-600 border border-teal-200 hover:border-teal-600 rounded-lg font-medium transition-all duration-200">
                  {language === "tr" ? "📚 Detaylı Rehber" : "📚 Full Guide"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
