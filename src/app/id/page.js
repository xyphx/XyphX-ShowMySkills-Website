"use client";
import React from "react";
import {
  Star,
  Share2,
  Diamond,
  Instagram,
  Linkedin,
  Github,
  Facebook,
} from "lucide-react";
import { ExternalLink } from "lucide-react";

import Nav from "@/components/Nav";
import { useState } from "react";
import { Content } from "next/font/google";
import Footer from "@/components/Footer";

const ProfilePage = () => {
  const profileData = {
    name: "Amal Raj R",
    username: "@ar6",
    college: "College of Engineering",
    location: "Trivandrum",
    stars: 221,
    skills: ["Web", "BlockChain", "CyberSecurity"],
    profileImage:
      "https://media.istockphoto.com/id/1301234881/photo/portrait-of-successful-hispanic-business-man-looks-directly-at-the-camera-smile-happy-male.jpg?s=612x612&w=0&k=20&c=aQyg_qBxcPLCkm19I_EhU9LdbOo9uzDfVfe4nC6scZY=",
    about:
      "Hello Guys, I'm orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    experience: [
      {content:"Hello Guys, I'm orem Ipsum is simply dummy text of theprinting and typesetting industry. Lorem Ipsum",link:"https://example.com"},
      {content:"Hello Guys, I'm orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",link:"https://example.com"}
    ],
    achievements:  [
      {content:"Hello Guys, I'm orem Ipsum is simply dummy text of theprinting and typesetting industry. Lorem Ipsum",link:"https://example.com"},
      {content:"Hello Guys, I'm orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",link:"https://example.com"},
    ],
    works:  [
      {content:"Hello Guys, I'm orem Ipsum is simply dummy text of theprinting and typesetting industry. Lorem Ipsum",link:"https://example.com"},
      {content:"Hello Guys, I'm orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",link:"https://example.com"},
    ],
  };
  
  const [starred, setStarred] = useState(false);
  const [starval, incrstar] = useState(profileData.stars);
  
  const handleClick = () => {
    if (starred) {
      incrstar(starval - 1);
    } else {
      incrstar(starval + 1);
    }
    setStarred(!starred);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Nav />

      {/* Main Profile Card */}
      <div className="w-[95%] sm:w-[90%] mx-auto p-2 sm:p-4">
        {/* Hero Section */}
        <div className="bg-[url('/profilebg.png')] bg-cover bg-center rounded-t-3xl p-4 sm:p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            {/* Mobile Layout - Column */}
            <div className="flex flex-col sm:hidden space-y-4">
              {/* Share button for mobile */}
              <div className="flex justify-end">
                <Share2 className="w-6 h-6 text-white/80 hover:text-white cursor-pointer" />
              </div>
              
              {/* Profile Picture and Star - Centered */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                  <img
                    src={profileData.profileImage}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="bg-teal-800 px-4 py-2 border-3 border-white rounded-full flex items-center gap-2">
                    <Star className={`w-4 h-4 text-white fill-white`} />
                    <span className="font-bold">{starval}</span>
                  </div>
                  <div className="relative group">
                    <button
                      onClick={handleClick}
                      className="cursor-pointer w-10 h-10 bg-teal-600/50 rounded-full flex items-center border-3 border-white justify-center"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          starred
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-black text-black"
                        }`}
                      />
                    </button>
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-black bg-emerald-200 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                      {starred ? "Unstar" : "Star Me !"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Info - Centered */}
              <div className="flex flex-col items-center text-center space-y-2">
                <h1 className="text-xl sm:text-2xl font-bold">{profileData.name}</h1>
                <p className="text-white font-bold">{profileData.username}</p>
                <p className="text-white-100 font-bold">{profileData.college}</p>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
                  <button className="cursor-pointer bg-teal-600 hover:bg-teal-700 px-6 py-2 rounded-full text-sm font-medium transition-colors">
                    Contact
                  </button>
                  <div className="flex mb-6 space-x-4">
                    <Instagram className="w-5 h-5 text-white cursor-pointer" />
                    <Linkedin className="w-5 h-5 text-white cursor-pointer" />
                    <Github className="w-5 h-5 text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Row */}
            <div className="hidden sm:flex flex-row items-start justify-between">
              <div className="flex flex-row ml-4 gap-8 items-start w-[70%]">
                {/* Profile Picture and Star */}
                <div className="flex flex-col items-center">
                  <div className="w-50 h-50 rounded-full overflow-hidden border-4 border-white">
                    <img
                      src={profileData.profileImage}
                      alt={profileData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="bg-teal-800 px-4 py-2 border-3 border-white rounded-full flex items-center gap-2">
                      <Star className={`w-4 h-4 text-white fill-white`} />
                      <span className="font-bold">{starval}</span>
                    </div>
                    <div className="relative group">
                      <button
                        onClick={handleClick}
                        className="cursor-pointer w-10 h-10 bg-teal-600/50 rounded-full flex items-center border-3 border-white justify-center"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            starred
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-black text-black"
                          }`}
                        />
                      </button>
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs text-black bg-emerald-200 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                        {starred ? "Unstar" : "Star Me !"}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Profile Overview */}
                <div className="flex flex-col pt-4">
                  <h1 className="text-2xl font-bold">{profileData.name}</h1>
                  <p className="text-white font-bold">{profileData.username}</p>
                  <p className="text-white-100 font-bold">{profileData.college}</p>
                  <div className="flex flex-row gap-4 justify-center items-center my-4">
                    <button className="cursor-pointer bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                      Contact
                    </button>
                    <div className="flex space-x-2 w-32 mb-16 justify-between">
                      <Instagram className="w-5 h-5 text-white cursor-pointer" />
                      <Linkedin className="w-5 h-5 text-white cursor-pointer" />
                      <Github className="w-5 h-5 text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
              <Share2 className="w-6 h-6 text-white/80 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="shadow-black/30 shadow-inner rounded-b-3xl px-4 sm:px-8 lg:px-16 py-6 sm:py-8 mb-8 space-y-6 sm:space-y-8 bg-[#FFF8F0]">
          {/* About Section */}
          <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
            <p className="text-black leading-relaxed text-sm sm:text-base">{profileData.about}</p>
          </div>

          {/* Skills Section */}
          <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-teal-100 text-teal-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-teal-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Experience</h2>
            <div className="space-y-4">
              {profileData.experience.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3"
                >
                  <div className="flex gap-3 flex-1">
                    <Diamond className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0 fill-teal-600" />
                    <p className="text-black text-sm sm:text-base">
                      {item.content}
                    </p>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-sm sm:text-base ml-7 sm:ml-0"
                  >
                    See More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Achievements</h2>
            <div className="space-y-4">
              {profileData.achievements.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3"
                >
                  <div className="flex gap-3 flex-1">
                    <Diamond className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0 fill-teal-600" />
                    <p className="text-black text-sm sm:text-base">
                      {item.content}
                    </p>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-sm sm:text-base ml-7 sm:ml-0"
                  >
                    See More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* My Works Section */}
          <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">My Works</h2>
            <div className="space-y-4">
              {profileData.works.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3"
                >
                  <div className="flex gap-3 flex-1">
                    <Diamond className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0 fill-teal-600" />
                    <p className="text-black text-sm sm:text-base">
                      {item.content}
                    </p>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-sm sm:text-base ml-7 sm:ml-0"
                  >
                    See More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Button */}
          <div className="text-center pt-4">
            <button className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-colors w-full sm:w-auto">
              Contact
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;