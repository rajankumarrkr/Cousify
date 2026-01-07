import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import InstructorCourses from "./pages/InstructorCourses";



function App() {
  return (
    <AuthProvider>
      <Router>
       
        {/* Dark background behind everything */}
        <div className="min-h-screen bg-slate-950">
          <Navbar />
          {/* Light card-like container for main content */}
          <div className="max-w-5xl mx-auto px-4 py-6 bg-slate-50 text-slate-900 rounded-t-3xl md:rounded-3xl mt-4 md:mt-6 shadow-[0_0_40px_rgba(15,23,42,0.7)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
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
