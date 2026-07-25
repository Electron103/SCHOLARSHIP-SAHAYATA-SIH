import { useState } from 'react';
import { Edit2, Trash2, Lock } from 'lucide-react';
import { Admin, User } from '../types';

interface AdminsTabProps {
  admins: Admin[];
  setAdmins: (admins: Admin[]) => void;
  currentUser: User;
}

export default function AdminsTab({ admins, setAdmins, currentUser }: AdminsTabProps) {
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ email: '', role: 'Verifier' });

  const isAdmin = currentUser.role === 'Admin';

  const addAdmin = () => {
    if (!newAdmin.email || !newAdmin.role) {
      alert('Please fill all fields');
      return;
    }
    const admin: Admin = { id: admins.length + 1, ...newAdmin, status: 'Active' };
    setAdmins([...admins, admin]);
    setNewAdmin({ email: '', role: 'Verifier' });
    setShowAddAdmin(false);
    alert('✓ Admin added successfully!');
  };

  const deleteAdmin = (id: number) => {
    setAdmins(admins.filter(a => a.id !== id));
    alert('✓ Admin removed!');
  };

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">Admin Management</h3>
          {isAdmin && (
            <button onClick={() => setShowAddAdmin(!showAddAdmin)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition">
              + Add
            </button>
          )}
        </div>

        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-900">
           <p className="font-semibold mb-1">Role Descriptions:</p>
           <ul className="list-disc list-inside space-y-1 ml-1 text-blue-800">
             <li><strong>Admin:</strong> Full system access. Can manage users, schemes, and configurations.</li>
             <li><strong>Verifier:</strong> Can view student details and Approve or Reject scholarship applications.</li>
             <li><strong>Auditor:</strong> Read-only access to Activity Logs and Reports for compliance checks.</li>
           </ul>
        </div>

        {showAddAdmin && isAdmin && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <input type="email" placeholder="Email" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} className="w-full px-3 py-2 border rounded mb-2" />
            <select value={newAdmin.role} onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })} title="Select admin role" className="w-full px-3 py-2 border rounded mb-2">
              <option value="Verifier">Verifier</option>
              <option value="Admin">Admin</option>
              <option value="Auditor">Auditor</option>
            </select>
            <div className="flex gap-2">
              <button onClick={addAdmin} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Save</button>
              <button onClick={() => setShowAddAdmin(false)} className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded">Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {admins.map(admin => (
            <div key={admin.id} className="flex justify-between items-center p-4 bg-gray-50 rounded border border-gray-200 hover:bg-white transition-colors">
              <div>
                <p className="font-semibold text-gray-800">{admin.email}</p>
                <p className="text-sm text-gray-600">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${admin.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {admin.role} • {admin.status}
                </p>
              </div>
              <div className="space-x-2 flex items-center">
                {isAdmin ? (
                  <>
                    <button title="Edit admin" className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"><Edit2 size={16} /></button>
                    <button onClick={() => deleteAdmin(admin.id)} title="Delete admin" className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"><Trash2 size={16} /></button>
                  </>
                ) : (
                  <span className="text-gray-400 p-2"><Lock size={16} /></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}