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
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const ProfilePage = () => {
  const { getUserByUsername, user, updateUserProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [starred, setStarred] = useState(false);
  const [starval, setStarval] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) {
        setError('Username not provided');
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserByUsername(username);
        if (userData) {
          setProfileData(userData);
          setStarval(userData.stars || 0);
          
          // Check if current user has starred this profile by checking their starredbyme array
          if (user) {
            const currentUserRef = doc(db, 'users', user.uid);
            const currentUserSnap = await getDoc(currentUserRef);
            if (currentUserSnap.exists()) {
              const currentUserData = currentUserSnap.data();
              const starredByMe = currentUserData.starredbyme || [];
              setStarred(starredByMe.includes(userData.id));
            }
          }
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Error fetching profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, getUserByUsername, user]);

  const handleClick = async () => {
    if (!user) {
      router.push('/auth');
      return;
    }

    try {
      const newStarred = !starred;
      const newStarval = newStarred ? starval + 1 : starval - 1;
      
      // Optimistically update the UI
      setStarred(newStarred);
      setStarval(newStarval);

      // Update both users' documents in the database
      const profileRef = doc(db, 'users', profileData.id);
      const currentUserRef = doc(db, 'users', user.uid);
      
      if (newStarred) {
        // Add current user's ID to the target profile's peoplewhostarredme array
        await updateDoc(profileRef, {
          peoplewhostarredme: arrayUnion(user.uid),
          stars: newStarval
        });
        
        // Add target profile's ID to current user's starredbyme array
        await updateDoc(currentUserRef, {
          starredbyme: arrayUnion(profileData.id)
        });
      } else {
        // Remove current user's ID from the target profile's peoplewhostarredme array
        await updateDoc(profileRef, {
          peoplewhostarredme: arrayRemove(user.uid),
          stars: newStarval
        });
        
        // Remove target profile's ID from current user's starredbyme array
        await updateDoc(currentUserRef, {
          starredbyme: arrayRemove(profileData.id)
        });
      }
    } catch (error) {
      console.error('Error updating star:', error);
      // Revert the UI changes if the update fails
      setStarred(!starred);
      setStarval(starred ? starval + 1 : starval - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {error || 'Profile not found'}
            </h1>
            <p className="text-gray-600 mb-4">
              The profile you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.
            </p>
            <button
              onClick={() => router.push('/home')}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white">
                  <img
                    src={profileData.profileImage || "https://via.placeholder.com/200x200?text=No+Image"}
                    alt={profileData.displayName}
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
                      className={`cursor-pointer w-10 h-10 ${
                        starred ? "bg-yellow-500/80" : "bg-teal-600/50"
                      } rounded-full flex items-center border-3 border-white justify-center transition-colors`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          starred
                            ? "fill-yellow-200 text-yellow-200"
                            : "fill-white text-white"
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
                <h1 className="text-2xl sm:text-2xl font-bold">{profileData.displayName}</h1>
                <p className="text-white font-bold">@{profileData.username}</p>
                <p className="text-white-100 font-bold">{profileData.college}</p>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
                  <button className="cursor-pointer bg-teal-900 hover:bg-teal-700 px-6 py-2 rounded-full text-lg font-medium transition-colors">
                    Contact
                  </button>
                  <div className="flex mb-6 justify-center gap-3 bg-teal-600  px-6 py-2 w-[100vw]  rounded-full space-x-4">
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
                      src={profileData.profileImage || "https://via.placeholder.com/200x200?text=No+Image"}
                      alt={profileData.displayName}
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
                        className={`cursor-pointer w-10 h-10 ${
                          starred ? "bg-yellow-500/80" : "bg-teal-600/50"
                        } rounded-full flex items-center border-3 border-white justify-center transition-colors`}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            starred
                              ? "fill-yellow-200 text-yellow-200"
                              : "fill-white text-white"
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
                  <h1 className="text-2xl font-bold">{profileData.displayName}</h1>
                  <p className="text-white font-bold">@{profileData.username}</p>
                  <p className="text-white-100 font-bold">{profileData.college}</p>
                  <div className="flex flex-row gap-4 justify-center items-center my-4">
                    <button className="cursor-pointer bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                      Contact
                    </button>
                    <div className="flex space-x-2 w-32  justify-between">
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
              {profileData.skills && profileData.skills.length > 0 ? (
                profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-teal-100 text-teal-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-teal-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 italic">No skills listed</p>
              )}
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Experience</h2>
            <div className="space-y-4">
              {profileData.experience && profileData.experience.length > 0 ? (
                profileData.experience.map((item, index) => (
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
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-sm sm:text-base ml-7 sm:ml-0"
                      >
                        See More
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No experience listed</p>
              )}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Achievements</h2>
            <div className="space-y-4">
              {profileData.achievements && profileData.achievements.length > 0 ? (
                profileData.achievements.map((item, index) => (
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
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-sm sm:text-base ml-7 sm:ml-0"
                      >
                        See More
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No achievements listed</p>
              )}
            </div>
          </div>

          {/* My Works Section */}
          <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">My Works</h2>
            <div className="space-y-4">
              {profileData.works && profileData.works.length > 0 ? (
                profileData.works.map((item, index) => (
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
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-sm sm:text-base ml-7 sm:ml-0"
                      >
                        See More
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No works listed</p>
              )}
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