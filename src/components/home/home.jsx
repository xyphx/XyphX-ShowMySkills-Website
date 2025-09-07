"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Star,
  Instagram,
  Linkedin,
  Github,
  Facebook,
} from "lucide-react";
import { collection, getDocs, query, orderBy, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { skillCategories, getSkillsByCategory } from "@/utils/skills";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import DashboardCard from "@/components/DashboardCard";

function SkilloraProfile() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Skills");
  const [mounted, setMounted] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Attempting to fetch profiles from Firestore...');
      
      // First, try to get the collection
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('stars', 'desc'));
      const querySnapshot = await getDocs(q);
      
      console.log('Firestore query successful, found', querySnapshot.size, 'documents');
      
      const fetchedProfiles = [];

      // Get current user's starredbyme array to determine starred status (only if authenticated)
      let currentUserStarredByMe = [];
      if (user) {
        const currentUserDoc = querySnapshot.docs.find(doc => doc.id === user.uid);
        if (currentUserDoc) {
          currentUserStarredByMe = currentUserDoc.data().starredbyme || [];
        }
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Only show profiles that have completed setup
        if (data.profileCompleted) {
          fetchedProfiles.push({
            id: doc.id,
            name: data.displayName || 'Unknown User',
            username: data.username || 'user',
            college: data.college || 'College not specified',
            location: data.location || 'Location not specified',
            stars: data.stars || 0,
            skills: data.skills || ['Web'],
            profileImage: data.profileImage || data.photoURL || '/common-profile.png',
            peoplewhostarredme: data.peoplewhostarredme || [], // Array of user IDs who starred this profile
            starredbyme: data.starredbyme || [], // Array of user IDs this user has starred
            starred: user ? currentUserStarredByMe.includes(doc.id) : false, // Boolean for current user based on their starredbyme array
            phone: data.phone || '',
            email: data.email || '',
            instagram: data.instagram || '',
            linkedin: data.linkedin || '',
            github: data.github || '',
            course: data.course || '',
            customCourse: data.customCourse || '',
          });
        }
      });
      
      const fallbackData = [
        {
          id: '1',
          name: "XyphX",
          username: "@xyphx",
          college: "",
          location: "",
          stars: 221,
          skills: ["Web", "BlockChain", "CyberSecurity"],
          profileImage: "/common-profile.png",
          peoplewhostarredme: [],
          starredbyme: [],
          starred: false,
          phone: '',
          email: '',
          instagram: '',
          linkedin: '',
          github: '',
          course: '',
          customCourse: '',
        }
      ];
      
      if (fetchedProfiles.length === 0) {
        console.log('No profiles found in Firestore, using fallback data');
        setProfiles(fallbackData);
      } else {
        setProfiles(fetchedProfiles);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
      console.log('Using fallback data due to Firestore error');
      // Fallback to static data if Firebase fails
      const fallbackData = [
        {
          id: '1',
          name: "XyphX",
          username: "@xyphx",
          college: "",
          location: "",
          stars: 221,
          skills: ["Web", "BlockChain", "CyberSecurity"],
          profileImage: "/common-profile.png",
          peoplewhostarredme: [],
          starredbyme: [],
          starred: false,
          phone: '',
          email: '',
          instagram: '',
          linkedin: '',
          github: '',
        
        }
      ];
      setProfiles(fallbackData);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Toggle star functionality - now requires authentication
  const toggleStar = async (profileId, currentlyStarred) => {
    if (!user) {
      // Show authentication prompt
      alert('Please sign in to star profiles!');
      return;
    }

    try {
      const profileRef = doc(db, 'users', profileId);
      const currentUserRef = doc(db, 'users', user.uid);
      
      if (currentlyStarred) {
        // Remove current user's ID from the target profile's peoplewhostarredme array
        await updateDoc(profileRef, {
          peoplewhostarredme: arrayRemove(user.uid),
          stars: profiles.find(p => p.id === profileId)?.stars - 1 || 0
        });
        
        // Remove target profile's ID from current user's starredbyme array
        await updateDoc(currentUserRef, {
          starredbyme: arrayRemove(profileId)
        });
      } else {
        // Add current user's ID to the target profile's peoplewhostarredme array
        await updateDoc(profileRef, {
          peoplewhostarredme: arrayUnion(user.uid),
          stars: profiles.find(p => p.id === profileId)?.stars + 1 || 1
        });
        
        // Add target profile's ID to current user's starredbyme array
        await updateDoc(currentUserRef, {
          starredbyme: arrayUnion(profileId)
        });
      }

      // Update local state
      const updatedProfiles = profiles.map((profile) => {
        if (profile.id === profileId) {
          const newPeopleWhoStarredMe = currentlyStarred 
            ? profile.peoplewhostarredme.filter(id => id !== user.uid)
            : [...profile.peoplewhostarredme, user.uid];
          
          return {
            ...profile,
            peoplewhostarredme: newPeopleWhoStarredMe,
            starred: !currentlyStarred,
            stars: currentlyStarred ? profile.stars - 1 : profile.stars + 1
          };
        }
        return profile;
      });
      
      setProfiles(updatedProfiles);
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  };

  useEffect(() => {
    setMounted(true);
    // Fetch profiles regardless of authentication status
    fetchProfiles();
  }, [user, fetchProfiles]); // Re-fetch when user changes (login/logout)

  //loading
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  //sort by stars
  const sortedProfile = profiles.sort((a, b) => b.stars - a.stars);

  //filter by category
  const categorizedProfile = sortedProfile.filter((profile) => {
    if (selectedCategory === "All Skills") {
      return true;
    }
    // Get skills that belong to the selected category
    const categorySkills = getSkillsByCategory(selectedCategory);
    // Check if the profile has any skills that match the category
    return profile.skills.some(skill => categorySkills.includes(skill));
  });
  //filter by search (now includes skills)
  const filteredProfile = categorizedProfile.filter((profile) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      profile.name.toLowerCase().includes(searchLower) ||
      profile.username.toLowerCase().includes(searchLower) ||
      `@${profile.username}`.toLowerCase().includes(searchLower) ||
      profile.college.toLowerCase().includes(searchLower) ||
      profile.location.toLowerCase().includes(searchLower) ||
      profile.skills.some(skill => skill.toLowerCase().includes(searchLower))
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
              <option value="All Skills">All</option>
              {skillCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
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
        <div className="flex align-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full bg-[#FFF8F0] p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-4xl shadow-inner shadow-black/30">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-32 h-32 bg-gray-300 rounded-lg mx-auto sm:mx-0"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : filteredProfile.length > 0 ? (
              filteredProfile.map((profile, index) => (
                <div key={profile.id || index} className="flex justify-center">
                  <DashboardCard
                    props={profile}
                    onStarToggle={() => toggleStar(profile.id, profile.starred)}
                    isAuthenticated={!!user}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No profiles found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function DashPage() {
  // Remove ProtectedRoute wrapper
  return <SkilloraProfile />;
}
