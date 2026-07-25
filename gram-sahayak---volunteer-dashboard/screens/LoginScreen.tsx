import React, { useState } from 'react';
import { Shield, Smartphone, ArrowRight, Loader2, User } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10 || name.trim().length === 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('OTP');
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(name);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-48 bg-blue-700 rounded-b-[40%] z-0"></div>
      
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-orange-500 mb-4 text-blue-800 p-2">
             <Shield className="w-full h-full" />
           </div>
           <h1 className="text-2xl font-bold text-gray-900 text-center">Gram Sahayak</h1>
           <p className="text-gray-500 text-sm text-center">Government of India Initiative</p>
        </div>

        {step === 'PHONE' ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Volunteer Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  placeholder="98765 43210"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">You will receive a 4-digit OTP for verification.</p>
            </div>

            <button
              type="submit"
              disabled={loading || phone.length < 10 || name.trim().length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Send OTP <ArrowRight size={18} /></>}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">Enter OTP sent to +91 {phone}</p>
              <button type="button" onClick={() => setStep('PHONE')} className="text-xs text-blue-600 font-medium hover:underline">Change Number</button>
            </div>
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  value={otp[index] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!/^\d*$/.test(val)) return;
                    const newOtp = otp.split('');
                    newOtp[index] = val;
                    setOtp(newOtp.join(''));
                    // Auto-focus logic can be added here
                  }}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={loading || otp.length !== 4}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Verify & Login'}
            </button>
          </form>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          Need Help? <a href="#" className="text-blue-600 font-semibold">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;