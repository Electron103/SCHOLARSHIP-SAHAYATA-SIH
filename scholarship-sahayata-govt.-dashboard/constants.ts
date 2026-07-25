
import { Student, Scheme, Admin, Log, Notification, Document } from './types';

export const STATES = [
  'Chhattisgarh', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

// Specific districts requested by user
export const DISTRICTS = [
  'Balod', 'Bastar', 'Bilaspur', 'Dantewada', 'Dhamtari', 
  'Durg', 'Korba', 'Raigarh', 'Raipur', 'Rajnandgaon'
];

export const INITIAL_SCHEMES: Scheme[] = [
  { id: 1, name: 'Merit-based Scholarship', amount: 50000, description: 'For students with excellent academic records', aadharRequired: true, dbtRequired: true },
  { id: 2, name: 'Need-based Scholarship', amount: 30000, description: 'For students from economically weaker sections', aadharRequired: true, dbtRequired: true },
  { id: 3, name: 'Minority Scholarship', amount: 25000, description: 'For minority community students', aadharRequired: true, dbtRequired: false },
];

export const INITIAL_ADMINS: Admin[] = [
  { id: 1, email: 'admin@gov.in', role: 'Admin', status: 'Active' },
  { id: 2, email: 'verifier@gov.in', role: 'Verifier', status: 'Active' },
  { id: 3, email: 'auditor@gov.in', role: 'Auditor', status: 'Active' },
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    _id: '1',
    title: 'Understanding Aadhaar Linking',
    message: 'Learn the difference between Aadhaar-linked and DBT-enabled accounts. Click here to explore our comprehensive guide.',
    description: 'Learn the difference between Aadhaar-linked and DBT-enabled accounts.',
    type: 'INFO',
    category: 'Educational',
    audience: 'All Students',
    priority: 'MEDIUM',
    link: '/guides/aadhaar-linking',
    accountType: 'aadhaar',
    createdAt: '11/15/2025'
  },
  {
    _id: '2',
    title: 'New DBT Scheme Announced',
    message: 'Government announces new Direct Benefit Transfer scheme for students. Ensure your bank account is DBT-enabled to receive benefits.',
    description: 'Government announces new Direct Benefit Transfer scheme for students.',
    type: 'ALERT',
    category: 'Scheme Update',
    audience: 'All Students',
    priority: 'HIGH',
    link: '/schemes/latest',
    accountType: 'dbt',
    createdAt: '11/14/2025'
  },
  {
    _id: '3',
    title: 'Scholarship Disbursement Alert',
    message: 'Upcoming scholarship disbursement requires DBT-enabled account. Verify your account status now to avoid delays.',
    description: 'Upcoming scholarship disbursement requires DBT-enabled account.',
    type: 'WARNING',
    category: 'Scholarship',
    audience: 'Graduate Students',
    priority: 'HIGH',
    link: '/verify-account',
    accountType: 'scholarship',
    createdAt: '11/13/2025'
  }
];

export const INITIAL_DOCUMENTS: Document[] = [
  {
    id: 1,
    title: 'Complete Guide: Aadhaar Linking Process',
    description: 'Step-by-step guide to link your Aadhaar with your bank account. Includes forms, requirements, and FAQs.',
    category: 'Aadhaar Guide',
    tags: ['Guide', 'Aadhaar', 'Banking'],
    size: '2.4 MB',
    downloads: 1234
  },
  {
    id: 2,
    title: 'DBT Schemes 2025-26: Complete List',
    description: 'Comprehensive list of all Direct Benefit Transfer schemes available for students. Eligibility criteria and application process included.',
    category: 'Schemes',
    tags: ['DBT', 'Schemes', 'List'],
    size: '1.8 MB',
    downloads: 2456
  },
  {
    id: 3,
    title: 'Scholarship Application Forms 2025',
    description: 'All scholarship application forms and instructions for the academic year 2025-26.',
    category: 'Forms',
    tags: ['Forms', 'Application', 'Scholarship'],
    size: '3.1 MB',
    downloads: 3789
  }
];

export const MOCK_LOGS: Log[] = [
  { user: 'admin@gov.in', action: 'Approved STU001', change: 'Status: Pending → Approved', time: '2025-01-20 14:30' },
  { user: 'verifier@gov.in', action: 'Verified Documents', change: 'Documents verified', time: '2025-01-20 13:45' },
  { user: 'admin@gov.in', action: 'Added Admin', change: 'Verifier assigned', time: '2025-01-20 12:00' },
];

export const generateStudents = (selectedState: string): Student[] => {
  if (selectedState !== 'Chhattisgarh') return [];

  const names = [
    'Aarav', 'Vihaan', 'Aditya', 'Arjun', 'Sai', 'Reyansh', 'Ayan', 'Krishna', 'Ishaan', 'Shaurya',
    'Anaya', 'Myra', 'Aadhya', 'Saanvi', 'Kiara', 'Fatima', 'Priya', 'Riya', 'Sneha', 'Anjali',
    'Rahul', 'Rohit', 'Vikas', 'Amit', 'Suresh', 'Deepak', 'Manish', 'Ravi', 'Sanjay', 'Vijay',
    'Pooja', 'Neha', 'Kavita', 'Sunita', 'Rekha', 'Meena', 'Suman', 'Kiran', 'Rani', 'Aisha',
    'Vikram', 'Rajesh', 'Suresh', 'Mahesh', 'Dinesh', 'Ganesh', 'Rakesh', 'Mukesh', 'Nitin', 'Varun'
  ];
  
  const surnames = [
    'Kumar', 'Singh', 'Sharma', 'Patel', 'Verma', 'Gupta', 'Yadav', 'Sahu', 'Dewangan', 'Baghel',
    'Chandrakar', 'Agrawal', 'Jain', 'Mishra', 'Pandey', 'Tiwari', 'Dubey', 'Tripathi', 'Rao', 'Reddy',
    'Khan', 'Ali', 'Ahmed', 'Siddiqui', 'Das', 'Banerjee', 'Ghosh', 'Nair', 'Menon', 'Pillai'
  ];

  const colleges = [
    'NIT Raipur', 'IIT Bhilai', 'GEC Raipur', 'GEC Bilaspur', 'GEC Jagdalpur', 
    'BIT Durg', 'SSTC Bhilai', 'RCET Bhilai', 'CSVTU Bhilai',
    'CVRU Bilaspur', 'Kalinga University', 'MATS University', 'Amity Raipur',
    'AIIMS Raipur', 'IIM Raipur', 'Hidayatullah National Law University'
  ];

  const students: Student[] = [];
  // Generating slightly more students to have robust data for charts
  for (let i = 1; i <= 150; i++) {
    const rand = Math.random();
    let statusVal: 'Pending' | 'Approved' | 'Rejected';
    if (rand < 0.25) statusVal = 'Pending';
    else if (rand < 0.75) statusVal = 'Approved';
    else statusVal = 'Rejected';

    const amountVal = statusVal === 'Approved' ? (Math.random() > 0.5 ? 50000 : 30000) : 0;
    
    const nameIndex = Math.floor(Math.random() * names.length);
    const surnameIndex = Math.floor(Math.random() * surnames.length);
    const collegeIndex = Math.floor(Math.random() * colleges.length);
    
    // Select from specific 10 districts
    const district = DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)];
    
    const category = ['GEN', 'OBC', 'SC', 'ST'][Math.floor(Math.random() * 4)];
    
    // Randomized Gender with slight variance
    const gender = Math.random() > 0.45 ? 'Male' : 'Female';

    // Random date within year, but slightly distributed
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;

    students.push({
      studentId: `STU${String(i).padStart(3, '0')}`,
      name: `${names[nameIndex]} ${surnames[surnameIndex]}`,
      age: 18 + Math.floor(Math.random() * 6),
      gender: gender,
      category: category,
      district: district,
      college: colleges[collegeIndex],
      scholarship: Math.random() > 0.5 ? 'Merit' : 'Need-based',
      status: statusVal,
      amount: amountVal,
      appDate: `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      aadharLinked: Math.random() > 0.2,
      dbtEnabled: Math.random() > 0.3,
      aadharNo: `****${String(1000 + i).padStart(4, '0')}`,
      bankAccount: Math.random() > 0.2 ? `****${String(Math.floor(Math.random() * 9000) + 1000)}` : 'Not Linked'
    });
  }
  return students;
};
