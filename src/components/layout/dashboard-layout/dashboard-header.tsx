import { 
  Bell, 
  User, 
  LogOut, 
  Settings,
  Menu,
  Sun,
  Moon
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const DashboardHeader = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('dark-mode') === 'true'
  );

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('dark-mode', newMode.toString());
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20 lg:justify-end">
          {/* Left: Hamburger button */}
          <div className="flex lg:hidden">
            <button
              className="text-muted-foreground hover:text-foreground"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Right: Header items */}
          <div className="flex items-center space-x-3">

            {/* Dark mode toggle */}
            <div>
              <button
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground`}
                onClick={toggleDarkMode}
              >
                <span className="sr-only">Toggle dark mode</span>
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>

            {/* Notifications dropdown */}
            <div className="relative inline-flex">
              <button
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground`}
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setUserMenuOpen(false);
                }}
                aria-haspopup="true"
              >
                <span className="sr-only">Notifications</span>
                <Bell className="h-4 w-4" />
                <div className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary"></div>
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-9 w-80 rounded-sm border border-border bg-card p-2 py-2 text-sm shadow-lg">
                  <div className="mb-1 font-medium text-muted-foreground">Notifications</div>
                  <ul>
                    <li className="border-t border-border pt-2 first:border-0 first:pt-0">
                      <Link
                        className="block rounded px-2 py-1 hover:bg-muted"
                        to="#0"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        <span className="mb-2 block text-sm">
                          📦 <span className="font-medium text-foreground">New order received</span> - Order #12345
                        </span>
                        <span className="block text-xs font-medium text-muted-foreground">10 minutes ago</span>
                      </Link>
                    </li>
                    <li className="border-t border-border pt-2 first:border-0 first:pt-0">
                      <Link
                        className="block rounded px-2 py-1 hover:bg-muted"
                        to="#0"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        <span className="mb-2 block text-sm">
                          🔔 <span className="font-medium text-foreground">Low stock alert</span> - Chocolate Croissant
                        </span>
                        <span className="block text-xs font-medium text-muted-foreground">1 hour ago</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* User dropdown */}
            <div className="relative inline-flex">
              <button
                className="group flex items-center justify-center"
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setNotificationsOpen(false);
                }}
                aria-haspopup="true"
              >
                <div className="flex items-center truncate">
                  <span className="ml-2 mr-2 hidden truncate text-sm font-medium group-hover:text-foreground md:block">
                    Bakery Admin
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground">
                    <User className="h-4 w-4" />
                  </div>
                </div>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-9 min-w-[11rem] rounded-sm border border-border bg-card py-2 text-sm shadow-lg">
                  <div className="mb-1 border-b border-border px-3 pb-2 text-muted-foreground">
                    <div className="font-medium text-foreground">Bakery Admin</div>
                    <div className="text-xs">admin@bakerydemo.com</div>
                  </div>
                  <ul>
                    <li>
                      <Link
                        className="flex items-center gap-2 px-3 py-1 hover:bg-muted"
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex items-center gap-2 px-3 py-1 hover:bg-muted"
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex items-center gap-2 px-3 py-1 hover:bg-muted"
                        to="/logout"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 