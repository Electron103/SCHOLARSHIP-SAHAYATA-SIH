import React from 'react';
import { HelpCircle, PhoneCall, Mail, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const HelpScreen: React.FC = () => {
  return (
    <div className="pb-20 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Help & Support</h2>

      {/* Contact Support Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
            <PhoneCall size={24} />
          </div>
          <h3 className="font-bold text-gray-900">Helpline</h3>
          <p className="text-sm text-gray-500">1800-111-2222</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-2">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-gray-900">Email</h3>
          <p className="text-sm text-gray-500">support@gram.gov.in</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-2">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-bold text-gray-900">WhatsApp</h3>
          <p className="text-sm text-gray-500">+91 98765 00000</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
           <h3 className="font-bold text-gray-800 flex items-center gap-2">
             <HelpCircle size={20} className="text-blue-600"/> Frequently Asked Questions
           </h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          <FAQItem 
            question="How do I upload proof if internet is slow?" 
            answer="You can take photos using the app offline. The app will save them and automatically upload them once you are back in a network area."
          />
          <FAQItem 
            question="What happens if I miss a deadline?" 
            answer="If you miss a deadline, the task status will change to 'Overdue'. Please submit the feedback as soon as possible and mention the reason for delay in the remarks."
          />
          <FAQItem 
            question="Can I edit my submitted feedback?" 
            answer="No, once submitted, you cannot edit feedback directly. If the government officer requests a correction, the task will reappear in your 'Pending' list with the status 'Need Correction'."
          />
          <FAQItem 
            question="How do I check my scholarship survey status?" 
            answer="Go to the Activity History page to see all your past submissions and their approval status."
          />
        </div>
      </div>
      
      <div className="bg-blue-600 text-white p-6 rounded-2xl text-center">
        <h3 className="font-bold text-lg mb-2">Still need help?</h3>
        <p className="text-blue-100 text-sm mb-4">Our AI assistant 'Sahayak' is available 24/7 to answer your queries instantly.</p>
        <button className="bg-white text-blue-700 px-6 py-2 rounded-full font-bold text-sm shadow hover:bg-gray-100 transition-colors">
          Ask Sahayak AI
        </button>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex justify-between items-start gap-4">
        <h4 className={`font-medium text-sm ${isOpen ? 'text-blue-700' : 'text-gray-800'}`}>{question}</h4>
        {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
      </div>
      {isOpen && (
        <p className="text-sm text-gray-600 mt-2 leading-relaxed bg-gray-50 p-3 rounded-lg">
          {answer}
        </p>
      )}
    </div>
  );
};

export default HelpScreen;