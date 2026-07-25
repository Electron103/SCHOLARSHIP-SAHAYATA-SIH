export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE',
  NEW = 'NEW',
  UNDER_REVIEW = 'UNDER_REVIEW',
  REJECTED = 'REJECTED'
}

export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface Task {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deadline: string; // ISO String
  status: TaskStatus;
  priority: Priority;
  sentDate: string; // ISO String
  officerName: string;
  department: string;
  instructions: string[];
  category: 'Awareness' | 'Verification' | 'Meeting' | 'Survey';
}

export interface FeedbackSubmission {
  taskId: string;
  imageUrl?: string;
  notes: string;
  submittedAt: string;
  status: 'Approved' | 'Rejected' | 'Need Correction' | 'Pending';
  govtComments?: string;
}

export interface User {
  name: string;
  panchayat: string;
  phone: string;
  avatarUrl?: string;
}

export type ViewState = 'LOGIN' | 'DASHBOARD' | 'TASKS' | 'TASK_DETAIL' | 'HISTORY' | 'PROFILE' | 'HELP';