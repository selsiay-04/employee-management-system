"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { FileText, CheckCircle, Clock, Calendar, Play } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth() as any;
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/leaves');
        const data = await res.json();
        const userLeaves = data.filter((l: any) => l.email === user?.email);
        
        setStats({
          total: userLeaves.length,
          pending: userLeaves.filter((l: any) => l.status === 'Pending').length,
          approved: userLeaves.filter((l: any) => l.status === 'Approved').length,
          rejected: userLeaves.filter((l: any) => l.status === 'Rejected').length,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchStats();
  }, [user]);

  if (loading) return <div className="p-10 animate-pulse text-gray-400 font-medium">Loading Dashboard Data...</div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 font-medium mt-1 text-lg">Your Personal Leave Analytics</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <DashboardStatCard icon={<FileText className="text-blue-500" size={24} />} label="LEAVES APPLIED" value={stats.total} />
        <DashboardStatCard icon={<CheckCircle className="text-green-500" size={24} />} label="APPROVED" value={stats.approved} />
        <DashboardStatCard icon={<Clock className="text-orange-500" size={24} />} label="PENDING" value={stats.pending} />
        <DashboardStatCard icon={<Calendar className="text-indigo-600" size={24} />} label="BALANCE (AVAILABLE)" value={15 - stats.approved} />
      </div>

      {/* Attendance and Distribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Tracker */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-10 relative overflow-hidden shadow-xl shadow-blue-600/10">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="text-white space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight">Daily Attendance Tracker</h2>
              <div className="space-y-1">
                <p className="opacity-90 font-bold text-lg">You are currently clocked out.</p>
                <p className="text-sm opacity-70 font-bold">Clocked In at: 10:54 am | Out at: 10:54 am</p>
              </div>
            </div>
            
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center gap-3 px-10 py-5 rounded-xl font-black text-lg hover:bg-white/20 transition-all">
              <Play className="fill-current" size={20} />
              Completed for Today
            </button>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full pointer-events-none"></div>
        </div>

        {/* Leave Distribution */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col h-full">
          <h3 className="text-xs font-black text-gray-900 mb-20 uppercase tracking-[0.15em]">Leave Distribution</h3>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 font-bold text-base opacity-60">No analytics to exhibit</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="text-blue-600 p-2 bg-blue-50 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <h3 className="font-extrabold text-2xl text-gray-900 tracking-tight">Recent Activity</h3>
        </div>
        <div className="h-24 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center">
           <p className="text-gray-300 font-bold italic">Latest chronological updates will appear here.</p>
        </div>
      </div>
    </div>
  );
}

function DashboardStatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: number | string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-8 hover:shadow-md transition-shadow">
      <div className="p-4 bg-gray-50 rounded-2xl">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 tracking-widest mb-1.5 uppercase leading-none">{label}</p>
        <p className="text-3xl font-black text-gray-900 leading-none">{value}</p>
      </div>
    </div>
  );
}
