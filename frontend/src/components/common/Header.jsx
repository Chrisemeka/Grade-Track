// components/common/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Bell, User, LogOut, Menu as MenuIcon, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Gradetrack-02.svg';

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState([
    { id: 1, message: 'New assignment feedback available' },
    { id: 2, message: 'Upcoming test reminder' },
  ]);
  
  // State for dropdowns
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Refs for handling clicks outside dropdowns
  const profileDropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  
  // State for user information
  const [userInfo, setUserInfo] = useState({
    name: '',
    role: '',
    subtitle: '',
    avatar: '/api/placeholder/40/40'
  });
  
  // Determine user role based on URL path
  useEffect(() => {
    const path = location.pathname;
    let role = 'guest';
    
    if (path.includes('/admin')) {
      role = 'admin';
      setUserInfo({
        name: 'Admin User',
        role: 'admin',
        subtitle: 'System Administrator',
        avatar: '/api/placeholder/40/40'
      });
    } else if (path.includes('/lecturer')) {
      role = 'lecturer';
      setUserInfo({
        name: 'Dr. Smith',
        role: 'lecturer',
        subtitle: 'Computer Science',
        avatar: '/api/placeholder/40/40'
      });
    } else if (path.includes('/student')) {
      role = 'student';
      setUserInfo({
        name: 'John Doe',
        role: 'student',
        subtitle: 'Matric No: STU123',
        avatar: '/api/placeholder/40/40'
      });
    } else if (path.includes('/parent')) {
      role = 'parent';
      setUserInfo({
        name: 'Mr. Johnson',
        role: 'parent',
        subtitle: 'Parent Account',
        avatar: '/api/placeholder/40/40'
      });
    } else {
      // Default fallback
      setUserInfo({
        name: 'User',
        role: 'guest',
        subtitle: 'Guest Account',
        avatar: '/api/placeholder/40/40'
      });
    }
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  
  const goToSettings = () => {
    navigate(`/${userInfo.role}/settings`);
    setShowProfileDropdown(false);
  };
  
  const goToNotifications = () => {
    navigate(`/${userInfo.role}/notifications`);
    setShowNotifications(false);
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
                className="h-36 w-auto"
                src={logo}
                alt="Logo"
              />
            </div>
          </div>

          <div className="flex items-center">
            {/* Notifications */}
            <div className="relative inline-block text-left mr-4" ref={notificationsRef}>
              <button 
                className="flex items-center p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setShowNotifications(!showNotifications)}
              >
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
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="block px-4 py-3 text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50"
                      >
                        {notification.message}
                      </div>
                    ))}
                    <button
                      onClick={goToNotifications}
                      className="block w-full px-4 py-2 text-sm text-center text-[#1d8cd7] hover:text-[#1d8cd7]/80"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Info Display and Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button 
                className="flex items-center p-2 rounded-full hover:bg-gray-100"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <div className="hidden md:flex md:items-center">
                  <div className="flex flex-col mr-3 text-right">
                    <span className="text-sm font-medium text-[#0e161b]">
                      {userInfo.name}
                    </span>
                    <span className="text-xs text-[#507a95]">
                      {userInfo.subtitle}
                    </span>
                  </div>
                </div>
                <div 
                  className="h-8 w-8 rounded-full bg-center bg-no-repeat bg-cover"
                  style={{ backgroundImage: `url("${userInfo.avatar}")` }}
                ></div>
              </button>

              {/* Profile Dropdown Content */}
              {showProfileDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <button
                      onClick={goToSettings}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </div>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {/* <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </div> */}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;