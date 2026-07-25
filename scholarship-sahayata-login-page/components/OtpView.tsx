import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface OtpViewProps {
  onSuccess: () => void;
  phone: string;
  confirmationResult: any; // Kept for interface compatibility
  generatedOtp?: string;
}

const OtpView: React.FC<OtpViewProps> = ({ onSuccess, phone, generatedOtp }) => {
  const { t } = useLanguage();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
        setError(t('otp_error_length'));
        return;
    }

    // Validation against the generated OTP
    if (generatedOtp && otp !== generatedOtp) {
        setError(t('otp_error_incorrect'));
        return;
    }

    setError('');
    setVerifying(true);

    // Simulate OTP verification delay
    setTimeout(() => {
        setVerifying(false);
        onSuccess();
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t('verify_otp')}</h2>
          <p className="text-gray-500 mt-2">
            {t('otp_sent_to')} <span className="font-semibold text-gray-800">+91 {phone}</span>
          </p>
          {generatedOtp && (
              <p className="text-xs text-orange-500 mt-2 font-mono bg-orange-50 inline-block px-2 py-1 rounded">
                  Demo OTP: {generatedOtp}
              </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">{t('enter_otp')}</label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] font-mono rounded-lg border border-gray-300 bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              placeholder="------"
            />
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={verifying}
            className={`w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ${verifying ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {verifying ? t('verifying') : t('verify_proceed')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpView;