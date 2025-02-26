// src/pages/admin/Dashboard.jsx
import React from 'react';
import BaseLayout from '../../pages/Layout/AdminLayout';
// import AdminSidebar from '../../components/common/AdminSideBar';
import { 
  Users, 
  BookOpen, 
  UserPlus,
  BarChart, 
  Bell, 
  Server,
  ShieldAlert,
  AlertTriangle,
  Shield,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for statistics
  const stats = [
    { title: 'Total Users', value: '1,246', icon: Users, change: '+12% from last month', positive: true },
    { title: 'Active Classes', value: '38', icon: BookOpen, change: '+5% from last month', positive: true },
    { title: 'New Registrations', value: '64', icon: UserPlus, change: '-8% from last month', positive: false },
    { title: 'System Uptime', value: '99.9%', icon: Server, change: 'Last 30 days', positive: true },
  ];

  // Mock data for user roles
  const userRoles = [
    { role: 'Students', count: 865, percentage: 70 },
    { role: 'Lecturers', count: 126, percentage: 10 },
    { role: 'Parents', count: 235, percentage: 19 },
    { role: 'Administrators', count: 12, percentage: 1 },
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, user: 'Dr. Smith', action: 'Created a new class', time: '2 hours ago', status: 'success' },
    { id: 2, user: 'Admin Jane', action: 'Updated system settings', time: '5 hours ago', status: 'success' },
    { id: 3, user: 'Admin Mike', action: 'Reset password for user John Doe', time: '1 day ago', status: 'success' },
    { id: 4, user: 'System', action: 'Failed login attempt from unauthorized IP', time: '1 day ago', status: 'error' },
    { id: 5, user: 'System', action: 'Database backup completed', time: '2 days ago', status: 'success' },
  ];

  // Mock data for system alerts
  const systemAlerts = [
    { 
      id: 1, 
      title: 'Database space running low', 
      description: 'Database storage is at 85% capacity. Consider cleanup or expansion.',
      severity: 'medium',
      time: '3 hours ago'
    },
    { 
      id: 2, 
      title: 'Multiple failed login attempts', 
      description: 'Multiple failed login attempts detected from IP 192.168.1.45',
      severity: 'high',
      time: '6 hours ago'
    },
    { 
      id: 3, 
      title: 'System update available', 
      description: 'New system update v2.3.4 is available for installation',
      severity: 'low',
      time: '1 day ago'
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
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

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex min-w-72 flex-col gap-2">
          <h2 className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
            Admin Dashboard
          </h2>
          <p className="text-[#507a95] text-sm font-normal leading-normal">
            System overview and management
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-[#d1dde6] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#507a95] text-sm">{stat.title}</p>
                <p className="text-[#0e161b] text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="bg-[#e8eef3] rounded-full p-3">
                <stat.icon className="h-6 w-6 text-[#1d8cd7]" />
              </div>
            </div>
            <p className={`text-xs mt-2 flex items-center ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.positive ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User distribution */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-[#d1dde6]">
          <div className="px-6 py-4 border-b border-[#d1dde6]">
            <h3 className="text-lg font-medium text-[#0e161b]">User Distribution</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {userRoles.map((role, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-[#0e161b]">{role.role}</span>
                    </div>
                    <span className="text-sm text-[#507a95]">{role.count} users ({role.percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#e8eef3] rounded-full h-2">
                    <div 
                      className="bg-[#1d8cd7] h-2 rounded-full" 
                      style={{ width: `${role.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 py-4 border-t border-[#d1dde6] bg-gray-50">
            <button 
              className="text-[#1d8cd7] text-sm font-medium hover:text-[#1d8cd7]/80"
              onClick={() => window.location.href = '/admin/users'}
            >
              View All Users →
            </button>
          </div>
        </div>

        {/* System alerts */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-[#d1dde6]">
          <div className="px-6 py-4 border-b border-[#d1dde6] flex justify-between">
            <h3 className="text-lg font-medium text-[#0e161b]">System Alerts</h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <ShieldAlert className="h-3 w-3 mr-1" />
              {systemAlerts.filter(alert => alert.severity === 'high').length} critical
            </span>
          </div>
          <div className="divide-y divide-[#d1dde6]">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="p-4">
                <div className="flex items-start">
                  <div className={`px-2 py-1 rounded-md ${getSeverityColor(alert.severity)} mr-3`}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-[#0e161b]">{alert.title}</h4>
                      <span className="text-xs text-[#507a95]">{alert.time}</span>
                    </div>
                    <p className="text-sm text-[#507a95] mt-1">{alert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-[#d1dde6] bg-gray-50">
            <button 
              className="text-[#1d8cd7] text-sm font-medium hover:text-[#1d8cd7]/80"
              onClick={() => window.location.href = '/admin/system'}
            >
              View All Alerts →
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-[#d1dde6]">
        <div className="px-6 py-4 border-b border-[#d1dde6]">
          <h3 className="text-lg font-medium text-[#0e161b]">Recent Activity</h3>
        </div>
        <div className="divide-y divide-[#d1dde6]">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full mr-3 ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <p className="text-sm text-[#0e161b]">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-[#507a95]">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-[#d1dde6] bg-gray-50">
          <button 
            className="text-[#1d8cd7] text-sm font-medium hover:text-[#1d8cd7]/80"
            onClick={() => window.location.href = '/admin/logs'}
          >
            View All Activity →
          </button>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-[#d1dde6] p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-medium text-[#0e161b]">Security Status</h3>
              <p className="text-[#507a95] text-sm mt-1">Overall system security</p>
            </div>
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Secure
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-[#507a95]">Security Score</span>
              <span className="text-xs font-medium text-[#0e161b]">85/100</span>
            </div>
            <div className="w-full bg-[#e8eef3] rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#d1dde6] p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-medium text-[#0e161b]">System Performance</h3>
              <p className="text-[#507a95] text-sm mt-1">Current load and response times</p>
            </div>
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <Server className="h-3 w-3 mr-1" />
              Normal
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-[#507a95]">Server Load</span>
              <span className="text-xs font-medium text-[#0e161b]">32%</span>
            </div>
            <div className="w-full bg-[#e8eef3] rounded-full h-2">
              <div className="bg-[#1d8cd7] h-2 rounded-full" style={{ width: '32%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#d1dde6] p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-medium text-[#0e161b]">Storage Usage</h3>
              <p className="text-[#507a95] text-sm mt-1">Database and file storage</p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Warning
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-[#507a95]">Storage Used</span>
              <span className="text-xs font-medium text-[#0e161b]">85%</span>
            </div>
            <div className="w-full bg-[#e8eef3] rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-[#d1dde6]">
        <div className="px-6 py-4 border-b border-[#d1dde6]">
          <h3 className="text-lg font-medium text-[#0e161b]">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <button 
            className="p-4 border border-[#d1dde6] rounded-lg hover:bg-[#e8eef3] transition-colors text-left"
            onClick={() => window.location.href = '/admin/users/new'}
          >
            <UserPlus className="h-6 w-6 text-[#1d8cd7] mb-2" />
            <h4 className="text-sm font-medium text-[#0e161b]">Add New User</h4>
            <p className="text-xs text-[#507a95] mt-1">Create a new user account</p>
          </button>
          
          <button 
            className="p-4 border border-[#d1dde6] rounded-lg hover:bg-[#e8eef3] transition-colors text-left"
            onClick={() => window.location.href = '/admin/roles'}
          >
            <Shield className="h-6 w-6 text-[#1d8cd7] mb-2" />
            <h4 className="text-sm font-medium text-[#0e161b]">Manage Roles</h4>
            <p className="text-xs text-[#507a95] mt-1">Edit user roles and permissions</p>
          </button>
          
          <button 
            className="p-4 border border-[#d1dde6] rounded-lg hover:bg-[#e8eef3] transition-colors text-left"
            onClick={() => window.location.href = '/admin/system/backup'}
          >
            <Server className="h-6 w-6 text-[#1d8cd7] mb-2" />
            <h4 className="text-sm font-medium text-[#0e161b]">Backup System</h4>
            <p className="text-xs text-[#507a95] mt-1">Create a system backup</p>
          </button>
          
          <button 
            className="p-4 border border-[#d1dde6] rounded-lg hover:bg-[#e8eef3] transition-colors text-left"
            onClick={() => window.location.href = '/admin/reports'}
          >
            <BarChart className="h-6 w-6 text-[#1d8cd7] mb-2" />
            <h4 className="text-sm font-medium text-[#0e161b]">System Reports</h4>
            <p className="text-xs text-[#507a95] mt-1">View and download reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

// Wrap with layout
// const AdminDashboardPage = () => {
//   return (
//     <BaseLayout
//       userRole="admin"
//       Sidebar={AdminSidebar}
//     >
//       <Dashboard />
//     </BaseLayout>
//   );
// };

export default AdminDashboard;