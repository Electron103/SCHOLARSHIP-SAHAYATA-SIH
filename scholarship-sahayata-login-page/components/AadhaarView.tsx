// AadhaarView.tsx
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface AadhaarViewProps {
  onSuccess: (aadhaar: string) => void;
}

const AadhaarView: React.FC<AadhaarViewProps> = ({ onSuccess }) => {
  const { t } = useLanguage();
  const [aadhaar, setAadhaar] = useState(''); // <-- empty by default (no hardcode)
  const [error, setError] = useState('');

  // Format as "xxxx xxxx xxxx" while keeping only digits in state
  const formatAadhaar = (val: string) => {
    const clean = val.replace(/\D/g, '');
    const match = clean.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join(' ');
    }
    return clean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // allow up to 12 digits
    const digitsOnly = raw.replace(/\D/g, '').slice(0, 12);
    setAadhaar(formatAadhaar(digitsOnly));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = aadhaar.replace(/\s/g, '');
    // Validate: exactly 12 digits and all numeric
    if (!clean || clean.length !== 12 || !/^\d{12}$/.test(clean)) {
      setError(t('aadhaar_error') || 'Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    setError('');
    onSuccess(clean); // pass clean 12-digit aadhaar to parent
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* LEFT: Image + Caption */}
        <div className="flex flex-col items-start justify-center gap-6 p-6">
          <div className="w-full bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl p-4 shadow-inner border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?q=80&w=1200&auto=format&fit=crop"
              alt="Aadhaar check illustration"
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="px-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
              {t('aadhaar_verification') || 'Aadhaar Verification'}
            </h1>
            <p className="mt-3 text-gray-600 text-base md:text-lg">
              {t('aadhaar_left_caption') ||
                'Quickly check your DBT status by linking your Aadhaar — secure, fast and government-authenticated.'}
            </p>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 w-2 h-2 bg-orange-500 rounded-full" />
                Instant verification of subsidy status
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 w-2 h-2 bg-orange-500 rounded-full" />
                Privacy-first: we only display last 4 digits when needed
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block mt-1 w-2 h-2 bg-orange-500 rounded-full" />
                Helpful tips if DBT is not enabled
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT: Aadhaar form */}
        <div className="flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
            <div className="text-center mb-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/c/cf/Aadhaar_Logo.svg"
                alt="Aadhaar"
                className="h-14 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800">{t('aadhaar_verification')}</h2>
              <p className="text-gray-500 mt-2 text-sm">
                {t('aadhaar_subtitle') || 'Enter your 12-digit Unique Identification Number to check DBT status.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('aadhaar_label') || 'Aadhaar Number'}
                </label>
                <input
                  type="text"
                  value={aadhaar}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-center text-xl font-medium tracking-wide rounded-lg border border-gray-300 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder={t('aadhaar_placeholder') || '0000 0000 0000'}
                  inputMode="numeric"
                  aria-label="Aadhaar number (12 digits)"
                />
              </div>

              {error && <p className="text-red-500 text-center text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {t('check_status') || 'Check Status'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AadhaarView;
