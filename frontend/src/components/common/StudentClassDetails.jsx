// src/components/student/ClassDetailsModal.jsx
import React from 'react';
import { X, Award, Book, UserCheck, FileText, BadgeHelp, FolderKanban } from 'lucide-react';

const StudentClassDetails = ({ classData, onClose }) => {
  // Mock detailed scores for the class
  const scoreDetails = {
    assignments: {
      totalPoints: 10,
      earned: classData.assignmentScore || 8, // Default value if not provided
      percentage: ((classData.assignmentScore || 8) / 10) * 100
    },
    // exams: {
    //   totalPoints: 40,
    //   earned: classData.examScore || Math.floor(classData.percentage * 0.4 * 40 / 100), // Estimate based on overall percentage
    //   percentage: ((classData.examScore || Math.floor(classData.percentage * 0.4 * 40 / 100)) / 40) * 100
    // },
    midSemester: {
      totalPoints: 15,
      earned: classData.midSemesterScore || Math.floor(classData.percentage * 0.15 * 15 / 100),
      percentage: ((classData.midSemesterScore || Math.floor(classData.percentage * 0.15 * 15 / 100)) / 15) * 100
    },
    attendance: {
      totalPoints: 5,
      earned: classData.attendanceScore || 4.5,
      percentage: ((classData.attendanceScore || 4.5) / 5) * 100
    },
    project: {
      totalPoints: 20,
      earned: classData.projectScore || Math.floor(classData.percentage * 0.2 * 20 / 100),
      percentage: ((classData.projectScore || Math.floor(classData.percentage * 0.2 * 20 / 100)) / 20) * 100
    },
    quiz: {
      totalPoints: 10,
      earned: classData.quizScore || Math.floor(classData.percentage * 0.1 * 10 / 100),
      percentage: ((classData.quizScore || Math.floor(classData.percentage * 0.1 * 10 / 100)) / 10) * 100
    }
  };

  // Calculate total score
  const totalEarned = scoreDetails.assignments.earned + 
                      // scoreDetails.exams.earned + 
                      scoreDetails.midSemester.earned + 
                      scoreDetails.attendance.earned + 
                      scoreDetails.project.earned + 
                      scoreDetails.quiz.earned;
  
  const totalPossible = 60; // 10 + 40 + 15 + 5 + 20 + 10

  // Function to get color based on percentage
  const getScoreColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-blue-500';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Function to get letter grade based on percentage
  const getLetterGrade = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-[#0e161b]">{classData.name} Details</h2>
              <button 
                onClick={onClose}
                className="text-[#507a95] hover:text-[#0e161b] focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap justify-between items-center mb-4 bg-[#f8fafb] p-4 rounded-lg">
                <div>
                  <h3 className="text-xl font-bold text-[#0e161b]">
                    Overall Grade: {getLetterGrade(classData.percentage)}
                  </h3>
                  <p className="text-[#507a95]">
                    Teacher: {classData.teacher}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getScoreColor(classData.percentage)}`}>
                    {totalEarned}/{totalPossible} ({classData.percentage}%)
                  </p>
                  <p className="text-[#507a95] text-sm">
                    Last updated: {classData.lastUpdate}
                  </p>
                </div>
              </div>

              {/* Score breakdown */}
              <h3 className="text-lg font-bold text-[#0e161b] mb-4">Score Breakdown</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Assignments */}
                <div className="bg-white border border-[#d1dde6] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-[#1d8cd7]" />
                    <h4 className="text-[#0e161b] font-bold">Assignments</h4>
                  </div>
                  <div className="flex justify-between mb-1">
                    <p className="text-[#507a95]">Score:</p>
                    <p className={`font-medium ${getScoreColor(scoreDetails.assignments.percentage)}`}>
                      {scoreDetails.assignments.earned}/{scoreDetails.assignments.totalPoints}
                    </p>
                  </div>
                  <div className="w-full bg-[#e8eef3] rounded-full h-2 mb-2">
                    <div 
                      className="bg-[#1d8cd7] h-2 rounded-full" 
                      style={{ width: `${scoreDetails.assignments.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#507a95] text-right">
                    {scoreDetails.assignments.percentage.toFixed(1)}% - Weight: 10%
                  </p>
                </div>

                {/* Exams */}
                {/* <div className="bg-white border border-[#d1dde6] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-[#1d8cd7]" />
                    <h4 className="text-[#0e161b] font-bold">Final Exam</h4>
                  </div>
                  <div className="flex justify-between mb-1">
                    <p className="text-[#507a95]">Score:</p>
                    <p className={`font-medium ${getScoreColor(scoreDetails.exams.percentage)}`}>
                      {scoreDetails.exams.earned}/{scoreDetails.exams.totalPoints}
                    </p>
                  </div>
                  <div className="w-full bg-[#e8eef3] rounded-full h-2 mb-2">
                    <div 
                      className="bg-[#1d8cd7] h-2 rounded-full" 
                      style={{ width: `${scoreDetails.exams.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#507a95] text-right">
                    {scoreDetails.exams.percentage.toFixed(1)}% - Weight: 40%
                  </p>
                </div> */}

                {/* Mid Semester */}
                <div className="bg-white border border-[#d1dde6] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Book className="h-5 w-5 text-[#1d8cd7]" />
                    <h4 className="text-[#0e161b] font-bold">Mid Semester</h4>
                  </div>
                  <div className="flex justify-between mb-1">
                    <p className="text-[#507a95]">Score:</p>
                    <p className={`font-medium ${getScoreColor(scoreDetails.midSemester.percentage)}`}>
                      {scoreDetails.midSemester.earned}/{scoreDetails.midSemester.totalPoints}
                    </p>
                  </div>
                  <div className="w-full bg-[#e8eef3] rounded-full h-2 mb-2">
                    <div 
                      className="bg-[#1d8cd7] h-2 rounded-full" 
                      style={{ width: `${scoreDetails.midSemester.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#507a95] text-right">
                    {scoreDetails.midSemester.percentage.toFixed(1)}% - Weight: 15%
                  </p>
                </div>

                {/* Attendance */}
                <div className="bg-white border border-[#d1dde6] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="h-5 w-5 text-[#1d8cd7]" />
                    <h4 className="text-[#0e161b] font-bold">Attendance</h4>
                  </div>
                  <div className="flex justify-between mb-1">
                    <p className="text-[#507a95]">Score:</p>
                    <p className={`font-medium ${getScoreColor(scoreDetails.attendance.percentage)}`}>
                      {scoreDetails.attendance.earned}/{scoreDetails.attendance.totalPoints}
                    </p>
                  </div>
                  <div className="w-full bg-[#e8eef3] rounded-full h-2 mb-2">
                    <div 
                      className="bg-[#1d8cd7] h-2 rounded-full" 
                      style={{ width: `${scoreDetails.attendance.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#507a95] text-right">
                    {scoreDetails.attendance.percentage.toFixed(1)}% - Weight: 5%
                  </p>
                </div>

                {/* Project */}
                <div className="bg-white border border-[#d1dde6] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FolderKanban className="h-5 w-5 text-[#1d8cd7]" />
                    <h4 className="text-[#0e161b] font-bold">Project</h4>
                  </div>
                  <div className="flex justify-between mb-1">
                    <p className="text-[#507a95]">Score:</p>
                    <p className={`font-medium ${getScoreColor(scoreDetails.project.percentage)}`}>
                      {scoreDetails.project.earned}/{scoreDetails.project.totalPoints}
                    </p>
                  </div>
                  <div className="w-full bg-[#e8eef3] rounded-full h-2 mb-2">
                    <div 
                      className="bg-[#1d8cd7] h-2 rounded-full" 
                      style={{ width: `${scoreDetails.project.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#507a95] text-right">
                    {scoreDetails.project.percentage.toFixed(1)}% - Weight: 20%
                  </p>
                </div>

                {/* Quiz */}
                <div className="bg-white border border-[#d1dde6] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeHelp className="h-5 w-5 text-[#1d8cd7]" />
                    <h4 className="text-[#0e161b] font-bold">Quizzes</h4>
                  </div>
                  <div className="flex justify-between mb-1">
                    <p className="text-[#507a95]">Score:</p>
                    <p className={`font-medium ${getScoreColor(scoreDetails.quiz.percentage)}`}>
                      {scoreDetails.quiz.earned}/{scoreDetails.quiz.totalPoints}
                    </p>
                  </div>
                  <div className="w-full bg-[#e8eef3] rounded-full h-2 mb-2">
                    <div 
                      className="bg-[#1d8cd7] h-2 rounded-full" 
                      style={{ width: `${scoreDetails.quiz.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#507a95] text-right">
                    {scoreDetails.quiz.percentage.toFixed(1)}% - Weight: 10%
                  </p>
                </div>
              </div>

              {/* Teacher comments section */}
              {/* <div className="bg-[#f8fafb] p-4 rounded-lg mb-6">
                <h4 className="text-[#0e161b] font-bold mb-2">Teacher Comments</h4>
                <p className="text-[#507a95] italic text-sm">
                  {classData.feedback || "You're making good progress in this class. I'd recommend focusing more on the project component to improve your overall grade. Keep up the good work with your assignments!"}
                </p>
              </div> */}
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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

export default StudentClassDetails;