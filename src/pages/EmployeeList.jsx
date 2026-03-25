// src/pages/EmployeeList.jsx
import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { UserPlus, Trash2 } from "lucide-react";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEmployees(usersData);
    });
    return unsubscribe;
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}? Note: This only removes them from the database, not Firebase Auth.`)) {
      try {
        await deleteDoc(doc(db, "users", id));
      } catch (err) {
        alert("Failed to delete user: " + err.message);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Employee Directory</h1>
        <button 
          onClick={() => navigate("/add-employee")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          <UserPlus size={18} />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-700">Name</th>
                <th className="p-4 font-semibold text-gray-700">Email</th>
                <th className="p-4 font-semibold text-gray-700">Department</th>
                <th className="p-4 font-semibold text-gray-700">Role</th>
                <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No employees found.</td></tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">{emp.name || 'N/A'}</td>
                    <td className="p-4 text-gray-600">{emp.email}</td>
                    <td className="p-4 text-gray-600 text-sm">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{emp.department || 'N/A'}</span>
                    </td>
                    <td className="p-4 text-gray-600 capitalize">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${emp.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {emp.role}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(emp.id, emp.name)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                        title="Delete Employee"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
