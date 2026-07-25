// src/pages/Dashboard.tsx
import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { API_BASE } from "../api"; // adjust path if your api.ts is elsewhere

// single socket instance for this page (keeps connection simple)
const socket = io((API_BASE as string) || "http://localhost:5000", {
  transports: ["websocket", "polling"],
});

type Student = {
  studentId?: string;
  name?: string;
  status?: "Approved" | "Pending" | "Rejected" | string;
  amount?: number; // optional if you store amounts per student
  // other fields...
};

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Derived stats
  const totalStudents = students.length;
  // In many dashboards "applications" = total students — adjust if different
  const applications = students.length;
  const approvedCount = students.filter((s) => s.status === "Approved").length;
  const pendingCount = students.filter((s) => s.status === "Pending").length;
  const rejectedCount = students.filter((s) => s.status === "Rejected").length;

  // Example: sum of "amount" field if you store disbursement per student
  const amountDist = students.reduce((sum, s) => sum + (s.amount || 0), 0);

  const formatCurrency = (num: number) => {
    // format to lakhs or rupee as in screenshot (₹29.80L). We'll show as rupees with commas; change if you want L format.
    return num === 0 ? "₹0" : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(num);
  };

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE || "http://localhost:5000"}/api/students-with-login`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const json = await res.json();
      // normalize: server returns { students: [...] } or array
      const list = Array.isArray(json) ? json : json.students || [];
      setStudents(list);
    } catch (err: any) {
      console.error("Failed to fetch students:", err);
      setError(err?.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Socket listeners to update stats live
  useEffect(() => {
    const onStudentCreated = (payload: any) => {
      // payload is full student object (as emitted by backend)
      setStudents((prev) => {
        // avoid duplicate insert if exists
        const exists = prev.some(s => s.studentId && s.studentId === payload.studentId);
        if (exists) {
          return prev.map(s => s.studentId && s.studentId === payload.studentId ? { ...s, ...payload } : s);
        }
        return [payload, ...prev];
      });
    };

    const onLoginUpdated = (payload: any) => {
      // payload: { studentId, loginInfo }
      setStudents((prev) =>
        prev.map((s) =>
          s.studentId && s.studentId === payload.studentId
            ? { ...s, loginInfo: payload.loginInfo }
            : s
        )
      );
    };

    socket.on("student-created", onStudentCreated);
    socket.on("login-updated", onLoginUpdated);

    return () => {
      socket.off("student-created", onStudentCreated);
      socket.off("login-updated", onLoginUpdated);
    };
  }, []);

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Scholarship Sahayata</h1>

      {loading && <div className="mb-4 text-sm text-gray-500">Loading stats...</div>}
      {error && <div className="mb-4 text-sm text-red-600">Error: {error}</div>}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <div className="col-span-1 bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-2xl font-bold">{totalStudents}</p>
        </div>

        <div className="col-span-1 bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Applications</p>
          <p className="text-2xl font-bold">{applications}</p>
        </div>

        <div className="col-span-1 bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold">{approvedCount}</p>
        </div>

        <div className="col-span-1 bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold">{pendingCount}</p>
        </div>

        <div className="col-span-1 bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-2xl font-bold">{rejectedCount}</p>
        </div>

        <div className="col-span-1 bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Amount Dist.</p>
          <p className="text-2xl font-bold">{formatCurrency(amountDist)}</p>
        </div>
      </div>

      {/* Optionally the charts and other dashboard content below — keep unchanged */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Example placeholder containers for existing charts */}
        <div className="bg-white rounded-lg shadow p-6 min-h-[220px]">
          <h3 className="text-lg font-semibold mb-3">Students per District</h3>
          <div className="text-sm text-gray-500">Chart area — unchanged</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 min-h-[220px]">
          <h3 className="text-lg font-semibold mb-3">Category Distribution</h3>
          <div className="text-sm text-gray-500">Chart area — unchanged</div>
        </div>
      </div>
    </div>
  );
}
