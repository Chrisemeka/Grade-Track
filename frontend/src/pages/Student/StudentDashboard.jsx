// src/pages/student/Dashboard.jsx
import React from 'react';
import BaseLayout from '../../pages/Layout/StudentLayout';
import StudentSidebar from '../../components/common/StudentSideBar';

const StudentDashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
            Dashboard
          </h2>
          <p className="text-[#507a95] text-sm font-normal leading-normal">
            Welcome back, John
          </p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {[
          { semester: 'Overall GPA', grade: '3.8' },
        ].map((item) => (
          <div key={item.semester} className="flex flex-col gap-2 rounded-lg border border-[#d1dde6] p-4 bg-white">
            <p className="text-[#0e161b] tracking-light text-2xl font-bold leading-tight">
              {item.grade}
            </p>
            <p className="text-[#507a95] text-sm font-normal leading-normal">
              {item.semester}
            </p>
          </div>
        ))}
      </div>

      {/* Upcoming Assignments */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Upcoming Assignments
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            { title: 'Mathematics Assignment', dueDate: '2 days', course: 'Mathematics 101' },
            { title: 'Physics Lab Report', dueDate: '3 days', course: 'Physics 201' },
            { title: 'Programming Project', dueDate: '5 days', course: 'Computer Science 301' },
            { title: 'Research Paper', dueDate: '1 week', course: 'Research Methods' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4 border border-[#d1dde6]">
              <div className="flex items-center gap-4">
                <div className="bg-[#e8eef3] rounded-lg p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-[#0e161b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#0e161b] text-base font-medium">{item.title}</p>
                  <p className="text-[#507a95] text-sm">Due in {item.dueDate} • {item.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Recent Assignment Feedback
        </h3>
        
        <div className="flex flex-col gap-2">
          {[
            { course: 'Mathematics 101', feedback: 'Excellent understanding of calculus concepts', grade: 'A' },
            { course: 'Physics 201', feedback: 'Good work on the theoretical analysis', grade: 'B+' },
            { course: 'Computer Science 301', feedback: 'Outstanding project implementation', grade: 'A+' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4 border border-[#d1dde6]">
              <div className="flex items-center gap-4">
                <div className="bg-[#e8eef3] rounded-lg p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-[#0e161b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#0e161b] text-base font-medium">{item.course}</p>
                  <p className="text-[#507a95] text-sm">{item.feedback}</p>
                </div>
              </div>
              <div className="text-[#0e161b] text-xl font-bold">
                {item.grade}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Progress */}
      {/* <div className="flex flex-col gap-4">
        <h3 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Course Progress
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { course: 'Mathematics 101', progress: 85 },
            { course: 'Physics 201', progress: 72 },
            { course: 'Computer Science 301', progress: 93 },
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-3 bg-white rounded-lg p-4 border border-[#d1dde6]">
              <div className="flex justify-between items-center">
                <p className="text-[#0e161b] text-base font-medium">{item.course}</p>
                <p className="text-[#1d8cd7] text-sm font-medium">{item.progress}%</p>
              </div>
              <div className="w-full bg-[#e8eef3] rounded-full h-2">
                <div 
                  className="bg-[#1d8cd7] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

// Wrap the dashboard with the layout
// const StudentDashboardPage = () => {
//   return (
//     <BaseLayout
//       userRole="student"
//       Sidebar={StudentSidebar}
//     >
//       <StudentDashboard />
//     </BaseLayout>
//   );
// };

export default StudentDashboard;