// src/pages/parent/Notifications.jsx
import React, { useState } from 'react';
import { 
  Bell, 
  Award
} from 'lucide-react';


const Notifications = () => {

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'grade',
      title: 'New Grade Posted',
      message: 'Emily received an A in Introduction to Psychology quiz.',
      date: '2024-03-10T10:30:00',
      isRead: false,
      childId: 1,
      course: 'Introduction to Psychology',
      teacher: 'Dr. Okonkwo',
      details: {
        assignment: 'Research Methods Quiz',
        grade: 'A',
        percentage: 92,
        feedback: 'Excellent understanding of research methodologies. Great work!'
      }
    },
    {
      id: 5,
      type: 'grade',
      title: 'New Grade Posted',
      message: 'Michael received a B+ in Advanced Financial Accounting assignment.',
      date: '2024-03-06T16:30:00',
      isRead: false,
      childId: 2,
      course: 'Advanced Financial Accounting',
      teacher: 'Prof. Ogunlana',
      details: {
        assignment: 'Financial Statement Analysis',
        grade: 'B+',
        percentage: 85,
        feedback: 'Good analysis. Pay more attention to cash flow statements.'
      }
    }
  ]);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };


  const getNotificationIcon = (type) => {
    return type === 'grade' ? <Award className="h-5 w-5 text-blue-500" /> : <Bell className="h-5 w-5 text-gray-500" />;
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.map(notification => (
          <div key={notification.id} className="p-4 border rounded-lg shadow-sm flex items-start">
            {getNotificationIcon(notification.type)}
            <div className="ml-4">
              <h3 className="font-semibold">{notification.title}</h3>
              <p className="text-gray-600">{notification.message}</p>
              <p className="text-sm text-gray-400">{formatDate(notification.date)}</p>
              {!notification.isRead && (
                <button 
                  className="text-blue-500 mt-2"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
