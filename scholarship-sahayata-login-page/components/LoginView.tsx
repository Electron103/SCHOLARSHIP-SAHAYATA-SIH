// src/components/LoginView.tsx
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { getLoginSideImage } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginViewProps {
  onLogin: (user: User) => void;
  onCodeSent: (otp: string) => void;
}

// Data for States and Cities
const stateData: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Pasighat"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Manipur": ["Imphal", "Churachandpur"],
  "Meghalaya": ["Shillong", "Tura"],
  "Mizoram": ["Aizawl", "Lunglei"],
  "Nagaland": ["Kohima", "Dimapur"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  "Sikkim": ["Gangtok", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Tripura": ["Agartala", "Udaipur"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Nainital"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi"],
  "Jammu and Kashmir": ["Srinagar", "Jammu"],
  "Ladakh": ["Leh", "Kargil"],
  "Puducherry": ["Puducherry", "Karaikal"]
};

const casteOptions = ["OBC", "SC/ST", "EWS", "PWD", "Other"];

const LoginView: React.FC<LoginViewProps> = ({ onLogin, onCodeSent }) => {
  const { t } = useLanguage();
  // initial values empty so placeholders show
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [caste, setCaste] = useState('');
  
  // Validation State
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [errorMessage, setErrorMessage] = useState('');

  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [sendingOtp, setSendingOtp] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const fetchImage = async () => {
      try {
        if(isMounted.current) setLoadingImage(true);
        const image = await getLoginSideImage();
        if(isMounted.current) setHeroImage(image);
      } catch (e) {
        console.error("Failed to load image", e);
        if(isMounted.current) setHeroImage("https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop");
      } finally {
        if(isMounted.current) setLoadingImage(false);
      }
    };
    fetchImage();

    // Cleanup
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
    setCity(''); // Reset city when state changes
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;
    let errorMsg = '';

    if (!name.trim()) { newErrors.name = true; isValid = false; }
    if (!phone.trim() || phone.length < 10) { newErrors.phone = true; isValid = false; }
    if (!state) { newErrors.state = true; isValid = false; }
    if (!city) { newErrors.city = true; isValid = false; }
    if (!caste) { newErrors.caste = true; isValid = false; }

    if (!isValid) {
      errorMsg = t('login_error_fields');
    }

    setErrors(newErrors);
    setErrorMessage(errorMsg);
    return isValid;
  };

  // REPORT LOGIN TO STUDENT BACKEND
  const handleLoginSuccess = async (userProfile: any) => {
    try {
      await fetch("http://localhost:5000/api/logins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: userProfile.phone, // using phone as unique login ID
          username: userProfile.name,
          email: (userProfile.phone ? userProfile.phone : "unknown") + "@example.com",
          lastLogin: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn("Failed to report login to student-backend:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setErrorMessage('');
    setSendingOtp(true);

    // Save user to backend first (port 5000)
    try {
      const payload = {
        fullName: name,
        phone: phone.replace(/\D/g, ''), // store only digits
        state,
        district: city, // backend uses district field (city -> district)
        category: caste
      };

      const resp = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        // try to parse server message, otherwise fallback to status text
        let serverMsg = `Server returned ${resp.status}`;
        try {
          const json = await resp.json();
          serverMsg = json.message || JSON.stringify(json);
        } catch (err) {
          // ignore parse error
        }
        setErrorMessage(serverMsg);
        setSendingOtp(false);
        return;
      }
    } catch (err) {
      console.error("Failed to save user to backend:", err);
      setErrorMessage('Failed to save. Check connection to backend.');
      setSendingOtp(false);
      return;
    }

    // If save succeeded, simulate API call for OTP generation
    setTimeout(() => {
        if (isMounted.current) {
            setSendingOtp(false);
            
            // Generate a random 6-digit OTP
            const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
            
            // Show hint to user
            alert(`Your OTP for login is: ${newOtp}`);
            
            // Save LAST_USER / LAST_VIEW to sessionStorage for cross-app state (safe, optional)
            try {
              sessionStorage.setItem('LAST_USER', JSON.stringify({ name, phone, state, city, caste }));
              sessionStorage.setItem('LAST_VIEW', 'LOGIN');
            } catch (e) {
              // ignore storage errors
              // eslint-disable-next-line no-console
              console.warn('could not write LAST_USER/LAST_VIEW to sessionStorage', e);
            }

            // Pass the OTP to the parent component
            onCodeSent(newOtp);

            // Report login to student-backend
            handleLoginSuccess({ name, phone, state, city, caste });

            onLogin({ name, phone, state, city, caste });
        }
    }, 1500);
  };

  const getInputClass = (isError: boolean) => 
    `w-full px-4 py-3 rounded-lg border ${isError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-light`;

  const getSelectClass = (isError: boolean) => 
    `w-full px-4 py-3 rounded-lg border ${isError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} bg-gray-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-light appearance-none`;

  return (
    <div className="flex flex-col md:flex-row h-full flex-grow bg-white rounded-2xl shadow-xl overflow-hidden my-4 md:my-8 border border-gray-100">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 min-h-[300px] md:h-auto relative bg-gray-100 flex items-center justify-center overflow-hidden">
        {loadingImage ? (
           <div className="flex flex-col items-center text-gray-400">
             <div className="w-10 h-10 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin mb-3"></div>
             <p className="text-sm">Generating AI Visualization...</p>
           </div>
        ) : (
          <img 
            src={heroImage || "https://picsum.photos/800/1200?grayscale"} 
            alt="DBT and Scholarship Importance" 
            className="w-full h-full object-cover animate-fade-in"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">{t('empowering_education')}</h2>
            <p className="text-gray-100 text-sm md:text-base opacity-90">
              {t('hero_text')}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white overflow-y-auto max-h-[90vh]">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t('login_title')}</h3>
          <p className="text-gray-500 text-sm">{t('login_subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wider">{t('full_name')} *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={getInputClass(!!errors.name)}
              placeholder="e.g. Rahul Sharma"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wider">{t('phone_number')} *</label>
            <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400 font-light">+91</span>
                <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                className={`${getInputClass(!!errors.phone)} pl-12`}
                placeholder="9876543210"
                />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="state-select" className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wider">{t('state_label')} *</label>
                <div className="relative">
                  <select 
                    id="state-select"
                    value={state} 
                    onChange={handleStateChange}
                    className={getSelectClass(!!errors.state)}
                  >
                        <option value="">{t('select_state')}</option>
                        {Object.keys(stateData).map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="city-select" className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wider">{t('city_label')} *</label>
                <div className="relative">
                  <select 
                    id="city-select"
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className={getSelectClass(!!errors.city)}
                    disabled={!state}
                  >
                        <option value="">{t('select_city')}</option>
                        {state && stateData[state]?.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>
          </div>

          <div>
             <label htmlFor="caste-select" className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wider">{t('caste_label')} *</label>
             <div className="relative">
              <select 
                id="caste-select"
                value={caste} 
                onChange={(e) => setCaste(e.target.value)}
                className={getSelectClass(!!errors.caste)}
              >
                    <option value="">{t('select_caste')}</option>
                    {casteOptions.map(opt => (
                        <option key={opt} value={opt}>{opt === "SC/ST" ? t('caste_sc_st') : opt === "OBC" ? t('caste_obc') : opt === "EWS" ? t('caste_ews') : opt === "PWD" ? t('caste_pwd') : t('caste_other')}</option>
                    ))}
                </select>
             </div>
          </div>

          {errorMessage && (
             <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errorMessage}
             </div>
          )}
          
          <button
            type="submit"
            disabled={sendingOtp}
            className={`w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 mt-2 ${sendingOtp ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {sendingOtp ? t('sending_otp') : t('generate_otp')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
