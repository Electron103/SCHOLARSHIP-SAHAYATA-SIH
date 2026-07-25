import React, { useState } from 'react';
import { Bot, FileDown, PlayCircle, X, Clock, FileText, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface VideoViewProps {
  onAiFormClick: () => void;
  onBankFormClick?: () => void;
}

interface VideoData {
  id: number;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  duration: string;
  tagColor: string;
  videoUrl: string;
  transcript?: string;
}

const videos: VideoData[] = [
  {
    id: 1,
    title:
      "What is Aadhaar-linked bank account, what is DBT for scholarship payments, and how to check if account is DBT-enabled or not?",
    category: "Basics",
    description:
      "Introduction to Aadhaar-linked bank accounts, DBT functionality, and DBT status checking.",
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop",
    duration: "1:40",
    tagColor: "bg-orange-600",
    // Must match: public/videos/1st video.mp4
    videoUrl: "/videos/1st video.mp4",
    transcript: `Student: Bhaiya, meri scholarship abhi tak account mein nahi aayi. Bank mein Aadhaar link bhi hai... phir bhi paise nahi aa rahe!

Mentor: Dekh beta, Aadhaar link ka matlab hota hai ki tumhara Aadhaar number bank ke records mein registered hai. Lekin scholarship paane ke liye account ka DBT-enabled hona zaroori hai.

Mentor: DBT ka matlab hota hai Direct Benefit Transfer. Isme sarkar tumhari scholarship jaise benefits directly tumhare bank account mein transfer karti hai. Par ye tabhi hota hai jab Aadhaar seeded ho aur NPCI me date se mapped ho.

Student: Toh bhaiya, mera DBT status kaise pata chalega?

Mentor: Iske liye teen simple tareeke hain.
1. Apne bank ke ATM se mini statement nikaalo. Agar uspe 'Aadhaar Seeding Successful' ya 'NPCI Mapped' likha ho toh tumhara account DBT-enabled hai.
2. Bank branch jaake Aadhaar Seeding Request Form bhar do. Staff turant bata denge ki tumhara account NPCI mapping me registered hai ya nahi.
3. MoSJE ke official page par jaake Scholarship Sahayata website kholo. Wahan Aadhaar number enter karo—aur tumhe turant DBT status mil jayega.

Mentor: Bas name aur mobile number se login karke check kar sakte ho.

Student: Wah bhaiya! Matlab sirf Aadhaar link hona kaafi nahi, NPCI se DBT mapping zaroori hai!

Mentor: Bilkul! Jab tumhara account DBT-enabled ho jayega, tabhi scholarship directly account mein aayegi—bina kisi delay ke.`
  },
  {
    id: 2,
    title:
      "What is Aadhaar Seeding, NPCI Mapping, and How to Enable DBT for Scholarship – Plus Scholarship Sahayata Portal and AI Form Filler",
    category: "Comprehensive Guide",
    description:
      "Step-by-step explanation of seeding, NPCI mapping, DBT enabling, and portal usage.",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop",
    duration: "2:02",
    tagColor: "bg-blue-600",
    // Must match: public/videos/2nd video.mp4
    videoUrl: "/videos/2nd video.mp4"
  },
  {
    id: 3,
    title:
      "Why Your Scholarship Is Not Coming and What to Do if Your DBT Request Is Pending or Rejected?",
    category: "Troubleshooting",
    description:
      "Troubleshooting common scholarship and DBT issues, reasons for delays, and solutions.",
    thumbnail:
      "https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?q=80&w=1000&auto=format&fit=crop",
    duration: "2:46",
    tagColor: "bg-red-600",
    // Must match: public/videos/3rd video.mp4
    videoUrl: "/videos/3rd video.mp4"
  }
];

const VideoView: React.FC<VideoViewProps> = ({ onAiFormClick, onBankFormClick }) => {
  const { t } = useLanguage();
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  const activeVideo = videos.find((v) => v.id === playingVideoId);

  const handleDurationLoad = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    // Duration logic can be enabled here if needed
  };

  return (
    <div className="max-w-5xl mx-auto w-full pb-8">
      {/* Dedicated Video Player Overlay */}
      {playingVideoId !== null && activeVideo && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-0 md:p-4 animate-fade-in backdrop-blur-sm">
          <div className="w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] bg-gray-900 md:rounded-2xl overflow-hidden relative shadow-2xl border border-gray-800 flex flex-col">
            {/* Player Header */}
            <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800 flex-shrink-0">
              <div>
                <span
                  className={`inline-block px-2 py-0.5 ${activeVideo.tagColor} text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-sm mb-1`}
                >
                  {activeVideo.category}
                </span>
                <h3 className="text-white font-medium text-lg leading-tight md:text-xl pr-4">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPlayingVideoId(null)}
                aria-label="Close video player"
                title="Close video player"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors flex-shrink-0"
              >
                <span className="sr-only">Close video player</span>
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
              {/* Video Area */}
              <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative group">
                <video
                  key={activeVideo.id}
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  onLoadedMetadata={handleDurationLoad}
                  className="w-full h-full max-h-[60vh] md:max-h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Info Sidebar */}
              <div className="w-full md:w-1/3 bg-gray-800 border-l border-gray-700 flex flex-col overflow-hidden">
                <div className="p-5 overflow-y-auto custom-scrollbar flex-grow">
                  <div className="mb-6">
                    <h4 className="text-gray-300 text-sm font-semibold mb-2 flex items-center gap-2">
                      <Info size={16} /> Description
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {activeVideo.description}
                    </p>
                  </div>

                  {activeVideo.transcript && (
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <h4 className="text-gray-300 text-sm font-semibold mb-3 flex items-center gap-2">
                        <FileText size={16} /> Transcript
                      </h4>
                      <div className="text-gray-400 text-sm whitespace-pre-line leading-relaxed bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                        {activeVideo.transcript}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-gray-900 border-t border-gray-700 text-xs text-gray-500 flex justify-between items-center">
                  <span>Duration: {activeVideo.duration}</span>
                  <span>ID: {activeVideo.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('video_guides')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => setPlayingVideoId(video.id)}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col group h-full"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                  <div className="bg-white/90 p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <PlayCircle className="w-10 h-10 text-orange-600" fill="currentColor" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md flex items.CENTER gap-1 backdrop-blur-sm">
                  <Clock size={10} />
                  {video.duration}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`inline-block px-2 py-0.5 ${video.tagColor} text-white text-[10px] font-bold uppercase tracking-wider rounded-sm`}
                  >
                    {video.category}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-snug line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                  {video.title}
                </h3>

                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
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

export default VideoView;
