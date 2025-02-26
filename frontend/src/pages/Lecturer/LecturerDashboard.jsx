// src/pages/lecturer/Dashboard.jsx
import React from 'react';
import BaseLayout from '../../pages/Layout/LecturerLayout';
import LecturerSidebar from '../../components/common/LectureSideBar';

const LecturerDashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
            Dashboard
          </h2>
          <p className="text-[#507a95] text-sm font-normal leading-normal">
            Welcome back, Dr. Smith
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          // { title: 'Total Students', value: '156', subtitle: 'Across all courses' },
          { title: 'Active Courses', value: '4', subtitle: 'Current semester' },
          { title: 'Average Performance', value: '85%', subtitle: 'Class average' },
          { title: 'Pending Assignments', value: '12', subtitle: 'Uploads Grade' },
        ].map((stat) => (
          <div key={stat.title} className="flex flex-col gap-2 rounded-lg border border-[#d1dde6] p-4 bg-white">
            <p className="text-[#0e161b] tracking-light text-2xl font-bold leading-tight">
              {stat.value}
            </p>
            <div className="flex flex-col">
              <p className="text-[#507a95] text-sm font-medium">{stat.title}</p>
              <p className="text-[#507a95] text-xs">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Assignments */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em]">
            Recent Assignments
          </h3>
        </div>
        
        <div className="flex flex-col gap-2">
          {[
            { title: 'Final Project', course: 'Advanced Programming', dueDate: '3 days' },
            { title: 'Database Design', course: 'Database Systems', dueDate: '5 days'},
            { title: 'Algorithm Analysis', course: 'Data Structures', dueDate: '1 week'},
          ].map((assignment, index) => (
            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4 border border-[#d1dde6]">
              <div className="flex items-center gap-4">
                <div className="bg-[#e8eef3] rounded-lg p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-[#0e161b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#0e161b] text-base font-medium">{assignment.title}</p>
                  <p className="text-[#507a95] text-sm">
                    {assignment.course} • Due in {assignment.dueDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Course Performance */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Course Performance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { course: 'Advanced Programming', students: 45 },
            { course: 'Database Systems', students: 38 },
            { course: 'Data Structures', students: 42 },
          ].map((course, index) => (
            <div key={index} className="flex flex-col gap-3 bg-white rounded-lg p-4 border border-[#d1dde6]">
              <div className="flex justify-between items-center">
                <p className="text-[#0e161b] text-base font-medium">{course.course}</p>
              </div>
              <p className="text-[#507a95] text-sm">{course.students} students enrolled</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Wrap the dashboard with the layout
// const LecturerDashboardPage = () => {
//   return (
//     <BaseLayout
//       userRole="lecturer"
//       Sidebar={LecturerSidebar}
//     >
//       <LecturerDashboard />
//     </BaseLayout>
//   );
// };

export default LecturerDashboard;