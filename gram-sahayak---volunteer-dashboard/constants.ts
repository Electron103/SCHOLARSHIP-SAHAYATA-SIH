import { Task, TaskStatus, Priority, User } from './types';

export const MOCK_USER: User = {
  name: "Rajesh Kumar",
  panchayat: "Gram Panchayat Rampur",
  phone: "+91 98765 43210",
  avatarUrl: "https://picsum.photos/200"
};

const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(tomorrow.getDate() + 1);
const yesterday = new Date(now);
yesterday.setDate(yesterday.getDate() - 1);
const nextWeek = new Date(now);
nextWeek.setDate(nextWeek.getDate() + 7);

export const MOCK_TASKS: Task[] = [
  {
    id: "T-101",
    title: "Spread Awareness: DBT-Enabled Bank Accounts",
    shortDescription: "Ensure students link Aadhaar to bank accounts for Direct Benefit Transfer.",
    fullDescription: "Visit local schools and community centers to inform parents and students about the mandatory requirement of DBT-enabled bank accounts for receiving government scholarships. Collect a list of students who have not yet linked their accounts.",
    deadline: nextWeek.toISOString(),
    status: TaskStatus.NEW,
    priority: Priority.HIGH,
    sentDate: yesterday.toISOString(),
    officerName: "Amit Verma",
    department: "Social Welfare Dept",
    instructions: [
      "Distribute pamphlets in the village square.",
      "Visit the primary and secondary schools.",
      "Help parents fill out the bank linking form if needed.",
      "Take photos of the awareness drive."
    ],
    category: "Awareness"
  },
  {
    id: "T-102",
    title: "Conduct Scholarship Awareness Camp",
    shortDescription: "Organize a meeting for Pre-Matric and Post-Matric scholarship schemes.",
    fullDescription: "Organize a village-level camp to explain the eligibility criteria and application process for state government scholarships. Ensure maximum participation from eligible families.",
    deadline: tomorrow.toISOString(),
    status: TaskStatus.PENDING,
    priority: Priority.MEDIUM,
    sentDate: yesterday.toISOString(),
    officerName: "Smt. Priya Singh",
    department: "Education Dept",
    instructions: [
      "Book the Panchayat Bhawan for the meeting.",
      "Inform Ward Members to gather crowd.",
      "Explain the portal registration process.",
      "Upload a group photo of attendees."
    ],
    category: "Meeting"
  },
  {
    id: "T-103",
    title: "Verify Student Records",
    shortDescription: "Physical verification of documents for 50 online applicants.",
    fullDescription: "Go door-to-door to verify the income certificate and caste certificate of students who have applied for the merit scholarship online. Cross-check original documents.",
    deadline: yesterday.toISOString(),
    status: TaskStatus.OVERDUE,
    priority: Priority.HIGH,
    sentDate: new Date(now.getTime() - 86400000 * 3).toISOString(),
    officerName: "Rajeev Gupta",
    department: "Minority Welfare",
    instructions: [
      "Check original Income Certificate.",
      "Check original Caste Certificate.",
      "Verify student's physical presence.",
      "Mark status in the physical register."
    ],
    category: "Verification"
  },
  {
    id: "T-104",
    title: "School Visit: Scholarship Application Count",
    shortDescription: "Collect data on how many students applied for scholarships.",
    fullDescription: "Visit the Govt High School Rampur and meet the Headmaster. Get the count of total students vs. students who have successfully submitted scholarship applications.",
    deadline: nextWeek.toISOString(),
    status: TaskStatus.COMPLETED,
    priority: Priority.LOW,
    sentDate: new Date(now.getTime() - 86400000 * 5).toISOString(),
    officerName: "Amit Verma",
    department: "Education Dept",
    instructions: [
      "Meet Headmaster.",
      "Check school records.",
      "Submit the count report."
    ],
    category: "Survey"
  }
];
