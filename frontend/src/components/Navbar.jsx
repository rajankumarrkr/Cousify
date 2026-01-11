import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, BookOpen, User, LogOut, ChevronDown, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const NavLink = ({ to, children, mobile = false }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={clsx(
          "relative font-medium transition-colors duration-200",
          mobile ? "block py-3 text-lg" : "text-sm",
          isActive
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
        )}
      >
        {children}
        {!mobile && isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
          />
        )}
      </Link>
    );
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-gray-200 dark:border-slate-800 py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
            <BookOpen size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Coursify
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/courses">Explore Courses</NavLink>
          {user?.role === "student" && (
            <NavLink to="/my-courses">My Learning</NavLink>
          )}
          {user?.role === "instructor" && (
            <NavLink to="/instructor/courses">Instructor Dashboard</NavLink>
          )}
        </div>

        {/* Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg shadow-slate-900/20 active:scale-95 flex items-center gap-2"
              >
                Get Started <Rocket size={16} />
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                  {user.name}
                </span>
                <ChevronDown size={14} className="text-gray-500" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden ring-1 ring-black/5"
                  >
                    <div className="p-4 border-b border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {user.role} Account
                      </p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <LogOut size={16} />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="flex flex-col space-y-1">
                <NavLink to="/courses" mobile>Explore Courses</NavLink>
                {user?.role === "student" && (
                  <NavLink to="/my-courses" mobile>My Learning</NavLink>
                )}
                {user?.role === "instructor" && (
                  <NavLink to="/instructor/courses" mobile>Instructor Dashboard</NavLink>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                {!user ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      className="w-full text-center py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white font-medium"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="w-full text-center py-2.5 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/25"
                    >
                      Get Started
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-red-600 font-medium"
                  >
                    <LogOut size={18} />
                    Sign out
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
