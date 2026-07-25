// src/components/Navbar.tsx
import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { NAV_ITEMS, NAV_TRANSLATIONS } from '../constants';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onNavigate: (path: string) => void;
  currentLang?: LanguageCode;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentLang = 'en' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Handle clicks on nav items: prevent default href link, use client-side router
  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  // Helper to translate top-level navigation labels based on current language
  const getLabel = (label: string) => {
    if (currentLang === 'en') return label;
    return NAV_TRANSLATIONS[label]?.[currentLang] || label;
  };

  return (
    <nav className="bg-tiranga-blue text-white sticky top-0 z-40 shadow-lg border-t-4 border-tiranga-saffron border-b-4 border-tiranga-green">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-14 relative">

          {/* CENTERED NAV LINKS */}
          <div className="hidden md:flex items-center space-x-2 h-full w-full justify-center">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative group h-full flex items-center"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button className="px-5 py-2 font-medium rounded flex items-center gap-1 hover:bg-white/10">
                    {getLabel(item.label)}
                    <ChevronDown size={16} />
                  </button>
                ) : (
                  <a
                    href={item.path}
                    onClick={(e) => item.path && handleNavClick(e, item.path)}
                    className={`px-5 py-2 font-medium hover:bg-white/10 rounded ${
                      item.label === 'Help Centers' ? 'text-yellow-300 font-semibold' : ''
                    }`}
                  >
                    {getLabel(item.label)}
                  </a>
                )}

                {/* Dropdown */}
                {item.children && (
                  <div className="absolute top-full left-0 w-64 bg-white text-gray-800 shadow-xl rounded-b-lg overflow-hidden hidden group-hover:block">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.path}
                        onClick={(e) => child.path && handleNavClick(e, child.path)}
                        className="block px-5 py-3 hover:bg-orange-50 border-b"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 bg-blue-900 border-t border-blue-800 mt-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div className="px-5 py-3 font-medium text-gray-200 border-b border-blue-800">
                    <span className="block mb-1 text-tiranga-saffron">{getLabel(item.label)}</span>
                    <div className="pl-4 space-y-1 border-l-2 border-tiranga-green ml-1">
                      {item.children.map(child => (
                        <a
                          key={child.label}
                          href={child.path}
                          onClick={(e) => child.path && handleNavClick(e, child.path)}
                          className="block py-2 hover:text-white"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.path}
                    onClick={(e) => item.path && handleNavClick(e, item.path)}
                    className="block px-5 py-3 text-base font-medium text-white hover:bg-blue-800 border-b border-blue-800"
                  >
                    {getLabel(item.label)}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
