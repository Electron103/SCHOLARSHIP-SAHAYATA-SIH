import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';
import { Search, Filter, Calendar, ChevronRight } from 'lucide-react';

interface TaskListScreenProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

const TaskListScreen: React.FC<TaskListScreenProps> = ({ tasks, onSelectTask }) => {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL');
  const [search, setSearch] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                          task.shortDescription.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'ALL') return matchesSearch;
    if (filter === 'PENDING') return matchesSearch && (task.status === TaskStatus.PENDING || task.status === TaskStatus.NEW || task.status === TaskStatus.OVERDUE);
    if (filter === 'COMPLETED') return matchesSearch && (task.status === TaskStatus.COMPLETED || task.status === TaskStatus.UNDER_REVIEW);
    return matchesSearch;
  });

  const getStatusColor = (status: TaskStatus) => {
    switch(status) {
      case TaskStatus.NEW: return 'bg-blue-100 text-blue-700 border-blue-200';
      case TaskStatus.PENDING: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case TaskStatus.OVERDUE: return 'bg-red-100 text-red-700 border-red-200';
      case TaskStatus.COMPLETED: return 'bg-green-100 text-green-700 border-green-200';
      case TaskStatus.UNDER_REVIEW: return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{filteredTasks.length} tasks</span>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex bg-white rounded-lg border border-gray-300 p-1">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${filter === 'ALL' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-500'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('PENDING')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${filter === 'PENDING' ? 'bg-yellow-50 text-yellow-800 shadow-sm' : 'text-gray-500'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('COMPLETED')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${filter === 'COMPLETED' ? 'bg-green-50 text-green-800 shadow-sm' : 'text-gray-500'}`}
          >
            Done
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            <p>No tasks found matching your criteria.</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id}
              onClick={() => onSelectTask(task)}
              className={`bg-white rounded-xl p-4 shadow-sm border border-l-4 cursor-pointer hover:shadow-md transition-all group ${
                task.status === TaskStatus.OVERDUE ? 'border-l-red-500' : 
                task.status === TaskStatus.NEW ? 'border-l-blue-500' :
                task.status === TaskStatus.COMPLETED ? 'border-l-green-500' : 'border-l-yellow-400'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(task.status)}`}>
                  {task.status === TaskStatus.NEW ? 'New Govt Instruction' : task.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(task.sentDate).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                {task.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {task.shortDescription}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase">Deadline</span>
                  <span className={`text-xs font-semibold ${
                    new Date(task.deadline) < new Date() && task.status !== 'COMPLETED' ? 'text-red-600' : 'text-gray-700'
                  }`}>
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] text-gray-400 uppercase">Department</span>
                   <span className="text-xs font-medium text-gray-700">{task.department}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskListScreen;