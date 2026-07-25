import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import NotificationPanel from "./components/NotificationPanel";
import StudentDashboard from "./components/student/StudentDashboard";
import { io } from "socket.io-client";
import type { Notification, UINotification } from "./types";

// Using shared UINotification type from types.ts

// SOCKET SERVER
const socket = io("http://localhost:5000");

export default function App() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<UINotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // ----------------------------------------------------
  // LOAD ALL NOTIFICATIONS INITIALLY
  // ----------------------------------------------------
  useEffect(() => {
    const loadInitial = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notifications");
        const data = await res.json();

        if (data.success) {
          const formatted = data.notifications.map((n: Notification) => ({
            ...n,
            read: false,
          })) as UINotification[];

          setNotifications(formatted);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    loadInitial();
  }, []);

  // ----------------------------------------------------
  // REALTIME: NEW NOTIFICATION LISTENER
  // ----------------------------------------------------
  useEffect(() => {
    const handler = (data: Notification) => {
      console.log("Realtime NEW:", data);

      const newNotif: UINotification = {
        ...data,
        read: false,
      };

      setNotifications((prev) => [newNotif, ...prev]);
    };

    socket.on("new-notification", handler);

    return () => {
      socket.off("new-notification", handler);
    };
  }, []);

  // ----------------------------------------------------
  // REALTIME: DELETE NOTIFICATION LISTENER
  // ----------------------------------------------------
  useEffect(() => {
    const handler = ({ id }: { id: string }) => {
      console.log("Realtime DELETE:", id);

      setNotifications((prev) => prev.filter((n) => n._id !== id));
    };

    socket.on("notification-deleted", handler);

    return () => {
      socket.off("notification-deleted", handler);
    };
  }, []);

  // ----------------------------------------------------
  // COUNT UNREAD NOTIFICATIONS
  // ----------------------------------------------------
  useEffect(() => {
    const unread = notifications.filter((n) => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  // ----------------------------------------------------
  // MARK ALL AS READ
  // ----------------------------------------------------
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------
  return (
<div
  className="min-h-screen font-sans tri-gradient-bg"
>


      {/* HEADER WITH BELL */}
      <Header
        unreadCount={unreadCount}
        onToggleNotifications={() => {
          setIsNotificationOpen((prev) => !prev);
          markAllAsRead();
        }}
      />

      {/* STUDENT DASHBOARD */}
      <main>
        <StudentDashboard notifications={notifications} />
      </main>

      {/* NOTIFICATION PANEL */}
      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => {
          setIsNotificationOpen(false);
          markAllAsRead();
        }}
        sentNotifications={notifications}
        setSentNotifications={setNotifications}
        totalStudents={142}
        currentUser={{
          name: "Student",
          role: "student",
          email: "student@gmail.com",
        }}
      />
    </div>
  );
}
