"use client";

import { useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, firebaseConfig } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { UserPlus, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from 'sonner';

export default function AddEmployeePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "employee",
    department: "",
    designation: "",
    phone: "",
    location: "",
    joinDate: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const secondaryApp = getApps().find(app => app.name === "SecondaryApp") || initializeApp(firebaseConfig, "SecondaryApp");
      const secondaryAuth = getAuth(secondaryApp);
      
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, formData.email, formData.password);
      const newUserId = userCredential.user.uid;
      
      await signOut(secondaryAuth);

      const newEmpId = "EMP-" + newUserId.substring(0, 5).toUpperCase();
      await setDoc(doc(db, "users", newUserId), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        role: formData.role,
        department: formData.department,
        designation: formData.designation,
        phone: formData.phone,
        location: formData.location,
        joinDate: formData.joinDate,
        employeeId: newEmpId,
        createdAt: new Date().toISOString()
      });

      toast.success("Employee onboarded successfully into the system!");
      router.push("/employees");
      
    } catch (err: any) {
      toast.error("Global Directory Lock: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 animate-in fade-in zoom-in-95 duration-1000">
      <div className="bg-white rounded-[4rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden text-gray-800">
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 p-12 text-white flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight flex items-center gap-4">
               Onboard Identity <Sparkles className="text-blue-400" />
            </h1>
            <p className="text-xl font-medium opacity-60 tracking-tight italic">Provision new corporate credentials and systemic access.</p>
          </div>
          <button onClick={() => router.push("/employees")} className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl font-black text-sm transition-all border border-white/10 backdrop-blur-md">
            &larr; Return to Central Directory
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-12 space-y-12 text-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-gray-800">
            {/* Personal Sector */}
            <div className="col-span-full border-b border-gray-100 pb-4">
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Personal Dimensions</h3>
            </div>
            
            <FormField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Identity One" />
            <FormField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Identity Two" />
            <FormField label="Access Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="corporate@domain.com" />
            <FormField label="System Key" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />

            {/* Professional Sector */}
            <div className="col-span-full border-b border-gray-100 pb-4 mt-8">
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Sector Assignments</h3>
            </div>
            
            <FormField label="Primary Department" name="department" value={formData.department} onChange={handleChange} placeholder="e.g. Quantum Engineering" />
            <FormField label="Active Designation" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Lead Architect" />
            
            <div className="space-y-4">
              <label className="block text-sm font-black text-gray-600 uppercase tracking-widest">Authorization Scope</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-gray-900 font-black text-lg transition-all appearance-none cursor-pointer">
                <option value="employee">Standard Personnel</option>
                <option value="admin">System Administrator</option>
              </select>
            </div>
            
            <FormField label="Onboarding Date" name="joinDate" type="date" value={formData.joinDate} onChange={handleChange} />
          </div>
          
          <div className="pt-10 border-t border-gray-100 text-gray-800">
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-7 rounded-[2rem] font-black text-2xl transition-all shadow-2xl shadow-blue-600/20 active:scale-95 disabled:bg-gray-400 uppercase tracking-[0.2em]">
              {loading ? "Synchronizing Identity..." : "Authorize System Access"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, name, type = "text", value, onChange, placeholder }: any) {
  return (
    <div className="space-y-4 text-gray-800">
      <label className="block text-sm font-black text-gray-600 uppercase tracking-widest">{label}</label>
      <input 
        type={type} 
        name={name} 
        required 
        value={value} 
        onChange={onChange} 
        className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-gray-900 font-black text-lg transition-all" 
        placeholder={placeholder} 
      />
    </div>
  );
}
