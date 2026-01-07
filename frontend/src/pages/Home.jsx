import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <main className="space-y-10">
      {/* Top hero banner */}
      <section className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-50 px-6 py-6 md:px-8 md:py-7 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          {/* Left: text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-2">
              COUSIFY · LEARN & TEACH
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-3">
              Unlock your potential.
              <br />
              Learn & teach online.
            </h1>
            <p className="text-sm md:text-base text-sky-100/90 max-w-lg mb-4">
              A modern learning platform where students discover courses and
              instructors share their knowledge — built with a secure MERN + JWT
              backend.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {!user && (
                <>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-full bg-white text-sky-600 text-sm font-medium shadow-sm hover:bg-slate-100"
                  >
                    Get started free
                  </Link>
                  <Link
                    to="/courses"
                    className="text-sm text-sky-50/90 hover:text-white"
                  >
                    Browse courses
                  </Link>
                </>
              )}
              {user && (
                <Link
                  to={
                    user.role === "instructor"
                      ? "/instructor/courses"
                      : "/courses"
                  }
                  className="px-4 py-2 rounded-full bg-white text-sky-600 text-sm font-medium shadow-sm hover:bg-slate-100"
                >
                  Go to your dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right: simple illustration-style block */}
          <div className="hidden md:block">
            <div className="mx-auto max-w-sm rounded-xl bg-sky-50/20 backdrop-blur border border-sky-100/50 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-sky-100/90">Sample class</p>
                  <p className="text-sm font-semibold">Intro to JavaScript</p>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-400 text-emerald-950 font-medium">
                  Live
                </span>
              </div>
              <div className="rounded-lg bg-sky-900/40 p-3 text-[11px] font-mono">
                <p className="text-sky-100/90">// Live coding with Cousify</p>
                <p>
                  <span className="text-emerald-300">console</span>.
                  <span className="text-amber-300">log</span>(
                  <span className="text-sky-100">
                    "Welcome to your first class!"
                  </span>
                  );
                </p>
              </div>
              <p className="mt-3 text-[11px] text-sky-100/90">
                Students enroll, instructors manage courses — all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Middle: Students vs Instructors (modern cards) */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* STUDENTS card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 text-slate-900 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-sky-500 mb-1">
              STUDENTS
            </p>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-slate-900">
              Learn from real instructors, step by step.
            </h2>

            <p className="text-xs md:text-sm text-slate-600 mb-4">
              Join practical programming courses, follow real‑world examples and
              keep all your enrolled classes in one place.
            </p>

            {/* Small course chips row */}
            <div className="flex flex-wrap gap-3 mb-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs shadow-sm">
                <div className="h-8 w-8 rounded-md bg-sky-100 flex items-center justify-center text-[11px] font-semibold text-sky-600">
                  JS
                </div>
                <div>
                  <p className="font-medium text-slate-800 text-xs">
                    JavaScript Basics
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Learn by building small apps.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs shadow-sm">
                <div className="h-8 w-8 rounded-md bg-emerald-100 flex items-center justify-center text-[11px] font-semibold text-emerald-700">
                  FS
                </div>
                <div>
                  <p className="font-medium text-slate-800 text-xs">
                    Full‑stack course
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Frontend + backend practice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-xs md:text-sm font-medium text-white shadow-sm"
            >
              Browse courses
            </Link>
            <span className="text-[11px] text-slate-500">
              Sign up, enroll and start learning in minutes.
            </span>
          </div>
        </div>

        {/* INSTRUCTORS card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 text-slate-900 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-500 mb-1">
              INSTRUCTORS
            </p>
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Run your own online classroom.
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mb-4">
              Create clear course pages, manage content and track how many
              students are learning from you — all in one simple dashboard.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs shadow-sm">
                <p className="font-medium text-slate-800 mb-1">
                  Create real courses
                </p>
                <p className="text-[11px] text-slate-500">
                  Add course titles and descriptions just like a real platform.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs shadow-sm">
                <p className="font-medium text-slate-800 mb-1">
                  See your learners
                </p>
                <p className="text-[11px] text-slate-500">
                  Know how many students enrolled in each course.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-xs md:text-sm font-medium text-white shadow-sm"
            >
              Start teaching
            </Link>
            <span className="text-[11px] text-slate-500">
              Use Cousify like a real course platform for your classes.
            </span>
          </div>
        </div>
      </section>

      {/* Bottom tech strip */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-700 flex flex-wrap gap-3 md:items-center md:justify-between">
        <p>
          Cousify runs on <span className="font-semibold">MERN + JWT</span> with
          role‑based access control for students and instructors.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">
            React · Vite · Tailwind
          </span>
          <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">
            Node · Express · MongoDB
          </span>
          <span className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200">
            JWT authentication
          </span>
        </div>
      </section>
    </main>
  );
};

export default Home;
