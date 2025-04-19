import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardHeader from './dashboard-header';
import DashboardSidebar from './dashboard-sidebar';


type DashboardLayoutProps = {
  children?: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="grow">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 