import { X, Lock } from 'lucide-react';
import { User } from '../types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  selectedState: string;
  setSelectedState?: (state: string) => void;
  portalName: string;
  setPortalName: (name: string) => void;
}

export default function SettingsPanel({ isOpen, onClose, currentUser, selectedState, portalName, setPortalName }: SettingsPanelProps) {
  if (!isOpen) return null;

  const isAdmin = currentUser.role === 'Admin';

  return (
    <div className="absolute top-20 right-8 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-y-auto animate-slide-in">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center sticky top-0">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">⚙️ Dashboard Settings</h3>
        <button onClick={onClose} title="Close settings" className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-200 transition">
          <X size={20} />
        </button>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
            Portal Name
            {!isAdmin && <Lock size={14} className="text-gray-400" />}
          </label>
          <input 
            type="text" 
            placeholder="Portal name"
            value={portalName} 
            onChange={(e) => setPortalName(e.target.value)}
            disabled={!isAdmin}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none 
              ${!isAdmin ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'text-gray-800'}`} 
          />
          {!isAdmin && <p className="text-xs text-red-500 mt-1">Only Admins can change the portal name.</p>}
        </div>

        {[
          { label: 'Current Role', value: currentUser.role },
          { label: 'Admin Email', value: currentUser.email }
        ].map(item => (
           <div key={item.label}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
            <input type="text" placeholder={item.label} value={item.value} disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed" />
          </div>
        ))}

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current State</label>
            <input type="text" placeholder="State" value={selectedState} disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed" />
        </div>

        <div className="pt-4 border-t space-y-3">
          {['Enable Email Notifications', 'Enable Dashboard Alerts'].map(label => (
             <label key={label} className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>

        <div className="pt-4 border-t space-y-2">
          <button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">Save & Close</button>
        </div>
      </div>
    </div>
  );
}