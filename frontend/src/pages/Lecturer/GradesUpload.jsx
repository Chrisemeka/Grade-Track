// src/pages/lecturer/GradesUpload.jsx
import React, { useState } from 'react';
import BaseLayout from '../../pages/Layout/LecturerLayout';
import LecturerSidebar from '../../components/common/LectureSideBar';
import { 
  Upload, 
  FileSpreadsheet, 
  ChevronDown, 
  Download, 
  AlertCircle,
  CheckCircle,
  Bell,
  Info 
} from 'lucide-react';

const GradesUpload = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(''); // '', 'loading', 'success', 'error'
  const [uploadMessage, setUploadMessage] = useState('');
  const [sendNotification, setSendNotification] = useState(true);
  const [previewData, setPreviewData] = useState(null);

  // Mock data
  const classes = [
    { id: 'cs101', name: 'Introduction to Computer Science (CS101)' },
    { id: 'cs201', name: 'Data Structures and Algorithms (CS201)' },
    { id: 'cs301', name: 'Database Systems (CS301)' }
  ];

  const assignments = [
    { id: 'midterm', name: 'Midterm Exam' },
    { id: 'final', name: 'Final Exam' },
    { id: 'project1', name: 'Project 1' },
    { id: 'project2', name: 'Project 2' },
    { id: 'quiz1', name: 'Quiz 1' }
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Simulate reading file for preview
      // In real app, you'd parse the Excel/CSV file
      setPreviewData({
        headers: ['Student ID', 'Student Name', 'Grade', 'Comments'],
        rows: [
          ['S12345', 'John Smith', '85', 'Good work overall'],
          ['S12346', 'Emily Johnson', '92', 'Excellent understanding of concepts'],
          ['S12347', 'Michael Brown', '78', 'Needs improvement in section 3'],
          ['S12348', 'Jessica Williams', '90', 'Well-structured answers'],
          ['S12349', 'David Miller', '65', 'Missing several key components']
        ]
      });
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    
    if (!selectedClass || !selectedAssignment || !file) {
      setUploadStatus('error');
      setUploadMessage('Please select a class, assignment, and upload a valid file.');
      return;
    }
    
    setUploadStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setUploadStatus('success');
      setUploadMessage('Grades uploaded successfully. Students will be notified of their grades.');
      
      // Clear form if needed
      // setSelectedAssignment('');
      // setFile(null);
      // setPreviewData(null);
    }, 2000);
  };

  const downloadTemplate = () => {
    // In a real app, this would generate and download a template file
    console.log('Download template');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
            Upload Grades
          </h2>
          <p className="text-[#507a95] text-sm font-normal leading-normal">
            Upload student grades and feedback
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-[#d1dde6] p-6">
            <form onSubmit={handleUpload} className="space-y-6">
              {/* Status Messages */}
              {uploadStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-green-700 text-sm">{uploadMessage}</p>
                </div>
              )}
              
              {uploadStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{uploadMessage}</p>
                </div>
              )}
              
              {/* Class Selection */}
              <div>
                <label htmlFor="class-select" className="block text-sm font-medium text-[#0e161b] mb-1">
                  Select Class <span className="text-[#dc3545]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="class-select"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#d1dde6] px-4 py-2.5 text-[#0e161b] focus:border-[#1d8cd7] focus:outline-none focus:ring-2 focus:ring-[#1d8cd7]"
                    required
                  >
                    <option value="">Select a class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#507a95]">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              {/* Assignment Selection */}
              <div>
                <label htmlFor="assignment-select" className="block text-sm font-medium text-[#0e161b] mb-1">
                  Select Assignment <span className="text-[#dc3545]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="assignment-select"
                    value={selectedAssignment}
                    onChange={(e) => setSelectedAssignment(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#d1dde6] px-4 py-2.5 text-[#0e161b] focus:border-[#1d8cd7] focus:outline-none focus:ring-2 focus:ring-[#1d8cd7]"
                    required
                  >
                    <option value="">Select an assignment</option>
                    {assignments.map(assignment => (
                      <option key={assignment.id} value={assignment.id}>{assignment.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#507a95]">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-[#0e161b] mb-1">
                  Upload Grades File <span className="text-[#dc3545]">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#d1dde6] border-dashed rounded-lg">
                  <div className="space-y-2 text-center">
                    <div className="mx-auto h-12 w-12 text-[#507a95]">
                      {file ? (
                        <FileSpreadsheet className="h-12 w-12" />
                      ) : (
                        <Upload className="h-12 w-12" />
                      )}
                    </div>
                    <div className="flex text-sm text-[#507a95]">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-[#1d8cd7] hover:text-[#1d8cd7]/80 focus-within:outline-none"
                      >
                        <span>{file ? 'Change file' : 'Upload a file'}</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">{file ? file.name : 'or drag and drop'}</p>
                    </div>
                    <p className="text-xs text-[#507a95]">
                      XLSX, XLS or CSV up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification Option */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="send-notification"
                    name="send-notification"
                    type="checkbox"
                    checked={sendNotification}
                    onChange={() => setSendNotification(!sendNotification)}
                    className="focus:ring-[#1d8cd7] h-4 w-4 text-[#1d8cd7] border-[#d1dde6] rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="send-notification" className="font-medium text-[#0e161b]">
                    Notify students
                  </label>
                  <p className="text-[#507a95]">
                    Send notifications to students about their grades
                  </p>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={uploadStatus === 'loading'}
                  className="py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#1d8cd7] hover:bg-[#1d8cd7]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d8cd7] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadStatus === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : 'Upload Grades'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Instructions Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-[#d1dde6] p-6">
            <h3 className="text-lg font-medium text-[#0e161b] mb-4">Instructions</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8eef3] flex items-center justify-center text-[#1d8cd7] font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-[#0e161b] font-medium">Select Class & Assignment</h4>
                  <p className="text-[#507a95] text-sm">Choose the class and assignment you want to upload grades for.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8eef3] flex items-center justify-center text-[#1d8cd7] font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-[#0e161b] font-medium">Prepare Your File</h4>
                  <p className="text-[#507a95] text-sm">
                    Download the template and fill in your grades. Make sure to include student IDs.
                  </p>
                  <button
                    onClick={downloadTemplate}
                    className="mt-2 inline-flex items-center text-[#1d8cd7] hover:text-[#1d8cd7]/80 text-sm"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download Template
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8eef3] flex items-center justify-center text-[#1d8cd7] font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-[#0e161b] font-medium">Upload & Verify</h4>
                  <p className="text-[#507a95] text-sm">
                    Upload your file and verify the data before submitting.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e8eef3] flex items-center justify-center text-[#1d8cd7] font-bold">
                  4
                </div>
                <div>
                  <h4 className="text-[#0e161b] font-medium">Notify Students</h4>
                  <p className="text-[#507a95] text-sm">
                    Optionally send notifications to students about their grades.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-blue-700 text-sm font-medium">File Format</h4>
                <p className="text-blue-700 text-xs mt-1">
                  Your file should contain columns for Student ID, Student Name, Grade, and optional Comments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Preview Section */}
      {previewData && (
        <div className="bg-white rounded-lg border border-[#d1dde6] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#d1dde6]">
            <h3 className="text-lg font-medium text-[#0e161b]">Data Preview</h3>
            <p className="text-[#507a95] text-sm">
              Please verify the data before uploading
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#d1dde6]">
              <thead className="bg-[#e8eef3]">
                <tr>
                  {previewData.headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-[#0e161b] uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#d1dde6]">
                {previewData.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm text-[#0e161b]"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-[#d1dde6] bg-gray-50">
            <p className="text-[#507a95] text-sm">
              Showing {previewData.rows.length} out of {previewData.rows.length} rows
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrap with layout
const GradesUploadPage = () => {
  return (
    <BaseLayout
      userRole="lecturer"
      Sidebar={LecturerSidebar}
    >
      <GradesUpload />
    </BaseLayout>
  );
};

export default GradesUpload;