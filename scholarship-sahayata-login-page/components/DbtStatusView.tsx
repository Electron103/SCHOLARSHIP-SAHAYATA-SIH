// DbtStatusView.tsx
import React, { useEffect, useState } from 'react';
import { getDbtExplanation } from '../services/geminiService';
import { CheckCircle, AlertTriangle, FileText, Video } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DbtStatusViewProps {
  aadhaar: string;
  onNavigateToReadMe: () => void;
  onNavigateToVideo: () => void;
  onStatusResult?: (isEnabled: boolean) => void;
}

const DbtStatusView: React.FC<DbtStatusViewProps> = ({
  aadhaar,
  onNavigateToReadMe,
  onNavigateToVideo,
  onStatusResult,
}) => {
  const { t } = useLanguage();
  const [isEnabled, setIsEnabled] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      setLoading(true);
      // Small UX delay to feel like checking
      await new Promise((r) => setTimeout(r, 700));

      const clean = (aadhaar || '').replace(/\s/g, '');

      // Validate: only proceed if we have exactly 12 digits
      if (!clean || clean.length !== 12 || !/^\d{12}$/.test(clean)) {
        // invalid aadhaar -> do not attempt check
        setIsEnabled(null);
        setExplanation('');
        setLoading(false);
        if (onStatusResult) onStatusResult(false);
        return;
      }

      // run the previous simple parity-based check (same behaviour as before)
      const lastDigit = parseInt(clean.slice(-1), 10);
      const status = !isNaN(lastDigit) && lastDigit % 2 === 0;
      setIsEnabled(status);
      if (!status) {
        // only request explanation when not enabled
        try {
          const text = await getDbtExplanation();
          setExplanation(text);
        } catch (err) {
          setExplanation('');
        }
      } else {
        setExplanation('');
      }

      setLoading(false);
      if (onStatusResult) onStatusResult(status);
    };

    checkStatus();
    // re-run when aadhaar changes
  }, [aadhaar, onStatusResult]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">{t('status_check') || 'Checking status...'}</p>
      </div>
    );
  }

  // If Aadhaar was invalid, prompt user to go back and enter a correct Aadhaar
  const clean = (aadhaar || '').replace(/\s/g, '');
  if (!clean || clean.length !== 12 || !/^\d{12}$/.test(clean)) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow py-12 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full text-center border border-gray-100">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            {t('invalid_aadhaar_title') || 'Invalid Aadhaar'}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('invalid_aadhaar_msg') ||
              'Please enter a valid 12-digit Aadhaar number to check DBT status.'}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
            >
              {t('go_back') || 'Go Back'}
            </button>
            <button
              onClick={onNavigateToReadMe}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:shadow-sm transition"
            >
              {t('help_instructions') || 'Help / Instructions'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Valid Aadhaar flow (enabled or not)
  return (
    <div className="flex flex-col items-center flex-grow py-8 w-full max-w-4xl mx-auto">
      {isEnabled ? (
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full text-center border-t-8 border-green-500 animate-fade-in">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-green-600 mb-4">{t('dbt_enabled')}</h2>
          <p className="text-xl text-gray-600">
            {t('dbt_success_msg') ||
              `DBT appears enabled for Aadhaar ending with xxxx-${clean.slice(-4)}.`}
          </p>
        </div>
      ) : (
        <div className="w-full space-y-8 animate-fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full border-l-8 border-red-500 flex flex-col md:flex-row items-start gap-6">
            <div className="bg-red-50 p-4 rounded-full flex-shrink-0">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-red-600 mb-2">{t('not_enabled') || 'Not Enabled'}</h2>
              <p className="text-lg text-gray-700 font-medium mb-4">
                {t('not_linked_msg') ||
                  'It looks like DBT is not enabled for this Aadhaar. Follow the steps below to link your Aadhaar or watch the explainer.'}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                  {t('why_important') || 'Why this matters'}
                
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{explanation || t('dbt_explanation_short') || 'No additional info available.'}"
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <button
              onClick={onNavigateToReadMe}
              className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all text-left flex flex-col h-full"
            >
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="text-orange-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                {t('read_instructions') || 'Read Instructions'}
              </h3>
              <p className="text-gray-500">{t('read_desc') || 'Step-by-step guidance to link Aadhaar with DBT.'}</p>
            </button>

            <button
              onClick={onNavigateToVideo}
              className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all text-left flex flex-col h-full"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Video className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {t('watch_video') || 'Watch Video'}
              </h3>
              <p className="text-gray-500">{t('watch_desc') || 'Short explainer video on linking Aadhaar.'}</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DbtStatusView;
