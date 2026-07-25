import React, { useState } from 'react';
import { Task, FeedbackSubmission, TaskStatus } from '../types';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Building, 
  CheckCircle2, 
  Upload,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

interface TaskDetailScreenProps {
  task: Task;
  onBack: () => void;
  onSubmit: (submission: FeedbackSubmission) => void;
}

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({ task, onBack, onSubmit }) => {
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create a temporary URL for the submission preview in History
    // In a real app, this would be an S3/Cloud Storage URL returned from an API
    const imageUrl = file ? URL.createObjectURL(file) : undefined;

    // Simulate network delay
    setTimeout(() => {
      const submission: FeedbackSubmission = {
        taskId: task.id,
        notes: notes,
        imageUrl: imageUrl, 
        submittedAt: new Date().toISOString(),
        status: 'Pending'
      };
      onSubmit(submission);
      setIsSubmitting(false);
    }, 1500);
  };

  const isDeadlinePassed = new Date(task.deadline) < new Date();
  const isCompleted = task.status === TaskStatus.COMPLETED || task.status === TaskStatus.UNDER_REVIEW;

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-xl font-bold text-gray-900 truncate">Task Details</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column: Task Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                task.priority === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {task.priority} Priority
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                {task.category}
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
            
            {isDeadlinePassed && !isCompleted && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4 border border-red-100">
                 <AlertTriangle size={18} />
                 <span className="font-semibold text-sm">Deadline passed! Please submit immediately.</span>
              </div>
            )}

            <p className="text-gray-600 leading-relaxed mb-6">
              {task.fullDescription}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar size={16} className="text-blue-600" />
                <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={16} className="text-blue-600" />
                <span>{new Date(task.deadline).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <User size={16} className="text-blue-600" />
                <span className="truncate">{task.officerName}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Building size={16} className="text-blue-600" />
                <span className="truncate">{task.department}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} /> Official Instructions
            </h3>
            <ul className="space-y-3">
              {task.instructions.map((inst, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-blue-800">
                  <span className="font-bold min-w-[1.5rem] bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs">{idx + 1}</span>
                  <span className="flex-1 pt-0.5">{inst}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Feedback Form */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-1">Submit Feedback</h3>
            <p className="text-sm text-gray-500 mb-6">Upload proof of activity to complete this task.</p>
            
            {isCompleted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-lg font-bold text-green-800">Feedback Submitted</h4>
                <p className="text-green-700 text-sm mt-1">Your report is under review by the officer.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Reusable Image Upload Component */}
                <ImageUpload onImageSelected={setFile} />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description / Remarks</label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe the activity conducted, number of people attended, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Submitting...
                    </>
                  ) : (
                    <>
                      <Upload size={20} /> Submit Feedback
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailScreen;