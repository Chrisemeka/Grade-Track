import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Calendar, Copy, Bell, AlertTriangle, Trash2, Check, MoreVertical, Edit, Flag, Save, X } from 'lucide-react';

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
      nextClass: 'Tomorrow, 10:00 AM',
      studentsList: [
        { id: 1, name: 'John Doe', assignment: 85, midSemester: 78, attendance: 90, project: 88, quizzes: 82, flagged: false },
        { id: 2, name: 'Jane Smith', assignment: 92, midSemester: 85, attendance: 95, project: 90, quizzes: 88, flagged: false },
        { id: 3, name: 'Alice Johnson', assignment: 78, midSemester: 72, attendance: 85, project: 80, quizzes: 75, flagged: false },
      ],
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
      nextClass: 'Today, 2:00 PM',
      studentsList: [
        { id: 1, name: 'Michael Brown', assignment: 88, midSemester: 80, attendance: 92, project: 85, quizzes: 84, flagged: false },
        { id: 2, name: 'Emily Davis', assignment: 90, midSemester: 85, attendance: 94, project: 89, quizzes: 87, flagged: false },
      ],
    },
  ]);

  const [copiedCode, setCopiedCode] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null); // Track selected class for modal
  const [editingStudent, setEditingStudent] = useState(null); // Track which student is being edited
  const [editValues, setEditValues] = useState({}); // Store edited values

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

  // Open modal with selected class data
  const openClassModal = (classItem) => {
    setSelectedClass(classItem);
  };

  // Close modal
  const closeClassModal = () => {
    setSelectedClass(null);
    setEditingStudent(null);
  };

  // Start editing a student - we don't include name in the editValues now
  const startEditStudent = (student) => {
    setEditingStudent(student.id);
    setEditValues({
      assignment: student.assignment,
      midSemester: student.midSemester,
      attendance: student.attendance,
      project: student.project,
      quizzes: student.quizzes
    });
  };

  // Save edited student data
  const saveEditStudent = (classId, studentId) => {
    // Update the class data with edited values
    setClasses(classes.map(classItem => {
      if (classItem.id === classId) {
        return {
          ...classItem,
          studentsList: classItem.studentsList.map(student => {
            if (student.id === studentId) {
              return {
                ...student,
                ...editValues
              };
            }
            return student;
          })
        };
      }
      return classItem;
    }));

    // Update selected class for modal
    if (selectedClass && selectedClass.id === classId) {
      setSelectedClass({
        ...selectedClass,
        studentsList: selectedClass.studentsList.map(student => {
          if (student.id === studentId) {
            return {
              ...student,
              ...editValues
            };
          }
          return student;
        })
      });
    }

    // Reset editing state
    setEditingStudent(null);
    setEditValues({});
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingStudent(null);
    setEditValues({});
  };

  // Handle input change for editing
  const handleEditChange = (field, value) => {
    setEditValues({
      ...editValues,
      [field]: Number(value)
    });
  };

  // Toggle flag status for a student
  const toggleFlagStudent = (classId, studentId) => {
    // Update classes state
    setClasses(classes.map(classItem => {
      if (classItem.id === classId) {
        return {
          ...classItem,
          studentsList: classItem.studentsList.map(student => {
            if (student.id === studentId) {
              return {
                ...student,
                flagged: !student.flagged
              };
            }
            return student;
          })
        };
      }
      return classItem;
    }));

    // Update selected class for modal
    if (selectedClass && selectedClass.id === classId) {
      setSelectedClass({
        ...selectedClass,
        studentsList: selectedClass.studentsList.map(student => {
          if (student.id === studentId) {
            return {
              ...student,
              flagged: !student.flagged
            };
          }
          return student;
        })
      });
    }
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
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 flex flex-wrap gap-2">
              <button
                onClick={() => openClassModal(classItem)}
                className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90"
              >
                View Class
              </button>
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

      {/* Modal for Viewing Class Details - No dark background */}
      {selectedClass && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-4xl p-6 shadow-xl border border-[#d1dde6]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#0e161b] text-xl font-bold">{selectedClass.name}</h3>
              <button onClick={closeClassModal} className="text-[#507a95] hover:text-[#0e161b] p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Table of Students */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-[#507a95] text-sm">Name</th>
                    <th className="px-4 py-2 text-left text-[#507a95] text-sm">Assignment</th>
                    <th className="px-4 py-2 text-left text-[#507a95] text-sm">Mid-Semester</th>
                    <th className="px-4 py-2 text-left text-[#507a95] text-sm">Attendance</th>
                    <th className="px-4 py-2 text-left text-[#507a95] text-sm">Project</th>
                    <th className="px-4 py-2 text-left text-[#507a95] text-sm">Quizzes</th>
                    <th className="px-4 py-2 text-left text-[#507a95] text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedClass.studentsList.map(student => (
                    <tr key={student.id} className={student.flagged ? "bg-red-50" : ""}>
                      {/* Student name - never editable */}
                      <td className="px-4 py-2 text-[#0e161b] font-medium">
                        {student.name}
                      </td>
                      <td className="px-4 py-2 text-[#0e161b]">
                        {editingStudent === student.id ? (
                          <input
                            type="number"
                            value={editValues.assignment}
                            onChange={(e) => handleEditChange('assignment', e.target.value)}
                            className="w-full border border-[#d1dde6] rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          student.assignment
                        )}
                      </td>
                      <td className="px-4 py-2 text-[#0e161b]">
                        {editingStudent === student.id ? (
                          <input
                            type="number"
                            value={editValues.midSemester}
                            onChange={(e) => handleEditChange('midSemester', e.target.value)}
                            className="w-full border border-[#d1dde6] rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          student.midSemester
                        )}
                      </td>
                      <td className="px-4 py-2 text-[#0e161b]">
                        {editingStudent === student.id ? (
                          <input
                            type="number"
                            value={editValues.attendance}
                            onChange={(e) => handleEditChange('attendance', e.target.value)}
                            className="w-full border border-[#d1dde6] rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          student.attendance
                        )}
                      </td>
                      <td className="px-4 py-2 text-[#0e161b]">
                        {editingStudent === student.id ? (
                          <input
                            type="number"
                            value={editValues.project}
                            onChange={(e) => handleEditChange('project', e.target.value)}
                            className="w-full border border-[#d1dde6] rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          student.project
                        )}
                      </td>
                      <td className="px-4 py-2 text-[#0e161b]">
                        {editingStudent === student.id ? (
                          <input
                            type="number"
                            value={editValues.quizzes}
                            onChange={(e) => handleEditChange('quizzes', e.target.value)}
                            className="w-full border border-[#d1dde6] rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          student.quizzes
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {editingStudent === student.id ? (
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => saveEditStudent(selectedClass.id, student.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Save className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={cancelEdit}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => startEditStudent(student)}
                              className="text-[#1d8cd7] hover:text-[#1d8cd7]/80"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => toggleFlagStudent(selectedClass.id, student.id)}
                              className={`${student.flagged ? 'text-red-600' : 'text-gray-400'} hover:text-red-600`}
                            >
                              <Flag className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturerClasses;