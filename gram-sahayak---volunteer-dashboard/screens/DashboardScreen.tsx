import React from 'react';
import { Task, TaskStatus } from '../types';
import { AlertCircle, CheckCircle2, Clock, Hourglass } from 'lucide-react';

interface DashboardScreenProps {
  tasks: Task[];
  navigateTo: (view: any, task?: Task) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ tasks, navigateTo }) => {
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === TaskStatus.PENDING || t.status === TaskStatus.NEW).length;
  const completed = tasks.filter(t => t.status === TaskStatus.COMPLETED || t.status === TaskStatus.UNDER_REVIEW).length;
  const overdue = tasks.filter(t => t.status === TaskStatus.OVERDUE).length;

  // Sort by urgency for the "Urgent Panel"
  const urgentTasks = tasks
    .filter(t => t.status === TaskStatus.PENDING || t.status === TaskStatus.NEW || t.status === TaskStatus.OVERDUE)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  // Helper to format countdown
  const getDeadlineText = (isoDate: string) => {
    const diff = new Date(isoDate).getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diff < 0) return "Overdue";
    if (days > 0) return `${days}d remaining`;
    return `${hours}h remaining`;
  };

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Tasks" 
          value={total} 
          icon={<AlertCircle className="text-blue-600" />} 
          bg="bg-blue-50" 
          textColor="text-blue-900" 
        />
        <StatCard 
          title="Pending" 
          value={pending} 
          icon={<Hourglass className="text-yellow-600" />} 
          bg="bg-yellow-50" 
          textColor="text-yellow-900" 
        />
        <StatCard 
          title="Completed" 
          value={completed} 
          icon={<CheckCircle2 className="text-green-600" />} 
          bg="bg-green-50" 
          textColor="text-green-900" 
        />
        <StatCard 
          title="Overdue" 
          value={overdue} 
          icon={<Clock className="text-red-600" />} 
          bg="bg-red-50" 
          textColor="text-red-900" 
        />
      </div>

      {/* Urgent Tasks Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-red-50 px-4 py-3 border-b border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-red-600" />
            <h3 className="font-semibold text-red-800">Urgent Attention Needed</h3>
          </div>
          <span className="text-xs font-medium bg-white text-red-600 px-2 py-1 rounded-full border border-red-200">
            {urgentTasks.length} Tasks
          </span>
        </div>
        <div className="divide-y divide-gray-100">
          {urgentTasks.length === 0 ? (
             <div className="p-8 text-center text-gray-500">No urgent tasks right now. Great job!</div>
          ) : (
            urgentTasks.map(task => (
              <div 
                key={task.id} 
                onClick={() => navigateTo('TASK_DETAIL', task)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">{task.title}</h4>
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-sm ${
                    new Date(task.deadline).getTime() < new Date().getTime() 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {getDeadlineText(task.deadline)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-1 mb-2">{task.shortDescription}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{task.id}</span>
                  <span>•</span>
                  <span className="text-blue-600 font-medium">{task.category}</span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-3 bg-gray-50 border-t text-center">
          <button 
            onClick={() => navigateTo('TASKS')}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View All Notifications
          </button>
        </div>
      </div>

      {/* Next Deadline Countdown (Single Highlight) */}
      {urgentTasks.length > 0 && (
         <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
           <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2 text-blue-200">
               <Clock size={16} />
               <span className="text-sm font-medium uppercase tracking-wider">Next Deadline</span>
             </div>
             <h3 className="text-xl font-bold mb-1">{urgentTasks[0].title}</h3>
             <p className="text-blue-100 text-sm mb-4">Due: {new Date(urgentTasks[0].deadline).toLocaleDateString()} at {new Date(urgentTasks[0].deadline).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
             <button 
               onClick={() => navigateTo('TASK_DETAIL', urgentTasks[0])}
               className="bg-white text-blue-900 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-50 transition-colors"
             >
               View Details
             </button>
           </div>
         </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, bg, textColor }: any) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col justify-between">
    <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center mb-3`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500 uppercase font-medium">{title}</p>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
    </div>
  </div>
);

export default DashboardScreen;