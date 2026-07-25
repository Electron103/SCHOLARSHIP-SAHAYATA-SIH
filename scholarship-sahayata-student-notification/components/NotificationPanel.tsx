import { X, Bell, Calendar, ChevronLeft } from "lucide-react";
import type { UINotification } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  sentNotifications: UINotification[];
  setSentNotifications: React.Dispatch<React.SetStateAction<UINotification[]>>;
  totalStudents: number;
  currentUser: { name: string; role: string; email: string };
}

export default function NotificationPanel({
  isOpen,
  onClose,
  sentNotifications,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 right-0 sm:w-[420px] w-[380px] shadow-2xl rounded-l-2xl z-50 flex flex-col animate-slide-left h-[85vh] mt-5 bg-white border-l border-gray-200 overflow-hidden"
    >
     {/* HEADER - Sticky */}
<div
  className="p-5 flex items-center justify-between sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-blue-500 text-white border-b border-white/20"
>
  {/* BACK BUTTON */}
  <button
    onClick={() => window.history.back()}   // <-- IMPORTANT LINE
    aria-label="Go back"
    className="p-2 hover:bg-white/20 rounded-full transition"
  >
    <ChevronLeft size={22} className="text-white" />
  </button>

  <h2 className="text-lg font-semibold flex items-center gap-2">
    <Bell size={20} className="text-white" />
    Notifications
  </h2>

  {/* CLOSE BUTTON — optional, you can keep it */}
  <button
    onClick={onClose}
    aria-label="Close notifications panel"
    className="p-2 hover:bg-white/20 rounded-full transition"
  >
    <X size={22} className="text-white" />
  </button>
</div>


      {/* BODY - Scrollable */}
      <div
        className="p-4 space-y-4 overflow-y-auto flex-1 scroll-thin"
      >
        {sentNotifications.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            No notifications yet.
          </p>
        ) : (
          sentNotifications.map((notif) => (
            <div
              key={notif._id}
              className={`p-4 border rounded-lg shadow-sm ${
                notif.read ? "bg-gray-50" : "bg-blue-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Bell size={18} className="text-blue-600" />
                <h3 className="font-semibold text-gray-800">{notif.title}</h3>
              </div>

              <p className="text-gray-600 text-sm">{notif.description || notif.message}</p>

              <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                <Calendar size={12} />
                <span>
                  {notif.createdAt
                    ? new Date(notif.createdAt).toLocaleDateString()
                    : "Today"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
