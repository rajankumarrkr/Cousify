import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import InstructorCourses from "./pages/InstructorCourses";
import NotFound from "./pages/NotFound";

// Layout component to control Navbar/Footer visibility and spacing
const Layout = () => {
  const location = useLocation();
  const hideNavFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {!hideNavFooter && <Navbar />}

      {/* Add top padding if navbar is present to prevent overlap */}
      <main className={`flex-grow w-full ${!hideNavFooter ? "pt-24" : ""}`}>
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideNavFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
