import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Users, BookOpen, Loader2, Trash2, Edit2, LayoutDashboard } from "lucide-react";

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const fetchMyCourses = async () => {
    try {
      setError("");
      const res = await axiosClient.get("/courses/instructor/mine");
      setCourses(res.data.courses || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => { setSuccess(""); setError("") }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required");
      return;
    }

    try {
      setSaving(true);
      const res = await axiosClient.post("/courses/instructor", form);
      setSuccess("Course created successfully");
      setForm({ title: "", description: "" });
      setShowCreateForm(false);
      setCourses((prev) => [res.data.course, ...prev]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to create course");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-20 max-w-7xl mx-auto pt-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Instructor Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your published courses and student enrollment</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/30"
        >
          {showCreateForm ? 'Cancel' : <><Plus size={20} /> New Course</>}
        </button>
      </div>

      <AnimatePresence>
        {(success || error) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-6 p-4 rounded-xl text-sm font-medium border ${success ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"
              }`}
          >
            {success || error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-10"
          >
            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-3xl p-8 shadow-xl">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <LayoutDashboard className="text-indigo-500" />
                Create New Course
              </h2>
              <form onSubmit={handleCreate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="e.g. Advanced React Patterns"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[120px]"
                    placeholder="What will students learn in this course?"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-6 py-3 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-70 flex items-center gap-2"
                  >
                    {saving ? <Loader2 className="animate-spin" /> : "Publish Course"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {courses.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700">
          <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No courses published</h3>
          <p className="text-gray-500 mb-6">Create your first course to start teaching.</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            Create Your First Course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <BookOpen size={24} />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg">
                  <Users size={14} />
                  {course.students?.length || 0} Students
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">
                {course.description}
              </p>

              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-700 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                  <Edit2 size={16} /> Edit
                </button>
                <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;
