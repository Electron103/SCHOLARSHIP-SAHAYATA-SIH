import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  ClipboardList, 
  History, 
  FileText,
  X,
  ChevronRight
} from 'lucide-react';
import { MOCK_USER, MOCK_TASKS } from './constants';
import { Task, ViewState, FeedbackSubmission, TaskStatus } from './types';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import TaskListScreen from './screens/TaskListScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import HelpScreen from './screens/HelpScreen';
import SahayakAI from './components/SahayakAI';

function App() {
  const [user, setUser] = useState<typeof MOCK_USER | null>(null);
  const [view, setView] = useState<ViewState>('LOGIN');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // App-level state for tasks to simulate updates
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>([]);

  // Calculate notifications count (NEW or PENDING)
  const notificationCount = tasks.filter(t => t.status === TaskStatus.NEW).length;

  const handleLogin = (name: string) => {
    setUser({ ...MOCK_USER, name: name });
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setUser(null);
    setView('LOGIN');
    setIsSidebarOpen(false);
  };

  const navigateTo = (newView: ViewState, task?: Task) => {
    setView(newView);
    if (task) setSelectedTask(task);
    setIsSidebarOpen(false); // Close sidebar on mobile nav
  };

  const handleSubmitFeedback = (submission: FeedbackSubmission) => {
    // Add submission
    setSubmissions([submission, ...submissions]);
    // Update task status
    setTasks(prev => prev.map(t => 
      t.id === submission.taskId 
        ? { ...t, status: TaskStatus.UNDER_REVIEW } 
        : t
    ));
    navigateTo('HISTORY');
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // --- Main Layout ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-30 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full lg:hidden"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
             {/* Simple Govt Logo Representation */}
            <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-xs border-2 border-orange-500">
              GOV
            </div>
            <div className="leading-tight">
              <h1 className="font-bold text-gray-900 text-sm sm:text-base">Gram Sahayak</h1>
              <p className="text-[10px] text-gray-500 font-medium tracking-wide">PANCHAYAT PORTAL</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer" onClick={() => navigateTo('TASKS')}>
            <Bell className="w-6 h-6 text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {notificationCount}
              </span>
            )}
          </div>
          <img 
            src={user.avatarUrl} 
            alt="User" 
            className="w-8 h-8 rounded-full border border-gray-200 hidden sm:block" 
            onClick={() => navigateTo('PROFILE')}
          />
        </div>
      </header>

      {/* Side Menu Drawer (Mobile & Desktop Combined Logic) */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
        <aside className="absolute top-0 left-0 bottom-0 w-64 bg-white shadow-xl flex flex-col transition-transform duration-300">
           <div className="p-4 border-b flex justify-between items-center bg-blue-50">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                 <UserIcon size={20} />
               </div>
               <div>
                 <p className="font-bold text-sm text-gray-900">{user.name}</p>
                 <p className="text-xs text-gray-600">{user.panchayat}</p>
               </div>
             </div>
             <button onClick={() => setIsSidebarOpen(false)}><X size={20} className="text-gray-500" /></button>
           </div>
           <nav className="flex-1 p-4 space-y-2">
             <NavLinks currentView={view} navigateTo={navigateTo} />
           </nav>
           <div className="p-4 border-t">
             <button onClick={handleLogout} className="flex items-center gap-3 text-red-600 font-medium w-full p-2 hover:bg-red-50 rounded-lg">
               <LogOut size={20} /> Logout
             </button>
           </div>
        </aside>
      </div>

      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
           <div className="p-6">
              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => navigateTo('PROFILE')}>
                 <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">Welcome</p>
                 <p className="font-bold text-gray-900">{user.name}</p>
                 <p className="text-xs text-gray-600 mt-1">{user.panchayat}</p>
              </div>
              <nav className="space-y-2">
                <NavLinks currentView={view} navigateTo={navigateTo} />
              </nav>
           </div>
           <div className="p-4 border-t mt-auto absolute bottom-0 w-full bg-white">
             <button onClick={handleLogout} className="flex items-center gap-3 text-red-600 font-medium w-full p-2 hover:bg-red-50 rounded-lg transition-colors">
               <LogOut size={20} /> Logout
             </button>
           </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {view === 'DASHBOARD' && <DashboardScreen tasks={tasks} navigateTo={navigateTo} />}
          {view === 'TASKS' && <TaskListScreen tasks={tasks} onSelectTask={(t) => navigateTo('TASK_DETAIL', t)} />}
          {view === 'TASK_DETAIL' && selectedTask && (
            <TaskDetailScreen 
              task={selectedTask} 
              onBack={() => navigateTo('TASKS')} 
              onSubmit={handleSubmitFeedback}
            />
          )}
          {view === 'HISTORY' && <HistoryScreen submissions={submissions} tasks={tasks} onBack={() => navigateTo('DASHBOARD')} />}
          {view === 'PROFILE' && <ProfileScreen user={user} onLogout={handleLogout} />}
          {view === 'HELP' && <HelpScreen />}
        </main>
      </div>
      
      <SahayakAI />
    </div>
  );
}

// Sub-component for Navigation Links to ensure consistency
const NavLinks = ({ currentView, navigateTo }: { currentView: ViewState, navigateTo: any }) => {
  const links = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'TASKS', label: 'Notifications / Tasks', icon: Bell },
    { id: 'HISTORY', label: 'Activity History', icon: History },
    { id: 'PROFILE', label: 'Profile', icon: UserIcon },
    { id: 'HELP', label: 'Help & Support', icon: FileText },
  ];

  return (
    <>
      {links.map(link => (
        <button
          key={link.id}
          onClick={() => navigateTo(link.id)}
          className={`flex items-center w-full gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
            currentView === link.id 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <link.icon size={20} />
          {link.label}
          {link.id === 'TASKS' && (
             <span className="ml-auto bg-orange-100 text-orange-700 text-xs py-0.5 px-2 rounded-full">New</span>
          )}
        </button>
      ))}
    </>
  );
};

export default App;