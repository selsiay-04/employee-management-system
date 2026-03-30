"use client";

import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CalendarDays, LogOut, Shield, UserCircle, Clock, DollarSign } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { role, signOut, user } = useAuth() as any;
  const isAdmin = role === 'admin';

  const links = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Profile', icon: UserCircle, path: '/profile' },
    { label: 'Time Tracking', icon: Clock, path: '/attendance' },
    { label: 'Apply Leave', icon: CalendarDays, path: '/apply-leave' },
    { label: 'My Leaves', icon: CalendarDays, path: '/my-leaves' },
    { label: 'Payroll', icon: DollarSign, path: '/payroll' },
    ...(isAdmin ? [
      { label: 'Leave Approvals', icon: CalendarDays, path: '/admin' },
      { label: 'Employees & Roles', icon: Users, path: '/employees' }
    ] : []),
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col bg-white border-r border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-50">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-tight tracking-tighter">EMS</h1>
          <p className="text-[10px] text-gray-400 font-bold -mt-0.5 uppercase tracking-widest">HR Internal</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const active = pathname === link.path;
          return (
            <button
              key={link.path}
              onClick={() => router.push(link.path)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <link.icon className={`h-4.5 w-4.5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
              {link.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <div className="px-4 py-2">
          <p className="text-xs font-bold text-gray-900 truncate">{user?.email}</p>
          <p className="text-[10px] text-gray-500 font-medium capitalize mt-0.5">{role || 'Employee'}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all mt-2"
        >
          <LogOut className="h-4.5 w-4.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
