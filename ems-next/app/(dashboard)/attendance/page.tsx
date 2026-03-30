"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Clock, Calendar } from 'lucide-react';

export default function AttendancePage() {
  const { user } = useAuth() as any;
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch('/api/attendance');
        const data = await res.json();
        const userLogs = data.filter((l: any) => l.email === user?.email);
        setLogs(userLogs);
      } catch (err) {
        console.error("Failed to fetch attendance", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchAttendance();
  }, [user]);

  if (loading) return <div className="p-10 animate-pulse text-gray-400 font-medium tracking-tight">Loading Attendance records...</div>;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">Time Tracking</h1>
        <p className="text-gray-500 font-medium mt-1">Chronological history of your work sessions</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 px-6 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Session Date</th>
                <th className="p-4 px-6 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Clock In</th>
                <th className="p-4 px-6 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Clock Out</th>
                <th className="p-4 px-6 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center">
                    <Clock className="mx-auto text-gray-200 mb-3" size={48} />
                    <p className="text-lg font-bold text-gray-900">No logs captured</p>
                  </td>
                </tr>
              ) : logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 px-6 text-sm font-bold text-gray-900">
                    {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-4 px-6 text-sm text-gray-600 font-bold tabular-nums">{log.clockIn}</td>
                  <td className="p-4 px-6 text-sm text-gray-600 font-bold tabular-nums">{log.clockOut}</td>
                  <td className="p-4 px-6">
                    <span className="px-2.5 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-md border border-green-100">
                      Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
