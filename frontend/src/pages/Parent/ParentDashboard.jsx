import React, { useState } from 'react';
import { UserPlus, X, Check, Award } from 'lucide-react';

const ParentDashboard = () => {
  // State for managing children
  const [children, setChildren] = useState([
    { id: 1, name: 'Emily Johnson', matricNumber: 'BU/21/04/05/001', department: 'Computer Science', level: '100 Level', performance: 'Excellent', cgpa: '3.8' },
    { id: 2, name: 'Michael Johnson', matricNumber: 'BU/19/04/05/023', department: 'Accounting', level: '300 Level', performance: 'Good', cgpa: '3.5' },
  ]);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    matricNumber: '',
    department: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.matricNumber.trim()) {
      errors.matricNumber = 'Matriculation number is required';
    } else if (!/^[A-Z]{2}\/\d{2}\/\d{2}\/\d{2}\/\d{3}$/.test(formData.matricNumber)) {
      errors.matricNumber = 'Invalid format. Expected: XX/00/00/00/000';
    }
    
    if (!formData.department.trim()) {
      errors.department = 'Department is required';
    }
    
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock the response from server that would include student details
      const newChild = {
        id: children.length + 1,
        name: `Student ${formData.matricNumber}`, // In a real app, this would come from the backend
        matricNumber: formData.matricNumber,
        department: formData.department,
        level: '100 Level', // Default level for new students
        performance: 'Not Available',
        cgpa: 'N/A'
      };
      
      // Add the new child to the list
      setChildren([...children, newChild]);
      
      // Reset form
      setFormData({
        matricNumber: '',
        department: ''
      });
      
      // Show success message
      setSuccessMessage('Child added successfully!');
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        // Close modal
        setShowModal(false);
      }, 3000);
      
      setIsSubmitting(false);
    }, 1500);
  };

  // Close modal and reset
  const closeModal = () => {
    setShowModal(false);
    setFormData({
      matricNumber: '',
      department: ''
    });
    setFormErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
            Dashboard
          </h2>
          <p className="text-[#507a95] text-sm font-normal leading-normal">
            Welcome back, Mr. Johnson
          </p>
        </div>
      </div>

      {/* Children Overview / Add Child Button */}
      <div className="bg-white rounded-lg p-4 border border-[#d1dde6]">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-[#0e161b] text-lg font-bold mb-1">Children</h3>
            <p className="text-[#507a95] text-sm">
              {children.length > 0 
                ? `You have ${children.length} children added to your account.` 
                : "You haven't added any children to your account yet."}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 md:mt-0 inline-flex items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7]"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Child
          </button>
        </div>
        
        {/* Children List */}
        {children.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {children.map((child) => (
              <div key={child.id} className="flex flex-col gap-3 bg-[#f8fafb] rounded-lg p-4 border border-[#d1dde6]">
                <div className="flex items-center gap-3">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                    style={{
                      backgroundImage: `url("/api/placeholder/48/48")`
                    }}
                  />
                  <div>
                    <p className="text-[#0e161b] text-base font-medium">{child.name}</p>
                    <p className="text-[#507a95] text-sm">{child.department}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 pt-2">
                  <div className="flex justify-between items-center">
                    <p className="text-[#507a95] text-xs">Matric Number:</p>
                    <p className="text-[#0e161b] text-sm font-mono">{child.matricNumber}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[#507a95] text-xs">Level:</p>
                    <p className="text-[#0e161b] text-sm">{child.level}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activities */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Recent Activities
        </h3>
        
        <div className="flex flex-col gap-2">
          {[
            { child: 'Emily', activity: 'Grade for Math 101 uploaded', grade: 'A', time: '2 hours ago' },
            { child: 'Michael', activity: 'Grade for Seng 303 uploaded', grade: 'B+', time: '1 day ago' },
            { child: 'Emily', activity: 'Grade for Eng 103 uploaded', grade: 'B+', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4 border border-[#d1dde6]">
              <div className="flex items-center gap-4">
                <div className="bg-[#e8eef3] rounded-lg p-3">
                  <Award className="h-6 w-6 text-[#1d8cd7]" />
                </div>
                <div>
                  <p className="text-[#0e161b] text-base font-medium">{activity.child}</p>
                  <p className="text-[#507a95] text-sm">
                    {activity.activity} • {activity.time}
                  </p>
                </div>
              </div>
              {activity.grade && (
                <div className="text-[#0e161b] text-xl font-bold">
                  {activity.grade}
                </div>
              )}
              {activity.status && (
                <div className="text-[#1d8cd7] text-sm font-medium">
                  {activity.status}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Child Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-6 shadow-xl border border-[#d1dde6]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#0e161b] text-xl font-bold">Add Child</h3>
              <button onClick={closeModal} className="text-[#507a95] hover:text-[#0e161b] p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                {successMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="matricNumber" className="block text-[#507a95] text-sm mb-1">
                  Matriculation Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="matricNumber"
                  name="matricNumber"
                  value={formData.matricNumber}
                  onChange={handleChange}
                  placeholder="e.g. BU/22/04/05/001"
                  className={`w-full border ${
                    formErrors.matricNumber ? 'border-red-500' : 'border-[#d1dde6]'
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1d8cd7]`}
                />
                {formErrors.matricNumber && (
                  <p className="mt-1 text-red-500 text-xs">{formErrors.matricNumber}</p>
                )}
                <p className="mt-1 text-[#507a95] text-xs">
                  Enter your child's matriculation number to link their account
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="department" className="block text-[#507a95] text-sm mb-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full border ${
                    formErrors.department ? 'border-red-500' : 'border-[#d1dde6]'
                  } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1d8cd7]`}
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Economics">Economics</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Law">Law</option>
                  <option value="Mass Communication">Mass Communication</option>
                </select>
                {formErrors.department && (
                  <p className="mt-1 text-red-500 text-xs">{formErrors.department}</p>
                )}
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 px-4 py-2 border border-[#d1dde6] text-[#507a95] rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#1d8cd7] text-white rounded-lg hover:bg-[#1d8cd7]/90 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Add Child'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;