// src/api.ts
const apiBase = (import.meta as any).env?.VITE_API_BASE || "http://localhost:5000";
export const API_BASE = apiBase;
export const STUDENTS_API = `${API_BASE}/api/students`; // existing
export const STUDENTS_WITH_LOGIN_API = `${API_BASE}/api/students-with-login`; // NEW
