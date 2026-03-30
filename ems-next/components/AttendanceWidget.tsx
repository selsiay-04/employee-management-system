"use client";

import React, { useState, useEffect } from 'react';
import { Play, Square, Loader2 } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function AttendanceWidget() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`/api/attendance?email=${user.email}&today=true`);
        const data = await res.json();
        if (data && data.length > 0) {
          setAttendance(data[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, [user]);

  const handleClockInOut = async () => {
    setActionLoading(true);
    const isClockIn = !attendance || attendance.clockOut;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email,
          date: dateStr,
          [isClockIn ? 'clockIn' : 'clockOut']: timeStr,
          id: attendance?.id 
        })
      });
      if (res.ok) {
        toast.success(isClockIn ? 'Clocked in successfully!' : 'Clocked out successfully!');
        window.location.reload(); 
      }
    } catch (err) {
      toast.error('Failed to update attendance');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const isCheckedIn = attendance?.clockIn && !attendance.clockOut;

  if (loading) return <div className="h-40 bg-gray-100 animate-pulse rounded-[2rem]"></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950 rounded-[2.5rem] shadow-2xl p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-black mb-3 italic tracking-tight uppercase">Shift Tracker</h2>
        <p className="text-blue-200/80 font-medium text-lg">
          {isCheckedIn ? "You're currently active. Keep up the great work!" : "Your shift hasn't started yet."}
        </p>
        
        <div className="mt-8 flex flex-wrap gap-4">
          {attendance?.clockIn && (
             <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-4">
               <div className="space-y-0.5">
                 <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Entry Time</p>
                 <p className="text-xl font-bold">{attendance.clockIn}</p>
               </div>
               {attendance.clockOut && (
                 <>
                   <div className="h-8 w-px bg-white/20"></div>
                   <div className="space-y-0.5">
                     <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Exit Time</p>
                     <p className="text-xl font-bold">{attendance.clockOut}</p>
                   </div>
                 </>
               )}
             </div>
          )}
        </div>
      </div>

      <button 
        onClick={handleClockInOut}
        disabled={actionLoading || !!attendance?.clockOut}
        className={`relative z-10 flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all duration-300 group ${
          attendance?.clockOut 
            ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' 
            : (isCheckedIn 
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-900/20' 
                : 'bg-white text-blue-900 hover:bg-blue-50 shadow-white/10'
              )
        }`}
      >
        {actionLoading ? (
          <Loader2 className="animate-spin" size={24} />
        ) : (
          isCheckedIn ? <Square size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />
        )}
        <span>
          {attendance?.clockOut ? "Shift Complete" : (isCheckedIn ? "CLOCK OUT" : "START SHIFT")}
        </span>
      </button>
    </motion.div>
  );
}
