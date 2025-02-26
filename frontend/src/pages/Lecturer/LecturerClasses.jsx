import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Calendar, Copy, Bell, AlertTriangle, Trash2, Check, MoreVertical } from 'lucide-react';

const LecturerClasses = () => {
  // Mock data for classes
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Introduction to Computer Science',
      code: 'CS101',
      inviteCode: 'INTRO24',
      startDate: '2024-01-15',
      endDate: '2024-05-30',
      students: 32,
      atRiskCount: 5,
      // pendingGrades: 12,
      nextClass: 'Tomorrow, 10:00 AM'
    },
    {
      id: 2,
      name: 'Data Structures and Algorithms',
      code: 'CS201',
      inviteCode: 'DATA24',
      startDate: '2024-01-15',
      endDate: '2024-05-30',
      students: 28,
      atRiskCount: 3,
      // pendingGrades: 8,
      nextClass: 'Today, 2:00 PM'
    },
    {
      id: 3,
      name: 'Database Systems',
      code: 'CS301',
      inviteCode: 'DBSYS24',
      startDate: '2024-01-15',
      endDate: '2024-05-30',
      students: 35,
      atRiskCount: 7,
      // pendingGrades: 15,
      nextClass: 'Friday, 11:00 AM'
    }
  ]);

  const [copiedCode, setCopiedCode] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter(classItem => classItem.id !== id));
    setShowDeleteConfirm(null);
  };

  const toggleDeleteConfirm = (id) => {
    setShowDeleteConfirm(showDeleteConfirm === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
            My Classes
          </h2>
          <p className="text-[#507a95] text-sm font-normal leading-normal">
            Manage your classes and students
          </p>
        </div>

        <div>
          <Link
            to="/lecturer/create-class"
            className="inline-flex items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7]"
          >
            Create New Class
          </Link>
        </div>
      </div>

      {/* Active Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classes.map(classItem => (
          <div 
            key={classItem.id} 
            className="bg-white rounded-lg border border-[#d1dde6] overflow-hidden"
          >
            {/* Class Header */}
            <div className="p-5 border-b border-[#d1dde6] flex justify-between items-start">
              <div>
                <h3 className="text-[#0e161b] text-lg font-bold">
                  {classItem.name}
                </h3>
                <p className="text-[#507a95] text-sm mt-1">
                  Class Code: {classItem.code}
                </p>
              </div>
              <div className="relative">
                <button 
                  onClick={() => toggleDeleteConfirm(classItem.id)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <MoreVertical className="h-5 w-5 text-[#507a95]" />
                </button>
                
                {showDeleteConfirm === classItem.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
                    <button
                      onClick={() => handleDeleteClass(classItem.id)}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Class
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Invite Code */}
            <div className="px-5 py-3 border-b border-[#d1dde6]">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[#507a95] text-xs">Student Invite Code</p>
                  <p className="text-[#0e161b] text-base font-mono font-medium">
                    {classItem.inviteCode}
                  </p>
                </div>
                <button 
                  onClick={() => handleCopyCode(classItem.id, classItem.inviteCode)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  {copiedCode === classItem.id ? 
                    <Check className="h-5 w-5 text-green-600" /> : 
                    <Copy className="h-5 w-5 text-[#1d8cd7]" />
                  }
                </button>
              </div>
            </div>

            {/* Class Info */}
            <div className="px-5 py-3 border-b border-[#d1dde6]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#507a95] text-xs">Date Range</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-[#507a95] mr-2" />
                    <span className="text-[#0e161b] text-sm">
                      {new Date(classItem.startDate).toLocaleDateString()} - {new Date(classItem.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[#507a95] text-xs">Students Enrolled</p>
                  <div className="flex items-center mt-1">
                    <Users className="h-4 w-4 text-[#507a95] mr-2" />
                    <span className="text-[#0e161b] text-sm">
                      {classItem.students} students
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Indicators */}
            <div className="px-5 py-3 border-b border-[#d1dde6]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-[#dc3545] mr-2" />
                    <span className="text-[#0e161b] text-sm">{classItem.atRiskCount} at-risk students</span>
                  </div>
                </div>
                {/* <div>
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 text-[#1d8cd7] mr-2" />
                    <span className="text-[#0e161b] text-sm">{classItem.pendingGrades} pending grades</span>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Next Class */}
            {/* <div className="px-5 py-3 border-b border-[#d1dde6]">
              <p className="text-[#507a95] text-xs">Next Class</p>
              <p className="text-[#0e161b] text-sm mt-1">{classItem.nextClass}</p>
            </div> */}

            {/* Actions */}
            {/* <div className="p-3 flex flex-wrap gap-2">
              <Link 
                to={`/lecturer/classes/${classItem.id}`}
                className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90"
              >
                View Details
              </Link>
              <Link 
                to={`/lecturer/classes/${classItem.id}/students`}
                className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-[#1d8cd7] bg-[#e8eef3] hover:bg-[#e8eef3]/80"
              >
                Students
              </Link>
            </div> */}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {classes.length === 0 && (
        <div className="bg-white rounded-lg border border-[#d1dde6] p-8 text-center">
          <div className="mx-auto h-12 w-12 text-[#507a95] mb-4">
            <BookOpen className="h-12 w-12" />
          </div>
          <h3 className="text-[#0e161b] text-lg font-medium">No classes created yet</h3>
          <p className="text-[#507a95] mt-2 max-w-md mx-auto">
            You haven't created any classes yet. Create your first class to get started.
          </p>
          <div className="mt-6">
            <Link
              to="/lecturer/create-class"
              className="inline-flex items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7]"
            >
              Create New Class
            </Link>
          </div>
        </div>
      )}

      {/* Past Classes */}
      {classes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-[#0e161b] text-xl font-bold mb-4">Past Classes</h3>
          
          <div className="bg-white rounded-lg border border-[#d1dde6] p-6">
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-[#507a95] mx-auto mb-4" />
              <h4 className="text-[#0e161b] text-lg font-medium">No past classes</h4>
              <p className="text-[#507a95] mt-2 max-w-md mx-auto">
                You don't have any past classes yet. Classes will appear here once they end.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default LecturerClasses;