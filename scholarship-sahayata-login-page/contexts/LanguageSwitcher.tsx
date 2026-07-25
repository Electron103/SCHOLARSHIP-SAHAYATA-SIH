// src/components/LanguageSwitcher.tsx

import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { languages, Language } from "../translations";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as Language;
    setLanguage(newLang);
  };

  return (
    <select
      value={language}
      onChange={handleChange}
      className="border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Select language"
      title="Select language"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.nativeName} ({lang.name})
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
