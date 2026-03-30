// lib/data.ts

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  email: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveStatus;
  createdAt: string;
}

// In-memory array (clears on server restart)
export const leaves: LeaveRequest[] = [
  {
    id: '1',
    email: 'admin@example.com',
    leaveType: 'Annual',
    fromDate: '2024-03-27',
    toDate: '2024-03-29',
    reason: 'Family event',
    status: 'Approved',
    createdAt: new Date().toISOString()
  }
];

export const users = [
  {
    uid: '123',
    firstName: 'ADMIN',
    lastName: 'USER',
    email: 'admin@example.com',
    role: 'admin',
    department: 'Management',
    designation: 'HR Manager',
    phone: '+1 234-567-8900',
    location: 'Head Office',
    employeeId: 'EMP-ADMIN01',
    joinDate: '2023-01-01'
  }
];

export const attendance = [
  {
    id: 'a1',
    email: 'admin@example.com',
    date: '2024-03-26',
    clockIn: '09:00',
    clockOut: '17:00',
    createdAt: new Date().toISOString()
  }
];

export const payroll = [
  {
    id: 'p1',
    email: 'admin@example.com',
    month: '2024-03',
    basicPay: 5000,
    allowances: 500,
    deductions: 200,
    netPay: 5300,
    status: 'Deposited',
    createdAt: new Date().toISOString()
  }
];
