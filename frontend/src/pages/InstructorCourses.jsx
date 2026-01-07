import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
      // list refresh
      setCourses((prev) => [res.data.course, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create course");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="mt-10 text-center">Loading your courses...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-indigo-400">
        Instructor Dashboard
      </h1>

      {/* Create course form */}
      <div className="mb-6 bg-slate-900 border border-slate-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Create a new course</h2>

        {error && (
          <div className="mb-3 text-sm text-red-400 bg-red-950/40 border border-red-700 rounded px-3 py-2">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 text-sm text-emerald-300 bg-emerald-900/40 border border-emerald-700 rounded px-3 py-2">
            {success}
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-3 text-sm">
          <div>
            <label className="block mb-1 text-slate-300">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Course title"
            />
          </div>
          <div>
            <label className="block mb-1 text-slate-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[80px]"
              placeholder="Short course description"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
          >
            {saving ? "Creating..." : "Create course"}
          </button>
        </form>
      </div>

      {/* Existing courses list */}
      <div>
        <h2 className="text-lg font-semibold mb-3">My courses</h2>
        {courses.length === 0 && (
          <p className="text-sm text-slate-400">You have not created any course yet.</p>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-slate-900 border border-slate-800 rounded-lg p-4"
            >
              <h3 className="text-base font-semibold mb-1">{course.title}</h3>
              <p className="text-sm text-slate-300 mb-2">
                {course.description}
              </p>
              <p className="text-xs text-slate-500">
                Enrolled students: {course.students?.length || 0}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorCourses;
