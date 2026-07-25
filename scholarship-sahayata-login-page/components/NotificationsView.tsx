import React from 'react';
import { NotificationItem } from '../types';
import { Bell, Clock } from 'lucide-react';

interface NotificationsViewProps {
  notifications: NotificationItem[];
}

const NotificationsView: React.FC<NotificationsViewProps> = ({ notifications }) => {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden min-h-[500px]">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Bell className="text-orange-500" />
            Your Notifications
          </h2>
        </div>
        
        <div className="overflow-y-auto max-h-[600px] p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>No notifications yet.</p>
            </div>
          ) : (
            notifications.map((note) => (
              <div key={note.id} className={`p-4 rounded-xl border transition-all ${note.read ? 'bg-white border-gray-100' : 'bg-orange-50 border-orange-100'}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-semibold ${note.read ? 'text-gray-700' : 'text-gray-900'}`}>{note.title}</h4>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} />
                    {note.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{note.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsView;