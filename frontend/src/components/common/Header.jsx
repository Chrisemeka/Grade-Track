// components/common/Header.jsx
import React, { useState } from 'react';
import { Bell, User, LogOut, Menu as MenuIcon } from 'lucide-react';

const Header = ({ toggleSidebar, userRole, userName }) => {
  const [notifications] = useState([
    { id: 1, message: 'New assignment feedback available' },
    { id: 2, message: 'Upcoming test reminder' },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1d8cd7]"
              onClick={toggleSidebar}
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            
            <div className="flex-shrink-0 flex items-center ml-4">
              <img
                className="h-8 w-auto"
                src="/api/placeholder/32/32"
                alt="Logo"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Learning Portal
              </span>
            </div>
          </div>

          <div className="flex items-center">
            {/* Notifications */}
            <div className="relative inline-block text-left mr-4">
              <button className="flex items-center p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <div className="relative">
                  <Bell className="h-6 w-6" />
                  {notifications.length > 0 && (
                    <div className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-[#dc3545] flex items-center justify-center">
                      <span className="text-xs text-white">
                        {notifications.length}
                      </span>
                    </div>
                  )}
                </div>
              </button>

              {/* Notifications Dropdown Content */}
              <div className="hidden origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {notifications.map((notification) => (
                    <a
                      key={notification.id}
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50"
                    >
                      {notification.message}
                    </a>
                  ))}
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-center text-[#1d8cd7] hover:text-[#1d8cd7]/80"
                  >
                    View all notifications
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative inline-block text-left">
              <button className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div className="hidden md:flex md:items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {userName}
                  </span>
                </div>
              </button>

              {/* Profile Dropdown Content */}
              <div className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;