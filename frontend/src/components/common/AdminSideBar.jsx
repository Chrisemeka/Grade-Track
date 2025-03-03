// src/components/sidebars/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Shield,
  Settings, 
  Server,
  BarChart,
  Database,
  FileText,
  BookOpen,
  Bell,
  Lock,
  UserPlus,
  LogOut 
} from 'lucide-react';

const AdminSidebar = () => {
  const navigationItems = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: Home
    },
    {
      title: 'User Management',
      path: '/admin/users',
      icon: Users
    },
    {
      title: 'Role Management',
      path: '/admin/roles',
      icon: Shield
    },
    {
      title: 'Classes Overview',
      path: '/admin/classes',
      icon: BookOpen
    },
    {
      title: 'System Logs',
      path: '/admin/logs',
      icon: FileText
    },
    {
      title: 'System Analytics',
      path: '/admin/analytics',
      icon: BarChart
    },
    {
      title: 'Notifications',
      path: '/admin/notifications',
      icon: Bell
    },
    // {
    //   title: 'Database Management',
    //   path: '/admin/database',
    //   icon: Database
    // },
    // {
    //   title: 'System Configuration',
    //   path: '/admin/system',
    //   icon: Server
    // },
    // {
    //   title: 'Security Settings',
    //   path: '/admin/security',
    //   icon: Lock
    // },
    {
      title: 'Settings',
      path: '/admin/settings',
      icon: Settings
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex mt-24 h-full min-h-[700px] flex-col justify-between bg-white p-4">
      
      <div className="flex flex-col gap-4">
        {/* Profile Section */}
        {/* <div className="flex gap-3">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage: `url("/api/placeholder/40/40")`
            }}
          />
          <div className="flex mt-20 flex-col">
            <h1 className="text-[#0e161b] text-base font-medium leading-normal">
              Admin User
            </h1>
            <p className="text-[#507a95] text-sm font-normal leading-normal">
              System Administrator
            </p>
          </div>
        </div> */}

        {/* Navigation */}
        <nav className="flex flex-col gap-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-xl
                ${isActive ? 'bg-[#e8eef3] text-[#1d8cd7]' : 'text-[#0e161b] hover:bg-[#e8eef3]'}
              `}
            >
              <item.icon className="size-5" />
              <span className="text-sm font-medium leading-normal">
                {item.title}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons */}

        <div>
          <button 
            onClick={handleLogout}
            className="flex w-full justify-center items-center rounded-xl h-10 px-4 bg-[#dc3545] text-[#f8fafb] text-sm font-bold"
          >
            <LogOut className="size-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;