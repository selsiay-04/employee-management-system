// src/pages/AddEmployee.jsx
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, firebaseConfig } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    department: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Initialize a secondary Firebase app to create user without breaking current Admin session
      const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
      const secondaryAuth = getAuth(secondaryApp);
      
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, formData.email, formData.password);
      const newUserId = userCredential.user.uid;
      
      await signOut(secondaryAuth); // Sign out of secondary instance immediately

      // 2. Save employee details to Firestore users collection
      await setDoc(doc(db, "users", newUserId), {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        createdAt: new Date().toISOString()
      });

      alert("Employee added successfully!");
      navigate("/employees");
      
    } catch (err) {
      setError("Failed to add employee: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Add New Employee</h1>
        <button onClick={() => navigate("/employees")} className="text-blue-600 hover:underline">
          &larr; Back to List
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" minLength={6} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input type="text" name="department" required value={formData.department} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="e.g. Engineering, HR" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500">
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="mt-6 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400">
            {loading ? "Adding Employee..." : "Create Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}
