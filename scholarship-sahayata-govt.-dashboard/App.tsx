
import { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardStats from './components/DashboardStats';
import StudentList from './components/StudentList';
import SchemesTab from './components/SchemesTab';
import AdminsTab from './components/AdminsTab';
import LogsTab from './components/LogsTab';
import StudentModal from './components/StudentModal';
import { User, Scheme, Admin, Notification, Student, Document } from './types';
import { generateStudents, INITIAL_SCHEMES, INITIAL_ADMINS, INITIAL_NOTIFICATIONS, INITIAL_DOCUMENTS } from './constants';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedState, setSelectedState] = useState('Chhattisgarh');
  
  // App Config State
  const [portalName, setPortalName] = useState('Scholarship Sahayata');

  // Application Data State
  const [students, setStudents] = useState<Student[]>([]);
  const [schemes, setSchemes] = useState<Scheme[]>(INITIAL_SCHEMES);
  const [deletedSchemes, setDeletedSchemes] = useState<Scheme[]>([]);
  const [admins, setAdmins] = useState<Admin[]>(INITIAL_ADMINS);
  
  // Persistent State for Notifications and Documents
  const [sentNotifications, setSentNotifications] = useState<Notification[]>(() => {
    try {
      const saved = localStorage.getItem('sentNotifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch (e) {
      console.error("Failed to load notifications", e);
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [documents, setDocuments] = useState<Document[]>(() => {
    try {
      const saved = localStorage.getItem('uploadedDocuments');
      return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
    } catch (e) {
      console.error("Failed to load documents", e);
      return INITIAL_DOCUMENTS;
    }
  });
  
  const [instructions, setInstructions] = useState('Students must link their Aadhaar number and enable DBT in their bank accounts for scholarship transfers.');

  // UI State
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  // Effect to load students when state changes
  useEffect(() => {
    const loadedStudents = generateStudents(selectedState);
    setStudents(loadedStudents);
  }, [selectedState]);

  // Save notifications to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('sentNotifications', JSON.stringify(sentNotifications));
  }, [sentNotifications]);

  // Save documents to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('uploadedDocuments', JSON.stringify(documents));
  }, [documents]);

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const openStudentDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleStatusUpdate = (studentId: string, newStatus: 'Approved' | 'Rejected' | 'Pending') => {
    setStudents(prevStudents => prevStudents.map(student => {
      if (student.studentId === studentId) {
        // Logic to update amount based on status
        let newAmount = student.amount;
        if (newStatus === 'Rejected' || newStatus === 'Pending') {
          newAmount = 0;
        } else if (newStatus === 'Approved' && student.amount === 0) {
           // Basic logic to restore amount if it was 0 (based on mock data patterns)
           newAmount = student.scholarship.includes('Merit') ? 50000 : 30000;
        }
        return { ...student, status: newStatus, amount: newAmount };
      }
      return student;
    }));
  };

  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} portalName={portalName} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        portalName={portalName}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          showNotificationPanel={showNotificationPanel}
          setShowNotificationPanel={setShowNotificationPanel}
          sentNotifications={sentNotifications}
          setSentNotifications={setSentNotifications}
          documents={documents}
          setDocuments={setDocuments}
          totalStudents={students.length}
          showSettingsPanel={showSettingsPanel}
          setShowSettingsPanel={setShowSettingsPanel}
          currentUser={currentUser}
          activeTab={activeTab}
          portalName={portalName}
          setPortalName={setPortalName}
        />

        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 relative">
          {activeTab === 'dashboard' && <DashboardStats students={students} selectedState={selectedState} portalName={portalName} />}
          {activeTab === 'students' && <StudentList students={students} onView={openStudentDetails} />}
          {activeTab === 'schemes' && (
            <SchemesTab
              schemes={schemes}
              setSchemes={setSchemes}
              deletedSchemes={deletedSchemes}
              setDeletedSchemes={setDeletedSchemes}
              instructions={instructions}
              setInstructions={setInstructions}
              currentUser={currentUser}
            />
          )}
          {activeTab === 'admins' && <AdminsTab admins={admins} setAdmins={setAdmins} currentUser={currentUser} />}
          {activeTab === 'logs' && <LogsTab />}
        </div>
      </div>

      <StudentModal
        student={selectedStudent}
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        currentUser={currentUser}
        onUpdateStatus={handleStatusUpdate}
      />
    </div>
  );
}
