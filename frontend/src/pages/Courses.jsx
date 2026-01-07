import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");
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
      setActionMsg("Only students can enroll");
      return;
    }
    try {
      setActionMsg("");
      await axiosClient.post(`/courses/${courseId}/enroll`);
      setActionMsg("Enrolled successfully!");
    } catch (err) {
      setActionMsg(
        err.response?.data?.message || "Failed to enroll"
      );
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading courses...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-indigo-400">
        Available courses
      </h1>

      {actionMsg && (
        <div className="mb-4 text-sm text-emerald-300 bg-emerald-900/40 border border-emerald-700 rounded px-3 py-2">
          {actionMsg}
        </div>
      )}

      {courses.length === 0 && (
        <p className="text-sm text-slate-400">No courses yet.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-slate-900 border border-slate-800 rounded-lg p-4"
          >
            <h2 className="text-lg font-semibold mb-1">{course.title}</h2>
            <p className="text-sm text-slate-300 mb-2">
              {course.description}
            </p>
            {course.instructor && (
              <p className="text-xs text-slate-500 mb-2">
                Instructor: {course.instructor.name}
              </p>
            )}
            {user?.role === "student" && (
              <button
                onClick={() => handleEnroll(course._id)}
                className="mt-2 px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-xs"
              >
                Enroll
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
