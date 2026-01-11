import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, User, Calendar, Loader2, Star, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Courses = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionMsg, setActionMsg] = useState({ type: "", text: "" });

  const fetchCourses = async () => {
    try {
      const res = await axiosClient.get("/courses");
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error("Fetch courses error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (actionMsg.text) {
      const timer = setTimeout(() => setActionMsg({ type: "", text: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [actionMsg]);

  const handleEnroll = async (courseId) => {
    if (!token || !user) {
      navigate("/login");
      return;
    }
    if (user.role !== "student") {
      setActionMsg({ type: "error", text: "Only students can enroll in courses." });
      return;
    }
    try {
      await axiosClient.post(`/courses/${courseId}/enroll`);
      setActionMsg({ type: "success", text: "Enrolled successfully!" });
    } catch (err) {
      console.error(err);
      setActionMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to enroll in course."
      });
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 pb-20 max-w-7xl mx-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {actionMsg.text && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 20, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className={`fixed top-0 left-1/2 z-50 px-6 py-3 rounded-full shadow-2xl border flex items-center gap-2 font-medium ${actionMsg.type === "success"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-700 border-red-200"
              }`}
          >
            {actionMsg.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Search */}
      <div className="py-12 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Explore Courses
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover a wide range of courses taught by expert instructors.
          Start your learning journey today.
        </p>

        <div className="max-w-xl mx-auto relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
          <p className="text-gray-500">Loading your courses...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700">
          <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search terms or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:border-indigo-500/30 transition-all group flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <BookOpen size={24} />
                </div>
                {/* Placeholder for rating or difficulty */}
                <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                  <Star size={16} fill="currentColor" /> 4.8
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">
                {course.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-slate-700 pt-4">
                  <div className="flex items-center gap-1.5">
                    <User size={16} />
                    <span>{course.instructor?.name || "Instructor"}</span>
                  </div>
                  {/* Mock duration */}
                  <div className="flex items-center gap-1.5 ml-auto">
                    <Clock size={16} />
                    <span>12h</span>
                  </div>
                </div>

                {user?.role === "student" ? (
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-colors shadow-lg shadow-gray-900/10 active:scale-95"
                  >
                    Enroll Now
                  </button>
                ) : user?.role === "instructor" ? (
                  <div className="text-center text-sm text-gray-500 italic py-2">
                    Start teaching to manage courses
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full py-3 rounded-xl border border-gray-200 dark:border-slate-700 font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Login to Enroll
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
