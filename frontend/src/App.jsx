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
          <Route path="dashboard" element={<LecturerDashboard />} />
        </Route>
        
        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
        </Route>

        {/* Parent Routes */}
        <Route path="/parent" element={<ParentLayout />}>
          <Route path="dashboard" element={<ParentDashboard />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
