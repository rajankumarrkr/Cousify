import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-indigo-400">
          Cousify
        </Link>

        <div className="flex items-center gap-3 text-sm">
          {user?.role === "student" && (
            <Link to="/my-courses" className="hover:text-indigo-300">
              My Courses
            </Link>
          )}
          {user?.role === "instructor" && (
            <Link to="/instructor/courses" className="hover:text-indigo-300">
              Instructor
            </Link>
          )}

          {!user && (
            <>
              <Link to="/login" className="hover:text-indigo-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-indigo-300">
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <span className="text-slate-300">
                {user.name} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-xs"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
