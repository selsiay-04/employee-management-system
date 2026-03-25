// src/pages/LeavesForm.jsx
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Calendar, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function LeavesForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState("Sick");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }
  const [loading, setLoading] = useState(false);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Strict Validations
    if (!fromDate || !toDate) {
      return showToast("error", "Both dates are required.");
    }
    if (new Date(fromDate) > new Date(toDate)) {
      return showToast("error", "'To Date' cannot be before 'From Date'.");
    }
    const today = new Date();
    today.setHours(0,0,0,0);
    // Allow applying for past dates for Sick leave, but maybe not for Casual? We will just check strict validity length
    if (reason.trim().length < 10) {
      return showToast("error", "Reason must be at least 10 characters long.");
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "leaves"), {
        email: user.email,
        leaveType,
        fromDate,
        toDate,
        reason: reason.trim(),
        status: "Pending",
        createdAt: new Date().toISOString()
      });
      
      showToast("success", "Leave Request Submitted Successfully!");
      setLeaveType("Sick");
      setFromDate("");
      setToDate("");
      setReason("");
      
      setTimeout(() => navigate("/my-leaves"), 2000);
    } catch (err) {
      showToast("error", "Failed to submit: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <Calendar className="text-blue-600" size={32} />
          Apply for Leave
        </h1>
        <p className="text-gray-500 mt-2">Fill out the required information to request time off.</p>
      </div>

      {/* Toast Notification positioned relatively for page flow */}
      {toast && (
        <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 shadow-sm border ${
          toast.type === 'error' ? 'bg-red-50 border-red-100 text-red-800' : 'bg-green-50 border-green-100 text-green-800'
        } animate-in fade-in slide-in-from-top-4`}>
          {toast.type === 'error' ? <AlertCircle className="shrink-0 mt-0.5" size={20} /> : <CheckCircle className="shrink-0 mt-0.5" size={20} />}
          <p className="font-medium text-sm mt-0.5">{toast.message}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Leave Category</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 outline-none transition font-medium"
              >
                <option value="Sick">🩺 Sick Leave</option>
                <option value="Casual">🌴 Casual Leave</option>
                <option value="Emergency">🚨 Emergency Leave</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">From Date</label>
                <input 
                  type="date" 
                  required 
                  value={fromDate} 
                  onChange={(e) => setFromDate(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 outline-none transition font-medium text-gray-700" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">To Date</label>
                <input 
                  type="date" 
                  required 
                  value={toDate} 
                  onChange={(e) => setToDate(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 outline-none transition font-medium text-gray-700" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 flex items-center justify-between">
                <span>Detailed Reason</span>
                <span className={`text-xs ${reason.length < 10 ? 'text-orange-500' : 'text-green-600'}`}>
                  {reason.length}/10 min chars
                </span>
              </label>
              <div className="relative">
                <FileText className="absolute top-4 left-4 text-gray-400" size={20} />
                <textarea 
                  required 
                  rows={5} 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)} 
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 outline-none transition font-medium placeholder:font-normal placeholder:text-gray-400" 
                  placeholder="Explain why you require this time off..." 
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full lg:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition font-bold text-lg disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-600/20 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  "Submit Leave Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}