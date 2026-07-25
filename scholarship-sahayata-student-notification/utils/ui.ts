import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Book, Award, Calendar } from 'lucide-react';
import type { NotificationType, Priority } from '../types';

// Fix: Changed return type to React.ReactElement to resolve JSX namespace error.
export const getIcon = (type: NotificationType): React.ReactElement => {
    switch(type) {
      case 'success': return React.createElement(CheckCircle, { className: "w-5 h-5 text-green-600" });
      case 'alert': return React.createElement(AlertCircle, { className: "w-5 h-5 text-orange-600" });
      case 'info': return React.createElement(Info, { className: "w-5 h-5 text-blue-600" });
      default: return React.createElement(Bell, { className: "w-5 h-5 text-gray-600" });
    }
};

// Fix: Changed return type to React.ReactElement to resolve JSX namespace error.
export const getCategoryIcon = (category: string): React.ReactElement => {
    switch(category) {
      case 'Educational': return React.createElement(Book, { className: "w-4 h-4" });
      case 'Scholarship': return React.createElement(Award, { className: "w-4 h-4" });
      default: return React.createElement(Calendar, { className: "w-4 h-4" });
    }
};

export const getPriorityColor = (priority: Priority): string => {
    const colors: Record<Priority, string> = {
      low: 'bg-blue-100 text-blue-800 border-blue-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      high: 'bg-orange-100 text-orange-800 border-orange-300',
      urgent: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[priority] || colors.medium;
};

export const formatTime = (timestamp: string): string => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffMs = now.getTime() - notifTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return notifTime.toLocaleDateString();
};