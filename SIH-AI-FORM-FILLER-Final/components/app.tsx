import * as React from 'react';
import './AppBackground.css';
import Header from './Header';
import Awareness from './Awareness';
import UploadSection from './UploadSection';
import VerificationForm from './VerificationForm';
import BankGrid from './BankGrid';
import ProgressBar from './ProgressBar';
import BackToLogin from './backtologin';

import { AppStep } from '../types';
import type { FormData as FormState, UploadedFiles } from '../types';
import { EXTERNAL_LINKS } from '../constants';

// ⭐ ADDED — ChatBot import
import ChatBot from '../components/ChatBot';

const OCR_ENDPOINT = 'http://localhost:8000/ocr-extract-details';
const PDF_ENDPOINT = 'http://localhost:8000/fill-dbt-form';

const App: React.FC = () => {
  const [currentLang, setCurrentLang] = React.useState<string>('en');
  const [step, setStep] = React.useState<AppStep>(AppStep.AWARENESS);

  const [files, setFiles] = React.useState<UploadedFiles>({
    aadhaar: null,
    aadhaarBack: null,
    passbook: null,
    signature: null,
    dbtForm: null,
  });

  const [formData, setFormData] = React.useState<FormState>({
    fullName: '',
    aadhaarNumber: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    mobileNumber: '',
    email: '',
    dbtOption: 'link_new',
    signature: null,
    consent: false,
  });

  const [isScanning, setIsScanning] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const progress = (() => {
    switch (step) {
      case AppStep.AWARENESS:
        return 10;
      case AppStep.UPLOAD:
        return 40;
      case AppStep.VERIFY:
        return 80;
      case AppStep.SUCCESS:
        return 100;
      default:
        return 0;
    }
  })();

  const handleFileChange = (type: keyof UploadedFiles, file: File) => {
    setFiles((prev) => ({ ...prev, [type]: file }));
  };

  const handleScan = async () => {
    try {
      setError(null);
      setIsScanning(true);

      const formDataToSend = new FormData();
      if (files.aadhaar) formDataToSend.append('aadhaar', files.aadhaar);
      if (files.aadhaarBack) formDataToSend.append('aadhaar_back', files.aadhaarBack);
      if (files.passbook) formDataToSend.append('passbook', files.passbook);
      if (files.dbtForm) formDataToSend.append('dbt_form', files.dbtForm);
      if (files.signature) formDataToSend.append('signature_image', files.signature);

      const res = await fetch(OCR_ENDPOINT, { method: 'POST', body: formDataToSend });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`OCR failed: ${text.slice(0, 200)}`);
      }

      const payload = await res.json();
      const extracted = (payload?.extractedFields || {}) as Partial<FormState>;

      setFormData((prev) => ({ ...prev, ...extracted }));
      setStep(AppStep.VERIFY);
    } catch (err: any) {
      setError(err.message || 'Failed to extract details.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleGenerateForm = async () => {
    try {
      setError(null);
      setIsGenerating(true);

      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('aadhaarNumber', formData.aadhaarNumber);
      formDataToSend.append('accountNumber', formData.accountNumber);
      formDataToSend.append('ifscCode', formData.ifscCode);
      formDataToSend.append('bankName', formData.bankName);
      formDataToSend.append('branchName', formData.branchName);
      formDataToSend.append('mobileNumber', formData.mobileNumber);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('dbtOption', formData.dbtOption);

      formDataToSend.append('signature', formData.signature || '');
      formDataToSend.append('consent', 'true');

      if (files.dbtForm) formDataToSend.append('dbt_form', files.dbtForm);

      const res = await fetch(PDF_ENDPOINT, { method: 'POST', body: formDataToSend });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`PDF generation failed: ${text.slice(0, 200)}`);
      }

      const blob = await res.blob();
      setPdfUrl(URL.createObjectURL(blob));
      setStep(AppStep.SUCCESS);
    } catch (err: any) {
      setError(err.message || 'Failed to generate form.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!pdfUrl) return;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'DBT_Application_Filled.pdf';
    a.click();
  };

  const resetFlow = () => {
    setStep(AppStep.AWARENESS);
    setFiles({
      aadhaar: null,
      aadhaarBack: null,
      passbook: null,
      signature: null,
      dbtForm: null,
    });
    setFormData({
      fullName: '',
      aadhaarNumber: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      branchName: '',
      mobileNumber: '',
      email: '',
      dbtOption: 'link_new',
      signature: null,
      consent: false,
    });
    setPdfUrl(null);
    setError(null);
  };

  const handleBackStep = () => {
    if (step === AppStep.UPLOAD) setStep(AppStep.AWARENESS);
    else if (step === AppStep.VERIFY) setStep(AppStep.UPLOAD);
    else if (step === AppStep.SUCCESS) setStep(AppStep.VERIFY);
  };

  const renderContent = () => {
    switch (step) {
      case AppStep.AWARENESS:
        return <Awareness lang={currentLang} onStart={() => setStep(AppStep.UPLOAD)} />;

      case AppStep.UPLOAD:
        return (
          <UploadSection
            lang={currentLang}
            files={files}
            onFileChange={handleFileChange}
            onScan={handleScan}
            isScanning={isScanning}
          />
        );

      case AppStep.VERIFY:
        return (
          <VerificationForm
            lang={currentLang}
            data={formData}
            onChange={setFormData}
            onGenerate={handleGenerateForm}
            isGenerating={isGenerating}
          />
        );

      case AppStep.SUCCESS:
        return (
          <div className="space-y-10">
            <BankGrid lang={currentLang} onDownload={handleDownloadPdf} />

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-800">Helpful links</h3>
              <ul className="space-y-2 text-sm text-indigo-700">
                <li>
                  <a
                    href={EXTERNAL_LINKS.centralDbtSchemes}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-indigo-900"
                  >
                    Central DBT portal – SC/ST Scholarships
                  </a>
                </li>
                <li>
                  <a
                    href={EXTERNAL_LINKS.aadhaarDbtStatus}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-indigo-900"
                  >
                    Aadhaar–Bank linking info & DBT status
                  </a>
                </li>
              </ul>

              <button
                onClick={resetFlow}
                className="text-xs text-slate-500 underline hover:text-slate-700"
              >
                Start a new DBT form
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col app-background">

      {step === AppStep.AWARENESS && (
        <div style={{ position: "fixed", top: "75px", left: "20px", zIndex: 9999 }}>
          <BackToLogin forceLogin />
        </div>
      )}

      <Header
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        canGoBack={step !== AppStep.AWARENESS}
        onBack={handleBackStep}
      />

      <ProgressBar percentage={progress} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border p-4 sm:p-6">
          {error && (
            <div className="max-w-3xl mx-auto bg-red-50 border text-red-700 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {isGenerating && (
            <div className="max-w-3xl mx-auto bg-indigo-50 border text-indigo-700 text-sm p-3 rounded-lg">
              Generating your DBT form PDF...
            </div>
          )}

          {renderContent()}
        </div>
      </main>

      {/* ⭐ ADDED — ChatBot component */}
      <ChatBot currentLang="en" />

    </div>
  );
};

export default App;
