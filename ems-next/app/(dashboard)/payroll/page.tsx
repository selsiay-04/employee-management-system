"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { DollarSign, Download, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function PayrollPage() {
  const { user, role } = useAuth() as any;
  const [payslips, setPayslips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const isAdmin = role === 'admin';

  const [formData, setFormData] = useState({
    email: '',
    month: new Date().toISOString().slice(0, 7),
    basicPay: 0,
    allowances: 0,
    deductions: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [payRes, userRes] = await Promise.all([
          fetch('/api/payroll'),
          fetch('/api/users')
        ]);
        const payslipsData = await payRes.json();
        const usersData = await userRes.json();
        
        setEmployees(usersData);
        const results = isAdmin ? payslipsData : payslipsData.filter((p: any) => p.email === user?.email);
        setPayslips(results);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchData();
  }, [user, isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const netPay = Number(formData.basicPay) + Number(formData.allowances) - Number(formData.deductions);
      const res = await fetch('/api/payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, netPay, status: 'Deposited' })
      });
      if (res.ok) {
        toast.success("Payslip generated successfully!");
        setIsModalOpen(false);
        // Refresh
        const updated = await fetch('/api/payroll');
        const data = await updated.json();
        setPayslips(isAdmin ? data : data.filter((p: any) => p.email === user?.email));
      }
    } catch (err) {
      toast.error("Failed to generate payslip");
    }
  };

  if (loading) return <div className="p-10 animate-pulse text-gray-400 font-medium tracking-tight">Loading Payroll data...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Payroll Engine</h1>
          <p className="text-gray-500 font-medium mt-1">Manage corporate salary disbursements</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-sm"
          >
            <Plus size={18} />
            Generate Payslip
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 px-6 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Month</th>
                {isAdmin && <th className="p-4 px-6 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Employee</th>}
                <th className="p-4 px-6 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Basic Pay</th>
                <th className="p-4 px-6 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Net Salary</th>
                <th className="p-4 px-6 font-bold text-gray-500 text-[10px] uppercase tracking-wider">Status</th>
                <th className="p-4 px-6 font-bold text-gray-500 text-[10px] uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payslips.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="p-12 text-center text-gray-400 font-medium">No records available</td>
                </tr>
              ) : payslips.map((ps) => (
                <tr key={ps.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 px-6 text-sm font-bold text-gray-900">{ps.month}</td>
                  {isAdmin && <td className="p-4 px-6 text-sm text-gray-600 font-medium">{ps.email}</td>}
                  <td className="p-4 px-6 text-sm text-gray-600 font-bold tabular-nums">${ps.basicPay}</td>
                  <td className="p-4 px-6 text-sm font-bold text-blue-600 tabular-nums">${ps.netPay}</td>
                  <td className="p-4 px-6">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-md border border-blue-100">
                      {ps.status}
                    </span>
                  </td>
                  <td className="p-4 px-6 text-right">
                    <button className="p-1.5 text-gray-300 hover:text-blue-600 transition">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Issue Payslip</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Employee</label>
                <select 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg outline-none font-bold text-gray-900"
                >
                  <option value="" disabled>Choose employee...</option>
                  {employees.map(e => <option key={e.email} value={e.email}>{e.firstName} {e.lastName} ({e.email})</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Month</label>
                  <input type="month" required value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg outline-none font-bold text-gray-900" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-blue-600 uppercase tracking-widest">Basic Pay ($)</label>
                  <input type="number" required value={formData.basicPay} onChange={e => setFormData({...formData, basicPay: Number(e.target.value)})} className="w-full p-3 bg-blue-50/50 border border-blue-100 rounded-lg outline-none font-bold text-gray-900" />
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl flex justify-between items-center mt-6">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Estimated Net Salary</span>
                <span className="text-3xl font-bold text-gray-900">${formData.basicPay + formData.allowances - formData.deductions}</span>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-3 bg-gray-100 text-gray-600 rounded-lg font-bold hover:bg-gray-200 transition">Cancel</button>
                <button type="submit" className="flex-1 p-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">Generate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
