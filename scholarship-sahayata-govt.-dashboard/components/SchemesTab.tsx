import { useState } from 'react';
import { Edit2, Trash2, Lock } from 'lucide-react';
import { Scheme, User } from '../types';

interface SchemesTabProps {
  schemes: Scheme[];
  setSchemes: (schemes: Scheme[]) => void;
  deletedSchemes: Scheme[];
  setDeletedSchemes: (schemes: Scheme[]) => void;
  instructions: string;
  setInstructions: (text: string) => void;
  currentUser: User;
}

export default function SchemesTab({ schemes, setSchemes, deletedSchemes, setDeletedSchemes, instructions, setInstructions, currentUser }: SchemesTabProps) {
  const [showAddScheme, setShowAddScheme] = useState(false);
  const [newScheme, setNewScheme] = useState<Partial<Scheme>>({ name: '', amount: 0, description: '', aadharRequired: true, dbtRequired: true });
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [newInstruction, setNewInstruction] = useState('');

  const isAdmin = currentUser.role === 'Admin';

  const addScheme = () => {
    if (!newScheme.name || !newScheme.amount) {
      alert('Please fill all fields');
      return;
    }
    const scheme = { id: schemes.length + 1, ...newScheme, amount: Number(newScheme.amount) } as Scheme;
    setSchemes([...schemes, scheme]);
    setNewScheme({ name: '', amount: 0, description: '', aadharRequired: true, dbtRequired: true });
    setShowAddScheme(false);
    alert('✓ Scheme added successfully!');
  };

  const updateScheme = () => {
    if (!editingScheme?.name || !editingScheme?.amount) {
      alert('Please fill all fields');
      return;
    }
    setSchemes(schemes.map(s => s.id === editingScheme.id ? editingScheme : s));
    setEditingScheme(null);
    alert('✓ Scheme updated successfully!');
  };

  const deleteScheme = (id: number) => {
    const scheme = schemes.find(s => s.id === id);
    if (scheme) {
      setDeletedSchemes([...deletedSchemes, scheme]);
      setSchemes(schemes.filter(s => s.id !== id));
      alert('✓ Scheme deleted!');
    }
  };

  const undoDeleteScheme = () => {
    if (deletedSchemes.length > 0) {
      const lastDeleted = deletedSchemes[deletedSchemes.length - 1];
      setSchemes([...schemes, lastDeleted]);
      setDeletedSchemes(deletedSchemes.slice(0, -1));
      alert('✓ Scheme restored!');
    } else {
      alert('❌ No schemes to undo!');
    }
  };

  const updateInstructions = () => {
    if (newInstruction.trim()) {
      setInstructions(newInstruction);
      setNewInstruction('');
      alert('✓ Instructions updated successfully!');
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Scholarship Schemes</h3>
          {isAdmin && (
            <div className="space-x-2 flex">
              <button
                onClick={undoDeleteScheme}
                disabled={deletedSchemes.length === 0}
                className={`${deletedSchemes.length > 0 ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-300 cursor-not-allowed'} text-white px-3 py-2 rounded text-sm font-semibold transition`}
              >
                ↶ Undo
              </button>
              <button onClick={() => setShowAddScheme(!showAddScheme)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition">
                + Add
              </button>
            </div>
          )}
        </div>

        {showAddScheme && isAdmin && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in-down">
            <input type="text" placeholder="Name" value={newScheme.name} onChange={(e) => setNewScheme({ ...newScheme, name: e.target.value })} className="w-full px-3 py-2 border rounded mb-2" />
            <input type="number" placeholder="Amount" value={newScheme.amount} onChange={(e) => setNewScheme({ ...newScheme, amount: Number(e.target.value) })} className="w-full px-3 py-2 border rounded mb-2" />
            <textarea placeholder="Description" value={newScheme.description} onChange={(e) => setNewScheme({ ...newScheme, description: e.target.value })} className="w-full px-3 py-2 border rounded h-16 mb-2" />
            <div className="flex gap-2">
              <button onClick={addScheme} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Save</button>
              <button onClick={() => setShowAddScheme(false)} className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded">Cancel</button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {schemes.map(scheme => (
            <div key={scheme.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              {editingScheme?.id === scheme.id && isAdmin ? (
                <div className="space-y-2">
                  <input type="text" placeholder="Scheme name" value={editingScheme.name} onChange={(e) => setEditingScheme({ ...editingScheme, name: e.target.value })} className="w-full px-3 py-2 border rounded" />
                  <input type="number" placeholder="Amount" value={editingScheme.amount} onChange={(e) => setEditingScheme({ ...editingScheme, amount: Number(e.target.value) })} className="w-full px-3 py-2 border rounded" />
                  <div className="flex gap-2">
                    <button onClick={updateScheme} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded">Save</button>
                    <button onClick={() => setEditingScheme(null)} className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{scheme.name}</p>
                    <p className="text-sm text-gray-600">{scheme.description}</p>
                    <p className="text-sm mt-2 font-medium text-blue-600">₹{scheme.amount.toLocaleString()}</p>
                  </div>
                  <div className="space-x-2 flex ml-4 items-center">
                    {isAdmin ? (
                      <>
                        <button onClick={() => setEditingScheme(scheme)} title="Edit scheme" className="text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded"><Edit2 size={16} /></button>
                        <button onClick={() => deleteScheme(scheme.id)} title="Delete scheme" className="text-red-600 hover:text-red-800 bg-red-50 p-2 rounded"><Trash2 size={16} /></button>
                      </>
                    ) : (
                       <span className="text-gray-400 p-2"><Lock size={16} /></span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Update Instructions</h3>
        <textarea
          value={newInstruction}
          onChange={(e) => setNewInstruction(e.target.value)}
          placeholder={isAdmin ? "Enter instructions..." : "Only Admins can update instructions"}
          disabled={!isAdmin}
          className={`w-full px-4 py-2 border rounded h-24 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none ${!isAdmin ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
        />
        {isAdmin && (
           <button onClick={updateInstructions} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition">Update</button>
        )}
        <div className="mt-6 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
          <p className="text-sm font-semibold mb-2 text-blue-900">Current Instructions:</p>
          <p className="text-sm text-blue-800">{instructions}</p>
        </div>
      </div>
    </div>
  );
}