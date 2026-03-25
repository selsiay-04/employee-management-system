import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';

const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
