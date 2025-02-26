// src/pages/student/Classes.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '../../pages/Layout/StudentLayout';
import StudentSidebar from '../../components/common/StudentSideBar';
import { BookOpen, Users, Calendar, ExternalLink, Bell } from 'lucide-react';

const Class = () => {
  // Mock data for classes
  const classes = [
    {
      id: 1,
      name: 'Introduction to Computer Science',
      instructor: 'Dr. Smith',
      startDate: '2024-01-15',
      endDate: '2024-05-30',
      students: 32,
      nextAssignment: 'Algorithm Analysis',
      dueDate: '2024-03-15',
      hasNewFeedback: true
    },
    {
      id: 2,
      name: 'Data Structures and Algorithms',
      instructor: 'Prof. Johnson',
      startDate: '2024-01-15',
      endDate: '2024-05-30',
      students: 28,
      nextAssignment: 'Binary Tree Implementation',
      dueDate: '2024-03-18',
      hasNewFeedback: false
    },
    {
      id: 3,
      name: 'Database Systems',
      instructor: 'Dr. Williams',
      startDate: '2024-01-15',
      endDate: '2024-05-30',
      students: 35,
      nextAssignment: 'SQL Query Optimization',
      dueDate: '2024-03-20',
      hasNewFeedback: true
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
            My Classes
          </h2>
          <p className="text-[#507a95] text-sm font-normal leading-normal">
            View all your enrolled classes
          </p>
        </div>

        <div>
          <Link
            to="/student/join-class"
            className="inline-flex items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7]"
          >
            Join New Class
          </Link>
        </div>
      </div>

      {/* Active Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {classes.map(classItem => (
          <div 
            key={classItem.id} 
            className="bg-white rounded-lg border border-[#d1dde6] overflow-hidden flex flex-col"
          >
            {/* Class Header */}
            <div className="p-5 border-b border-[#d1dde6]">
              <div className="flex justify-between">
                <h3 className="text-[#0e161b] text-lg font-bold truncate">
                  {classItem.name}
                </h3>
                {classItem.hasNewFeedback && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      New Feedback
                    </span>
                  </div>
                )}
              </div>
              <p className="text-[#507a95] text-sm mt-1">
                Instructor: {classItem.instructor}
              </p>
            </div>

            {/* Class Info */}
            <div className="px-5 py-3 border-b border-[#d1dde6]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-[#507a95] mr-2" />
                  <span className="text-[#0e161b] text-sm">
                    {new Date(classItem.startDate).toLocaleDateString()} - {new Date(classItem.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-[#507a95] mr-2" />
                  <span className="text-[#0e161b] text-sm">
                    {classItem.students} students enrolled
                  </span>
                </div>
              </div>
            </div>

            {/* Next Assignment */}
            <div className="px-5 py-3 border-b border-[#d1dde6]">
              <p className="text-[#507a95] text-xs mb-1">Next Assignment Due</p>
              <div className="flex justify-between items-center">
                <p className="text-[#0e161b] text-sm font-medium">{classItem.nextAssignment}</p>
                <p className="text-[#507a95] text-xs">
                  {new Date(classItem.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto p-3 flex gap-2">
              {/* <Link 
                to={`/student/classes/${classItem.id}`}
                className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-[#1d8cd7] bg-[#e8eef3] hover:bg-[#e8eef3]/80"
              >
                View Details
              </Link> */}
              <Link 
                to={`/student/classes/${classItem.id}/assignments`}
                className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90"
              >
                Assignments
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {classes.length === 0 && (
        <div className="bg-white rounded-lg border border-[#d1dde6] p-8 text-center">
          <div className="mx-auto h-12 w-12 text-[#507a95] mb-4">
            <BookOpen className="h-12 w-12" />
          </div>
          <h3 className="text-[#0e161b] text-lg font-medium">No classes joined yet</h3>
          <p className="text-[#507a95] mt-2 max-w-md mx-auto">
            You haven't joined any classes yet. Ask your instructor for a class code or join a class to get started.
          </p>
          <div className="mt-6">
            <Link
              to="/student/join-class"
              className="inline-flex items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7]"
            >
              Join a Class
            </Link>
          </div>
        </div>
      )}

      {/* Recently Completed */}
      {classes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-[#0e161b] text-xl font-bold mb-4">Recently Completed Classes</h3>
          
          <div className="bg-white rounded-lg border border-[#d1dde6] p-6">
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-[#507a95] mx-auto mb-4" />
              <h4 className="text-[#0e161b] text-lg font-medium">No completed classes</h4>
              <p className="text-[#507a95] mt-2 max-w-md mx-auto">
                You don't have any completed classes yet. Classes will appear here once they end.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrap with layout
const ClassesPage = () => {
  return (
    <BaseLayout
      userRole="student"
      Sidebar={StudentSidebar}
    >
      <Classes />
    </BaseLayout>
  );
};

export default Class;