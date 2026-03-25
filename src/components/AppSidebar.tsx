import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarDays, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, signOut, user } = useAuth();
  const isAdmin = role === 'admin';

  const links = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Apply Leave', icon: CalendarDays, path: '/apply-leave' },
    { label: 'My Leaves', icon: CalendarDays, path: '/my-leaves' },
    ...(isAdmin ? [
      { label: 'Leave Approvals', icon: CalendarDays, path: '/admin' },
      { label: 'Employees & Roles', icon: Users, path: '/employees' }
    ] : []),
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900">EMS</h1>
          <p className="text-xs text-gray-500">Employee Management</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const active = location.pathname === link.path;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 px-4 py-4">
        <div className="mb-3 px-2">
          <p className="text-xs font-medium text-gray-800 truncate">{user?.email}</p>
          <p className="text-xs text-gray-500 capitalize">{role || 'Employee'}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
