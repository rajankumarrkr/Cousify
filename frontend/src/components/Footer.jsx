import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
              Coursify
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Empowering students and instructors with a seamless, secure, and modern learning management experience.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Browse Courses</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Instructor Portal</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Student Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>support@coursify.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Education Lane, Tech City</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Coursify. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-gray-400">
            {/* Social icons placeholders if needed, replacing react-icons */}
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Twitter</a>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
