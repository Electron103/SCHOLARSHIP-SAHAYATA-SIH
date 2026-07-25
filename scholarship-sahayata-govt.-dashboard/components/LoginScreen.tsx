import { useState } from 'react';
import { Lock, Shield, CheckCircle, FileText, Eye, EyeOff } from 'lucide-react';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  portalName: string;
}

export default function LoginScreen({ onLogin, portalName }: LoginScreenProps) {
  const [loginRole, setLoginRole] = useState('Admin');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (role: string) => {
    const passwordMap: Record<string, string> = { 'Admin': 'admin@123', 'Verifier': 'verify123', 'Auditor': 'audit@456' };
    if (loginPassword !== passwordMap[role]) {
      alert(`❌ Incorrect password for ${role} role!`);
      return;
    }
    onLogin({ name: 'Government Admin', role, email: `${role.toLowerCase()}@gov.in` });
    setLoginPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Lock size={40} className="text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-blue-600 mb-2">{portalName}</h1>
          <p className="text-gray-600">Government Portal</p>
          <p className="text-sm text-gray-500 mt-1">Aadhaar & DBT Integration</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            {[
              { role: 'Admin', icon: <Shield size={20} />, color: 'blue' },
              { role: 'Verifier', icon: <CheckCircle size={20} />, color: 'purple' },
              { role: 'Auditor', icon: <FileText size={20} />, color: 'green' }
            ].map((item) => (
              <button
                key={item.role}
                onClick={() => { setLoginRole(item.role); setLoginPassword(''); }}
                className={`w-full text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 
                  ${loginRole === item.role
                    ? `bg-${item.color}-700`
                    : `bg-${item.color}-600 hover:bg-${item.color}-700`
                  }`}
              >
                {item.icon} {item.role}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password ({loginRole})</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(loginRole)}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">Admin: admin@123 | Verifier: verify123 | Auditor: audit@456</p>
          </div>

          <button onClick={() => handleLogin(loginRole)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">
            Login
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p className="font-semibold mb-1">🔒 Security Notice:</p>
          <p>This is a government portal. Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  );
}