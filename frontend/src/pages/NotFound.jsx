import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-indigo-50 dark:bg-slate-800 p-8 rounded-full mb-8"
            >
                <AlertCircle size={64} className="text-indigo-600 dark:text-indigo-400" />
            </motion.div>

            <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">404</h1>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Page Not Found</h2>

            <p className="max-w-md text-gray-600 dark:text-gray-400 mb-10 text-lg">
                Oops! The page you are looking for seems to have wandered off into the digital void.
            </p>

            <Link
                to="/"
                className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-95 flex items-center gap-2"
            >
                <Home size={20} /> Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
