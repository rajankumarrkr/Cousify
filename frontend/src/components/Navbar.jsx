import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-800/60 bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + name */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl bg-sky-500 flex items-center justify-center text-sm font-bold text-white">
            C
          </div>
          <span className="text-lg font-semibold text-slate-50 tracking-tight">
            Cousify
          </span>
        </Link>

        {/* Right side links */}
        <div className="flex items-center gap-4 text-xs md:text-sm">
          <Link
            to="/courses"
            className="text-slate-300 hover:text-sky-300 transition-colors"
          >
            Courses
          </Link>

          {user?.role === "student" && (
            <Link
              to="/my-courses"
              className="text-slate-300 hover:text-sky-300 transition-colors"
            >
              My courses
            </Link>
          )}

          {user?.role === "instructor" && (
            <Link
              to="/instructor/courses"
              className="text-slate-300 hover:text-sky-300 transition-colors"
            >
              Instructor
            </Link>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="text-slate-300 hover:text-sky-300 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded-full bg-sky-500 hover:bg-sky-400 text-xs md:text-sm font-medium text-white shadow-sm"
              >
                Get started
              </Link>
            </>
          )}

          {user && (
            <>
              <span className="hidden sm:inline text-slate-400">
                {user.name} · {user.role}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-100 border border-slate-600/60 transition-colors"
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
