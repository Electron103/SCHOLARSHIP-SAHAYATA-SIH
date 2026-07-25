import React, { useState, useEffect } from 'react';
import { Settings, Type, ZoomIn, ZoomOut, Eye, EyeOff, MousePointer, Sun, Moon, RotateCcw, AlignJustify, Underline, Activity } from 'lucide-react';
import { AccessibilityState } from '../types';

interface AccessibilityWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

// Default accessibility configuration
const defaultState: AccessibilityState = {
  fontSize: 'normal',
  lineHeight: false,
  highlightLinks: false,
  textSpacing: false,
  dyslexiaFriendly: false,
  hideImages: false,
  cursor: false,
  contrast: 'normal',
  grayscale: false,
};

const AccessibilityWidget: React.FC<AccessibilityWidgetProps> = ({ isOpen, onClose }) => {
  // Initialize state from localStorage if available to persist user preferences
  const [settings, setSettings] = useState<AccessibilityState>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved ? JSON.parse(saved) : defaultState;
  });

  // Effect: Saves settings to localStorage and applies them to the DOM whenever they change
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  // Applies the selected accessibility settings by adding/removing CSS classes on <body> and <html>
  const applySettings = (s: AccessibilityState) => {
    const html = document.documentElement;
    const body = document.body;
    
    // Reset all accessibility classes first
    html.classList.remove('acc-fontsize-large', 'acc-fontsize-small');
    body.classList.remove('acc-lineheight-high', 'acc-spacing-wide', 'acc-highlight-links', 'acc-dyslexia', 'acc-hide-images', 'acc-cursor-big', 'acc-invert', 'acc-grayscale', 'dark');

    // Apply active settings
    if (s.fontSize === 'large') html.classList.add('acc-fontsize-large');
    if (s.fontSize === 'small') html.classList.add('acc-fontsize-small');
    if (s.lineHeight) body.classList.add('acc-lineheight-high');
    if (s.textSpacing) body.classList.add('acc-spacing-wide');
    if (s.highlightLinks) body.classList.add('acc-highlight-links');
    if (s.dyslexiaFriendly) body.classList.add('acc-dyslexia');
    if (s.hideImages) body.classList.add('acc-hide-images');
    if (s.cursor) body.classList.add('acc-cursor-big');
    if (s.contrast === 'invert') body.classList.add('acc-invert');
    if (s.contrast === 'dark') html.classList.add('dark'); // Tailwind dark mode
    if (s.grayscale) body.classList.add('acc-grayscale');
  };

  const resetAll = () => setSettings(defaultState);

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-32 z-50 w-72 bg-white shadow-2xl border-l border-gray-200 rounded-l-lg transform transition-transform duration-300 ease-in-out">
      {/* Widget Header */}
      <div className="p-4 bg-tiranga-blue text-white flex justify-between items-center rounded-tl-lg">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Settings size={20} /> Accessibility
        </h2>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">✕</button>
      </div>
      
      {/* Tools Grid */}
      <div className="p-4 grid grid-cols-2 gap-3 max-h-[80vh] overflow-y-auto">
        {/* Text to Speech (Mock) */}
        <button className="flex flex-col items-center justify-center p-3 border rounded hover:bg-gray-50 text-center" onClick={() => alert('TTS Activated')}>
          <Activity size={24} className="mb-2 text-tiranga-blue" />
          <span className="text-xs font-semibold">Text to Speech</span>
        </button>

        {/* Font Size Controls */}
        <div className="col-span-2 grid grid-cols-2 gap-3">
             <button 
                onClick={() => setSettings(p => ({...p, fontSize: 'large'}))}
                className={`flex flex-col items-center p-3 border rounded ${settings.fontSize === 'large' ? 'bg-blue-50 border-tiranga-blue' : ''}`}>
                <ZoomIn size={24} className="mb-2" />
                <span className="text-xs font-semibold">Bigger Text</span>
            </button>
            <button 
                onClick={() => setSettings(p => ({...p, fontSize: 'small'}))}
                className={`flex flex-col items-center p-3 border rounded ${settings.fontSize === 'small' ? 'bg-blue-50 border-tiranga-blue' : ''}`}>
                <ZoomOut size={24} className="mb-2" />
                <span className="text-xs font-semibold">Smaller Text</span>
            </button>
        </div>

        {/* Toggle Buttons for various features */}
        <button 
            onClick={() => setSettings(p => ({...p, lineHeight: !p.lineHeight}))}
            className={`flex flex-col items-center p-3 border rounded ${settings.lineHeight ? 'bg-blue-50 border-tiranga-blue' : ''}`}>
            <AlignJustify size={24} className="mb-2" />
            <span className="text-xs font-semibold">Line Height</span>
        </button>

        <button 
            onClick={() => setSettings(p => ({...p, highlightLinks: !p.highlightLinks}))}
            className={`flex flex-col items-center p-3 border rounded ${settings.highlightLinks ? 'bg-blue-50 border-tiranga-blue' : ''}`}>
            <Underline size={24} className="mb-2" />
            <span className="text-xs font-semibold">Highlight Links</span>
        </button>

        <button 
            onClick={() => setSettings(p => ({...p, textSpacing: !p.textSpacing}))}
            className={`flex flex-col items-center p-3 border rounded ${settings.textSpacing ? 'bg-blue-50 border-tiranga-blue' : ''}`}>
            <Type size={24} className="mb-2" />
            <span className="text-xs font-semibold">Text Spacing</span>
        </button>

        <button 
            onClick={() => setSettings(p => ({...p, dyslexiaFriendly: !p.dyslexiaFriendly}))}
            className={`flex flex-col items-center p-3 border rounded ${settings.dyslexiaFriendly ? 'bg-blue-50 border-tiranga-blue' : ''}`}>
            <span className="text-2xl font-serif mb-1 font-bold">Df</span>
            <span className="text-xs font-semibold">Dyslexia Friendly</span>
        </button>

        <button 
            onClick={() => setSettings(p => ({...p, hideImages: !p.hideImages}))}
            className={`flex flex-col items-center p-3 border rounded ${settings.hideImages ? 'bg-blue-50 border-tiranga-blue' : ''}`}>
            <EyeOff size={24} className="mb-2" />
            <span className="text-xs font-semibold">Hide Images</span>
        </button>

        <button 
            onClick={() => setSettings(p => ({...p, cursor: !p.cursor}))}
            className={`flex flex-col items-center p-3 border rounded ${settings.cursor ? 'bg-blue-50 border-tiranga-blue' : ''}`}>
            <MousePointer size={24} className="mb-2" />
            <span className="text-xs font-semibold">Cursor</span>
        </button>

        <button 
            onClick={() => setSettings(p => ({...p, contrast: p.contrast === 'dark' ? 'normal' : 'dark'}))}
            className={`flex flex-col items-center p-3 border rounded ${settings.contrast === 'dark' ? 'bg-blue-50 border-tiranga-blue' : ''}`}>
            <Moon size={24} className="mb-2" />
            <span className="text-xs font-semibold">Dark Mode</span>
        </button>

        <button 
            onClick={() => setSettings(p => ({...p, contrast: p.contrast === 'invert' ? 'normal' : 'invert'}))}
            className={`flex flex-col items-center p-3 border rounded ${settings.contrast === 'invert' ? 'bg-blue-50 border-tiranga-blue' : ''}`}>
            <Sun size={24} className="mb-2" />
            <span className="text-xs font-semibold">Invert Colors</span>
        </button>
      </div>

      <div className="p-4 border-t bg-gray-50">
        <button onClick={resetAll} className="w-full flex items-center justify-center gap-2 text-red-600 font-bold border border-red-200 p-2 rounded hover:bg-red-50">
          <RotateCcw size={16} /> Reset All Settings
        </button>
      </div>
    </div>
  );
};

export default AccessibilityWidget;