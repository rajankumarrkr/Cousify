import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");
  const [actionType, setActionType] = useState("success");
  const navigate = useNavigate();

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

  const handleEnroll = async (courseId) => {
    if (!token || !user) {
      navigate("/login");
      return;
    }
    if (user.role !== "student") {
      setActionType("error");
      setActionMsg("Only students can enroll in courses.");
      return;
    }
    try {
      setActionType("success");
      setActionMsg("");
      await axiosClient.post(`/courses/${courseId}/enroll`);
      setActionMsg("Enrolled successfully!");
    } catch (err) {
      setActionType("error");
      setActionMsg(
        err.response?.data?.message || "Failed to enroll in course."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 px-6 py-6 md:px-8 md:py-7 shadow-lg shadow-slate-950/60">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2 text-slate-50">
  Learn from real instructors.
</h1>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl">
          Cousify is your simple role‑based learning platform. Instructors
          publish courses, and students enroll in what they love.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 px-3 py-1 bg-slate-900/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            JWT secured auth
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 px-3 py-1 bg-slate-900/60">
            MERN stack
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 px-3 py-1 bg-slate-900/60">
            Role‑based access
          </span>
        </div>
      </section>

      {/* Status message */}
      {actionMsg && (
        <div
          className={`text-sm rounded-lg px-3 py-2 border ${
            actionType === "success"
              ? "border-emerald-600 bg-emerald-900/40 text-emerald-200"
              : "border-red-600 bg-red-900/40 text-red-200"
          }`}
        >
          {actionMsg}
        </div>
      )}

      {/* Courses list */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-100">
            Available courses
          </h2>
          {user?.role === "instructor" && (
            <p className="text-xs text-slate-400">
              Create and manage courses from the Instructor tab.
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center mt-6 text-slate-300">
            Loading courses...
          </div>
        ) : courses.length === 0 ? (
          <p className="text-sm text-slate-400">
            No courses yet. Instructors can create the first one from the
            Instructor dashboard.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((course) => (
              <article
                key={course._id}
                className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950/80 p-4 shadow-sm shadow-black/50 hover:border-indigo-500/60 transition-colors"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
                <h3 className="text-base font-semibold mb-1 text-slate-50">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-300 mb-2 line-clamp-3">
                  {course.description}
                </p>
                {course.instructor && (
                  <p className="text-xs text-slate-500 mb-3">
                    by {course.instructor.name || "Instructor"}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] uppercase tracking-wide text-slate-500">
                    Course ID: {course._id.slice(0, 6)}...
                  </span>
                  {user?.role === "student" && (
                    <button
                      onClick={() => handleEnroll(course._id)}
                      className="px-3 py-1 rounded-full bg-indigo-600 hover:bg-indigo-500 text-[11px] font-medium text-slate-50"
                    >
                      Enroll
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Courses;
