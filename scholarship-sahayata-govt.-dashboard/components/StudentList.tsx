import { useState, useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { Student } from '../types';

interface StudentListProps {
  students: Student[];
  onView?: (student: Student) => void;
}

export default function StudentList({ students, onView }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredStudents = useMemo(() => {
    let filtered = students.filter(s =>
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.district.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterType !== 'all') {
      filtered = filtered.filter(s => s.status.toLowerCase() === filterType.toLowerCase());
    }
    return filtered;
  }, [searchTerm, filterType, students]);

  const StatusPill = ({ status }: { status: string }) => {
    const styles = {
      Approved: 'bg-green-100 text-green-700',
      Pending: 'bg-yellow-100 text-yellow-700',
      Rejected: 'bg-red-100 text-red-700'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  const StatusIcon = ({ active }: { active: boolean }) => {
    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? 'bg-green-100' : 'bg-red-100'}`}>
        {active ? <Check size={16} className="text-green-600" /> : <X size={16} className="text-red-600" />}
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 space-y-6">
          <input
            type="text"
            placeholder="Search student ID, name or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 bg-white"
          />
          
          <div className="flex gap-2">
            {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilterType(status === 'All' ? 'all' : status)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  (status === 'All' && filterType === 'all') || status === filterType
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">ID</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Category</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">District</th>
                {/* COLLEGE REMOVED */}
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-center font-semibold text-gray-600">Aadhaar</th>
                <th className="px-6 py-4 text-center font-semibold text-gray-600">DBT</th>
                <th className="px-6 py-4 text-center font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredStudents.length > 0 ? filteredStudents.map(student => (
                <tr key={student.studentId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{student.studentId}</td>
                  <td className="px-6 py-4 text-gray-700">{student.name}</td>
                 <td className="px-6 py-4 text-gray-600">
  {student.category === "GEN" ? "EWS" : student.category}
</td>

                  <td className="px-6 py-4 text-gray-600">{student.district}</td>

                  {/* COLLEGE FIELD REMOVED */}

                  <td className="px-6 py-4">
                    <StatusPill status={student.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <StatusIcon active={student.aadharLinked} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <StatusIcon active={student.dbtEnabled} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onView?.(student)}
                      className="px-3 py-1 text-blue-600 hover:underline"
                    >
                      View
                    </button>

                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                     No students found matching filters.
                   </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}