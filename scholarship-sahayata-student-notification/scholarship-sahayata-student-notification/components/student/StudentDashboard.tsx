import React from "react";
import { Shield, Zap, Bookmark, Bell, Calendar, Download } from "lucide-react";

import type { Notification } from "../../types";

import {
  downloadSingleNotification,
  downloadAllNotifications,
} from "../../services/pdfGenerator";

export default function StudentDashboard({
  notifications = [],
  loading = false,
}: {
  notifications?: Notification[];
  loading?: boolean;
}) {
  // ---------------- NOTIFICATION CATEGORIES ----------
  const aadhaar = notifications.filter((n) => n.accountType === "aadhaar");
  const dbt = notifications.filter((n) => n.accountType === "dbt");
  const scholarship = notifications.filter((n) => n.accountType === "scholarship");

  return (
    <div
  className="min-h-screen p-8 tri-gradient-soft"
>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome, Student! 👋
          </h1>
          <p className="mt-1 text-gray-600">
            Stay updated with important notifications about Aadhaar linking,
            DBT, and Scholarships.
          </p>
        </div>

        <button
          onClick={() => downloadAllNotifications(notifications)}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Download All Notifications
        </button>
      </div>

      {/* ===================== NOTIFICATIONS GRID ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard
          title="Aadhaar-Linked Account"
          subtitle="Identity & Linking Status"
          gradient="from-purple-500 to-blue-500"
          icon={<Shield className="text-white" size={20} />}
          items={aadhaar}
          loading={loading}
        />

        <SectionCard
          title="DBT-Enabled Account"
          subtitle="Schemes & Benefits"
          gradient="from-purple-600 to-purple-400"
          icon={<Zap className="text-white" size={20} />}
          items={dbt}
          loading={loading}
        />

        <SectionCard
          title="Scholarship Updates"
          subtitle="Latest Scholarship Information"
          gradient="from-purple-500 to-pink-400"
          icon={<Bookmark className="text-white" size={20} />}
          items={scholarship}
          loading={loading}
        />
      </div>
    </div>
  );
}

/* ==============================================================
   SECTION CARD (Aadhaar, DBT, Scholarship)
================================================================= */
function SectionCard({
  title,
  subtitle,
  gradient,
  icon,
  items,
  loading,
}: {
  title: string;
  subtitle: string;
  gradient: string;
  icon: React.ReactNode;
  items: Notification[];
  loading: boolean;
}) {
  return (
    <div
      className="bg-white rounded-xl shadow-md border overflow-hidden flex flex-col max-h-[460px]"
    >
      {/* Header */}
      <div className={`p-5 bg-gradient-to-r ${gradient} flex gap-3`}>
        {icon}
        <div>
          <h2 className="text-white font-bold text-lg">{title}</h2>
          {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="scrollable-box p-4 flex-1 min-h-0 overflow-y-auto"
      >
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500 italic">No notifications.</p>
        ) : (
          items.map((n) => (
            <NotificationCard
              key={n._id}
              n={n}
              onDownload={() => downloadSingleNotification(n)}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ==============================================================
   NOTIFICATION CARD
================================================================= */
function NotificationCard({
  n,
  onDownload,
}: {
  n: Notification;
  onDownload?: () => void;
}) {
  return (
    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md mb-3 shadow-sm hover:shadow-md transition text-sm">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Bell className="text-blue-600" size={18} />
          <h3 className="font-semibold text-gray-800">{n.title}</h3>
        </div>

        {onDownload && (
          <button
            onClick={onDownload}
            className="p-1 rounded-full hover:bg-gray-200 transition"
            title="Download PDF"
          >
            <Download size={18} className="text-indigo-600" />
          </button>
        )}
      </div>

      <p className="mt-2 text-gray-600 text-sm">
        {n.description || n.message}
      </p>

      <div className="flex gap-3 mt-3 text-xs">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
          {n.category}
        </span>

        {n.createdAt && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full flex gap-2 items-center">
            <Calendar size={12} />
            {new Date(n.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}
