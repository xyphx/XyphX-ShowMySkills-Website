"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Star,
  Instagram,
  Linkedin,
  Github,
  Facebook,
} from "lucide-react";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import DashboardCard from "@/components/DashboardCard";
export default function SkilloraProfile() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [mounted, setMounted] = useState(false);

  const profileData = [
    {
      name: "Amal Raj R",
      username: "@ar6",
      college: "CET",
      location: "Tvm",
      stars: 221,
      skills: ["Web", "BlockChain", "CyberSecurity"],
      profileImage:
        "https://media.istockphoto.com/id/1301234881/photo/portrait-of-successful-hispanic-business-man-looks-directly-at-the-camera-smile-happy-male.jpg?s=612x612&w=0&k=20&c=aQyg_qBxcPLCkm19I_EhU9LdbOo9uzDfVfe4nC6scZY=",
    },
    {
      name: "TonyStark",
      username: "@tnystk",
      college: "TKM",
      location: "Kollam",
      stars: 200,
      skills: ["Web", "BlockChain"],
      profileImage:
        "https://thumbs.dreamstime.com/b/portrait-male-teenage-student-uniform-outside-buildings-portrait-male-teenage-student-uniform-outside-buildings-108953006.jpg",
    },
    {
      name: "Alex",
      username: "@al",
      college: "GEC",
      location: "Trivandrum",
      stars: 10,
      skills: ["Web", "BlockChain"],
      profileImage:
        "https://media.istockphoto.com/id/1301234881/photo/portrait-of-successful-hispanic-business-man-looks-directly-at-the-camera-smile-happy-male.jpg?s=612x612&w=0&k=20&c=aQyg_qBxcPLCkm19I_EhU9LdbOo9uzDfVfe4nC6scZY=",
    },
    {
      name: "Gowri",
      username: "@gwr",
      college: "MACE",
      location: "Trivandrum",
      stars: 22143,
      skills: ["Web", "BlockChain"],
      profileImage:
        "https://thumbs.dreamstime.com/b/portrait-male-teenage-student-uniform-outside-buildings-portrait-male-teenage-student-uniform-outside-buildings-108953006.jpg",
    },
    {
      name: "hulk Raj R",
      username: "@hlk",
      college: "Model Engineering College",
      location: "Thrissur",
      stars: 5489,
      skills: ["Web"],
      profileImage:
        "https://thumbs.dreamstime.com/b/portrait-male-teenage-student-uniform-outside-buildings-portrait-male-teenage-student-uniform-outside-buildings-108953006.jpg",
    },
  ];
  const initialProfileData = profileData.map((profile) => ({
    ...profile,
    starred: false,
  }));
  const [profiles, setProfiles] = useState(initialProfileData);
  //place the following after all hooks
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  //sort by stars
  const sortedProfile = profiles.sort((a, b) => b.stars - a.stars);

  //filter by category
  const categorizedProfile = sortedProfile.filter((profile) => {
    if (selectedCategory === "Category") {
      return true;
    }
    return profile.skills.includes(selectedCategory);
  });
  //filter by search
  const filteredProfile = categorizedProfile.filter((profile) => {
    return (
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-50  ">
      {/* Header */}
      <Nav />

      {/* Main Brand Section */}

      <div className="flex justify-center items-center   ">
        <div className="bg-[url('/dashbg.png')] bg-auto bg-no-repeat bg-center sm:py-16 py-8 w-[90%] h-[100%] rounded-2xl mx-auto text-center">
          <h1 className="sm:text-6xl text-4xl font-bold text-white">
            ShowMySkills
          </h1>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:justify-between mb-6 px-8 sm:mx-auto sm:mb-8">
          {/* Category Select */}
          <div className="relative w-full sm:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none w-full bg-white border-2 border-emerald-500 rounded-full px-4 py-2 text-emerald-600 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option>Category</option>
              <option>Web Development</option>
              <option>BlockChain</option>
              <option>AI/ML</option>
              <option>Mobile Development</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 shadow-inner text-gray-800 shadow-black/30 rounded-full placeholder:text-gray-400 border-0 bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Profile Cards */}
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center lg:justify-between w-full bg-[#FFF8F0] sm:px-8 px-2 py-4 rounded-4xl shadow-inner shadow-black/30">
            {filteredProfile.map((profile, index) => (
              <DashboardCard
                key={index}
                props={profile}
                onStarToggle={() => {
                  const updated = profiles.map((p) => {
                    if (p.username === profile.username) {
                      return {
                        ...p,
                        stars: profile.stars + (profile.starred ? -1 : 1),
                        starred: !profile.starred,
                      };
                    }
                    return p;
                  });
                  setProfiles(updated);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
