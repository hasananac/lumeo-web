import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  DoorClosed,
  LogOut,
  Eye,
  MoreHorizontal,
  Download,
} from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

const DoorExitPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const translations = {
    tr: {
      title: "Kapı Çıkış Kayıtları",
      subtitle: "Tüm çıkış kayıtlarını görüntüleyin ve yönetin",
      search: "Çıkış kayıtlarında ara...",
      filters: {
        all: "Tümü",
        today: "Bugün",
        thisWeek: "Bu Hafta",
        thisMonth: "Bu Ay",
      },
      table: {
        time: "Çıkış Saati",
        person: "Kişi",
        cardId: "Kart ID",
        location: "Kapı/Konum",
        status: "Durum",
        actions: "İşlemler",
      },
      status: {
        successful: "Başarılı",
        denied: "Reddedildi",
        unauthorized: "Yetkisiz",
      },
      actions: {
        view: "Detayları Görüntüle",
        export: "Dışa Aktar",
        refresh: "Yenile",
      },
      stats: {
        totalExits: "Toplam Çıkış",
        todayExits: "Bugünkü Çıkış",
        successRate: "Başarı Oranı",
        activeCards: "Aktif Kartlar",
      },
    },
    en: {
      title: "Door Exit Records",
      subtitle: "View and manage all exit records",
      search: "Search exit records...",
      filters: {
        all: "All",
        today: "Today",
        thisWeek: "This Week",
        thisMonth: "This Month",
      },
      table: {
        time: "Exit Time",
        person: "Person",
        cardId: "Card ID",
        location: "Door/Location",
        status: "Status",
        actions: "Actions",
      },
      status: {
        successful: "Successful",
        denied: "Denied",
        unauthorized: "Unauthorized",
      },
      actions: {
        view: "View Details",
        export: "Export",
        refresh: "Refresh",
      },
      stats: {
        totalExits: "Total Exits",
        todayExits: "Today's Exits",
        successRate: "Success Rate",
        activeCards: "Active Cards",
      },
    },
  };

  const currentT = translations[language];

  // Mock data for exit records
  const exitRecords = [
    {
      id: 1,
      time: "17:45:22",
      date: "2024-01-15",
      person: "Ahmet Yılmaz",
      cardId: "C001234",
      location: "Ana Çıkış - Kapı 1",
      status: "successful",
    },
    {
      id: 2,
      time: "18:12:15",
      date: "2024-01-15",
      person: "Fatma Kaya",
      cardId: "C001567",
      location: "Yan Çıkış - Kapı 2",
      status: "successful",
    },
    {
      id: 3,
      time: "18:30:45",
      date: "2024-01-15",
      person: "Mehmet Demir",
      cardId: "C001890",
      location: "Ana Çıkış - Kapı 1",
      status: "successful",
    },
    {
      id: 4,
      time: "19:05:33",
      date: "2024-01-15",
      person: "Ayşe Şahin",
      cardId: "C002123",
      location: "Personel Çıkışı - Kapı 3",
      status: "successful",
    },
    {
      id: 5,
      time: "19:22:08",
      date: "2024-01-15",
      person: "Can Özkan",
      cardId: "C002456",
      location: "Ana Çıkış - Kapı 1",
      status: "denied",
    },
  ];

  const stats = [
    {
      title: currentT.stats.totalExits,
      value: "1,189",
      change: "+10%",
      positive: true,
    },
    {
      title: currentT.stats.todayExits,
      value: "42",
      change: "+5%",
      positive: true,
    },
    {
      title: currentT.stats.successRate,
      value: "96.2%",
      change: "+1.8%",
      positive: true,
    },
    {
      title: currentT.stats.activeCards,
      value: "156",
      change: "+3",
      positive: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "bg-green-100 text-green-800";
      case "denied":
        return "bg-red-100 text-red-800";
      case "unauthorized":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center space-x-2">
            <DoorClosed className="w-6 h-6 text-teal-600" />
            <span>{currentT.title}</span>
          </h1>
          <p className="text-slate-600 mt-1">{currentT.subtitle}</p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>{currentT.actions.export}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass-card p-6 rounded-xl border border-slate-200/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`text-sm font-medium ${stat.positive ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-6 rounded-xl border border-slate-200/50">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={currentT.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">{currentT.filters.all}</option>
              <option value="today">{currentT.filters.today}</option>
              <option value="thisWeek">{currentT.filters.thisWeek}</option>
              <option value="thisMonth">{currentT.filters.thisMonth}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exit Records Table */}
      <div className="glass-card rounded-xl border border-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {currentT.table.time}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {currentT.table.person}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {currentT.table.cardId}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {currentT.table.location}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {currentT.table.status}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {currentT.table.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {exitRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">
                        {record.time}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-900">
                        {record.person}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600 font-mono">
                      {record.cardId}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600">
                      {record.location}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}
                    >
                      {
                        currentT.status[
                          record.status as keyof typeof currentT.status
                        ]
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-teal-600 hover:text-teal-700 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoorExitPage;
