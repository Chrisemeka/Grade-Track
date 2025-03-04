import React from 'react';
import { X, Book, Clock, User, Calendar, MapPin, Award } from 'lucide-react';

const ClassDetailsModal = ({ classData, onClose }) => {
  if (!classData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Modal header */}
          <div className="bg-[#f8fafb] px-6 py-4 border-b border-[#d1dde6] flex justify-between items-center">
            <h3 className="text-lg font-medium text-[#0e161b]">
              {classData.name} Details
            </h3>
            <button 
              onClick={onClose}
              className="text-[#507a95] hover:text-[#0e161b] focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Class details */}
          <div className="p-6">
            <div className="space-y-4">
              {/* <div>
                <h4 className="text-sm font-medium text-[#0e161b] mb-2">Class Information</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-[#507a95]">
                    <User className="h-4 w-4 text-[#1d8cd7] mr-2" />
                    Teacher: {classData.teacher.name}
                  </li>
                  <li className="flex items-center text-sm text-[#507a95]">
                    <Book className="h-4 w-4 text-[#1d8cd7] mr-2" />
                    Subject: {classData.subject}
                  </li>
                  <li className="flex items-center text-sm text-[#507a95]">
                    <MapPin className="h-4 w-4 text-[#1d8cd7] mr-2" />
                    Room: {classData.room}
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-[#0e161b] mb-2">Assessments</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-[#507a95]">
                    Next Assignment: {classData.nextAssignment.name} (Due: {classData.nextAssignment.dueDate})
                  </li>
                </ul>
              </div> */}

              {/* Grades Section */}
              <div>
                <h4 className="text-sm font-medium text-[#0e161b] mb-2">Grades</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-[#507a95]">
                    Assignment: {classData.grades.assignment || "N/A"}
                  </li>
                  <li className="text-sm text-[#507a95]">
                    Attendance: {classData.grades.attendance || "N/A"}
                  </li>
                  <li className="text-sm text-[#507a95]">
                    Quiz: {classData.grades.quiz || "N/A"}
                  </li>
                  <li className="text-sm text-[#507a95]">
                    Project: {classData.grades.project || "N/A"}
                  </li>
                  <li className="text-sm text-[#507a95]">
                    Mid-semester: {classData.grades.midSemester || "N/A"}
                  </li>
                </ul>
              </div>
            </div>
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
    </div>
  );
};

export default ClassDetailsModal;