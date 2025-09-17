
"use client";
import React from "react";

import { Star, MessageCircle, FileText, Zap } from "lucide-react";
import { useRouter } from 'next/navigation';
import Nav from "@/components/Nav";

export default function page() {
  const router = useRouter();

  return (
  <div className="max-h-screen">
      <Nav />
    <div className=" bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden flex flex-col justify-center items-center">
  
  {/* Main Content */}
  <div className="relative w-[95%]  h-[85vh] mb-2 md:mb-8 bg-[#FFF8F0] shadow-black/30 rounded-xl shadow-inner overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Top right stars */}
            <div className="absolute top-12 md:top-20 right-32 text-teal-300 opacity-70">
              <Star size={24} className="animate-pulse" />
            </div>
            <div className="absolute hidden md:block top-40 right-20 text-teal-400 opacity-60">
              <Star size={16} className="animate-pulse delay-1000" />
            </div>
            {/* Left side lightning bolt */}
            <div className="absolute top-8 md:top-24  left-10 md:left-32 text-orange-300 opacity-70 rotate-12">
              <Zap size={48} className="animate-bounce" />
            </div>
          
        
        
            
          </div>
          {/* Hero Section */}
          <div className="relative z-20 max-w-6xl mx-auto px-6 py-8">
            <div className="text-center">
              {/* Brand Name */}
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
                <span className="text-teal-500">ShowMySkills</span>
                <span className="align-top absolute text-xs text-gray-500 ml-2 font-semibold">(beta)</span>
              </h1>
              {/* Main Headline */}
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900  leading-tight">
                Generate Your ATS Resume
              </h2>
           <div className="">
                  
                </div>
      
              {/* Username Input and CTA Button */}
              <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
                 <img src="/coder.png" alt="Coder" className="w-64 md:w-82" />
                        <input
                        type="text"
                        placeholder="Enter your showmyskills username"
                        className="w-96 text-gray-600 px-4 py-2 border border-gray-300 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                <button className="cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-8  py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                  Generate
                </button>
              </div>
            </div>
          </div>
       
       
  </div>
    </div>
    </div>
  );
};


