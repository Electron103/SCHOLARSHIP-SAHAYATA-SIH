import { MOCK_LOGS } from '../constants';

export default function LogsTab() {
  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
           <h3 className="text-lg font-semibold text-gray-800">System Activity Logs</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b border-gray-200 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Action</th>
              <th className="px-6 py-3 text-left">Changes</th>
              <th className="px-6 py-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LOGS.map((log, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-800">{log.user}</td>
                <td className="px-6 py-4">{log.action}</td>
                <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">{log.change}</span>
                </td>
                <td className="px-6 py-4 text-gray-500">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}