import React from 'react';
import { FeedbackSubmission, Task } from '../types';
import { ArrowLeft, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface HistoryScreenProps {
  submissions: FeedbackSubmission[];
  tasks: Task[];
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ submissions, tasks, onBack }) => {
  const getTaskTitle = (id: string) => {
    return tasks.find(t => t.id === id)?.title || "Unknown Task";
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved': return <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded text-xs font-bold"><CheckCircle2 size={12}/> Approved</span>;
      case 'Rejected': return <span className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded text-xs font-bold"><XCircle size={12}/> Rejected</span>;
      default: return <span className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-1 rounded text-xs font-bold"><Clock size={12}/> {status}</span>;
    }
  };

  return (
    <div className="pb-20">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-xl font-bold text-gray-900">Activity History</h2>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Clock size={40} />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No History Yet</h3>
          <p className="text-gray-500 mt-2">Complete tasks to see your submission history here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex p-4 gap-4">
                 <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                   {sub.imageUrl ? (
                     <img src={sub.imageUrl} alt="Proof" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                   )}
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between items-start mb-1">
                     <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{getTaskTitle(sub.taskId)}</h4>
                     {getStatusBadge(sub.status)}
                   </div>
                   <p className="text-xs text-gray-500 mb-2">
                     Submitted on: {new Date(sub.submittedAt).toLocaleDateString()} at {new Date(sub.submittedAt).toLocaleTimeString()}
                   </p>
                   <div className="bg-gray-50 p-2 rounded-lg">
                     <p className="text-sm text-gray-700 italic line-clamp-2">"{sub.notes}"</p>
                   </div>
                   {sub.govtComments && (
                     <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                       <strong>Admin Comment:</strong> {sub.govtComments}
                     </div>
                   )}
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;