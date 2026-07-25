
export type UserRole = 'student' | 'government';
export type NotificationType = 'info' | 'alert' | 'success';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type AccountSection = 'aadhaar' | 'dbt';

export interface Notification {
  _id: string;                
  title: string;
  description: string;        
  message?: string;
  type: string;
  category: string;
  audience: string;
  priority: string;
  link?: string;
  accountType: "aadhaar" | "dbt" | "scholarship";
  createdAt?: string;         
}

// UI helper type: Notification with optional read state for panels
export type UINotification = Notification & { read?: boolean };


export interface PdfDocument {
  id: number;
  title: string;
  description: string;
  category: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  downloads: number;
  tags: string[];
  viewed: boolean;
  fileData?: File; // For newly uploaded files
  fileName?: string;
}
