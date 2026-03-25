// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import { FileText, CheckCircle, Clock, XCircle, Activity } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

export default function Dashboard() {
  const { user, role } = useAuth();
  const isAdmin = role === "admin";
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [recentLeaves, setRecentLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let qLeaves;
    let qRecent;

    if (isAdmin) {
      qLeaves = query(collection(db, "leaves"));
      qRecent = query(collection(db, "leaves"), orderBy("createdAt", "desc"), limit(6));
    } else {
      qLeaves = query(collection(db, "leaves"), where("email", "==", user.email));
      qRecent = query(collection(db, "leaves"), where("email", "==", user.email), orderBy("createdAt", "desc"), limit(6));
    }

    // Real-time listener for ALL Leaves to calculate stats
    const unsubStats = onSnapshot(qLeaves, (snapshot) => {
      let total = snapshot.size;
      let pending = 0;
      let approved = 0;
      let rejected = 0;
      
      snapshot.forEach(doc => {
        const s = doc.data().status;
        if (s === "Pending") pending++;
        else if (s === "Approved") approved++;
        else if (s === "Rejected") rejected++;
      });

      setStats({ total, pending, approved, rejected });
    }, (error) => console.error(error));

    // Real-time listener for RECENT Leaves
    const unsubRecent = onSnapshot(qRecent, (snapshot) => {
      setRecentLeaves(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => console.error(error));

    return () => {
      unsubStats();
      unsubRecent();
    };
  }, [user, isAdmin]);

  const StatBox = ({ title, count, icon, color, bg }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition duration-300">
      <div className={`p-4 rounded-xl ${bg} ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-black text-gray-800 mt-1">{count}</p>
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => {
    const colors = {
      Approved: 'bg-green-100 text-green-700 ring-green-600/20',
      Rejected: 'bg-red-100 text-red-700 ring-red-600/10',
      Pending: 'bg-orange-100 text-orange-700 ring-orange-600/20'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ring-1 ring-inset ${colors[status] || colors.Pending}`}>
        {status}
      </span>
    );
  };

  const chartData = [
    { name: 'Pending', value: stats.pending, color: '#f97316' },
    { name: 'Approved', value: stats.approved, color: '#22c55e' },
    { name: 'Rejected', value: stats.rejected, color: '#ef4444' }
  ].filter(item => item.value > 0); // Only show non-zero in pie

  const SkeletonLoad = () => (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="bg-gray-200 h-32 rounded-2xl"></div>)}
      </div>
      <div className="bg-gray-200 h-96 rounded-2xl"></div>
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2 text-lg">
            {isAdmin ? "Global Employee Leave Statistics" : "Your Personal Leave Analytics"}
          </p>
        </div>
      </div>

      {loading ? (
        <SkeletonLoad />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatBox title="Total Applied" count={stats.total} icon={<FileText size={28} />} color="text-blue-600" bg="bg-blue-50" />
            <StatBox title="Pending" count={stats.pending} icon={<Clock size={28} />} color="text-orange-600" bg="bg-orange-50" />
            <StatBox title="Approved" count={stats.approved} icon={<CheckCircle size={28} />} color="text-green-600" bg="bg-green-50" />
            <StatBox title="Rejected" count={stats.rejected} icon={<XCircle size={28} />} color="text-red-600" bg="bg-red-50" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Activity className="text-blue-600" size={20} />
                  Recent Activity
                </h2>
              </div>
              
              {recentLeaves.length === 0 ? (
                <div className="p-12 text-center flex flex-col items-center justify-center">
                  <FileText className="text-gray-300 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-gray-700">No Data Yet</h3>
                  <p className="text-gray-500 mt-2">There are currently no leave requests recorded.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recentLeaves.map(leave => (
                    <div key={leave.id} className="p-6 flex justify-between items-center sm:flex-row flex-col gap-4 hover:bg-gray-50 transition">
                      <div>
                        {isAdmin && <p className="font-bold text-gray-900 mb-1">{leave.email}</p>}
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-bold text-blue-700">{leave.leaveType} Leave</p>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm font-medium text-gray-500">{leave.fromDate} to {leave.toDate}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate max-w-sm">{leave.reason}</p>
                      </div>
                      <StatusBadge status={leave.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chart Widget */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                 Leave Distribution
              </h2>
              <div className="flex-1 min-h-[300px] flex items-center justify-center">
                {stats.total === 0 ? (
                     <div className="text-center text-gray-400">
                        <PieChart size={64} className="mx-auto text-gray-200 mb-2 stroke-1" />
                        <p>No analytics to exhibit</p>
                     </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                      />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}