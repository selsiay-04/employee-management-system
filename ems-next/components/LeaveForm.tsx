"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Calendar, FileText, CheckCircle, Info, Clock, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LeaveForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(15);
  
  const [formData, setFormData] = useState({
    leaveType: "Casual",
    fromDate: "",
    toDate: "",
    reason: ""
  });

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`/api/leaves?email=${user.email}`);
        const data = await res.json();
        const approved = data.filter((l: any) => l.status === "Approved").length;
        setBalance(Math.max(0, 15 - approved));
      } catch (err) {
        console.error(err);
      }
    };
    fetchBalance();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (balance <= 0 && formData.leaveType !== "Permission") {
      toast.error("Insufficient leave balance for this request.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email: user?.email,
          status: "Pending"
        })
      });
      if (res.ok) {
        toast.success("Leave request submitted successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please check your connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 px-10 py-8 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="bg-white text-blue-600 p-3 rounded-2xl shadow-sm border border-blue-100"><Info size={24} /></div>
           <div>
             <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight italic">Allowance Check</h3>
             <p className="text-sm text-gray-500 font-medium italic">Standard annual pool: 15 sessions</p>
           </div>
        </div>
        <div className="text-right">
           <span className={`text-5xl font-black italic tracking-tighter ${balance > 5 ? 'text-emerald-600' : balance > 0 ? 'text-amber-500' : 'text-rose-600'}`}>
             {balance}
           </span>
           <span className="text-gray-400 font-black text-xs uppercase tracking-widest ml-2 italic">Remaining</span>
        </div>
      </div>

      <div className="p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Select Leave Category</label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {["Casual", "Sick", "Annual", "Permission"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, leaveType: type })}
                    className={cn(
                      "py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-widest border transition-all duration-300",
                      formData.leaveType === type 
                        ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200" 
                        : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100"
                    )}
                  >
                    {type === "Permission" && <Clock size={16} className="inline mr-2 mb-0.5" />}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <Calendar size={14} /> Start Date
              </label>
              <input 
                type="date" 
                required
                value={formData.fromDate}
                onChange={e => setFormData({ ...formData, fromDate: e.target.value })}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-700 h-[60px] transition-all" 
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <Calendar size={14} /> End Date
              </label>
              <input 
                type="date" 
                required
                value={formData.toDate}
                onChange={e => setFormData({ ...formData, toDate: e.target.value })}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-700 h-[60px] transition-all" 
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <FileText size={14} /> Brief Justification
              </label>
              <textarea 
                rows={4}
                required
                placeholder="Explain the necessity of this leave/permission..."
                value={formData.reason}
                onChange={e => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] focus:ring-2 focus:ring-blue-500 outline-none font-medium text-gray-700 leading-relaxed transition-all"
              ></textarea>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white p-6 rounded-2xl font-black text-xl uppercase tracking-[0.15em] hover:bg-blue-700 transition shadow-2xl shadow-blue-300 disabled:bg-gray-300 mt-4 h-[70px] flex items-center justify-center gap-3 group italic"
          >
            {loading ? "Processing..." : (
              <>
                <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-300" />
                Dispatch Request
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
