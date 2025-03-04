import React, { useState } from 'react';
import { 
  X, 
  Book, 
  Clock, 
  User, 
  Calendar, 
  MapPin, 
  Award,
  CheckCircle,
  Search
} from 'lucide-react';
import ClassDetailsModal from './ClassDetailsModal'; // Import the modal for class details

/**
 * ClassesModal Component
 * 
 * Displays a modal with all classes a student is enrolled in.
 * Includes filtering, search, and class details with schedule information.
 */
const ClassesModal = ({ isOpen, onClose, childData, onClassClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState(null); // State for selected class

  if (!isOpen || !childData) return null;
  
  // Get unique subject categories for filter
  const subjects = [...new Set(childData.classes.map(cls => cls.subject))];
  
  // Filter classes based on search and subject filter
  const filteredClasses = childData.classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cls.teacher.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === 'all' || cls.subject === filterSubject;
    
    return matchesSearch && matchesSubject;
  });
  
  // Helper function to get class status badge
  const getClassStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Calendar className="w-3 h-3 mr-1" />
            Upcoming
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Award className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      default:
        return null;
    }
  };
  
  // Helper function to format schedule time
  const formatScheduleTime = (schedule) => {
    return `${schedule.days.join(', ')} • ${schedule.time}`;
  };

  // Handle class click
  const handleClassClick = (cls) => {
    setSelectedClass(cls); // Set the selected class
    if (onClassClick) {
      onClassClick(cls); // Notify parent component (optional)
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Modal header */}
          <div className="bg-[#f8fafb] px-6 py-4 border-b border-[#d1dde6] flex justify-between items-center">
            <h3 className="text-lg font-medium text-[#0e161b]">
              {childData.name}'s Classes
            </h3>
            <button 
              onClick={onClose}
              className="text-[#507a95] hover:text-[#0e161b] focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Search and filter section */}
          <div className="p-4 border-b border-[#d1dde6] bg-white">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search input */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-[#507a95]" />
                </div>
                <input
                  type="text"
                  className="focus:ring-[#1d8cd7] focus:border-[#1d8cd7] block w-full pl-10 pr-3 py-2 sm:text-sm border-[#d1dde6] rounded-md"
                  placeholder="Search by class or teacher name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Subject filter */}
              <div>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-[#d1dde6] focus:outline-none focus:ring-[#1d8cd7] focus:border-[#1d8cd7] sm:text-sm rounded-md"
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                >
                  <option value="all">All Subjects</option>
                  {subjects.map((subject, idx) => (
                    <option key={idx} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Classes list */}
          <div className="px-4 py-5 sm:p-6 max-h-[60vh] overflow-y-auto">
            {filteredClasses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#507a95]">No classes match your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredClasses.map((cls) => (
                  <div 
                    key={cls.id} 
                    className="bg-white rounded-lg border border-[#d1dde6] overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleClassClick(cls)} // Add click handler
                  >
                    <div className="px-4 py-3 bg-[#f8fafb] border-b border-[#d1dde6] flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="mr-3 bg-[#e8eef3] rounded-lg p-2">
                          <Book className="h-5 w-5 text-[#1d8cd7]" />
                        </div>
                        <div>
                          <h4 className="text-[#0e161b] text-base font-medium">
                            {cls.name}
                          </h4>
                          <p className="text-[#507a95] text-sm">
                            Subject: {cls.subject}
                          </p>
                        </div>
                      </div>
                      {getClassStatusBadge(cls.status)}
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Class details */}
                        <div>
                          <h5 className="text-sm font-medium text-[#0e161b] mb-2">Class Details</h5>
                          <ul className="space-y-2">
                            <li className="flex items-center text-sm text-[#507a95]">
                              <User className="h-4 w-4 text-[#1d8cd7] mr-2" />
                              Teacher: {cls.teacher.name}
                            </li>
                          </ul>
                        </div>
                        
                        {/* Class progress */}
                        <div>
                          <h5 className="text-sm font-medium text-[#0e161b] mb-2">Current Progress</h5>
                          <div className="mb-2">
                            <div className="flex justify-between items-center text-xs text-[#507a95] mb-1">
                              <span>Current Grade: <span className="font-medium text-[#0e161b]">{cls.grade}</span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Modal footer */}
          <div className="bg-[#f8fafb] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-[#d1dde6]">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#1d8cd7] text-base font-medium text-white hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7] sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <ClassDetailsModal 
          classData={selectedClass}
          onClose={() => setSelectedClass(null)} // Close the details modal
        />
      )}
    </div>
  );
};

export default ClassesModal;