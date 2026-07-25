import { X, ShieldAlert, Clock } from 'lucide-react';
import { Student, User } from '../types';

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUpdateStatus: (studentId: string, newStatus: 'Approved' | 'Rejected' | 'Pending') => void;
}

export default function StudentModal({ student, isOpen, onClose, currentUser, onUpdateStatus }: StudentModalProps) {
  if (!isOpen || !student) return null;

  const canModify = currentUser.role === 'Verifier' || currentUser.role === 'Admin';

  const handleApprove = () => {
    onUpdateStatus(student.studentId, 'Approved');
    onClose();
  };

  const handleReject = () => {
    onUpdateStatus(student.studentId, 'Rejected');
    onClose();
  };

  const handlePending = () => {
    onUpdateStatus(student.studentId, 'Pending');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Student Details</h2>
          <button onClick={onClose} title="Close modal" className="hover:bg-blue-700 p-2 rounded transition">
            <X size={24} />
          </button>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* Grid Details */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Student ID', value: student.studentId },
              { label: 'Name', value: student.name },
              { label: 'Category', value: student.category === "GEN" ? "EWS" : student.category },
              { label: 'District', value: student.district },
              { label: 'Status', value: student.status, highlight: true },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                <p
                  className={`text-lg font-semibold ${
                    item.highlight
                      ? student.status === 'Approved'
                        ? 'text-green-600'
                        : student.status === 'Rejected'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                      : 'text-gray-800'
                  }`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Aadhaar + Bank */}
          <div className="border-t border-gray-200 pt-4">
            <div className="p-4 bg-blue-50 rounded mb-3 border border-blue-100">
              <p className="text-sm font-medium text-blue-900">Aadhaar: {student.aadharNo}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded border border-purple-100">
              <p className="text-sm font-medium text-purple-900">Bank Account: {student.bankAccount}</p>
            </div>
          </div>

          {/* ⭐ LOGIN DETAILS ADDED HERE ⭐ */}
          {student.loginInfo ? (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700">Login Details</h4>
              <div className="mt-2 text-gray-800 text-sm space-y-1">
                <p><strong>Username:</strong> {student.loginInfo.username || "—"}</p>
                <p><strong>Email:</strong> {student.loginInfo.email || "—"}</p>
                <p>
                  <strong>Last Login:</strong>{" "}
                  {student.loginInfo.lastLogin
                    ? new Date(student.loginInfo.lastLogin).toLocaleString()
                    : "—"}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 text-gray-500 text-sm">
              No login record found.
            </div>
          )}
          {/* ⭐ END LOGIN DETAILS ⭐ */}

        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t bg-gray-50">
          {canModify ? (
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <button
                  onClick={handleApprove}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded shadow transition flex justify-center items-center gap-2"
                >
                  ✓ Approve
                </button>

                <button
                  onClick={handlePending}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded shadow transition flex justify-center items-center gap-2"
                >
                  <Clock size={18} /> Pending
                </button>

                <button
                  onClick={handleReject}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded shadow transition flex justify-center items-center gap-2"
                >
                  ✗ Reject
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded shadow transition"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 p-3 rounded text-sm">
                <ShieldAlert size={18} />
                <span>
                  Read Only: Only <strong>Verifier</strong> or <strong>Admin</strong> role can manage applications.
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded shadow transition"
              >
                Close
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
