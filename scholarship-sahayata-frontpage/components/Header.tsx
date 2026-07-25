// src/components/Header.tsx
import React, { useState } from 'react';
import { Search, User, Settings, X } from 'lucide-react';
import { LANGUAGES, HELPLINES, DICTIONARY } from '../constants';
import { LanguageCode } from '../types';

interface HeaderProps {
  currentLang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  toggleAccessibility: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentLang, setLang, toggleAccessibility }) => {
  // Get dictionary for current language or fallback to English
  const t = DICTIONARY[currentLang] || DICTIONARY['en'];
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm flex flex-col">
      {/* Main Header: Logo, Title, and User Controls */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-5 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Logo Section: Emblem and Ministry Name */}
        <div className="flex items-center gap-5 w-full lg:w-auto justify-center lg:justify-start">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="Ashok Stambh" 
            className="h-20 w-auto hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col text-center lg:text-left">
            <h1 className="text-base md:text-xl font-bold text-tiranga-blue uppercase leading-tight">
              {t.ministryName}
            </h1>
            <h2 className="text-sm md:text-base font-semibold text-gray-600 mt-0.5">
              {t.ministryParent}
            </h2>
            <h3 className="text-xs md:text-sm text-tiranga-saffron font-bold uppercase mt-1 tracking-wider">
              {t.govt}
            </h3>
          </div>
        </div>

        {/* Controls Section: Search, Language, Login, Accessibility */}
        <div className="flex flex-wrap items-center gap-3 justify-center w-full lg:w-auto">
          
          {/* Expandable Search Widget */}
          {isSearchOpen ? (
            <div className="flex items-center gap-2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder}
                  className="w-48 sm:w-56 lg:w-64 pl-3 pr-8 py-2 text-base border border-tiranga-blue rounded-md focus:outline-none focus:ring-2 focus:ring-tiranga-saffron shadow-sm bg-white text-black placeholder-gray-500"
                  autoFocus
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                  aria-label="Close Search"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label="Open Search"
            >
              <Search size={18} />
            </button>
          )}

          {/* Language selector */}
          <select
            title="Select Language"
            value={currentLang}
            onChange={(e) => setLang(e.target.value as LanguageCode)}
            className="appearance-none bg-blue-50 border border-blue-200 text-tiranga-blue py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-tiranga-saffron text-base font-medium"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-tiranga-blue">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>

          {/* Login Button — STORE front path then navigate to login app */}
          <button 
            onClick={() => {
              try {
                sessionStorage.setItem(
                  'FROM_FRONT_PATH',
                  window.location.pathname + window.location.search
                );
              } catch (e) {
                // ignore storage errors
                // eslint-disable-next-line no-console
                console.warn('could not save FROM_FRONT_PATH', e);
              }

              // Use assign for consistent navigation behaviour
              window.location.assign('http://localhost:3001/');
            }} 
            className="bg-tiranga-blue text-white px-5 py-2 rounded-md text-base hover:bg-blue-900 flex items-center gap-2 transition-colors shadow-sm"
          >
            <User size={18} />
            {t.login}
          </button>

          {/* Accessibility Settings Trigger */}
          <button
            title="Accessibility Settings" 
            onClick={toggleAccessibility}
            className="p-2 text-tiranga-blue border border-tiranga-blue rounded-md hover:bg-blue-50 transition-colors"
            aria-label="Accessibility Options"
          >
            <Settings size={22} />
          </button>
        </div>
      </div>

      {/* Helpline Bar - Displayed at the bottom of the header in Saffron */}
      <div className="bg-tiranga-saffron border-b border-orange-600 py-2 text-xs sm:text-sm text-white">
        <div className="w-full px-4 md:px-8 lg:px-12 flex flex-wrap gap-4 justify-center font-medium">
          {HELPLINES.map((h, idx) => (
            <span key={idx} className="flex items-center gap-1">
              <span className="font-bold text-blue-900 opacity-80">{h.label}:</span> {h.number}
              {idx < HELPLINES.length - 1 && <span className="hidden sm:inline ml-2 text-white/60">|</span>}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
