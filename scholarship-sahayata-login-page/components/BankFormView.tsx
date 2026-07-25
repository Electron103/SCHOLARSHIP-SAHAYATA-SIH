import React from 'react';
import { Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BankFormView: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center p-8">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full border border-gray-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Download size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('download_mandate')}</h2>
            <p className="text-gray-500 mb-8">
                {t('download_info')}
            </p>
            
            <button className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <Download size={20} />
                Download PDF (250 KB)
            </button>
            <p className="text-xs text-gray-400 mt-4">{t('secure_download')}</p>
        </div>
    </div>
  );
};

export default BankFormView;