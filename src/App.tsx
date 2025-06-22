import React, { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import AuthPage from "./components/AuthPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import TermsPage from "./components/TermsPage";
import PrivacyPage from "./components/PrivacyPage";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
import SettingsPage from "./components/SettingsPage";
import SearchPage from "./components/SearchPage";
import NotificationsPage from "./components/NotificationsPage";
import GlobalLayout from "./components/GlobalLayout";

// Sidebar Pages
import UsersPage from "./components/pages/UsersPage";
import EmployeesPage from "./components/pages/EmployeesPage";
import CustomersPage from "./components/pages/CustomersPage";
import SuppliersPage from "./components/pages/SuppliersPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import ActiveProjectsPage from "./components/pages/ActiveProjectsPage";
import CompletedProjectsPage from "./components/pages/CompletedProjectsPage";
import ArchivedProjectsPage from "./components/pages/ArchivedProjectsPage";

import FinancePage from "./components/pages/FinancePage";
import InvoicesPage from "./components/pages/InvoicesPage";
import PaymentsPage from "./components/pages/PaymentsPage";
import ExpensesPage from "./components/pages/ExpensesPage";
import OrdersPage from "./components/pages/OrdersPage";
import CommunicationsPage from "./components/pages/CommunicationsPage";
import MessagesPage from "./components/pages/MessagesPage";
import MeetingsPage from "./components/pages/MeetingsPage";
import DocumentsPage from "./components/pages/DocumentsPage";

import DoorEntryPage from "./components/pages/DoorEntryPage";
import DoorExitPage from "./components/pages/DoorExitPage";

import { AppearanceProvider } from "./components/AppearanceProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  LanguageProvider,
  useLanguageContext,
} from "./components/LanguageProvider";
import { Language } from "./types";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone: string;
}

type PageType =
  | "welcome"
  | "auth"
  | "forgot-password"
  | "terms"
  | "privacy"
  | "dashboard"
  | "profile"
  | "settings"
  | "search"
  | "notifications"
  // Users
  | "users"
  | "employees"
  | "customers"
  | "suppliers"
  // Projects
  | "projects"
  | "active-projects"
  | "completed-projects"
  | "archived-projects"
  // Tasks
  | "tasks"
  | "pending-tasks"
  | "in-progress-tasks"
  // Finance
  | "finance"
  | "invoices"
  | "payments"
  | "expenses"
  | "orders"
  // Communications
  | "communications"
  | "messages"
  | "meetings"
  | "documents"
  // Door Access
  | "door-entry"
  | "door-exit"
  // System
  | "system"
  | "security"
  | "integrations"
  | "backup"
  | "system-settings";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>("welcome");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { language, changeLanguage } = useLanguageContext();

  const handleLanguageSelect = (selectedLanguage: Language) => {
    changeLanguage(selectedLanguage);
    setCurrentPage("auth");
  };

  const handleBackToWelcome = () => {
    setCurrentPage("welcome");
  };

  const handleForgotPassword = () => {
    setCurrentPage("forgot-password");
  };

  const handleBackToAuth = () => {
    setCurrentPage("auth");
  };

  const handleShowTerms = () => {
    setCurrentPage("terms");
  };

  const handleShowPrivacy = () => {
    setCurrentPage("privacy");
  };

  const handleBackFromTermsOrPrivacy = () => {
    setCurrentPage("auth");
  };

  const handleLogin = (userData: UserInfo) => {
    setUserInfo(userData);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUserInfo(null);
    setCurrentPage("welcome");
    setSearchQuery("");
  };

  const handleShowProfile = () => {
    setCurrentPage("profile");
  };

  const handleShowSettings = () => {
    setCurrentPage("settings");
  };

  const handleShowSearch = (query?: string) => {
    if (query) {
      setSearchQuery(query);
    }
    setCurrentPage("search");
  };

  const handleShowNotifications = () => {
    setCurrentPage("notifications");
  };

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard");
    setSearchQuery("");
  };

  const handleUpdateProfile = (updatedInfo: UserInfo) => {
    setUserInfo(updatedInfo);
  };

  // Sidebar navigation handlers
  const handleNavigateToPage = (page: PageType) => {
    setCurrentPage(page);
  };

  // Pages that don't need the global layout (auth flow)
  const authPages = ["welcome", "auth", "forgot-password", "terms", "privacy"];
  const isAuthPage = authPages.includes(currentPage);

  // Render auth pages without layout
  if (isAuthPage) {
    return (
      <>
        {currentPage === "welcome" && (
          <WelcomePage onLanguageSelect={handleLanguageSelect} />
        )}
        {currentPage === "auth" && (
          <AuthPage
            language={language}
            onBack={handleBackToWelcome}
            onForgotPassword={handleForgotPassword}
            onShowTerms={handleShowTerms}
            onShowPrivacy={handleShowPrivacy}
            onLogin={handleLogin}
          />
        )}
        {currentPage === "forgot-password" && (
          <ForgotPasswordPage language={language} onBack={handleBackToAuth} />
        )}
        {currentPage === "terms" && (
          <TermsPage
            language={language}
            onBack={handleBackFromTermsOrPrivacy}
          />
        )}
        {currentPage === "privacy" && (
          <PrivacyPage
            language={language}
            onBack={handleBackFromTermsOrPrivacy}
          />
        )}
      </>
    );
  }

  // Render main app pages with global layout
  if (!userInfo) {
    return null; // This shouldn't happen, but just in case
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            language={language}
            userInfo={userInfo}
            onLogout={handleLogout}
            onShowProfile={handleShowProfile}
            onShowSettings={handleShowSettings}
            onShowSearch={handleShowSearch}
            onShowNotifications={handleShowNotifications}
            onNavigateToPage={handleNavigateToPage}
          />
        );

      case "profile":
        return (
          <ProfilePage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onUpdateProfile={handleUpdateProfile}
            onLogout={handleLogout}
          />
        );

      case "settings":
        return (
          <SettingsPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "search":
        return (
          <SearchPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
            initialSearchQuery={searchQuery}
          />
        );

      case "notifications":
        return (
          <NotificationsPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      // Users Pages
      case "users":
        return (
          <UsersPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
            onNavigateToPage={handleNavigateToPage}
          />
        );

      case "employees":
        return (
          <EmployeesPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "customers":
        return (
          <CustomersPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "suppliers":
        return (
          <SuppliersPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      // Projects Pages
      case "projects":
        return (
          <ProjectsPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
            onNavigateToPage={handleNavigateToPage}
          />
        );

      case "active-projects":
        return (
          <ActiveProjectsPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "completed-projects":
        return (
          <CompletedProjectsPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "archived-projects":
        return (
          <ArchivedProjectsPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      // Tasks Pages
      case "tasks":
        return (
          <TasksPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
            onNavigateToPage={handleNavigateToPage}
          />
        );

      case "pending-tasks":
        return (
          <PendingTasksPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "in-progress-tasks":
        return (
          <InProgressTasksPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      // Finance Pages
      case "finance":
        return (
          <FinancePage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
            onNavigateToPage={handleNavigateToPage}
          />
        );

      case "invoices":
        return (
          <InvoicesPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "payments":
        return (
          <PaymentsPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "expenses":
        return (
          <ExpensesPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "orders":
        return (
          <OrdersPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      // Communications Pages
      case "communications":
        return (
          <CommunicationsPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
            onNavigateToPage={handleNavigateToPage}
          />
        );

      case "messages":
        return (
          <MessagesPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "meetings":
        return (
          <MeetingsPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "documents":
        return (
          <DocumentsPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      // Door Access Pages
      case "door-entry":
        return <DoorEntryPage />;

      case "door-exit":
        return <DoorExitPage />;

      // System Pages
      case "system":
        return (
          <SystemPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
            onNavigateToPage={handleNavigateToPage}
          />
        );

      case "security":
        return (
          <SecurityPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "integrations":
        return (
          <IntegrationsPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "backup":
        return (
          <BackupPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      case "system-settings":
        return (
          <SystemSettingsPage
            language={language}
            userInfo={userInfo}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        );

      default:
        return (
          <Dashboard
            language={language}
            userInfo={userInfo}
            onLogout={handleLogout}
            onShowProfile={handleShowProfile}
            onShowSettings={handleShowSettings}
            onShowSearch={handleShowSearch}
            onShowNotifications={handleShowNotifications}
            onNavigateToPage={handleNavigateToPage}
          />
        );
    }
  };

  return (
    <GlobalLayout
      language={language}
      userInfo={userInfo}
      onLogout={handleLogout}
      onShowProfile={handleShowProfile}
      onShowSettings={handleShowSettings}
      onShowSearch={handleShowSearch}
      onShowNotifications={handleShowNotifications}
      onNavigateToPage={handleNavigateToPage}
    >
      {renderPageContent()}
    </GlobalLayout>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppearanceProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AppearanceProvider>
    </LanguageProvider>
  );
}

export default App;
