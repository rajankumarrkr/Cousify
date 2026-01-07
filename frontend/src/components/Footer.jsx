import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-start md:justify-between">
        {/* Brand + tagline */}
        <div className="max-w-sm">
          <h2 className="text-lg font-semibold text-white">Coursify</h2>
          <p className="mt-2 text-sm text-slate-400">
            Secure e‑learning platform with JWT authentication, role‑based access
            and modern UI for students & instructors.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-1 flex-wrap gap-10 text-sm">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Platform
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#courses" className="hover:text-white">
                  Browse courses
                </a>
              </li>
              <li>
                <a href="#instructors" className="hover:text-white">
                  Become an instructor
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Security
            </h3>
            <ul className="mt-3 space-y-2">
              <li>JWT authentication</li>
              <li>Role based access</li>
              <li>Rate limiting</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Support
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#faq" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#docs" className="hover:text-white">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-4 text-xs text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Coursify. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hover:text-white"
              aria-label="Github"
            >
              <FaGithub size={16} />
            </a>
            <a
              href="#"
              className="hover:text-white"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href="#"
              className="hover:text-white"
              aria-label="Twitter"
            >
              <FaTwitter size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
