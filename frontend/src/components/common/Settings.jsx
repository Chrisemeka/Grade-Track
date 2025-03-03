// src/pages/settings/Settings.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save, 
  Lock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Settings = () => {
  const location = useLocation();
  
  // Determine user role based on URL path
  const getUserRole = () => {
    const path = location.pathname;
    if (path.includes('/admin')) return 'admin';
    if (path.includes('/lecturer')) return 'lecturer';
    if (path.includes('/student')) return 'student';
    if (path.includes('/parent')) return 'parent';
    return '/';
  };
  
  const role = getUserRole();
  
  // Mock user data based on role
  const getUserData = () => {
    switch(role) {
      case 'admin':
        return {
          name: 'Admin User',
          email: 'admin@gradetrack.edu',
          phone: '+234 801 234 5678',
          address: 'Admin Building, Babcock University',
          department: 'System Administration',
        //   position: 'System Administrator',
        //   bio: 'Responsible for managing the GradeTrack system and user accounts.',
          avatar: '/api/placeholder/150/150'
        };
      case 'lecturer':
        return {
          name: 'Dr. Smith',
          email: 'smith@gradetrack.edu',
          phone: '+234 802 345 6789',
          address: 'Faculty Housing, Babcock University',
          department: 'Computer Science',
          position: 'Lecturer',
        //   bio: 'PhD in Computer Science with over 10 years of teaching experience.',
          avatar: '/api/placeholder/150/150'
        };
      case 'student':
        return {
          name: 'John Doe',
          email: 'john.doe@student.gradetrack.edu',
          phone: '+234 803 456 7890',
          address: 'Student Hostel, Babcock University',
          matricNumber: 'STU123',
          department: 'Computer Science',
          level: '300 Level',
        //   bio: 'Computer Science student passionate about software development.',
          avatar: '/api/placeholder/150/150'
        };
      case 'parent':
        return {
          name: 'Mr. Johnson',
          email: 'johnson@example.com',
          phone: '+234 804 567 8901',
          address: 'Lagos, Nigeria',
          occupation: 'Business Owner',
          children: ['Emily Johnson', 'Michael Johnson'],
        //   bio: 'Parent of two students at Babcock University.',
          avatar: '/api/placeholder/150/150'
        };
      default:
        return {
          name: 'User',
          email: 'user@example.com',
          phone: '',
          address: '',
          bio: '',
          avatar: '/api/placeholder/150/150'
        };
    }
  };
  
  // State for form data
  const [formData, setFormData] = useState(getUserData());
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Update form data when role changes
  useEffect(() => {
    setFormData(getUserData());
  }, [role]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Profile data submitted:', formData);
    
    // Show success message
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  // Handle password form submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('New passwords do not match');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log('Password data submitted:', passwordData);
    
    // Reset form and show success message
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setSuccessMessage('Password updated successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
            Profile Settings
          </h2>
          <p className="text-[#507a95] text-sm font-normal leading-normal">
            Manage your account information and preferences
          </p>
        </div>
      </div>
      
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          {successMessage}
        </div>
      )}
      
      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Picture Card */}
        <div className="md:col-span-1">
          {/* <div className="bg-white rounded-lg border border-[#d1dde6] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#d1dde6]">
              <h3 className="text-[#0e161b] text-lg font-bold">Profile Picture</h3>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="relative mb-4">
                <div 
                  className="w-32 h-32 rounded-full bg-center bg-no-repeat bg-cover border-4 border-[#e8eef3]"
                  style={{ backgroundImage: `url("${formData.avatar}")` }}
                ></div>
                <button className="absolute bottom-0 right-0 bg-[#1d8cd7] text-white p-2 rounded-full hover:bg-[#1d8cd7]/90">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[#507a95] text-sm text-center mb-4">
                Upload a new profile picture. JPG, PNG or GIF, Max 2MB.
              </p>
              <button className="w-full py-2 px-4 border border-[#d1dde6] rounded-md text-[#507a95] hover:bg-gray-50 text-sm">
                Upload New Picture
              </button>
            </div>
          </div> */}
          
          {/* Role-specific Info Card */}
          <div className="bg-white rounded-lg border border-[#d1dde6] overflow-hidden mt-6">
            <div className="px-6 py-4 border-b border-[#d1dde6]">
              <h3 className="text-[#0e161b] text-lg font-bold">Account Information</h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-[#0e161b] text-sm font-medium mb-2">Account Type</h4>
                <p className="text-[#507a95] text-sm bg-[#f8fafb] p-2 rounded border border-[#d1dde6]">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </p>
              </div>
              
              {role === 'student' && (
                <div className="mb-4">
                  <h4 className="text-[#0e161b] text-sm font-medium mb-2">Matriculation Number</h4>
                  <p className="text-[#507a95] text-sm bg-[#f8fafb] p-2 rounded border border-[#d1dde6]">
                    {formData.matricNumber}
                  </p>
                </div>
              )}
              
              {role === 'lecturer' && (
                <div className="mb-4">
                  <h4 className="text-[#0e161b] text-sm font-medium mb-2">Position</h4>
                  <p className="text-[#507a95] text-sm bg-[#f8fafb] p-2 rounded border border-[#d1dde6]">
                    {formData.position}
                  </p>
                </div>
              )}
              
              {role === 'parent' && (
                <div className="mb-4">
                  <h4 className="text-[#0e161b] text-sm font-medium mb-2">Children</h4>
                  <div className="text-[#507a95] text-sm bg-[#f8fafb] p-2 rounded border border-[#d1dde6]">
                    {formData.children && formData.children.map((child, index) => (
                      <div key={index} className="mb-1">{child}</div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* <div className="mb-0">
                <h4 className="text-[#0e161b] text-sm font-medium mb-2">Account Created</h4>
                <p className="text-[#507a95] text-sm bg-[#f8fafb] p-2 rounded border border-[#d1dde6]">
                  January 15, 2023
                </p>
              </div> */}
            </div>
          </div>
        </div>
        
        {/* Profile Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border border-[#d1dde6] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#d1dde6]">
              <h3 className="text-[#0e161b] text-lg font-bold">Personal Information</h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-[#507a95] text-sm mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-[#507a95]" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full pl-10 pr-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-[#507a95] text-sm mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-[#507a95]" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full pl-10 pr-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-[#507a95] text-sm mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-[#507a95]" />
                      </div>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full pl-10 pr-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-[#507a95] text-sm mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-[#507a95]" />
                      </div>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full pl-10 pr-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Department (for Student and Lecturer) */}
                  {(role === 'student' || role === 'lecturer') && (
                    <div>
                      <label htmlFor="department" className="block text-[#507a95] text-sm mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full px-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                      />
                    </div>
                  )}
                  
                  {/* Level (for Student) */}
                  {role === 'student' && (
                    <div>
                      <label htmlFor="level" className="block text-[#507a95] text-sm mb-1">
                        Level
                      </label>
                      <input
                        type="text"
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full px-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                      />
                    </div>
                  )}
                  
                  {/* Specialization (for Lecturer) */}
                  {role === 'lecturer' && (
                    <div>
                      <label htmlFor="specialization" className="block text-[#507a95] text-sm mb-1">
                        Specialization
                      </label>
                      <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full px-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                      />
                    </div>
                  )}
                  
                  {/* Occupation (for Parent) */}
                  {role === 'parent' && (
                    <div>
                      <label htmlFor="occupation" className="block text-[#507a95] text-sm mb-1">
                        Occupation
                      </label>
                      <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full px-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                      />
                    </div>
                  )}
                </div>
                
                {/* Bio */}
                <div className="mb-4">
                  <label htmlFor="bio" className="block text-[#507a95] text-sm mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full px-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7]"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Change Password */}
          <div className="bg-white rounded-lg border border-[#d1dde6] overflow-hidden mt-6">
            <div className="px-6 py-4 border-b border-[#d1dde6]">
              <h3 className="text-[#0e161b] text-lg font-bold">Change Password</h3>
            </div>
            <div className="p-6">
              <form onSubmit={handlePasswordSubmit}>
                {/* Current Password */}
                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-[#507a95] text-sm mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-[#507a95]" />
                    </div>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full pl-10 pr-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                      required
                    />
                  </div>
                </div>
                
                {/* New Password */}
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-[#507a95] text-sm mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-[#507a95]" />
                    </div>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full pl-10 pr-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                      required
                    />
                  </div>
                </div>
                
                {/* Confirm Password */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-[#507a95] text-sm mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-[#507a95]" />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full pl-10 pr-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                      required
                    />
                  </div>
                </div>
                
                {/* Password Requirements */}
                <div className="bg-[#f8fafb] p-3 rounded border border-[#d1dde6] mb-4">
                  <p className="text-[#507a95] text-sm font-medium mb-2">Password Requirements:</p>
                  <ul className="text-[#507a95] text-xs space-y-1 list-disc pl-4">
                    <li>Minimum 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one lowercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7]"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;