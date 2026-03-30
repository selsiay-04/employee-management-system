"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { User, Mail, Shield, MapPin, Phone, Calendar, Hash } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth() as any;
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/users');
        const users = await res.json();
        const found = users.find((u: any) => u.email === user?.email);
        setProfile(found || { 
          firstName: 'User', 
          lastName: 'Name', 
          email: user?.email, 
          role: 'Employee', 
          department: 'General', 
          designation: 'Professional' 
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchProfile();
  }, [user]);

  if (loading) return <div className="p-10 animate-pulse text-gray-400 font-medium tracking-tight">Loading Profile Details...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Personal Profile</h1>
        <p className="text-gray-500 font-medium">Your account identity and corporate details</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -translate-y-12">
            <div className="h-24 w-24 rounded-2xl bg-white p-1 border border-gray-100 shadow-md">
              <div className="h-full w-full rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <User size={48} />
              </div>
            </div>
          </div>
          
          <div className="-mt-8 space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">{profile.firstName} {profile.lastName}</h1>
            <p className="text-blue-600 font-bold text-sm tracking-tight">{profile.designation} • {profile.department}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-12 pb-4">
            <InfoItem icon={<Mail size={18} />} label="Email Address" value={profile.email} />
            <InfoItem icon={<Hash size={18} />} label="Employee ID" value={profile.employeeId || 'EMP-001'} />
            <InfoItem icon={<Shield size={18} />} label="Account Role" value={profile.role} isBadge />
            <InfoItem icon={<Phone size={18} />} label="Contact Number" value={profile.phone || '+1 234-567-890'} />
            <InfoItem icon={<MapPin size={18} />} label="Office Location" value={profile.location || 'Headquarters'} />
            <InfoItem icon={<Calendar size={18} />} label="Joining Date" value={profile.joinDate || 'Jan 2024'} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value, isBadge }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2.5 bg-gray-50 text-gray-400 rounded-lg border border-gray-100 shadow-sm">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        {isBadge ? (
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-md border border-blue-100">
            {value}
          </span>
        ) : (
          <p className="text-sm font-bold text-gray-900">{value}</p>
        )}
      </div>
    </div>
  );
}
