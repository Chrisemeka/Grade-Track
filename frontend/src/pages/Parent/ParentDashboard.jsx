import React from 'react';

const ParentDashboard = () => {
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

      {/* Children Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Emily Johnson', level: '100 Level', performance: 'Excellent', cgpa: '3.8' },
          { name: 'Michael Johnson', level: '300 Level', performance: 'Good', cgpa: '3.5' },
        ].map((child, index) => (
          <div key={index} className="flex flex-col gap-3 bg-white rounded-lg p-4 border border-[#d1dde6]">
            <div className="flex items-center gap-3">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
                style={{
                  backgroundImage: `url("/api/placeholder/48/48")`
                }}
              />
              <div>
                <p className="text-[#0e161b] text-base font-medium">{child.name}</p>
                <p className="text-[#507a95] text-sm">{child.grade}</p>
              </div>
            </div>
            {/* <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-[#507a95] text-sm">Current GPA</p>
                <p className="text-[#0e161b] text-xl font-bold">{child.cgpa}</p>
              </div>
              <div>
                <p className="text-[#507a95] text-sm">Performance</p>
                <p className="text-[#1d8cd7] text-sm font-medium">{child.performance}</p>
              </div>
            </div> */}
          </div>
        ))}
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-[#0e161b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
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

      {/* Upcoming Events */}
      {/* <div className="flex flex-col gap-4">
        <h3 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Upcoming Events
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Parent-Teacher Meeting', date: 'March 15, 2024', time: '2:00 PM', child: 'Emily' },
            { title: 'Science Fair', date: 'March 20, 2024', time: '10:00 AM', child: 'Michael' },
            { title: 'Report Card Day', date: 'March 25, 2024', time: 'All Day', child: 'All Children' },
          ].map((event, index) => (
            <div key={index} className="flex flex-col gap-2 bg-white rounded-lg p-4 border border-[#d1dde6]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[#0e161b] text-base font-medium">{event.title}</p>
                  <p className="text-[#507a95] text-sm">{event.date} • {event.time}</p>
                </div>
              </div>
              <p className="text-[#1d8cd7] text-sm">{event.child}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};



export default ParentDashboard;