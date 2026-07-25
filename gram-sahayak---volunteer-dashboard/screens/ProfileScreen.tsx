import React from 'react';
import { User } from '../types';
import { User as UserIcon, Phone, MapPin, Award, LogOut, Settings, Globe } from 'lucide-react';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout }) => {
  return (
    <div className="pb-20 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-blue-800"></div>
        
        <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 mb-4 overflow-hidden z-10">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
              <UserIcon size={40} />
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
        <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full mt-1 border border-blue-100">
          Gram Sahayak
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8 text-left">
           <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm text-gray-500">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Mobile Number</p>
                <p className="font-medium text-gray-900">{user.phone}</p>
              </div>
           </div>
           <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm text-gray-500">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Assigned Panchayat</p>
                <p className="font-medium text-gray-900">{user.panchayat}</p>
              </div>
           </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3 text-gray-700">
            <Globe size={20} />
            <span className="font-medium">App Language</span>
          </div>
          <span className="text-sm text-gray-500">English (India)</span>
        </div>
        
        <div className="p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3 text-gray-700">
            <Settings size={20} />
            <span className="font-medium">Notification Settings</span>
          </div>
        </div>

        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3 text-gray-700">
            <Award size={20} />
            <span className="font-medium">My Performance Score</span>
          </div>
          <span className="text-sm font-bold text-green-600">Good (85%)</span>
        </div>
      </div>

      <button 
        onClick={onLogout}
        className="w-full bg-red-50 text-red-600 font-bold py-4 rounded-xl border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
      >
        <LogOut size={20} /> Logout
      </button>

      <p className="text-center text-xs text-gray-400">Version 1.0.2 • Govt of India</p>
    </div>
  );
};

export default ProfileScreen;