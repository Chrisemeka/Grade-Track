import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LecturerDashboard from './pages/Lecturer/LecturerDashboard';
import StudentDashboard from './pages/Student/StudentDashboard';
import LecturerLayout from './pages/Layout/LecturerLayout';
import StudentLayout from './pages/Layout/StudentLayout';
import ParentLayout from './pages/Layout/ParentLayout';
import ParentDashboard from './pages/Parent/ParentDashboard';
import JoinClass from './pages/Student/JoinClass';
import CreateClass from './pages/Lecturer/CreateClass';
import Class from './pages/Student/Class';
import LecturerClasses from './pages/Lecturer/LecturerClasses';
import AtRiskStudent from './pages/Lecturer/AtRiskStudent';
import GradesUpload from './pages/Lecturer/GradesUpload';
import AdminDashboardPage from './pages/Admin/AdminDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLayout from './pages/Layout/AdminLayout';
import MyChildren from './pages/Parent/MyChildern';
import Notifications from './pages/Parent/Notification';
import Settings from './components/common/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Lecturer Routes */}
        <Route path="/lecturer" element={<LecturerLayout />}>
          <Route path="/lecturer" element={<LecturerDashboard />} />
          <Route path="dashboard" element={<LecturerDashboard />} />
          <Route path="create-class" element={<CreateClass />} />
          <Route path="classes" element={<LecturerClasses />} />
          <Route path="at-risk" element={<AtRiskStudent />} />
          <Route path="grades-upload" element={<GradesUpload />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="join-class" element={<JoinClass />} />
          <Route path="classes" element={<Class />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Parent Routes */}
        <Route path="/parent" element={<ParentLayout />}>
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="dashboard" element={<ParentDashboard />} />
          <Route path="children" element={<MyChildren />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
