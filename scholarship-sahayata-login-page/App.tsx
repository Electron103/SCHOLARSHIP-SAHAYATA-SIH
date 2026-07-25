// App.tsx  — login app (paste into your login app, replace file)
// Minor additions: debug logs and window.forceReturnToFront helper.
// Everything else kept identical to your previous file.

console.log("ENV ➜", import.meta.env.VITE_STUDENT_NOTIFICATION_URL);
import React, { useState, useCallback, useEffect } from 'react';
import Layout from './components/Layout';
import LoginView from './components/LoginView';
import OtpView from './components/OtpView';
import AadhaarView from './components/AadhaarView';
import DbtStatusView from './components/DbtStatusView';
import ReadMeView from './components/ReadMeView';
import VideoView from './components/VideoView';
import AiFormFillerView from './components/AiFormFillerView';
import BankFormView from './components/BankFormView';
import NotificationsView from './components/NotificationsView';
import { AppView, User, NotificationItem } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import ChatBot from "./components/ChatBot";

// ======================================================
//  MAIN APP CONTENT
// ======================================================
const AppContent = () => {
  const { t } = useLanguage();

  // -----------------------
  // NAV STACK + STATE
  // -----------------------
  // initialize with LOGIN as root
  const [navStack, setNavStack] = useState<AppView[]>([AppView.LOGIN]);

  // helper to read current view
  const currentView = navStack[navStack.length - 1];

  // other app state
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');

  // ======================================================
  //  ⭐ RESTORE LAST VIEW AFTER PAGE RELOAD (IMPORTANT ⭐)
  // ======================================================
  useEffect(() => {
    const lastView = sessionStorage.getItem("LAST_VIEW");
    const lastUser = sessionStorage.getItem("LAST_USER");

    if (lastView) {
      if (lastUser) {
        setUser(JSON.parse(lastUser));
        setIsAuthenticated(true);
      }
      // restore stack to single last view
      setNavStack([lastView as unknown as AppView]);

      // clear restore info
      sessionStorage.removeItem("LAST_VIEW");
      sessionStorage.removeItem("LAST_USER");
    }
  }, []);

  // ======================================================
  //  APP LOGIC (unchanged)
  // ======================================================
  const addNotification = useCallback((title: string, message: string) => {
    const newNote: NotificationItem = {
      id: Date.now().toString(),
      title,
      message,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNote, ...prev]);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(false);
  };

  const handleCodeSent = (otpOrResult: any) => {
    if (typeof otpOrResult === 'string') {
      setGeneratedOtp(otpOrResult);
      setConfirmationResult(null);
      addNotification("OTP Sent", t('otp_sent_to') + " mobile. OTP is " + otpOrResult);
    } else {
      setConfirmationResult(otpOrResult);
    }
    // push OTP screen
    navigateTo(AppView.OTP);
  };

  const handleOtpSuccess = () => {
    setIsAuthenticated(true);
    addNotification("Login Successful", `Welcome back, ${user?.name}!`);
    // push Aadhaar screen
    navigateTo(AppView.AADHAAR);
  };

  const handleAadhaarSuccess = (aadhaarNumber: string) => {
    if (user) {
      setUser({ ...user, aadhaar: aadhaarNumber });
    }
    // push DBT status
    navigateTo(AppView.DBT_STATUS);
  };

  const handleDbtStatusResult = useCallback((isEnabled: boolean) => {
    setUser(prevUser => prevUser ? { ...prevUser, dbtStatus: isEnabled } : prevUser);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // reset nav stack to login root
    setNavStack([AppView.LOGIN]);
  };

  // ======================================================
  // NAVIGATION API (stack-based)
  // ======================================================
  const navigateTo = (view: AppView, opts?: { replace?: boolean }) => {
    const replace = opts?.replace ?? false;
    setNavStack(prev => {
      if (replace && prev.length > 0) {
        return [...prev.slice(0, prev.length - 1), view];
      }
      return [...prev, view];
    });
  };

  // ======================================================
  // UPDATED handleBack: pop internal stack if possible;
  // if at root, redirect to frontpage (port 4174) restoring path if available.
  // (Added debug logs)
  // ======================================================
  const FRONT_BASE = 'http://localhost:4174';

  // expose manual helper to force return to front from console (for emergency testing)
  // Usage from browser console: window.forceReturnToFront()
  // (This does same redirect as handleBack root fallback.)
  (window as any).forceReturnToFront = () => {
    try {
      const frontPath = sessionStorage.getItem('FROM_FRONT_PATH') || '';
      const target = frontPath ? `${FRONT_BASE}${frontPath}` : FRONT_BASE;
      try { sessionStorage.removeItem('FROM_FRONT_PATH'); } catch (e) { /* ignore */ }
      console.log('[DEBUG] window.forceReturnToFront ->', target);
      window.location.replace(target);
    } catch (err) {
      console.error('[DEBUG] window.forceReturnToFront failed', err);
      try { window.location.assign(FRONT_BASE); } catch (e) { /* ignore */ }
    }
  };

  const handleBack = () => {
    console.log('[DEBUG] handleBack called, navStack =', navStack);
    try {
      // If there is internal history, pop it
      if (navStack.length > 1) {
        setNavStack(prev => prev.slice(0, prev.length - 1));
        console.log('[DEBUG] popped navStack, new stack =', navStack.slice(0, navStack.length - 1));
        return;
      }

      // At root: perform safe redirect to frontpage (use stored path if any)
      const frontPath = sessionStorage.getItem('FROM_FRONT_PATH') || '';
      const target = frontPath ? `${FRONT_BASE}${frontPath}` : FRONT_BASE;

      // clear saved path to avoid reuse
      try { sessionStorage.removeItem('FROM_FRONT_PATH'); } catch (e) { /* ignore */ }

      console.log('[DEBUG] handleBack -> redirecting to frontpage target =', target);
      // Use replace to avoid adding an extra history entry
      window.location.replace(target);
    } catch (err) {
      // fallback to previous state-manipulation behaviour if something goes wrong
      // eslint-disable-next-line no-console
      console.error('handleBack redirect failed, falling back to navStack logic', err);

      setNavStack(prev => {
        if (prev.length > 1) {
          return prev.slice(0, prev.length - 1);
        }
        const rootView = prev[0] ?? AppView.LOGIN;
        switch (rootView) {
          case AppView.OTP:
          case AppView.AADHAAR:
            return [AppView.LOGIN];
          case AppView.DBT_STATUS:
            return [AppView.AADHAAR];
          case AppView.READ_ME:
          case AppView.VIDEO:
            return [AppView.DBT_STATUS];
          default:
            return [AppView.LOGIN];
        }
      });
    }
  };

  // ======================================================
  //  OPEN AI PROJECT (changed to replace to avoid history pollution)
  // (also add debug log)
  // ======================================================
  const openAiProject = () => {
    const env = (import.meta as any).env || {};
    const aiUrl = env.VITE_AI_PROJECT_URL || env.VITE_AI_FORM_FILLER_URL || '';

    console.log('[DEBUG] openAiProject called, aiUrl =', aiUrl);

    if (!aiUrl) {
      alert('❗ VITE_AI_PROJECT_URL or VITE_AI_FORM_FILLER_URL is missing in your .env file. Please add one and restart the dev server.');
      return;
    }

    try {
      // SAME TAB — safe, no history pollution
      window.location.replace(aiUrl);  // ★ IMPORTANT: replaces current entry
      console.log('[DEBUG] openAiProject -> location.replace called');
    } catch (err) {
      console.error('location.replace failed, using assign fallback', err);
      window.location.assign(aiUrl);
    }
  };

  // ======================================================
  //  ⭐ THIS IS WHERE WE LEAVE THE PROJECT
  // ======================================================
  const handleNotificationClick = () => {
    const notifUrl = import.meta.env.VITE_STUDENT_NOTIFICATION_URL;
    console.log("Redirecting to:", notifUrl);

    if (!notifUrl) {
      alert("VITE_STUDENT_NOTIFICATION_URL is missing!");
      return;
    }

    // save current view + user (so login project can restore)
    sessionStorage.setItem("LAST_VIEW", String(currentView));
    sessionStorage.setItem("LAST_USER", JSON.stringify(user));

    // Redirect preserving history
    window.location.assign(notifUrl);
  };

  // ======================================================
  // SCREEN SWITCHER
  // ======================================================
  const renderContent = () => {
    switch (currentView) {
      case AppView.LOGIN:
        return <LoginView onLogin={handleLogin} onCodeSent={handleCodeSent} />;

      case AppView.OTP:
        return (
          <OtpView
            onSuccess={handleOtpSuccess}
            phone={user?.phone || ''}
            confirmationResult={confirmationResult}
            generatedOtp={generatedOtp}
          />
        );

      case AppView.AADHAAR:
        return <AadhaarView onSuccess={handleAadhaarSuccess} />;

      case AppView.DBT_STATUS:
        return (
          <DbtStatusView
            aadhaar={user?.aadhaar || ''}
            onNavigateToReadMe={() => navigateTo(AppView.READ_ME)}
            onNavigateToVideo={() => navigateTo(AppView.VIDEO)}
            onStatusResult={handleDbtStatusResult}
          />
        );

      case AppView.READ_ME:
        return (
          <ReadMeView
            onAiFormClick={openAiProject}         // <-- open AI project directly
            onBankFormClick={() => navigateTo(AppView.BANK_FORM)}
          />
        );

      case AppView.VIDEO:
        return (
          <VideoView
            onAiFormClick={openAiProject}         // <-- open AI project directly
            onBankFormClick={() => navigateTo(AppView.BANK_FORM)}
          />
        );

      case AppView.AI_FORM_FILLER:
        // keep component available but it won't be used when 'Use AI Form Filler' is clicked
        return <AiFormFillerView />;

      case AppView.AI_FORM_FILLER: // duplicate safe-guard left intentionally (no change)
        return <AiFormFillerView />;

      case AppView.BANK_FORM:
        return <BankFormView />;

      case AppView.NOTIFICATIONS:
        return <NotificationsView notifications={notifications} />;

      default:
        return <LoginView onLogin={handleLogin} onCodeSent={handleCodeSent} />;
    }
  };

  // ======================================================
  // HEADER SETTINGS
  // ======================================================
  const showBack = true;

  const getTitle = () => {
    switch (currentView) {
      case AppView.OTP:            return t('verify_otp');
      case AppView.AADHAAR:        return t('aadhaar_verification');
      case AppView.DBT_STATUS:     return t('check_status');
      case AppView.READ_ME:        return t('read_instructions');
      case AppView.VIDEO:          return t('video_guides');
      case AppView.AI_FORM_FILLER: return t('ai_assistant_title');
      case AppView.BANK_FORM:      return t('download_form');
      case AppView.NOTIFICATIONS:  return t('notifications');
      default:                     return t('app_title');
    }
  };

  // ======================================================
  // FINAL RENDER
  // ======================================================
  return (
    <Layout
      onNotificationClick={handleNotificationClick}
      notificationCount={notifications.filter(n => !n.read).length}
      showBack={showBack}
      onBack={handleBack}
      title={getTitle()}
      user={isAuthenticated ? user : null}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};


// ======================================================
//  WRAPPER WITH LANGUAGE
// ======================================================
function App() {
  return (
    <LanguageProvider>
      <AppContent />
      <ChatBot currentLang="en" />
    </LanguageProvider>
  );
}

export default App;
