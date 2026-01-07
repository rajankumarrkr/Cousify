import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

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
    return <div className="text-center mt-10">Loading your courses...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-indigo-400">
        My Enrolled Courses
      </h1>

      {error && (
        <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-700 rounded px-3 py-2">
          {error}
        </div>
      )}

      {courses.length === 0 && !error && (
        <p className="text-sm text-slate-400">
          You have not enrolled in any course yet.
        </p>
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
            <p className="text-xs text-slate-500">
              Enrolled course ID: {course._id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
