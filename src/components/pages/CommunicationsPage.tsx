import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare, Search, Plus, Mail, Video, FileText, Calendar, Users, Send } from 'lucide-react';
import { Language } from '../../types';

interface CommunicationsPageProps {
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
  onNavigateToPage: (page: string) => void;
}

const CommunicationsPage: React.FC<CommunicationsPageProps> = ({ 
  language, 
  userInfo, 
  onBack, 
  onLogout,
  onNavigateToPage
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const t = {
    tr: {
      communications: {
        title: 'İletişim Merkezi',
        subtitle: 'İletişim kanallarınızı yönetin',
        quickActions: {
          messages: 'Mesajlar',
          meetings: 'Toplantılar',
          documents: 'Belgeler',
          messagesDesc: 'Mesajlaşma ve iletişim',
          meetingsDesc: 'Toplantı planlama ve yönetimi',
          documentsDesc: 'Belge paylaşımı ve yönetimi'
        },
        stats: {
          totalMessages: 'Toplam Mesaj',
          unreadMessages: 'Okunmamış',
          scheduledMeetings: 'Planlı Toplantı',
          sharedDocuments: 'Paylaşılan Belge'
        }
      }
    },
    en: {
      communications: {
        title: 'Communication Center',
        subtitle: 'Manage your communication channels',
        quickActions: {
          messages: 'Messages',
          meetings: 'Meetings',
          documents: 'Documents',
          messagesDesc: 'Messaging and communication',
          meetingsDesc: 'Meeting planning and management',
          documentsDesc: 'Document sharing and management'
        },
        stats: {
          totalMessages: 'Total Messages',
          unreadMessages: 'Unread',
          scheduledMeetings: 'Scheduled Meetings',
          sharedDocuments: 'Shared Documents'
        }
      }
    }
  };

  const currentT = t[language];

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
                {language === 'tr' ? 'Dashboard\'a Dön' : 'Back to Dashboard'}
              </span>
            </button>
            
            <h1 className="text-xl font-bold text-slate-800">{currentT.communications.title}</h1>
            
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentT.communications.title}</h1>
            <p className="text-slate-600">{currentT.communications.subtitle}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => onNavigateToPage('messages')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">28</p>
                  <p className="text-sm text-slate-600">{currentT.communications.stats.totalMessages}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('messages')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">5</p>
                  <p className="text-sm text-slate-600">{currentT.communications.stats.unreadMessages}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('meetings')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">3</p>
                  <p className="text-sm text-slate-600">{currentT.communications.stats.scheduledMeetings}</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigateToPage('documents')}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-left w-full"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">12</p>
                  <p className="text-sm text-slate-600">{currentT.communications.stats.sharedDocuments}</p>
                </div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => onNavigateToPage('messages')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.communications.quickActions.messages}</h3>
              <p className="text-sm text-slate-600">{currentT.communications.quickActions.messagesDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-blue-600">5</span>
                <span className="text-xs text-slate-500">Yeni mesaj</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateToPage('meetings')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.communications.quickActions.meetings}</h3>
              <p className="text-sm text-slate-600">{currentT.communications.quickActions.meetingsDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
                <span className="text-xs text-slate-500">Bugün</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateToPage('documents')}
              className="glass-card rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{currentT.communications.quickActions.documents}</h3>
              <p className="text-sm text-slate-600">{currentT.communications.quickActions.documentsDesc}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-emerald-600">12</span>
                <span className="text-xs text-slate-500">Paylaşılan</span>
              </div>
            </button>
          </div>

          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentT.communications.title}</h2>
            <p className="text-slate-600">{currentT.communications.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationsPage;