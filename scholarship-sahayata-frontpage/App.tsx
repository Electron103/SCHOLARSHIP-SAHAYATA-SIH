import React, { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import AccessibilityWidget from "./components/AccessibilityWidget";
import Footer from "./components/Footer";
import SchemesAndNews from "./components/SchemesAndNews";
import AboutPage from "./components/AboutPage";
import ChatBot from "./components/ChatBot";
import HelpCenters from "./components/HelpCenters";
// @ts-ignore
import styles from "./App.module.css";
import { LanguageCode } from "./types";
import { PAGE_CONTENT, LANGUAGES } from "./constants";
import { AlertCircle } from "lucide-react";

const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<LanguageCode>("en");
  const [isAccessWidgetOpen, setAccessWidgetOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  const handleNavigate = (path: string) => {
    if (path === "/events") {
      setCurrentPath("/");
      setTimeout(() => {
        const element = document.getElementById("events-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  const renderContent = () => {
    if (currentPath === "/") {
      return (
        <>
          {/* 🔹 Pass currentLang to Slider */}
          <Slider currentLang={currentLang} />
          <SchemesAndNews currentLang={currentLang} onNavigate={handleNavigate} />
        </>
      );
    }

    if (currentPath === "/associated/help-centres") {
      return <HelpCenters currentLang={currentLang} />;
    }

    if (PAGE_CONTENT[currentPath]) {
      const hasTranslation = !!PAGE_CONTENT[currentPath][currentLang];
      const pageData =
        PAGE_CONTENT[currentPath][currentLang] || PAGE_CONTENT[currentPath]["en"];
      const { title, content } = pageData;

      const langName =
        LANGUAGES.find((l) => l.code === currentLang)?.name || currentLang;

      return (
        <>
          {!hasTranslation && currentLang !== "en" && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 container mx-auto mt-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <p className="ml-3 text-sm text-yellow-700">
                  We are currently translating this content into{" "}
                  <span className="font-bold">{langName}</span>. Displaying English version below.
                </p>
              </div>
            </div>
          )}
          <AboutPage title={title} content={content} />
        </>
      );
    }

    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl text-gray-700 mb-4">
          Page Content for <span className="font-semibold">{currentPath}</span>
        </h2>
        <p className="text-gray-500 mb-6">This page is under construction.</p>
        <button
          onClick={() => handleNavigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          Go Home
        </button>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans text-gray-900 ${styles.appContainer}`}
    >
      <AccessibilityWidget
        isOpen={isAccessWidgetOpen}
        onClose={() => setAccessWidgetOpen(false)}
      />

      <Header
        currentLang={currentLang}
        setLang={setCurrentLang}
        toggleAccessibility={() => setAccessWidgetOpen(!isAccessWidgetOpen)}
      />

      <Navbar onNavigate={handleNavigate} currentLang={currentLang} />

      <main className="flex-grow">{renderContent()}</main>

      <Footer currentLang={currentLang} />
      <ChatBot currentLang={currentLang} />
    </div>
  );
};

export default App;