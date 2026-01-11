import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { BookOpen, User, PlayCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const MyCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyCourses = async () => {
    try {
      setError("");
      const res = await axiosClient.get("/courses/me/enrolled");
      setCourses(res.data.courses || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load enrolled courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
        <p className="text-gray-500">Loading your learning path...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-20 max-w-7xl mx-auto pt-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Learning</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your courses and track your progress</p>
      </div>

      {error && (
        <div className="mb-8 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50">
          {error}
        </div>
      )}

      {courses.length === 0 && !error ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700">
          <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No courses enrolled</h3>
          <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet.</p>
          <Link to="/courses" className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:border-indigo-500/30 transition-all group flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                  <BookOpen size={24} />
                </div>
                <div className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                  In Progress
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">
                {course.description}
              </p>

              {/* Mock Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1 text-gray-500">
                  <span>Progress</span>
                  <span>0%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-0" />
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all active:scale-95">
                  <PlayCircle size={18} /> Continue Learning
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
