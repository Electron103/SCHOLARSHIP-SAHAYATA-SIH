import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  ArrowLeft,
  GraduationCap,
  IndianRupee,
  Globe,
  User as UserIcon,
  LogOut,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, Language } from '../translations';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onNotificationClick: () => void;
  notificationCount: number;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
  user?: User | null;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  onNotificationClick,
  notificationCount,
  showBack = false,
  onBack,
  title,
  user,
  onLogout,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showUserMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const toggleLangMenu = () => {
    setShowLangMenu(!showLangMenu);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    setShowLangMenu(false);
  };

  const handleLangSelect = (lang: Language) => {
    setLanguage(lang);
    setShowLangMenu(false);
  };

  const handleSignOut = () => {
    if (onLogout) {
      onLogout();
      setShowUserMenu(false);
    } else {
      window.location.reload();
    }
  };

  // UPDATED BACK BUTTON: call parent's onBack first (for internal nav),
  // then fallback to browser history, and finally to a safe frontpage replace.
  const handleBackClick = () => {
    // 1) Prefer parent-provided onBack for internal SPA navigation (e.g., login nav stack)
    if (typeof onBack === 'function') {
      try {
        onBack();
        return;
      } catch (err) {
        // If onBack throws, log and fall through to other fallbacks.
        // eslint-disable-next-line no-console
        console.error('Layout onBack() threw:', err);
      }
    }

    // 2) Fallback: use browser history if it seems useful
    try {
      if (window.history && window.history.length > 1) {
        window.history.back();
        return;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('history.back() failed:', err);
    }

    // 3) Last-resort: navigate to frontpage using replace so we don't add another history entry
    try {
      window.location.replace('http://localhost:4174');
    } catch (err) {
      // If replace fails, try assign as a final fallback
      // eslint-disable-next-line no-console
      console.error('location.replace failed, trying assign:', err);
      try {
        window.location.assign('http://localhost:4174');
      } catch (e) {
        // give up silently
        // eslint-disable-next-line no-console
        console.error('location.assign also failed:', e);
      }
    }
  };

  const handleNotificationClick = () => {
    if (typeof onNotificationClick === 'function') {
      onNotificationClick();
      return;
    }

    // default behaviour: open /notifications in the same app (adjust if needed)
    try {
      window.location.href = '/notifications';
    } catch (err) {
      // ignore
      // eslint-disable-next-line no-console
      console.warn('opening notifications failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#FF993315_0%,#ffffff_50%,#13880815_100%)] text-gray-800 flex flex-col relative overflow-hidden font-sans">
      
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-orange-400/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-green-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] shadow-sm z-50" />

      {/* Header */}
      <header className="flex justify-between items-center p-4 md:px-8 bg-white/70 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 shadow-sm transition-all">
        
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              type="button"
              onClick={handleBackClick}
              aria-label="Go back"
              title="Go back"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            >
              <ArrowLeft size={24} />
            </button>
          )}

          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-1.5 rounded-lg shadow-sm flex items-center justify-center relative">
              <GraduationCap size={20} />
              <IndianRupee
                size={12}
                className="absolute -bottom-1 -right-1 text-yellow-300 bg-blue-800 rounded-full p-0.5 border border-white"
              />
            </div>

            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-green-600">
              {title || t('app_title')}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">

          {/* Profile Menu */}
          {user && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu}
                className="p-2 hover:bg-orange-50 rounded-full transition-colors flex items-center gap-2 group border border-transparent hover:border-orange-100"
                title="User Profile"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-sm">
                  <UserIcon size={16} />
                </div>
                <ChevronDown
                  size={14}
                  className="text-gray-400 group-hover:text-gray-600 transition-colors"
                />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in origin-top-right">
                  
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white">
                    <p className="text-xs opacity-80 uppercase tracking-wider font-semibold mb-1">
                      {t('user_profile')}
                    </p>
                    <h3 className="font-bold text-xl truncate">{user.name}</h3>
                  </div>

                  <div className="bg-white">

                    {/* Phone */}
                    <div className="px-5 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                        Phone Number
                      </p>
                      <p className="font-medium text-gray-800">+91 {user.phone}</p>
                    </div>

                    {/* State & City */}
                    <div className="flex border-b border-gray-50">
                      <div className="w-1/2 px-5 py-3 border-r border-gray-50 hover:bg-gray-50 transition-colors">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                          State
                        </p>
                        <p className="font-medium text-gray-800">{user.state || '-'}</p>
                      </div>
                      <div className="w-1/2 px-5 py-3 hover:bg-gray-50 transition-colors">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                          City
                        </p>
                        <p className="font-medium text-gray-800">{user.city || '-'}</p>
                      </div>
                    </div>

                    {/* Caste */}
                    <div className="px-5 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                        Caste/Category
                      </p>
                      <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md text-sm font-bold mt-1">
                        {user.caste || '-'}
                      </span>
                    </div>

                    {/* Aadhaar */}
                    {user.aadhaar && (
                      <div className="px-5 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                          Aadhaar Linked
                        </p>
                        <p className="font-mono font-medium text-gray-800 tracking-wider">
                          xxxx-xxxx-{user.aadhaar.slice(-4)}
                        </p>
                      </div>
                    )}

                    {/* DBT Status */}
                    {user.dbtStatus !== undefined && (
                      <div
                        className={`px-5 py-3 border-b border-gray-50 transition-colors ${
                          user.dbtStatus ? 'bg-green-50/50' : 'bg-red-50/50'
                        }`}
                      >
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                          Aadhaar DBT Status
                        </p>
                        <div className="flex items-center gap-2">
                          {user.dbtStatus ? (
                            <>
                              <CheckCircle size={16} className="text-green-600" />
                              <span className="font-bold text-green-700 text-sm">DBT Verified</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle size={16} className="text-red-500" />
                              <span className="font-bold text-red-600 text-sm">Not Linked</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="p-3 bg-gray-50">
                      <button
                        onClick={handleSignOut}
                        className="w-full py-2 px-4 rounded-lg border border-gray-200 text-gray-600 hover:bg-white hover:text-red-600 hover:border-red-200 transition-all text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={toggleLangMenu}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 text-gray-600 hover:text-orange-600"
              title="Change Language"
            >
              <Globe size={24} />
              <span className="hidden md:inline text-sm font-medium uppercase">
                {language}
              </span>
            </button>

            {showLangMenu && (
              <>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLangSelect(lang.code)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-orange-50 transition-colors flex justify-between items-center ${
                          language === lang.code
                            ? 'bg-orange-50 font-bold text-orange-600'
                            : 'text-gray-700'
                        }`}
                      >
                        <span>{lang.name}</span>
                        <span className="text-xs text-gray-400">{lang.nativeName}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className="fixed inset-0 z-30 bg-transparent"
                  onClick={() => setShowLangMenu(false)}
                />
              </>
            )}
          </div>

          {/* Notification Icon */}
          {/* Notification Text Instead of Icon */}
<button
  type="button"
  onClick={onNotificationClick}
  aria-label="Open notifications"
  title="Open notifications"
  className="px-2 py-1 text-gray-700 font-medium underline underline-offset-4 hover:text-orange-600 transition-colors relative"
>
  Notifications

  {notificationCount > 0 && (
    <span className="absolute -top-1 -right-3 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full animate-bounce">
      {notificationCount}
    </span>
  )}
</button>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col p-4 md:p-6 w-full max-w-7xl mx-auto relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500 text-sm bg-white/40 backdrop-blur-sm relative z-10">
        © 2025 {t('app_title')}. A Government Benefit Initiative.
      </footer>
    </div>
  );
};

export default Layout;
