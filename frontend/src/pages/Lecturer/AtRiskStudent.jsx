import React, { useState } from 'react';
import { AlertTriangle, Book, ChevronDown, Filter, Flag, Mail, Search } from 'lucide-react';

const AtRiskStudent = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all'); // 'all', 'high', 'medium', 'low'
  const [filterFlag, setFilterFlag] = useState('all'); // 'all', 'flagged', 'unflagged'

  // Mock data for classes
  const classes = [
    { id: 'all', name: 'All Classes' },
    { id: 'cs101', name: 'Introduction to Computer Science (CS101)' },
    { id: 'cs201', name: 'Data Structures and Algorithms (CS201)' },
    { id: 'cs301', name: 'Database Systems (CS301)' }
  ];

  // Mock data for at-risk students
  const allStudents = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      class: 'cs101',
      className: 'Introduction to Computer Science',
      riskLevel: 'high',
      riskScore: 25,
      lastActive: '2 days ago',
      flagged: true,
      flaggedReason: 'Missed three consecutive classes',
      profileImage: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      class: 'cs101',
      className: 'Introduction to Computer Science',
      riskLevel: 'medium',
      riskScore: 35,
      lastActive: '1 day ago',
      flagged: false,
      flaggedReason: '',
      profileImage: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      class: 'cs201',
      className: 'Data Structures and Algorithms',
      riskLevel: 'high',
      riskScore: 15,
      lastActive: '3 days ago',
      flagged: true,
      flaggedReason: 'Missed multiple assignments',
      profileImage: '/api/placeholder/40/40'
    },
    {
      id: 4,
      name: 'Jessica Williams',
      email: 'jessica.williams@example.com',
      class: 'cs201',
      className: 'Data Structures and Algorithms',
      riskLevel: 'low',
      riskScore: 45,
      lastActive: '4 hours ago',
      flagged: false,
      flaggedReason: '',
      profileImage: '/api/placeholder/40/40'
    },
    {
      id: 5,
      name: 'David Miller',
      email: 'david.miller@example.com',
      class: 'cs301',
      className: 'Database Systems',
      riskLevel: 'medium',
      riskScore: 30,
      lastActive: '1 day ago',
      flagged: true,
      flaggedReason: 'Poor performance on midterm',
      profileImage: '/api/placeholder/40/40'
    }
  ];

  // Filter students based on selected filters
  const filteredStudents = allStudents.filter(student => {
    // Filter by class
    if (selectedClass !== 'all' && student.class !== selectedClass) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !student.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by risk level
    if (filterRisk !== 'all' && student.riskLevel !== filterRisk) {
      return false;
    }
    
    // Filter by flag status
    if (filterFlag === 'flagged' && !student.flagged) {
      return false;
    }
    if (filterFlag === 'unflagged' && student.flagged) {
      return false;
    }
    
    return true;
  });

  // Get risk level color
  const getRiskColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle flag toggle
  const toggleFlag = (id, reason) => {
    // In a real app, this would be an API call
    console.log(`Toggle flag for student ${id}, reason: ${reason}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
            At-Risk Students
          </h2>
          <p className="text-[#507a95] text-sm font-normal leading-normal">
            Monitor and support students who may need additional assistance
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-[#d1dde6] p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Class Selection */}
          <div>
            <label htmlFor="class-select" className="block text-[#507a95] text-xs mb-1">
              Class
            </label>
            <div className="relative">
              <select
                id="class-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full appearance-none rounded-lg border border-[#d1dde6] px-4 py-2.5 text-[#0e161b] focus:border-[#1d8cd7] focus:outline-none focus:ring-2 focus:ring-[#1d8cd7]"
              >
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#507a95]">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-[#507a95] text-xs mb-1">
              Search Student
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-[#d1dde6] pl-10 pr-4 py-2.5 text-[#0e161b] focus:border-[#1d8cd7] focus:outline-none focus:ring-2 focus:ring-[#1d8cd7]"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#507a95]">
                <Search className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Risk Level Filter */}
          <div>
            <label htmlFor="risk-filter" className="block text-[#507a95] text-xs mb-1">
              Risk Level
            </label>
            <div className="relative">
              <select
                id="risk-filter"
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="w-full appearance-none rounded-lg border border-[#d1dde6] px-4 py-2.5 text-[#0e161b] focus:border-[#1d8cd7] focus:outline-none focus:ring-2 focus:ring-[#1d8cd7]"
              >
                <option value="all">All Risk Levels</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#507a95]">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Flag Status Filter */}
          <div>
            <label htmlFor="flag-filter" className="block text-[#507a95] text-xs mb-1">
              Flag Status
            </label>
            <div className="relative">
              <select
                id="flag-filter"
                value={filterFlag}
                onChange={(e) => setFilterFlag(e.target.value)}
                className="w-full appearance-none rounded-lg border border-[#d1dde6] px-4 py-2.5 text-[#0e161b] focus:border-[#1d8cd7] focus:outline-none focus:ring-2 focus:ring-[#1d8cd7]"
              >
                <option value="all">All Students</option>
                <option value="flagged">Flagged</option>
                <option value="unflagged">Not Flagged</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#507a95]">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg border border-[#d1dde6] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#d1dde6]">
            <thead className="bg-[#e8eef3]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0e161b] uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0e161b] uppercase tracking-wider">
                  Class
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0e161b] uppercase tracking-wider">
                  Risk Level
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0e161b] uppercase tracking-wider">
                  Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0e161b] uppercase tracking-wider">
                  Last Active
                </th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0e161b] uppercase tracking-wider">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#d1dde6]">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={student.profileImage} 
                          alt={student.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#0e161b]">
                          {student.name}
                        </div>
                        <div className="text-sm text-[#507a95]">
                          {student.email}
                        </div>
                      </div>
                      {student.flagged && (
                        <Flag className="h-4 w-4 text-[#dc3545] ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Book className="h-4 w-4 text-[#507a95] mr-2" />
                      <span className="text-sm text-[#0e161b]">
                        {student.className}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(student.riskLevel)}`}>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {student.riskLevel.charAt(0).toUpperCase() + student.riskLevel.slice(1)} Risk
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0e161b]">
                    {student.riskScore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#507a95]">
                    {student.lastActive}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-[#1d8cd7] hover:text-[#1d8cd7]/80 p-1"
                        onClick={() => window.location.href = `/lecturer/students/${student.id}`}
                      >
                        View
                      </button>
                      <button 
                        className="text-[#1d8cd7] hover:text-[#1d8cd7]/80 p-1"
                        onClick={() => window.location.href = `mailto:${student.email}`}
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button 
                        className={`p-1 ${student.flagged ? 'text-[#dc3545]' : 'text-[#507a95]'} hover:text-[#dc3545]`}
                        onClick={() => toggleFlag(student.id, student.flagged ? '' : 'Needs attention')}
                      >
                        <Flag className="h-4 w-4" />
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-[#507a95] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#0e161b]">No at-risk students found</h3>
            <p className="mt-2 text-sm text-[#507a95] max-w-md mx-auto">
              There are no students matching your current filters. Try adjusting your search criteria or check back later.
            </p>
          </div>
        )}
      </div>

      {/* Risk Level Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-[#d1dde6] p-4">
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2">
              <AlertTriangle className="h-3 w-3 mr-1" />
              High Risk
            </span>
            <span className="text-sm text-[#507a95]">
              {allStudents.filter(s => s.riskLevel === 'high').length} students
            </span>
          </div>
          <p className="text-xs text-[#507a95]">
            Students who are at high risk of failing or dropping out. Immediate intervention recommended.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-[#d1dde6] p-4">
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Medium Risk
            </span>
            <span className="text-sm text-[#507a95]">
              {allStudents.filter(s => s.riskLevel === 'medium').length} students
            </span>
          </div>
          <p className="text-xs text-[#507a95]">
            Students who are showing some warning signs. Monitor closely and provide support as needed.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-[#d1dde6] p-4">
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Low Risk
            </span>
            <span className="text-sm text-[#507a95]">
              {allStudents.filter(s => s.riskLevel === 'low').length} students
            </span>
          </div>
          <p className="text-xs text-[#507a95]">
            Students who are showing minor warning signs. Keep an eye on their progress.
          </p>
        </div>
      </div>
    </div>
  );
};



export default AtRiskStudent;