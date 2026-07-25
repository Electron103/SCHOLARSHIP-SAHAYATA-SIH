import { BarChart, Users, BookOpen, Shield, FileText, Menu, X, LogOut } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: User;
  onLogout: () => void;
  portalName: string;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab, currentUser, onLogout, portalName }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart size={20} /> },
    { id: 'students', label: 'Students', icon: <Users size={20} /> },
    { id: 'schemes', label: 'Schemes', icon: <BookOpen size={20} /> },
    { id: 'admins', label: 'Admin Mgmt', icon: <Shield size={20} /> },
    { id: 'logs', label: 'Activity Logs', icon: <FileText size={20} /> },
  ];

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 flex flex-col overflow-y-auto shrink-0`}>
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen && <h2 className="text-lg font-bold truncate" title={portalName}>{portalName}</h2>}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:bg-blue-800 p-2 rounded">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === item.id ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
          >
            {item.icon}
            {sidebarOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-800">
        {sidebarOpen && (
          <div className="mb-4">
            <p className="text-sm text-blue-200">{currentUser.name}</p>
            <p className="text-xs text-blue-400">{currentUser.role}</p>
          </div>
        )}
        <button onClick={onLogout} className="w-full flex items-center justify-center lg:justify-start space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}