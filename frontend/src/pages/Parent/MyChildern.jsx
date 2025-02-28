import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  Bell, 
  Calendar, 
  Mail,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import ClassesModal from '../../components/common/ClassesModal';

const MyChildren = () => {
  // State for modal
  const [isClassesModalOpen, setIsClassesModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  // Mock data for children
  const children = [
    {
      id: 1,
      name: 'Emily Johnson',
      photo: '/api/placeholder/64/64',
      grade: '100 Level',
      school: 'Babcock University',
      gpa: '3.8',
      classes: 5,
      nextAssignment: 'History Essay',
      dueDate: 'Tomorrow',
      advisorName: 'Ms. Adebanjo',
      hasNewFeedback: true,
      // Add classes data for modal
      classesData: [
        {
          id: "class1",
          name: "Introduction to Psychology",
          subject: "Psychology",
          teacher: {
            name: "Dr. Okonkwo",
            email: "okonkwo@babcock.edu.ng"
          },
          schedule: {
            days: ["Monday", "Wednesday"],
            time: "9:00 AM - 10:30 AM"
          },
          room: "Social Sciences Block, Room 105",
          status: "active",
          grade: "A",
          progressPercentage: 65,
          nextAssignment: {
            name: "Research Methods Essay",
            dueDate: "March 15, 2024"
          }
        },
        {
          id: "class2",
          name: "Calculus I",
          subject: "Mathematics",
          teacher: {
            name: "Prof. Adeyemi",
            email: "adeyemi@babcock.edu.ng"
          },
          schedule: {
            days: ["Tuesday", "Thursday"],
            time: "11:00 AM - 12:30 PM"
          },
          room: "Science Block, Room 201",
          status: "active",
          grade: "B+",
          progressPercentage: 70,
          nextAssignment: {
            name: "Integration Problem Set",
            dueDate: "March 18, 2024"
          }
        },
        {
          id: "class3",
          name: "Introduction to Nigerian Literature",
          subject: "Literature",
          teacher: {
            name: "Dr. Nwachukwu",
            email: "nwachukwu@babcock.edu.ng"
          },
          schedule: {
            days: ["Monday", "Wednesday", "Friday"],
            time: "1:00 PM - 2:00 PM"
          },
          room: "Humanities Block, Room 108",
          status: "active",
          grade: "A-",
          progressPercentage: 60,
          nextAssignment: {
            name: "Chinua Achebe Analysis",
            dueDate: "March 20, 2024"
          }
        },
        {
          id: "class4",
          name: "Computer Applications",
          subject: "Information Technology",
          teacher: {
            name: "Mr. Olawale",
            email: "olawale@babcock.edu.ng"
          },
          schedule: {
            days: ["Tuesday", "Thursday"],
            time: "2:30 PM - 4:00 PM"
          },
          room: "ICT Block, Lab 3",
          status: "active",
          grade: "A",
          progressPercentage: 75,
          nextAssignment: {
            name: "Database Project",
            dueDate: "March 25, 2024"
          }
        },
        {
          id: "class5",
          name: "African History",
          subject: "History",
          teacher: {
            name: "Dr. Adebayo",
            email: "adebayo@babcock.edu.ng"
          },
          schedule: {
            days: ["Wednesday"],
            time: "3:00 PM - 5:00 PM"
          },
          room: "Humanities Block, Room 205",
          status: "active",
          grade: "B+",
          progressPercentage: 80,
          nextAssignment: {
            name: "Colonial Impact Essay",
            dueDate: "March 28, 2024"
          }
        }
      ]
    },
    {
      id: 2,
      name: 'Michael Johnson',
      photo: '/api/placeholder/64/64',
      grade: '300 Level',
      school: 'Babcock University',
      gpa: '3.5',
      classes: 6,
      nextAssignment: 'Science Project',
      dueDate: 'In 3 days',
      advisorName: 'Mr. Adejunjo',
      hasNewFeedback: false,
      // Add classes data for modal
      classesData: [
        {
          id: "mclass1",
          name: "Advanced Financial Accounting",
          subject: "Accounting",
          teacher: {
            name: "Prof. Ogunlana",
            email: "ogunlana@babcock.edu.ng"
          },
          schedule: {
            days: ["Monday", "Wednesday", "Friday"],
            time: "8:30 AM - 9:45 AM"
          },
          room: "Business Admin Building, Room 301",
          status: "active",
          grade: "B+",
          progressPercentage: 60,
          nextAssignment: {
            name: "Financial Statement Analysis",
            dueDate: "March 14, 2024"
          }
        },
        {
          id: "mclass2",
          name: "Business Law",
          subject: "Law",
          teacher: {
            name: "Dr. Ibrahim",
            email: "ibrahim@babcock.edu.ng"
          },
          schedule: {
            days: ["Tuesday", "Thursday"],
            time: "10:00 AM - 11:30 AM"
          },
          room: "Law Faculty, Room L2",
          status: "active",
          grade: "A-",
          progressPercentage: 65,
          nextAssignment: {
            name: "Contract Law Case Study",
            dueDate: "March 16, 2024"
          }
        },
        {
          id: "mclass3",
          name: "Marketing Management",
          subject: "Marketing",
          teacher: {
            name: "Dr. Olatunji",
            email: "olatunji@babcock.edu.ng"
          },
          schedule: {
            days: ["Monday", "Wednesday"],
            time: "12:00 PM - 1:30 PM"
          },
          room: "Business Admin Building, Room 205",
          status: "active",
          grade: "A",
          progressPercentage: 70,
          nextAssignment: {
            name: "Marketing Strategy Presentation",
            dueDate: "March 18, 2024"
          }
        },
        {
          id: "mclass4",
          name: "Business Statistics",
          subject: "Statistics",
          teacher: {
            name: "Prof. Adeniyi",
            email: "adeniyi@babcock.edu.ng"
          },
          schedule: {
            days: ["Tuesday", "Thursday", "Friday"],
            time: "2:00 PM - 3:00 PM"
          },
          room: "Science Block, Room 105",
          status: "active",
          grade: "B",
          progressPercentage: 55,
          nextAssignment: {
            name: "Regression Analysis Project",
            dueDate: "March 21, 2024"
          }
        },
        {
          id: "mclass5",
          name: "Operations Management",
          subject: "Management",
          teacher: {
            name: "Dr. Afolabi",
            email: "afolabi@babcock.edu.ng"
          },
          schedule: {
            days: ["Monday", "Friday"],
            time: "3:30 PM - 5:00 PM"
          },
          room: "Business Admin Building, Room 310",
          status: "active",
          grade: "B+",
          progressPercentage: 60,
          nextAssignment: {
            name: "Supply Chain Case Analysis",
            dueDate: "March 22, 2024"
          }
        },
        {
          id: "mclass6",
          name: "Entrepreneurship Development",
          subject: "Business",
          teacher: {
            name: "Mrs. Ogundipe",
            email: "ogundipe@babcock.edu.ng"
          },
          schedule: {
            days: ["Wednesday"],
            time: "10:00 AM - 12:00 PM"
          },
          room: "Business Admin Building, Room 204",
          status: "active",
          grade: "A-",
          progressPercentage: 75,
          nextAssignment: {
            name: "Business Plan Submission",
            dueDate: "March 24, 2024"
          }
        }
      ]
    }
  ];

  // Function to open classes modal
  const openClassesModal = (child) => {
    setSelectedChild({
      id: child.id,
      name: child.name,
      classes: child.classesData
    });
    setIsClassesModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
            My Children
          </h2>
          <p className="text-[#507a95] text-sm font-normal leading-normal">
            Overview of your children's academic performance
          </p>
        </div>
      </div>

      {/* Children Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map(child => (
          <div 
            key={child.id} 
            className="bg-white rounded-lg border border-[#d1dde6] overflow-hidden"
          >
            {/* Child Header */}
            <div className="p-5 border-b border-[#d1dde6] flex items-start justify-between">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src={child.photo} 
                    alt={child.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-[#0e161b] text-xl font-bold">
                    {child.name}
                  </h3>
                  <p className="text-[#507a95] text-sm">
                    {child.grade} • {child.school}
                  </p>
                </div>
              </div>
              {child.hasNewFeedback && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <Bell className="h-3 w-3 mr-1" />
                    New Feedback
                  </span>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 border-b border-[#d1dde6]">
              <div className="px-5 py-3">
                <p className="text-[#507a95] text-xs mb-1">Enrolled Classes</p>
                <p className="text-[#0e161b] text-xl font-bold">{child.classes}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 grid grid-cols-1 gap-2">
              <button 
                onClick={() => openClassesModal(child)}
                className="flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-[#1d8cd7] bg-[#e8eef3] hover:bg-[#e8eef3]/80"
              >
                View Classes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Classes Modal */}
      <ClassesModal 
        isOpen={isClassesModalOpen} 
        onClose={() => setIsClassesModalOpen(false)} 
        childData={selectedChild}
      />
    </div>
  );
};

export default MyChildren;