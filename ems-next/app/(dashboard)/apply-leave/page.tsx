"use client";

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { CalendarDays, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ApplyLeave() {
  const { user } = useAuth() as any;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: 'Annual',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leaves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          email: user?.email,
          status: 'Pending'
        })
      });

      if (res.ok) {
        toast.success('Leave application submitted successfully!');
        router.push('/my-leaves');
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Apply Leave</h1>
            <p className="text-sm text-gray-500 font-medium">Request time off for professional or personal needs.</p>
          </div>
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <CalendarDays size={24} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Leave Type
            </label>
            <select
              required
              className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:border-blue-500 outline-none text-sm font-semibold"
              value={formData.leaveType}
              onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
            >
              <option value="Annual">Annual Leave</option>
              <option value="Sick">Sick Leave</option>
              <option value="Casual">Casual Leave</option>
              <option value="Lop">Loss of Pay (LOP)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">From Date</label>
              <input
                type="date"
                required
                className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:border-blue-500 outline-none text-sm font-semibold"
                value={formData.fromDate}
                onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">To Date</label>
              <input
                type="date"
                required
                className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:border-blue-500 outline-none text-sm font-semibold"
                value={formData.toDate}
                onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Reason</label>
            <textarea
              required
              rows={4}
              placeholder="Please provide details about your leave request..."
              className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:border-blue-500 outline-none text-sm font-semibold"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-sm disabled:bg-gray-400"
            >
              {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Send size={16} />}
              {loading ? 'Submitting Request...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
