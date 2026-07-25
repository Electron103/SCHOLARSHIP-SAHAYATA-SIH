import React from 'react';
import { ArrowLeftCircle } from 'lucide-react';
import { LANGUAGES } from '../constants';

interface HeaderProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
  canGoBack?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLangChange,
  canGoBack = false,
  onBack = () => {},
}) => {
  return (
    <header
      className="flex items-center justify-between px-6 py-3 shadow-sm 
                 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200"
    >
      <div className="flex items-center gap-3">
        {canGoBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 
                       transition-all hover:scale-105"
            title="Go Back"
            aria-label="Go Back"
          >
            <ArrowLeftCircle size={28} />
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </button>
        )}
      </div>

      <div className="hidden sm:flex items-center justify-center flex-grow">
        <h1 className="text-lg font-semibold text-slate-700 tracking-wide">
          Scholarship Aadhaar DBT Form Assistant
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Visually hidden label + accessible attributes to satisfy axe */}
        <label htmlFor="language-select" className="sr-only">
          Select interface language
        </label>

        <select
          id="language-select"
          value={currentLang}
          onChange={(e) => onLangChange(e.target.value)}
          aria-label="Select interface language"
          title="Select interface language"
          className="border border-gray-300 rounded-md px-2 py-1 text-sm 
                     bg-white shadow-sm hover:border-indigo-500 focus:outline-none"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName}
            </option>
          ))}
        </select>

        {/* RIGHT-SIDE LOGIN / AVATAR REMOVED (arrow icon, "Back to Login" and avatar) */}
      </div>
    </header>
  );
};

export default Header;
