import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import InstructorCourses from "./pages/InstructorCourses";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-50">
          <Navbar />
          <div className="max-w-5xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Courses />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/my-courses"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <MyCourses />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/instructor/courses"
                element={
                  <ProtectedRoute allowedRoles={["instructor"]}>
                    <InstructorCourses />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
