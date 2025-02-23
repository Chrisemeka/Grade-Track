// src/components/sidebars/ParentSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  GraduationCap, 
  MessageSquare, 
  Calendar,
  Bell,
  Settings, 
  LogOut 
} from 'lucide-react';

const ParentSidebar = () => {
  const navigationItems = [
    {
      title: 'Dashboard',
      path: '/parent/dashboard',
      icon: Home
    },
    {
      title: 'My Children',
      path: '/parent/children',
      icon: Users
    },
    {
      title: 'Academic Progress',
      path: '/parent/progress',
      icon: GraduationCap
    },
    {
      title: 'Messages',
      path: '/parent/messages',
      icon: MessageSquare
    },
    {
      title: 'Schedule',
      path: '/parent/schedule',
      icon: Calendar
    },
    {
      title: 'Notifications',
      path: '/parent/notifications',
      icon: Bell
    },
    {
      title: 'Settings',
      path: '/parent/settings',
      icon: Settings
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-full min-h-[700px] flex-col justify-between bg-white p-4">
      {/* Profile Section */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage: `url("/api/placeholder/40/40")`
            }}
          />
          <div className="flex flex-col">
            <h1 className="text-[#0e161b] text-base font-medium leading-normal">
              Mr. Johnson
            </h1>
            <p className="text-[#507a95] text-sm font-normal leading-normal">
              Parent Account
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
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
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <button className="flex w-full justify-center items-center gap-2 rounded-xl h-10 px-4 bg-[#1d8cd7] text-[#f8fafb] text-sm font-bold">
          <MessageSquare className="size-4" />
          <span>Contact Teacher</span>
        </button>
        
        <button 
          onClick={handleLogout}
          className="flex w-full justify-center items-center gap-2 rounded-xl h-10 px-4 bg-[#dc3545] text-[#f8fafb] text-sm font-bold"
        >
          <LogOut className="size-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ParentSidebar;