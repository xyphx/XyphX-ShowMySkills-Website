"use client"
import React, { use } from "react";
import { Star, MessageCircle, FileText, Zap } from "lucide-react";
import { useRouter } from 'next/navigation';


const HomePage = () => {
  const router = useRouter();

const handleClick = () => {
  router.push('/dash'); // Automatically loads dashboard/page.js
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden flex flex-col justify-center items-center">
      {/* Navigation */}
      <nav className="flex w-[90%] items-center flex-row justify-between px-4 py-4 relative z-10">
        <div className="text-2xl font-bold text-gray-800">Logo</div>
        <button onClick={handleClick} className="curror-pointer bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full transition-colors">
          Get Started
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative w-[95%] h-[85vh] mb-8 bg-[#FFF8F0] shadow-black/30 rounded-lg shadow-inner overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top right stars */}
          <div className="absolute top-12 md:top-20 right-32 text-teal-300 opacity-70">
            <Star size={24} className="animate-pulse" />
          </div>
          <div className="absolute hidden md:block  top-40 right-20 text-teal-400 opacity-60">
            <Star size={16} className="animate-pulse delay-1000" />
          </div>

          {/* Left side lightning bolt */}
          <div className="absolute top-8 md:top-24  left-10 md:left-32 text-orange-300 opacity-70 rotate-12">
            <Zap size={48} className="animate-bounce" />
          </div>

          {/* Orange lines/bars on the right */}
          <div className="absolute right-10  bottom-30 md:top-32 md:right-40 space-y-2 opacity-60">
            <div className="w-12 h-1 bg-orange-300 rounded"></div>
            <div className="w-16 h-1 bg-orange-300 rounded"></div>
            <div className="w-14 h-1 bg-orange-300 rounded"></div>
            <div className="w-10 h-1 bg-orange-300 rounded"></div>
          </div>

          {/* Bottom left decorative elements */}
          <div className="absolute md:top-32 md:left-20 bottom-40 left-10 flex items-center space-x-4 opacity-70">
            <div className="w-8 h-8 bg-blue-300 rounded-full animate-pulse"></div>
            <div className="space-y-1">
              <div className="w-12 h-2 bg-blue-200 rounded"></div>
              <div className="w-8 h-2 bg-blue-200 rounded"></div>
            </div>
            <MessageCircle className="text-blue-400" size={20} />
          </div>

          <div className="absolute  hidden md:block top-32 md:left-[20%] opacity-60">
            <FileText className="text-gray-400" size={64} />
          </div>
          <div className="absolute bottom-40 left-1/3 opacity-50">
            <Star
              
              size={16}
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 md:py-20 py-12">
          <div className="text-center">
            {/* Brand Name */}
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              <span className="text-teal-500">ShowMySkills</span>
            </h1>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Showcase your skills.
            </h2>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Get discovered.
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6 leading-relaxed">
              A platform that empowers creators, coders, designers, and doers to
              showcase their skills, rank among the best, and get noticed by
              peers and professionals.
            </p>

            {/* CTA Button */}
            <div className="flex items-center justify-center space-x-4">
              <button onClick={handleClick} className="cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="absolute md:-bottom-10 bottom-0 md:left-[20%] left-1/2 z-10 transform -translate-x-1/2 ">
          <img src="/coder.png" alt="Coder" className="w-64 md:w-82" />
        </div>
        <div className="absolute hidden md:block -bottom-30 right-[5%] z-10 d ">
          <img src="/ideaman.png" alt="Coder" className="h-86" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
