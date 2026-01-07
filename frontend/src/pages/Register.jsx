import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axiosClient.post("/auth/register", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-800">
      <h1 className="text-2xl font-semibold mb-4 text-indigo-400">Create account</h1>
      {error && (
        <div className="mb-3 text-sm text-red-400 bg-red-950/40 border border-red-700 rounded px-3 py-2">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label className="block mb-1 text-slate-300">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block mb-1 text-slate-300">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block mb-1 text-slate-300">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Min 6 characters"
          />
        </div>
        <div>
          <label className="block mb-1 text-slate-300">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
      <p className="mt-4 text-xs text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
