// AiFormFillerView.tsx
import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AiFormFillerView: React.FC = () => {
  const { t } = useLanguage();

  // Support both env names:
  // - VITE_AI_PROJECT_URL (preferred)
  // - VITE_AI_FORM_FILLER_URL (your current .env.local)
  const env = (import.meta as any).env || {};
  const aiUrl: string = env.VITE_AI_PROJECT_URL || env.VITE_AI_FORM_FILLER_URL || '';
  const isDisabled = !aiUrl;

  const handleOpenAiProjectSameTab = () => {
    if (!aiUrl) {
      alert('❗ VITE_AI_PROJECT_URL or VITE_AI_FORM_FILLER_URL is missing in your .env file. Please add one and restart the dev server.');
      return;
    }

    // Navigate in same tab (this replaces the current app page)
    window.location.href = aiUrl;
  };

  return (
    <div className="max-w-2xl mx-auto w-full h-[600px] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      <div className="bg-indigo-600 p-4 text-white flex items-center gap-3">
        <ExternalLink />
        <h3 className="font-bold text-lg">{t('ai_assistant_title') || 'AI Form Filler'}</h3>
      </div>

      <div className="flex-grow flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            {t('ai_launcher_title') || 'Open AI Form Filler'}
          </h2>

          {!aiUrl && (
            <p className="text-red-600 font-medium mb-6">
              ⚠️ Add <b>VITE_AI_PROJECT_URL</b> or <b>VITE_AI_FORM_FILLER_URL</b> to your <b>.env</b> file and restart the server.
            </p>
          )}

          <p className="text-gray-600 mb-6">
            {t('ai_launcher_desc') || 'This will navigate you to the AI Form Filler project in the same tab.'}
          </p>

          <div className="flex items-center justify-center gap-3">
            {isDisabled ? (
              <button
                disabled
                className="inline-flex items-center gap-2 bg-gray-200 text-gray-600 cursor-not-allowed font-semibold py-3 px-5 rounded-lg shadow transition-colors"
                aria-disabled="true"
              >
                <span>{t('open_ai_project') || 'Open AI Project'}</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleOpenAiProjectSameTab}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-5 rounded-lg shadow transition-colors"
                aria-disabled="false"
              >
                <span>{t('open_ai_project') || 'Open AI Project'}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-4">
            {t('ai_security_note') || 'Note: navigating away will leave this app — open in a new tab if you want to keep this dashboard open.'}
          </p>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200 text-xs text-gray-500">
        {t('ai_launcher_footer') || 'AI Form Filler — external integration.'}
      </div>
    </div>
  );
};

export default AiFormFillerView;
