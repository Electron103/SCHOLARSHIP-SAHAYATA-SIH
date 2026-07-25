import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Minimize2 } from 'lucide-react';
import { LanguageCode } from '../types';
import { LANGUAGES } from '../constants';
// @ts-ignore
import styles from './ChatBot.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  currentLang: LanguageCode;
}

const WELCOME_MSGS: Record<string, string> = {
  en: "Namaste! I am your virtual assistant for DBT and scholarships. Ask me anything about your scholarship, Aadhaar seeding, bank mapping, or payment status.",
  hi: 'नमस्ते! मैं आपका DBT और छात्रवृत्ति सहायक हूँ। छात्रवृत्ति, आधार सीडिंग, बैंक मैपिंग या भुगतान स्थिति से जुड़े किसी भी सवाल के लिए मुझसे पूछें।',
  bn: 'নমস্কার! আমি আপনার DBT ও স্কলারশিপ সহকারী। স্কলারশিপ, আধার সিডিং, ব্যাংক ম্যাপিং বা পেমেন্ট স্ট্যাটাস নিয়ে যেকোনো প্রশ্ন করতে পারেন।',
  te: 'నమస్తే! నేను మీ DBT మరియు స్కాలర్‌షిప్ సహాయకుడిని. స్కాలర్‌షిప్, ఆధార్ సీడింగ్, బ్యాంక్ మ్యాపింగ్ లేదా పేమెంట్ స్టేటస్ గురించి నన్ను ఏదైనా అడగండి.',
  ta: 'வணக்கம்! நான் உங்கள் DBT மற்றும் கல்விப் புலமைத் தொகை உதவியாளர். கல்வித் தொகை, ஆதார் இணைப்பு, வங்கி மேப்பிங் அல்லது தொகை வரவில்லை என்றால் என்ன செய்ய வேண்டும் போன்ற கேள்விகளை கேளுங்கள்.',
  gu: 'નમસ્તે! હું તમારો DBT અને સ્કોલરશિપ સહાયક છું. સ્કોલરશિપ, આધાર સીડિંગ, બેંક મેપિંગ કે પેમેન્ટ ન આવ્યું હોય તો શું કરવું — કંઈ પણ પૂછો.',
  pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ DBT ਤੇ ਸਕਾਲਰਸ਼ਿਪ ਸਹਾਇਕ ਹਾਂ। ਸਕਾਲਰਸ਼ਿਪ, ਆਧਾਰ ਸੀਡਿੰਗ, ਬੈਂਕ ਮੈਪਿੰਗ ਜਾਂ ਪੈਸੇ ਨਾ ਆਉਣ ਵਾਲੇ ਮਸਲੇ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ।',
};

const PLACEHOLDERS: Record<string, string> = {
  en: 'Type your DBT / scholarship problem here…',
  hi: 'यहाँ अपना DBT / छात्रवृत्ति वाला सवाल लिखें…',
  bn: 'এখানে আপনার DBT / স্কলারশিপের সমস্যা লিখুন…',
  te: 'ఇక్కడ మీ DBT / స్కాలర్‌షిప్ సమస్య రాయండి…',
  ta: 'இங்கே உங்கள் DBT / கல்வித் தொகை சந்தேகத்தை எழுதுங்கள்…',
  gu: 'અહીં તમારો DBT / સ્કોલરશિપ પ્રશ્ન લખો…',
  pa: 'ਇੱਥੇ ਆਪਣਾ DBT / ਸਕਾਲਰਸ਼ਿਪ ਸਵਾਲ ਲਿਖੋ…',
};

// Quick reply buttons for villagers / faster use
const QUICK_REPLIES = [
  {
    id: 'payment-not-received',
    label: 'My payment not received',
    text: 'Mera DBT / scholarship paisa nahi aaya hai. Kya karu?',
  },
  {
    id: 'aadhaar-not-linked',
    label: 'Aadhaar not linked to bank',
    text: 'Mera Aadhaar bank account se seeded / linked nahi hai ya mapping problem aa rahi hai.',
  },
  {
    id: 'scholarship-rejected',
    label: 'Scholarship rejected',
    text: 'Meri scholarship application portal par REJECTED dikha rahi hai. Reason samjha sakte ho?',
  },
  {
    id: 'pfms-status-check',
    label: 'PFMS status check',
    text: 'PFMS ya DBT payment status kaise check karun? Link aur steps batao.',
  },
  {
    id: 'document-upload',
    label: 'Document upload problem',
    text: 'Portal par document upload nahi ho raha / error aa raha hai. Kya karu?',
  },
  {
    id: 'pending-institute',
    label: 'Pending at Institute',
    text: 'Mera application status "Pending at Institute Level" dikha raha hai. Iska kya matlab hai aur aage kya karna hai?',
  },
];

// 🔍 Very simple language detector: "english" vs "hinglish/hindi"
const detectUserLanguage = (text: string): 'english' | 'hinglish' => {
  const trimmed = text.trim();
  if (!trimmed) return 'english';

  // If contains Devanagari characters → definitely Hindi/Hinglish
  const hasDevanagari = /[\u0900-\u097F]/.test(trimmed);
  if (hasDevanagari) return 'hinglish';

  const lower = trimmed.toLowerCase();

  // Some very common Hindi-ish roman words
  const hindiRomanWords = [
    'mera',
    'meri',
    'nahi',
    'nai',
    'nhi',
    'paisa',
    'paise',
    'kya',
    'kyu',
    'kaise',
    'karu',
    'karo',
    'kab',
    'aaya',
    'aya',
    'nahi aaya',
    'matric',
    'post matric',
    'yatra',
    'bhai',
    'sir ji',
  ];

  // Some normal English helper words
  const englishWords = [
    'what',
    'how',
    'when',
    'where',
    'why',
    'please',
    'help',
    'money',
    'payment',
    'status',
    'scholarship',
    'account',
    'bank',
    'amount',
    'issue',
    'problem',
    'not',
    'received',
    'pending',
  ];

  let hindiScore = 0;
  hindiRomanWords.forEach((w) => {
    if (lower.includes(w)) hindiScore++;
  });

  let engScore = 0;
  englishWords.forEach((w) => {
    if (lower.includes(w)) engScore++;
  });

  // If ASCII-only and English score is higher or equal → treat as English
  const nonAscii = trimmed.replace(/[a-zA-Z0-9\s.,?!'"()\-]/g, '');
  if (nonAscii.length === 0 && engScore >= hindiScore) {
    return 'english';
  }

  // If clearly more Hindi-ish words → hinglish
  if (hindiScore > engScore + 1) {
    return 'hinglish';
  }

  // Default: if user typed only plain English letters, assume English
  if (nonAscii.length === 0) return 'english';

  // Fallback: hinglish
  return 'hinglish';
};

const ChatBot: React.FC<ChatBotProps> = ({ currentLang }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set welcome message whenever language changes
  useEffect(() => {
    const welcomeText =
      WELCOME_MSGS[currentLang] || WELCOME_MSGS['en'] || WELCOME_MSGS['hi'];
    setMessages([
      {
        id: 'init',
        text: welcomeText,
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, [currentLang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const normalizeInput = (raw: string) => raw.trim();

  const isVeryShort = (text: string) => {
    const noSpaces = text.replace(/\s+/g, '');
    return noSpaces.length <= 2;
  };

  // Core function to send a user message (used by normal input and quick replies)
  const sendMessage = async (rawText: string) => {
    const cleaned = normalizeInput(rawText);
    if (!cleaned) return;

    const userText = cleaned;
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev: Message[]) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const historyPayload = messages.slice(-8).map((m: Message) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      // 🔥 Detect user's language and send explicit hint to backend/LLM
      const userLangMode = detectUserLanguage(userText);
      const languageHint =
        userLangMode === 'english'
          ? 'Language hint: User is writing in clear English. Reply in simple English only. Do NOT mix Hindi or Hinglish unless the user later switches language.'
          : 'Language hint: User is writing in Hindi / Hinglish / mixed Indian language. Reply in Hindi or very simple Hinglish, matching the user style. Avoid long pure-English sentences.';

      const baseMessage = isVeryShort(userText)
        ? `User gave a very short input. Assume it is about DBT / scholarship and explain plus guided options.\nUser message: ${userText}`
        : userText;

      const payloadMessage = `${languageHint}\n\n${baseMessage}`;

      const res = await fetch('http://localhost:6001/api/dbt-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: payloadMessage,
    lang: currentLang,
    history: historyPayload,
  }),
});
      const data = await res.json();
      if (!res.ok || !data.reply) {
        throw new Error(data.error || 'No reply from backend');
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev: Message[]) => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev: Message[]) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text:
            'I am sorry, there was a problem connecting to the server. Please try again later or contact the portal administrator.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    await sendMessage(input);
  };

  const handleQuickReply = async (text: string) => {
    await sendMessage(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const placeholder =
    PLACEHOLDERS[currentLang] || PLACEHOLDERS['en'] || 'Ask about DBT…';

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-white flex items-center justify-center ${
          isOpen
            ? 'bg-gray-800 rotate-90'
            : 'bg-gradient-to-br from-[#FF9933] via-[#FFFFFF] to-[#138808]'
        }`}
        aria-label="Toggle Chat Assistant"
        title="Chat with Sahayak"
      >
        {isOpen ? (
          <X size={32} className="text-white" />
        ) : (
          <Bot size={32} className="text-[#000080] drop-shadow-md" />
        )}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-28 right-6 z-40 w-[360px] md:w-[450px] bg-white rounded-2xl shadow-2xl border-2 border-white transform transition-all duration-300 origin-bottom-right flex flex-col overflow-hidden font-sans ${styles.chatWindow} ${
          isOpen
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-0 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#000080] to-blue-900 p-4 flex justify-between items-center text-white shadow-md relative z-20">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white/10">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-wide">
                Sahayak Assistant
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-100 font-medium opacity-90">
                  {LANGUAGES.find((l) => l.code === currentLang)?.name.split(
                    '('
                  )[0] || 'English'}{' '}
                  Mode
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Minimize Chat"
          >
            <Minimize2 size={20} />
          </button>
        </div>

        {/* Messages */}
        <div
          className={`flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar ${styles.messagesContainer}`}
        >
          <div className="text-center">
            <span className="text-[11px] text-gray-500 bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-1 rounded-full font-medium shadow-sm">
              Today
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                    alt="Bot"
                    className="w-5 h-5 opacity-80"
                  />
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-2xl text-[15px] shadow-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-[#000080] text-white rounded-br-none'
                    : 'bg-white/95 text-gray-800 border border-gray-200 rounded-bl-none backdrop-blur-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mr-3 flex-shrink-0">
                <Bot size={16} className="text-gray-400" />
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex gap-1.5 h-4 items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span
                    className={`w-2 h-2 bg-gray-400 rounded-full animate-bounce ${styles.typingDot}`}
                  />
                  <span
                    className={`w-2 h-2 bg-gray-400 rounded-full animate-bounce ${styles.typingDotThird}`}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input + Quick Replies */}
        <div className="p-4 bg-white border-t border-gray-200 relative z-20 space-y-2">
          {/* Quick reply chips */}
          <div className="flex flex-wrap gap-2 mb-1">
            {QUICK_REPLIES.map((qr) => (
              <button
                key={qr.id}
                type="button"
                onClick={() => handleQuickReply(qr.text)}
                className="px-3 py-1.5 text-xs md:text-[11px] bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full text-gray-700 transition-colors"
              >
                {qr.label}
              </button>
            ))}
          </div>

          {/* Text input bar */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-full px-5 py-3 border border-gray-200 focus-within:border-tiranga-blue focus-within:ring-1 focus-within:ring-tiranga-blue transition-all shadow-inner">
            <input
              type="text"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-base text-gray-700 placeholder-gray-500"
              autoFocus={isOpen}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={`p-2.5 rounded-full transition-all flex items-center justify-center ${
                input.trim()
                  ? 'bg-[#FF9933] text-white shadow-md hover:scale-105 transform'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              aria-label="Send Message"
            >
              <Send size={18} />
            </button>
          </div>

          <div className="text-[11px] text-center text-gray-400 mt-1 font-medium">
            For your safety, do not share full Aadhaar, bank account number or
            OTP here. Please cross-check advice with official DBT / scholarship
            guidelines.
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
