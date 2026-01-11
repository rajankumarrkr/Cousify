import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Shield, Users, CheckCircle, ArrowRight, Zap, Award, Globe } from "lucide-react";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative overflow-hidden w-full">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20 -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/20 dark:bg-purple-900/10 blur-[100px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-[40%] left-0 w-[300px] h-[300px] bg-blue-200/20 dark:bg-blue-900/10 blur-[80px] rounded-full -z-10 -translate-x-1/2" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/50 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          The Future of Campus Learning
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-4xl mb-6"
        >
          Master your subjects with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Coursify
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-10 leading-relaxed"
        >
          A seamless platform connecting students and instructors.
          Manage courses, track progress, and elevate your educational journey with our modern, secure application.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/courses"
            className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 active:scale-95 flex items-center gap-2"
          >
            Explore Courses <ArrowRight size={20} />
          </Link>
          <Link
            to="/register"
            className="px-8 py-4 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white font-semibold border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-95"
          >
            Create Account
          </Link>
        </motion.div>
      </section>

      {/* Stats/Showcase Section */}
      <section className="py-10 border-y border-gray-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">500+</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Courses</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">10k+</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Students</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">50+</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Instructors</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">99%</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to excel
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful features designed for both students and instructors to make online learning effective and engaging.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Zap className="w-8 h-8 text-amber-500" />,
                title: "Fast & Interactive",
                desc: "Experience lightning fast navigation and real-time updates for a smooth learning process.",
              },
              {
                icon: <Shield className="w-8 h-8 text-emerald-500" />,
                title: "Secure & Reliable",
                desc: "Built with industry-standard JWT authentication and role-based access control protecting your data.",
              },
              {
                icon: <Globe className="w-8 h-8 text-blue-500" />,
                title: "Accessible Anywhere",
                desc: "Access your courses from any device, anytime. Responsive design helps you learn on the go.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-slate-700"
              >
                <div className="mb-4 bg-gray-50 dark:bg-slate-700/50 w-16 h-16 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-3xl bg-indigo-600 p-10 text-white shadow-2xl shadow-indigo-500/20">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-4">For Students</h3>
                <ul className="space-y-3 mb-8 text-indigo-100">
                  <li className="flex items-center gap-2"><CheckCircle size={18} /> Browse hundreds of courses</li>
                  <li className="flex items-center gap-2"><CheckCircle size={18} /> Track your progress in real-time</li>
                  <li className="flex items-center gap-2"><CheckCircle size={18} /> Interactive learning material</li>
                </ul>
                <Link
                  to="/register?role=student"
                  className="inline-block px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  Join as Student
                </Link>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-3xl bg-gray-900 dark:bg-slate-800 p-10 text-white shadow-2xl shadow-gray-900/20">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
                  <Award className="text-white" size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-4">For Instructors</h3>
                <ul className="space-y-3 mb-8 text-gray-400">
                  <li className="flex items-center gap-2"><CheckCircle size={18} /> Create and manage courses easily</li>
                  <li className="flex items-center gap-2"><CheckCircle size={18} /> Track student enrollment</li>
                  <li className="flex items-center gap-2"><CheckCircle size={18} /> Build your personal brand</li>
                </ul>
                <Link
                  to="/register?role=instructor"
                  className="inline-block px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors"
                >
                  Start Teaching
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
