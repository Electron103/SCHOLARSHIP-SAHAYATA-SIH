import { ReactNode } from 'react';

export interface User {
  name: string;
  role: string;
  email: string;
}

export interface LoginInfo {
  username?: string;
  email?: string;
  lastLogin?: string;
}

export interface Student {
  studentId: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  category: string;
  district: string;
  college: string;
  scholarship: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  amount: number;
  appDate: string;
  aadharLinked: boolean;
  dbtEnabled: boolean;
  aadharNo: string;
  bankAccount: string;
  loginInfo?: LoginInfo | null;
}

export interface Scheme {
  id: number;
  name: string;
  amount: number;
  description: string;
  aadharRequired: boolean;
  dbtRequired: boolean;
}

export interface Admin {
  id: number;
  email: string;
  role: string;
  status: string;
}

export interface Notification {
  _id: string;                // ← MongoDB ID
  title: string;
  description: string;        // ← Added based on your UI + backend
  message?: string;
  type: string;               // INFO | WARNING | ALERT
  category: string;           // Aadhaar | DBT | Scholarship
  audience: string;
  priority: string;           // HIGH | MEDIUM | LOW
  link?: string;
  accountType: string;        // aadhaar | dbt | scholarship  ← required for student panel
  createdAt?: string;         // ← backend auto timestamp
}


export interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  size: string;
  downloads: number;
}

export interface Log {
  user: string;
  action: string;
  change: string;
  time: string;
}

export interface StatCard {
  label: string;
  value: number | string;
  color: string;
  icon: ReactNode;
}