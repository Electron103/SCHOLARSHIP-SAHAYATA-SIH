import { Bell, Settings } from 'lucide-react';
import { STATES } from '../constants';
import { Notification, Document, User } from '../types';
import NotificationPanel from './NotificationPanel';
import SettingsPanel from './SettingsPanel';
import { Dispatch, SetStateAction } from 'react';

interface TopBarProps {
  selectedState: string;
  setSelectedState: (state: string) => void;
  showNotificationPanel: boolean;
  setShowNotificationPanel: (show: boolean) => void;
  sentNotifications: Notification[];
  setSentNotifications: Dispatch<SetStateAction<Notification[]>>;
  documents: Document[];
  setDocuments: Dispatch<SetStateAction<Document[]>>;
  totalStudents: number;
  showSettingsPanel: boolean;
  setShowSettingsPanel: (show: boolean) => void;
  currentUser: User;
  activeTab: string;
  portalName: string;
  setPortalName: (name: string) => void;
}

export default function TopBar({
  selectedState,
  setSelectedState,
  showNotificationPanel,
  setShowNotificationPanel,
  sentNotifications,
  setSentNotifications,
  documents,
  setDocuments,
  totalStudents,
  showSettingsPanel,
  setShowSettingsPanel,
  currentUser,
  activeTab,
  portalName,
  setPortalName
}: TopBarProps) {

  const getTitle = () => {
      switch(activeTab) {
          case 'students': return 'Students Directory';
          case 'schemes': return 'Schemes';
          case 'admins': return 'Admin Management';
          case 'logs': return 'Activity Logs';
          default: return 'Dashboard';
      }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
      <h1 className="text-2xl font-bold text-gray-800">{getTitle()}</h1>

      <div className="flex items-center space-x-4">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          title="Select a state"
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-blue-400 transition"
        >
          {STATES.map(state => <option key={state} value={state}>{state}</option>)}
        </select>

        <div className="relative">
          <button
            onClick={() => setShowNotificationPanel(!showNotificationPanel)}
            title="Toggle notification panel"
            className={`relative p-2 rounded-lg transition ${showNotificationPanel ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
          >
            <Bell size={24} className={showNotificationPanel ? 'text-blue-600' : 'text-gray-600'} />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
              {sentNotifications.length}
            </span>
          </button>
          <NotificationPanel
            isOpen={showNotificationPanel}
            sentNotifications={sentNotifications}
            setSentNotifications={setSentNotifications}
            documents={documents}
            setDocuments={setDocuments}
            totalStudents={totalStudents}
            currentUser={currentUser}
          />
        </div>

        <div className="relative">
            <button
                onClick={() => setShowSettingsPanel(!showSettingsPanel)}
                title="Toggle settings panel"
                className={`p-2 rounded-lg transition ${showSettingsPanel ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
                <Settings size={24} className="text-gray-700" />
            </button>
            <SettingsPanel
                isOpen={showSettingsPanel}
                onClose={() => setShowSettingsPanel(false)}
                currentUser={currentUser}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                portalName={portalName}
                setPortalName={setPortalName}
            />
        </div>
      </div>
    </div>
  );
}