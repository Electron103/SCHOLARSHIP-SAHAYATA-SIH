import { useState } from "react";
import {
  Trash2,
  Bell,
  Plus,
  Filter,
  Tag,
  Users,
  Calendar,
} from "lucide-react";
import type { Notification, User } from "../types";

interface NotificationPanelProps {
  isOpen: boolean;
  sentNotifications: Notification[];
  setSentNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  currentUser: User;
}

export default function NotificationPanel({
  isOpen,
  sentNotifications,
  setSentNotifications,
  currentUser,
}: NotificationPanelProps) {
  const [activeTab, setActiveTab] =
    useState<"notifications" | "panchayat">("notifications");

  const isAdmin = currentUser.role === "Admin";

  // -----------------------------
  // Notification State (UNCHANGED)
  // -----------------------------
  const [notifForm, setNotifForm] = useState({
    title: "",
    description: "",
    message: "",
    type: "INFO",
    category: "Aadhaar",
    audience: "All Students",
    priority: "MEDIUM",
    link: "",
  });

  // ------------------------------------------------------
  // ⭐ Panchayat State (NEW) — does NOT affect notifications
  // ------------------------------------------------------
  const [panchayatForm, setPanchayatForm] = useState({
    title: "",
    description: "",
    village: "",
    block: "",
    audience: "All",
  });

  const [panchayatNotices, setPanchayatNotices] = useState<any[]>([]);

  if (!isOpen) return null;

  // =======================================================
  // SEND NOTIFICATION — ORIGINAL CODE (UNCHANGED)
  // =======================================================
  const handleSendNotification = async () => {
    if (!notifForm.title || !notifForm.description) {
      alert("Please enter Title + Description");
      return;
    }

    const payload = {
      title: notifForm.title,
      description: notifForm.description,
      message: notifForm.message,
      category: notifForm.category,
      audience: notifForm.audience,
      priority: notifForm.priority,
      link: notifForm.link,
      type: notifForm.type,
      accountType:
        notifForm.category === "Aadhaar"
          ? "aadhaar"
          : notifForm.category === "DBT"
          ? "dbt"
          : "scholarship",
      createdBy: currentUser.name || "Admin",
    };

    try {
      const res = await fetch("http://localhost:5000/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setSentNotifications((prev) => [data.notification, ...prev]);

      setNotifForm({
        title: "",
        description: "",
        message: "",
        type: "INFO",
        category: "Aadhaar",
        audience: "All Students",
        priority: "MEDIUM",
        link: "",
      });

      alert("Notification Sent Successfully ✔");
    } catch (err) {
      console.error("Send Notification Error:", err);
      alert("Error sending notification ❌");
    }
  };

  // =======================================================
  // DELETE NOTIFICATION — ORIGINAL CODE (UNCHANGED)
  // =======================================================
  const handleDeleteNotification = async (id: string) => {
    if (!confirm("Delete this notification?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        alert("Delete failed");
        return;
      }

      setSentNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
      alert("Server delete error");
    }
  };

  // =======================================================
  // ⭐ SEND PANCHAYAT NOTICE (LOCAL ONLY — INSTANT UPDATE)
  // =======================================================
  const handleSendPanchayatNotice = () => {
    if (!panchayatForm.title || !panchayatForm.description) {
      alert("Please enter Notice Title & Description");
      return;
    }

    const newNotice = {
      ...panchayatForm,
      createdAt: new Date(),
    };

    setPanchayatNotices((prev) => [newNotice, ...prev]);

    setPanchayatForm({
      title: "",
      description: "",
      village: "",
      block: "",
      audience: "All",
    });

    alert("Gram Panchayat Notice Sent ✔");
  };

  return (
    <div className="absolute top-14 right-0 w-[650px] lg:w-[720px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[85vh] overflow-hidden flex flex-col">

      {/* ---------------- Tabs Header ---------------- */}
      <div className="flex border-b bg-gray-50">
        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex-1 py-4 font-semibold flex items-center justify-center gap-2 ${
            activeTab === "notifications"
              ? "bg-white text-blue-600 border-t-2 border-blue-600"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          <Bell size={18} /> Notifications & Alerts
        </button>

        {/* ⭐ Replaced Documents with Panchayat */}
        <button
          onClick={() => setActiveTab("panchayat")}
          className={`flex-1 py-4 font-semibold flex items-center justify-center gap-2 ${
            activeTab === "panchayat"
              ? "bg-white text-green-600 border-t-2 border-green-600"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          🏡 Gram Panchayat Notices
        </button>
      </div>

      {/* ---------------- Main Content ---------------- */}
      <div className="overflow-y-auto flex-1 p-6 bg-gray-50">

        {/* ================================================= */}
        {/* NOTIFICATIONS TAB — UNTOUCHED                    */}
        {/* ================================================= */}
        {activeTab === "notifications" && (
          <div className="space-y-6">

            {/* EVERYTHING BELOW IS YOUR ORIGINAL CODE UNCHANGED */}

            <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-blue-800">
                <Plus size={20} />
                <h3 className="font-bold">Create New Notification</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                  <label className="font-semibold text-sm text-gray-700">
                    Title *
                  </label>
                  <input
                    className="w-full p-2 border rounded"
                    value={notifForm.title}
                    onChange={(e) =>
                      setNotifForm({ ...notifForm, title: e.target.value })
                    }
                    placeholder="Notification Title"
                  />
                </div>

                <div className="col-span-2">
                  <label className="font-semibold text-sm text-gray-700">
                    Message / Description *
                  </label>
                  <textarea
                    className="w-full p-2 border rounded h-20 resize-none"
                    value={notifForm.description}
                    onChange={(e) =>
                      setNotifForm({
                        ...notifForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Short summary"
                  />
                </div>

                <div className="col-span-2">
                  <label className="font-semibold text-sm text-gray-700">
                    Long Message (optional)
                  </label>
                  <textarea
                    className="w-full p-2 border rounded h-24 resize-none"
                    value={notifForm.message}
                    onChange={(e) =>
                      setNotifForm({ ...notifForm, message: e.target.value })
                    }
                    placeholder="Optional long description"
                  />
                </div>

                <div>
                  <label className="font-semibold text-sm text-gray-700">
                    Category
                  </label>
                  <select
                    title="Select notification category"
                    className="w-full p-2 border rounded"
                    value={notifForm.category}
                    onChange={(e) =>
                      setNotifForm({ ...notifForm, category: e.target.value })
                    }
                  >
                    <option>Aadhaar</option>
                    <option>DBT</option>
                    <option>Scholarship</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-sm text-gray-700">
                    Audience
                  </label>
                  <select
                    title="Select notification audience"
                    className="w-full p-2 border rounded"
                    value={notifForm.audience}
                    onChange={(e) =>
                      setNotifForm({ ...notifForm, audience: e.target.value })
                    }
                  >
                    <option>All Students</option>
                    <option>Graduate Students</option>
                    <option>Undergraduates</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-sm text-gray-700">
                    Priority
                  </label>
                  <select
                    title="Select notification priority"
                    className="w-full p-2 border rounded"
                    value={notifForm.priority}
                    onChange={(e) =>
                      setNotifForm({ ...notifForm, priority: e.target.value })
                    }
                  >
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-sm text-gray-700">
                    Link / Route (optional)
                  </label>
                  <input
                    className="w-full p-2 border rounded"
                    value={notifForm.link}
                    onChange={(e) =>
                      setNotifForm({ ...notifForm, link: e.target.value })
                    }
                    placeholder="/guide/link"
                  />
                </div>
              </div>

              <button
                onClick={handleSendNotification}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Bell size={18} /> Send Notification
              </button>
            </div>

            {/* Sent Notifications List */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-gray-700">
                <Filter size={20} />
                <h3 className="font-bold">
                  Sent Notifications ({sentNotifications.length})
                </h3>
              </div>

              <div className="space-y-3">
                {sentNotifications.map((notif) => (
                  <div
                    key={notif._id}
                    className="bg-white p-4 rounded-lg border shadow-sm relative"
                  >
                    {isAdmin && (
                      <button
                        title="Delete notification"
                        onClick={() => handleDeleteNotification(notif._id)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}

                    <h4 className="font-bold text-gray-900">{notif.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {notif.message || notif.description}
                    </p>

                    <div className="flex gap-3 mt-3 text-xs text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                        <Tag size={12} /> {notif.category}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                        <Users size={12} /> {notif.audience}
                      </span>

                      {notif.createdAt && (
                        <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                          <Calendar size={12} />
                          {new Date(notif.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* ⭐ PANCHAYAT TAB — NEW                          */}
        {/* ================================================= */}
        {activeTab === "panchayat" && (
          <div className="space-y-6">

            {/* Panchayat Form */}
            <div className="bg-white p-5 rounded-lg border border-green-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-green-700">
                <Plus size={20} />
                <h3 className="font-bold">Create Gram Panchayat Notice</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2">
                  <label className="font-semibold text-sm">Notice Title *</label>
                  <input
                    className="w-full p-2 border rounded"
                    value={panchayatForm.title}
                    onChange={(e) =>
                      setPanchayatForm({ ...panchayatForm, title: e.target.value })
                    }
                    placeholder="Notice Title"
                  />
                </div>

                <div className="col-span-2">
                  <label className="font-semibold text-sm">Notice Description *</label>
                  <textarea
                    className="w-full p-2 border rounded h-20 resize-none"
                    value={panchayatForm.description}
                    onChange={(e) =>
                      setPanchayatForm({
                        ...panchayatForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Write notice..."
                  />
                </div>

                <div>
                  <label className="font-semibold text-sm">Village</label>
                  <input
                    className="w-full p-2 border rounded"
                    value={panchayatForm.village}
                    onChange={(e) =>
                      setPanchayatForm({ ...panchayatForm, village: e.target.value })
                    }
                    placeholder="Village Name"
                  />
                </div>

                <div>
                  <label className="font-semibold text-sm">Block</label>
                  <input
                    className="w-full p-2 border rounded"
                    value={panchayatForm.block}
                    onChange={(e) =>
                      setPanchayatForm({ ...panchayatForm, block: e.target.value })
                    }
                    placeholder="Block Name"
                  />
                </div>

                <div>
                  <label className="font-semibold text-sm">Audience</label>
                  <select
                    title="Select panchayat notice audience"
                    className="w-full p-2 border rounded"
                    value={panchayatForm.audience}
                    onChange={(e) =>
                      setPanchayatForm({
                        ...panchayatForm,
                        audience: e.target.value,
                      })
                    }
                  >
                    <option value="All">All</option>
                    <option value="Anganwadi">Anganwadi</option>
                    <option value="Govt Schools">Government Schools</option>
                    <option value="Panchayat Staff">Panchayat Staff</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSendPanchayatNotice}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Send Panchayat Notice
              </button>
            </div>

            {/* Panchayat Notices List */}
            <div>
              <h3 className="font-bold mb-3">Sent Panchayat Notices</h3>

              {panchayatNotices.length === 0 ? (
                <p className="text-gray-500 text-sm">No notices yet.</p>
              ) : (
                <div className="space-y-3">
                  {panchayatNotices.map((n, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border shadow-sm">
                      <h4 className="font-bold">{n.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{n.description}</p>

                      <div className="flex gap-3 mt-3 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          Village: {n.village}
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          Block: {n.block}
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          Audience: {n.audience}
                        </span>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      <div className="p-3 text-center border-t text-xs text-gray-400 bg-gray-50">
        Scholarship Sahayata Admin Portal
      </div>
    </div>
  );
}