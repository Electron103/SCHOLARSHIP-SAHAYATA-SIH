export interface ImportMetaEnv {
  VITE_NOTIFICATION_URL: string;
}

export enum AppView {
  LOGIN = 'LOGIN',
  OTP = 'OTP',
  AADHAAR = 'AADHAAR',
  DBT_STATUS = 'DBT_STATUS',
  READ_ME = 'READ_ME',
  VIDEO = 'VIDEO',
  AI_FORM_FILLER = 'AI_FORM_FILLER',
  BANK_FORM = 'BANK_FORM',
  NOTIFICATIONS = 'NOTIFICATIONS'
}

export interface User {
  name: string;
  phone: string;
  state?: string;
  city?: string;
  caste?: string;
  aadhaar?: string;
  dbtStatus?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface DbtStatus {
  isEnabled: boolean;
  bankName?: string;
  lastUpdated?: string;
}