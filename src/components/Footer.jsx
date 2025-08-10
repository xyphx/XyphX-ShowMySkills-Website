import {
  Linkedin,
  Github,
  Home,
  Info,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-teal-600 text-white py-12 mt-4">
      <div className="w-[90%] mx-auto sm:px-16 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          {/* Logo and Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            {/* Logo */}
            <div>
              <Link href="/home" className="hover:text-emerald-200 transition-colors">
                <h2 className="text-3xl font-bold">ShowMySkills</h2>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                href="/home"
                className="flex items-center gap-2 hover:text-emerald-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/learnmore"
                className="flex items-center gap-2 hover:text-emerald-200 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>Learn More</span>
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:xyphx.company@gmail.com"
              className="flex items-center gap-2 hover:text-emerald-200 transition-colors"
              title="Contact us via email"
            >
              <Mail className="w-5 h-5" />
              <span className="hidden sm:inline">Email</span>
            </a>
            <a
              href="https://www.linkedin.com/company/xyphx/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-emerald-200 transition-colors"
              title="Follow us on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href="https://github.com/xyphx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-emerald-200 transition-colors"
              title="View our GitHub"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-teal-500 text-center">
          <p className="text-teal-100 text-sm">
            © 2025 ShowMySkills. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
