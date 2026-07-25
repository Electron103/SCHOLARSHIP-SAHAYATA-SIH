import React from 'react';
import { Bot, FileDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ReadMeViewProps {
  onAiFormClick: () => void;
  onBankFormClick?: () => void;
}

const ReadMeView: React.FC<ReadMeViewProps> = ({ onAiFormClick, onBankFormClick }) => {
  const { t } = useLanguage();
  return (
    <div className="max-w-5xl mx-auto w-full pb-8">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 mb-8">
        
        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 leading-tight">
          {t('readme_main_title')}
        </h1>
        
        {/* Intro */}
        <p className="text-lg text-gray-700 mb-10 leading-relaxed font-medium">
          {t('readme_intro')}
        </p>
        
        <div className="space-y-12">
            
            {/* Section: What is DBT? */}
            <section className="bg-orange-50/50 p-6 rounded-xl border-l-4 border-orange-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{t('what_is_dbt_title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                    {t('what_is_dbt_content')}
                </p>
            </section>

            {/* Section: What is Aadhaar? */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{t('what_is_aadhaar_title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                    {t('what_is_aadhaar_content')}
                </p>
            </section>

            {/* Section: Benefits of DBT */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('benefits_dbt_title')}</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        t('benefits_dbt_p1'),
                        t('benefits_dbt_p2'),
                        t('benefits_dbt_p3'),
                        t('benefits_dbt_p4'),
                        t('benefits_dbt_p5'),
                        t('benefits_dbt_p6'),
                        t('benefits_dbt_p7')
                    ].map((item, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                             <span className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
                             <span className="text-gray-700">{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

             {/* Section: How to Link */}
            <section>
                 <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('how_to_link_title')}</h2>
                 <div className="space-y-4">
                     {[
                         t('how_to_link_step1'),
                         t('how_to_link_step2'),
                         t('how_to_link_step3'),
                         t('how_to_link_step4'),
                         t('how_to_link_step5')
                     ].map((step, idx) => (
                         <div key={idx} className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm border border-blue-200">
                                {idx + 1}
                            </span>
                            <p className="text-gray-700 pt-1">{step}</p>
                         </div>
                     ))}
                 </div>
            </section>

             {/* Section: Check Status */}
            <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                 <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('check_status_title')}</h2>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {/* Method 1 */}
                     <div>
                         <h3 className="font-bold text-lg text-orange-700 mb-3 border-b border-orange-200 pb-2">{t('check_method_1_title')}</h3>
                         <ul className="space-y-2 text-sm text-gray-600">
                             {[t('check_method_1_p1'), t('check_method_1_p2'), t('check_method_1_p3'), t('check_method_1_p4'), t('check_method_1_p5')]
                              .map((p, i) => <li key={i}>• {p}</li>)}
                         </ul>
                     </div>
                     {/* Method 2 */}
                     <div>
                         <h3 className="font-bold text-lg text-blue-700 mb-3 border-b border-blue-200 pb-2">{t('check_method_2_title')}</h3>
                         <ul className="space-y-2 text-sm text-gray-600">
                            {[t('check_method_2_p1'), t('check_method_2_p2'), t('check_method_2_p3'), t('check_method_2_p4'), t('check_method_2_p5')]
                              .map((p, i) => <li key={i}>• {p}</li>)}
                         </ul>
                     </div>
                     {/* Method 3 */}
                     <div>
                         <h3 className="font-bold text-lg text-green-700 mb-3 border-b border-green-200 pb-2">{t('check_method_3_title')}</h3>
                         <ul className="space-y-2 text-sm text-gray-600">
                             {[t('check_method_3_p1'), t('check_method_3_p2'), t('check_method_3_p3')]
                              .map((p, i) => <li key={i}>• {p}</li>)}
                         </ul>
                     </div>
                 </div>
            </section>

             {/* Section: Why Important */}
             <section>
                 <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('why_link_title')}</h2>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        t('why_link_p1'),
                        t('why_link_p2'),
                        t('why_link_p3'),
                        t('why_link_p4'),
                        t('why_link_p5'),
                        t('why_link_p6')
                    ].map((item, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                             <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></span>
                             <span className="text-gray-700">{item}</span>
                        </li>
                    ))}
                 </ul>
            </section>

             {/* Section: Role of Aadhaar */}
             <section className="bg-indigo-50 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{t('role_aadhaar_title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                    {t('role_aadhaar_content')}
                </p>
            </section>

             {/* Section: Benefits of Linking */}
             <section>
                 <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('bank_benefit_title')}</h2>
                 <ul className="space-y-2">
                    {[
                        t('bank_benefit_p1'),
                        t('bank_benefit_p2'),
                        t('bank_benefit_p3'),
                        t('bank_benefit_p4'),
                        t('bank_benefit_p5')
                    ].map((item, idx) => (
                        <li key={idx} className="flex gap-3 items-center">
                             <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                             <span className="text-gray-700 font-medium">{item}</span>
                        </li>
                    ))}
                 </ul>
            </section>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={onAiFormClick}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
        >
          <Bot className="w-8 h-8" />
          <div className="text-left">
            <div className="font-bold text-lg">{t('use_ai_filler')}</div>
            <div className="text-sm opacity-90">{t('ai_filler_desc')}</div>
          </div>
        </button>

        {/* Download Bank Form as real download link */}
        <a
          href="/dbt-form.pdf"
          download="DBT_Mandate_Form.pdf"
          onClick={onBankFormClick}
          className="bg-white border-2 border-gray-200 text-gray-700 p-6 rounded-xl shadow-sm hover:border-green-500 hover:text-green-600 transition-all flex items-center justify-center gap-3"
        >
          <FileDown className="w-8 h-8" />
          <div className="text-left">
            <div className="font-bold text-lg">{t('download_form')}</div>
            <div className="text-sm opacity-70">{t('download_desc')}</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ReadMeView;
