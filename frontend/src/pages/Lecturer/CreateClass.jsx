// src/pages/lecturer/CreateClass.jsx
import React, { useState } from 'react';
import BaseLayout from '../../pages/Layout/LecturerLayout';
import LecturerSidebar from '../../components/common/LectureSideBar';
import { Copy, Check } from 'lucide-react';

const CreateClass = () => {
  const [formData, setFormData] = useState({
    className: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [createdClass, setCreatedClass] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCreating(true);
    setError('');

    // Validate form
    if (!formData.className.trim()) {
      setError('Class name is required.');
      setIsCreating(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Generate random invite code
      const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      setCreatedClass({
        ...formData,
        id: Date.now(),
        inviteCode,
        createdAt: new Date().toISOString()
      });
      
      setIsCreating(false);
    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(createdClass.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateAnother = () => {
    setFormData({
      className: '',
      description: '',
      startDate: '',
      endDate: '',
    });
    setCreatedClass(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
            Create New Class
          </h2>
          <p className="text-[#507a95] text-sm font-normal leading-normal">
            Set up a new class and invite your students
          </p>
        </div>
      </div>

      {createdClass ? (
        // Success state with invite code
        <div className="bg-white rounded-lg p-6 border border-[#d1dde6] max-w-md mx-auto w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-[#0e161b] text-xl font-bold">Class Created Successfully!</h3>
            <p className="text-[#507a95] text-sm mt-2">
              Your new class "{createdClass.className}" is now ready. Share the invite code with your students.
            </p>
          </div>

          <div className="bg-[#e8eef3] p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#507a95] text-sm">Class Invite Code</p>
                <p className="text-[#0e161b] text-xl font-mono font-bold tracking-wider">{createdClass.inviteCode}</p>
              </div>
              <button 
                onClick={handleCopyCode}
                className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors"
              >
                {copied ? 
                  <Check className="h-5 w-5 text-green-600" /> : 
                  <Copy className="h-5 w-5 text-[#1d8cd7]" />
                }
              </button>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div>
              <p className="text-[#507a95] text-sm">Class Name</p>
              <p className="text-[#0e161b]">{createdClass.className}</p>
            </div>
            {createdClass.description && (
              <div>
                <p className="text-[#507a95] text-sm">Description</p>
                <p className="text-[#0e161b]">{createdClass.description}</p>
              </div>
            )}
            {(createdClass.startDate || createdClass.endDate) && (
              <div className="flex gap-4">
                {createdClass.startDate && (
                  <div>
                    <p className="text-[#507a95] text-sm">Start Date</p>
                    <p className="text-[#0e161b]">{new Date(createdClass.startDate).toLocaleDateString()}</p>
                  </div>
                )}
                {createdClass.endDate && (
                  <div>
                    <p className="text-[#507a95] text-sm">End Date</p>
                    <p className="text-[#0e161b]">{new Date(createdClass.endDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={handleCreateAnother}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7]"
            >
              Create Another Class
            </button>
            <a
              href="/lecturer/classes"
              className="w-full flex justify-center items-center py-2.5 px-4 border border-[#d1dde6] rounded-xl shadow-sm text-sm font-bold text-[#0e161b] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d1dde6]"
            >
              Go to My Classes
            </a>
          </div>
        </div>
      ) : (
        // Create class form
        <div className="bg-white rounded-lg p-6 border border-[#d1dde6] max-w-md mx-auto w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-[#dc3545] p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="className" className="block text-sm font-medium text-[#0e161b]">
                Class Name <span className="text-[#dc3545]">*</span>
              </label>
              <input
                id="className"
                name="className"
                type="text"
                value={formData.className}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7]"
                placeholder="e.g., Introduction to Computer Science"
                disabled={isCreating}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-[#0e161b]">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7]"
                placeholder="Brief description of the class"
                disabled={isCreating}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startDate" className="block text-sm font-medium text-[#0e161b]">
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7]"
                  disabled={isCreating}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="endDate" className="block text-sm font-medium text-[#0e161b]">
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#d1dde6] focus:ring-2 focus:ring-[#1d8cd7] focus:border-[#1d8cd7]"
                  disabled={isCreating}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isCreating}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Class...
                  </>
                ) : 'Create Class'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* How It Works */}
      {!createdClass && (
        <div className="bg-white rounded-lg p-6 border border-[#d1dde6] max-w-2xl">
          <h3 className="text-[#0e161b] text-lg font-bold mb-4">How It Works</h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8eef3] flex items-center justify-center text-[#1d8cd7] font-bold">
                1
              </div>
              <div>
                <h4 className="text-[#0e161b] font-medium">Create your class</h4>
                <p className="text-[#507a95] text-sm">Fill out the basic information for your new class.</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8eef3] flex items-center justify-center text-[#1d8cd7] font-bold">
                2
              </div>
              <div>
                <h4 className="text-[#0e161b] font-medium">Share the invite code</h4>
                <p className="text-[#507a95] text-sm">A unique invite code will be generated. Share this with your students so they can join.</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8eef3] flex items-center justify-center text-[#1d8cd7] font-bold">
                3
              </div>
              <div>
                <h4 className="text-[#0e161b] font-medium">Manage your class</h4>
                <p className="text-[#507a95] text-sm">Once created, you can manage students, upload grades, and send notifications.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrap with layout
const CreateClassPage = () => {
  return (
    <BaseLayout
      userRole="lecturer"
      Sidebar={LecturerSidebar}
    >
      <CreateClass />
    </BaseLayout>
  );
};

export default CreateClass;