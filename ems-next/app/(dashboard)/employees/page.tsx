"use client";

import { useEffect, useState } from 'react';
import { Users, Mail, MapPin, Hash, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("Failed to fetch employees", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const filtered = employees.filter(emp => 
    (emp.firstName || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
    (emp.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-10 animate-pulse text-gray-400 font-medium tracking-tight">Loading Employee Directory...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Employee Directory</h1>
          <p className="text-gray-500 font-medium mt-1">Manage corporate hierarchy and access levels</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search employee..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-lg focus:border-blue-500 outline-none w-full md:w-64 text-sm font-bold shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => router.push('/add-employee')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
          >
            Add Employee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((emp) => (
          <div key={emp.uid} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition group">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Users size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">{emp.firstName} {emp.lastName}</h3>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">{emp.designation}</p>
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-gray-50 mt-4">
              <div className="flex items-center gap-3 text-gray-500">
                <Mail size={14} className="text-gray-400" />
                <span className="text-xs font-bold truncate">{emp.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <Hash size={14} className="text-gray-400" />
                <span className="text-xs font-bold uppercase tracking-widest">{emp.employeeId || 'EMP-000'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <MapPin size={14} className="text-gray-400" />
                <span className="text-xs font-bold">{emp.location || 'Remote'}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border ${emp.role === 'admin' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                {emp.role || 'Staff'}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{emp.department}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
