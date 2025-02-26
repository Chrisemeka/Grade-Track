import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import LecturerSidebar from '../../components/common/LectureSideBar';

const LecturerLayout = ({ userRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Auth check
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     navigate('/login');
  //   }
  // }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafb] flex flex-col">
      {/* Header - Sticky at the top */}
      <div className="sticky top-0 z-40 bg-white shadow">
        <Header toggleSidebar={toggleSidebar} userRole={userRole} />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar - Fixed on mobile, static on large screens */}
        <div
          className={`
            fixed inset-y-0 left-0 z-30 w-64 transform overflow-y-auto 
            bg-white transition-transform duration-300 ease-in-out lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <LecturerSidebar />
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
            onClick={handleOverlayClick}
          />
        )}

        {/* Main Content - Scrollable */}
        <div className="flex-1 flex flex-col overflow-y-auto lg:ml-64">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
            {/* Content Area */}
            <div className="py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Sticky at the bottom */}
      <div className="sticky bottom-0 z-40 bg-white shadow">
        <Footer />
      </div>
    </div>
  );
};

export default LecturerLayout;