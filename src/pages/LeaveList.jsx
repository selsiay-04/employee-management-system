// src/pages/LeaveList.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc, updateDoc, orderBy } from "firebase/firestore";
import { Check, X, Search, FileText, AlertTriangle } from "lucide-react";

export default function LeaveList({ view }) {
  const { user } = useAuth();
  const isAdminView = view === "admin";
  
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, leaveId: null, action: null });

  useEffect(() => {
    if (!user) return;

    let leavesQuery;
    if (isAdminView) {
      leavesQuery = query(collection(db, "leaves"), orderBy("createdAt", "desc"));
    } else {
      leavesQuery = query(collection(db, "leaves"), where("email", "==", user.email));
    }

    const unsubscribe = onSnapshot(leavesQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      if (!isAdminView) {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      setLeaves(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user, isAdminView]);

  const confirmAction = async () => {
    const { leaveId, action } = confirmModal;
    setConfirmModal({ isOpen: false, leaveId: null, action: null });
    
    try {
      const leaveRef = doc(db, "leaves", leaveId);
      await updateDoc(leaveRef, { status: action });
    } catch (err) {
      alert("Error processing action: " + err.message);
    }
  };

  const filteredLeaves = leaves.filter(l => 
    l.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatusBadge = ({ status }) => {
    const colors = {
      Approved: 'bg-green-100 text-green-700 ring-green-600/20',
      Rejected: 'bg-red-100 text-red-700 ring-red-600/10',
      Pending: 'bg-orange-100 text-orange-700 ring-orange-600/20'
    };
    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm ring-1 ring-inset ${colors[status] || colors.Pending}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {isAdminView ? "Leave Management Portal" : "My Leave History"}
          </h1>
          <p className="text-gray-500 mt-1">
            {isAdminView ? `Managing ${leaves.filter(l => l.status === 'Pending').length} pending requests.` : "Track your upcoming and past time off."}
          </p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by email, type or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium transition-shadow shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/30 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                {isAdminView && <th className="p-5 font-bold text-gray-600 text-sm tracking-wide">Applicant</th>}
                <th className="p-5 font-bold text-gray-600 text-sm tracking-wide">Leave Type</th>
                <th className="p-5 font-bold text-gray-600 text-sm tracking-wide">Duration</th>
                <th className="p-5 font-bold text-gray-600 text-sm tracking-wide">Reason</th>
                <th className="p-5 font-bold text-gray-600 text-sm tracking-wide">Status</th>
                {isAdminView && <th className="p-5 font-bold text-gray-600 text-sm tracking-wide text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={isAdminView ? 6 : 5} className="p-12 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                    <p className="text-gray-500 font-medium text-sm">Synchronizing Database...</p>
                  </td>
                </tr>
              ) : filteredLeaves.length === 0 ? (
                <tr>
                  <td colSpan={isAdminView ? 6 : 5} className="p-16 text-center">
                    <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                    <h3 className="text-xl font-bold text-gray-700">No records found</h3>
                    <p className="text-gray-500 mt-2 text-sm">{searchTerm ? "Try clearing your search query." : "There are currently no leave requests on file."}</p>
                  </td>
                </tr>
              ) : filteredLeaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-blue-50/40 transition duration-200 group">
                  {isAdminView && (
                    <td className="p-5">
                      <div className="font-bold text-gray-900">{leave.email.split('@')[0]}</div>
                      <div className="text-xs text-gray-500">{leave.email}</div>
                    </td>
                  )}
                  <td className="p-5 font-bold text-gray-700">
                    <span className="flex items-center gap-2">
                      {leave.leaveType === 'Emergency' ? '🚨' : leave.leaveType === 'Casual' ? '🌴' : '🩺'}
                      {leave.leaveType}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="text-sm font-semibold text-gray-800">{new Date(leave.fromDate).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500 font-medium">to {new Date(leave.toDate).toLocaleDateString()}</div>
                  </td>
                  <td className="p-5 text-gray-600 text-sm max-w-[200px] truncate" title={leave.reason}>
                    {leave.reason}
                  </td>
                  <td className="p-5">
                    <StatusBadge status={leave.status} />
                  </td>
                  {isAdminView && (
                    <td className="p-5 text-right">
                      {leave.status === "Pending" ? (
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition duration-200">
                          <button 
                            onClick={() => setConfirmModal({ isOpen: true, leaveId: leave.id, action: "Approved" })} 
                            className="p-2 bg-green-50 hover:bg-green-500 hover:text-white text-green-600 rounded-lg transition shadow-sm"
                            title="Approve"
                          >
                            <Check size={18} strokeWidth={3} />
                          </button>
                          <button 
                            onClick={() => setConfirmModal({ isOpen: true, leaveId: leave.id, action: "Rejected" })} 
                            className="p-2 bg-red-50 hover:bg-red-500 hover:text-white text-red-600 rounded-lg transition shadow-sm"
                            title="Reject"
                          >
                            <X size={18} strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs italic font-medium">Processed</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className={`p-6 ${confirmModal.action === 'Approved' ? 'bg-green-600' : 'bg-red-600'} flex items-center justify-center`}>
               <AlertTriangle size={48} className="text-white opacity-90" />
            </div>
            <div className="p-6 text-center space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Are you absolutely sure?</h3>
              <p className="text-gray-500 text-sm">
                You are about to <strong className={confirmModal.action === 'Approved' ? 'text-green-600' : 'text-red-600'}>{confirmModal.action?.toUpperCase()}</strong> this leave request. This will instantly notify the employee.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-4">
                <button 
                  onClick={() => setConfirmModal({ isOpen: false, leaveId: null, action: null })}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmAction}
                  className={`px-4 py-2.5 text-white font-bold rounded-xl transition shadow-md ${
                    confirmModal.action === 'Approved' ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20' : 'bg-red-600 hover:bg-red-700 shadow-red-600/20'
                  }`}
                >
                  Yes, {confirmModal.action}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}