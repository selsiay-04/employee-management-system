"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Calendar, Search, Filter, Shield, Clock, CheckCircle2, XCircle } from "lucide-react";
import { toast } from 'sonner';

interface LeaveTableProps {
  view: 'my' | 'admin';
}

export default function LeaveTable({ view }: LeaveTableProps) {
  const { user, role } = useAuth() as any;
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchLeaves = async () => {
    try {
      const res = await fetch('/api/leaves');
      const data = await res.json();
      
      if (view === 'my') {
        setLeaves(data.filter((l: any) => l.email === user?.email));
      } else {
        setLeaves(data);
      }
    } catch (err) {
      console.error("Failed to fetch leaves", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchLeaves();
  }, [user, view]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/leaves', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        toast.success(`Leave request ${newStatus.toLowerCase()} successfully!`);
        fetchLeaves(); // Refresh list
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const filteredLeaves = leaves.filter(l => {
    const matchesSearch = l.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="p-20 text-center text-gray-500 animate-pulse font-medium">Synchronizing with server...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {view === 'admin' ? 'Leave Approvals' : 'Leave History'}
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-1">
            {view === 'admin' ? 'Review and manage employee time-off requests.' : 'Track your submitted leave applications.'}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search record..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-blue-500 outline-none w-full sm:w-64 text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-sm font-bold"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Type</th>
                {view === 'admin' && <th className="p-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Employee</th>}
                <th className="p-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Period</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Reason</th>
                <th className="p-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Status</th>
                {view === 'admin' && <th className="p-4 font-bold text-gray-500 text-[10px] uppercase tracking-wider text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLeaves.length === 0 ? (
                <tr>
                  <td colSpan={view === 'admin' ? 6 : 4} className="p-12 text-center">
                    <Calendar className="mx-auto text-gray-200 mb-3" size={48} />
                    <p className="text-lg font-bold text-gray-900">No Records Found</p>
                    <p className="text-gray-400 text-sm">There are no leave requests matching your criteria.</p>
                  </td>
                </tr>
              ) : filteredLeaves.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 px-6 text-sm font-bold text-gray-900">{l.leaveType}</td>
                  {view === 'admin' && (
                    <td className="p-4 px-6">
                      <div className="font-bold text-sm text-gray-700">{l.email.split('@')[0]}</div>
                      <div className="text-[10px] text-gray-400 font-medium">{l.email}</div>
                    </td>
                  )}
                  <td className="p-4 px-6 text-sm text-gray-600 font-medium tabular-nums">
                    {l.fromDate} - {l.toDate}
                  </td>
                  <td className="p-4 px-6">
                    <div className="max-w-[150px] truncate text-xs text-gray-500" title={l.reason}>{l.reason}</div>
                  </td>
                  <td className="p-4 px-6">
                    <StatusBadge status={l.status} />
                  </td>
                  {view === 'admin' && (
                    <td className="p-4 px-6 text-right">
                      {l.status === 'Pending' ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => updateStatus(l.id, 'Approved')}
                            className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition shadow-sm border border-green-100"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                          <button 
                            onClick={() => updateStatus(l.id, 'Rejected')}
                            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition shadow-sm border border-red-100"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">Processed</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Approved: "bg-green-50 text-green-600 border-green-100",
    Rejected: "bg-red-50 text-red-600 border-red-100"
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${styles[status]}`}>
      {status}
    </span>
  );
}
