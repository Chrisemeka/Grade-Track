// src/pages/student/JoinClass.jsx
import React, { useState } from 'react';
import BaseLayout from '../../pages/Layout/StudentLayout';
import StudentSidebar from '../../components/common/StudentSideBar';

const JoinClass = () => {
  const [inviteCode, setInviteCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleJoinClass = (e) => {
    e.preventDefault();
    setIsJoining(true);
    setError('');
    setSuccess('');

    // Validate invite code
    if (!inviteCode.trim()) {
      setError('Please enter a valid invite code.');
      setIsJoining(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // On success (this would be replaced with actual API integration)
      setSuccess('Successfully joined the class! Redirecting to your classes...');
      setInviteCode('');
      setIsJoining(false);

      // Redirect after joining (simulated)
      setTimeout(() => {
        window.location.href = '/student/classes';
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
            Join a Class
          </h2>
          <p className="text-[#507a95] text-sm font-normal leading-normal">
            Enter the invite code provided by your instructor
          </p>
        </div>
      </div>

      {/* Join Class Form */}
      <div className="bg-white rounded-lg p-6 border border-[#d1dde6] max-w-md mx-auto w-full">
        <form onSubmit={handleJoinClass} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-[#dc3545] p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
              {success}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="inviteCode" className="block text-sm font-medium text-[#0e161b]">
              Class Invite Code
            </label>
            <input
              id="inviteCode"
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7]"
              placeholder="Enter invite code (e.g., ABC123)"
              disabled={isJoining}
            />
            <p className="text-[#507a95] text-xs">
              You can get this code from your instructor.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isJoining}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isJoining ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Joining...
                </>
              ) : 'Join Class'}
            </button>
          </div>
        </form>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg p-6 border border-[#d1dde6] max-w-2xl">
        <h3 className="text-[#0e161b] text-lg font-bold mb-4">How It Works</h3>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8eef3] flex items-center justify-center text-[#1d8cd7] font-bold">
              1
            </div>
            <div>
              <h4 className="text-[#0e161b] font-medium">Get the invite code</h4>
              <p className="text-[#507a95] text-sm">Ask your instructor for the class invite code.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8eef3] flex items-center justify-center text-[#1d8cd7] font-bold">
              2
            </div>
            <div>
              <h4 className="text-[#0e161b] font-medium">Enter the code above</h4>
              <p className="text-[#507a95] text-sm">Type the code exactly as provided, including any letters, numbers, or symbols.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8eef3] flex items-center justify-center text-[#1d8cd7] font-bold">
              3
            </div>
            <div>
              <h4 className="text-[#0e161b] font-medium">Access your new class</h4>
              <p className="text-[#507a95] text-sm">Once joined, you'll have immediate access to class materials and assignments.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap with layout
const JoinClassPage = () => {
  return (
    <BaseLayout
      userRole="student"
      Sidebar={StudentSidebar}
    >
      <JoinClass />
    </BaseLayout>
  );
};

export default JoinClass;