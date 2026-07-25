import React from 'react';
import "./Header.css";
import { Bell, GraduationCap } from 'lucide-react';

interface HeaderProps {
  unreadCount: number;
  onToggleNotifications: () => void;
}

const Header: React.FC<HeaderProps> = ({
  unreadCount,
  onToggleNotifications,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* 🔙 BACK BUTTON — exact match to login project */}
<button
  onClick={() => window.history.back()}
  className="header-back-btn"
  aria-label="Go Back"
>
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#374151"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
</button>





          {/* Logo Component */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-teal-400 rounded-xl shadow-md flex items-center justify-center border border-blue-100 overflow-hidden shrink-0">
            <GraduationCap className="absolute top-1.5 text-white w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm stroke-[2.5px]" />
            <span className="absolute bottom-0.5 sm:bottom-1 text-amber-300 font-bold text-base sm:text-lg drop-shadow-sm leading-none font-sans">₹</span>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
              Scholarship Sahayata
            </h1>
            <span className="hidden sm:block text-xs text-gray-500 font-medium">
              Aadhaar-DBT Awareness Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative ml-1">
            <button
              onClick={onToggleNotifications}
              className="relative p-3 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse-fast">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
