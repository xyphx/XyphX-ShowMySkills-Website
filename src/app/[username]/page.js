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
  Mail,
  Phone,
  X,
  Copy,
  ExternalLink as ExternalLinkIcon,
  MapPin,
  Download,
  FileText
} from "lucide-react";
import { ExternalLink } from "lucide-react";

import Nav from "@/components/Nav";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import Footer from "@/components/Footer";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const ProfilePage = () => {
  const { getUserByUsername, user, updateUserProfile } = useAuth();
  const router = useRouter();
  const params = useParams();
  const username = params.username; // Get username from dynamic route

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [starred, setStarred] = useState(false);
  const [starval, setStarval] = useState(0);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) {
        setError('Username not provided');
        setLoading(false);
        return;
      }

      // Basic validation for username format
      if (typeof username !== 'string' || username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
        setError('Invalid username format');
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserByUsername(username);
        if (userData) {
          setProfileData(userData);
          setStarval(userData.stars || 0);
          
          // Check if this is the current user's own profile
          setIsOwnProfile(user && user.uid === userData.id);
          
          // Check if current user has starred this profile by checking their starredbyme array
          if (user && user.uid !== userData.id) { // Only check starring status if not own profile
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

    // Prevent starring own profile
    if (isOwnProfile) {
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

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleCopyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/${profileData.username}`;
    const shareData = {
      title: `${profileData.displayName}'s Portfolio`,
      text: `Check out ${profileData.displayName}'s skills and experience on ShowMySkills`,
      url: profileUrl
    };

    // Check if native sharing is supported
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled sharing or error occurred, fallback to clipboard
        if (error.name !== 'AbortError') {
          handleCopyToClipboard(profileUrl, 'profile-url');
        }
      }
    } else {
      // Fallback to copying URL to clipboard
      handleCopyToClipboard(profileUrl, 'profile-url');
    }
  };

  const handleResumeDownload = () => {
    if (profileData.resume) {
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = profileData.resume;
      link.download = profileData.resumeName || `${profileData.displayName}_Resume.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
                <div className="relative group">
                  <Share2 
                    className="w-6 h-6 text-white/80 hover:text-white cursor-pointer transition-colors" 
                    onClick={handleShare}
                  />
                  {copiedField === 'profile-url' && (
                    <span className="absolute top-full right-0 mt-1 px-2 py-1 text-xs text-white bg-black rounded opacity-100 transition-opacity whitespace-nowrap">
                      URL Copied!
                    </span>
                  )}
                  <span className="absolute top-full right-0 mt-1 px-2 py-1 text-xs text-black bg-emerald-200 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Share Profile
                  </span>
                </div>
              </div>
              
              {/* Profile Picture and Star - Centered */}
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white">
                  <img
                    src={profileData.profileImage || "/common-profile.png"}
                    alt={profileData.displayName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/common-profile.png'; // Fallback if image fails to load
                    }}
                  />
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="bg-teal-800 px-4 py-2 border-3 border-white rounded-full flex items-center gap-2">
                    <Star className={`w-4 h-4 text-white fill-white`} />
                    <span className="font-bold">{starval}</span>
                  </div>
                  {!isOwnProfile && (
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
                  )}
                  {isOwnProfile && (
                    <div className="bg-gray-500/80 text-white px-3 py-1 rounded-full text-xs font-medium border-2 border-white">
                      My Profile
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info - Centered */}
              <div className="flex flex-col items-center text-center space-y-2">
                <h1 className="text-2xl sm:text-2xl font-bold">{profileData.displayName}</h1>
                <p className="text-white font-bold">@{profileData.username}</p>
                <p className="text-white-100 font-bold">{profileData.college}</p>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
                  <button 
                    onClick={handleContactClick}
                    className="cursor-pointer bg-teal-900 hover:bg-teal-700 px-6 py-2 rounded-full text-lg font-medium transition-colors"
                  >
                    Contact
                  </button>
                  {/* Only show social icons if at least one social media link exists */}
                  {(profileData.instagram || profileData.linkedin || profileData.github) && (
                    <div className="flex mb-6 justify-center gap-3 bg-teal-600 px-6 py-2 w-[100vw] rounded-full space-x-4">
                      {profileData.instagram && (
                        <a href={profileData.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="w-5 h-5 text-white cursor-pointer hover:text-gray-200 transition-colors" />
                        </a>
                      )}
                      {profileData.linkedin && (
                        <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-5 h-5 text-white cursor-pointer hover:text-gray-200 transition-colors" />
                        </a>
                      )}
                      {profileData.github && (
                        <a href={profileData.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-5 h-5 text-white cursor-pointer hover:text-gray-200 transition-colors" />
                        </a>
                      )}
                    </div>
                  )}
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
                      src={profileData.profileImage || "/common-profile.png"}
                      alt={profileData.displayName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/common-profile.png'; // Fallback if image fails to load
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="bg-teal-800 px-4 py-2 border-3 border-white rounded-full flex items-center gap-2">
                      <Star className={`w-4 h-4 text-white fill-white`} />
                      <span className="font-bold">{starval}</span>
                    </div>
                    {!isOwnProfile && (
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
                    )}
                    {isOwnProfile && (
                      <div className="bg-gray-500/80 text-white px-3 py-1 rounded-full text-xs font-medium border-2 border-white">
                        My Profile
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Profile Overview */}
                <div className="flex flex-col pt-4">
                  <h1 className="text-2xl font-bold">{profileData.displayName}</h1>
                  <p className="text-white font-bold">@{profileData.username}</p>
                  <p className="text-white-100 font-bold">{profileData.college}</p>
                  <div className="flex flex-row gap-4 justify-center items-center my-4">
                    <button 
                      onClick={handleContactClick}
                      className="cursor-pointer bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Contact
                    </button>
                    {/* Only show social icons if at least one social media link exists */}
                    {(profileData.instagram || profileData.linkedin || profileData.github) && (
                      <div className="flex space-x-2 w-32 justify-between">
                        {profileData.instagram && (
                          <a href={profileData.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="w-5 h-5 text-white cursor-pointer hover:text-gray-200 transition-colors" />
                          </a>
                        )}
                        {profileData.linkedin && (
                          <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-5 h-5 text-white cursor-pointer hover:text-gray-200 transition-colors" />
                          </a>
                        )}
                        {profileData.github && (
                          <a href={profileData.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5 text-white cursor-pointer hover:text-gray-200 transition-colors" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="relative group">
                <Share2 
                  className="w-6 h-6 text-white/80 hover:text-white cursor-pointer transition-colors" 
                  onClick={handleShare}
                />
                {copiedField === 'profile-url' && (
                  <span className="absolute top-full right-0 mt-1 px-2 py-1 text-xs text-white bg-black rounded opacity-100 transition-opacity whitespace-nowrap">
                    URL Copied!
                  </span>
                )}
                <span className="absolute top-full right-0 mt-1 px-2 py-1 text-xs text-black bg-emerald-200 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Share Profile
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="shadow-black/30 shadow-inner rounded-b-3xl px-4 sm:px-8 lg:px-16 py-6 sm:py-8 mb-8 space-y-6 sm:space-y-8 bg-[#FFF8F0]">
          {/* About Section */}
          <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
            {profileData.about && profileData.about.trim() ? (
              <p className="text-black leading-relaxed text-sm sm:text-base">{profileData.about}</p>
            ) : (
              <p className="text-gray-500 italic">No about details added</p>
            )}
          </div>

          {/* Resume Section */}
          {profileData.resume && (
            <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-700" />
                Resume
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="p-2 bg-teal-100 rounded-lg flex-shrink-0">
                    <FileText className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 break-words">
                      {profileData.resumeName || `${profileData.displayName}_Resume.pdf`}
                    </p>
                    <p className="text-xs text-gray-600">PDF Document</p>
                  </div>
                </div>
                <button
                  onClick={handleResumeDownload}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium w-full sm:w-auto flex-shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          )}

          {/* Skills Section */}
          <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-row flex-wrap gap-2 items-start justify-start">
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

{profileData.works && profileData.works.length > 0 && (
  <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">My Works</h2>
    <div className="space-y-6">
      {profileData.works.map((item, index) => (
        <div
          key={index}
          className="border-l-4 border-l-blue-500 pl-4 pb-4 border-b border-b-gray-100 last:border-b-0"
        >
          {/* Check if it's new format with detailed fields */}
          {item.title || item.description ? (
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title || 'Project'}
                  </h3>
                </div>
              </div>
              {item.description && (
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-2">
                  {item.description}
                </p>
              )}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-sm mt-2"
                >
                  View Project
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ) : (
            // Legacy format fallback
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div className="flex gap-3 flex-1">
                <Diamond className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0 fill-teal-600" />
                <p className="text-black text-sm sm:text-base">
                  {item.content || item.description}
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
          )}
        </div>
      ))}
    </div>
  </div>
)}

          {/* Experience Section */}
          {profileData.experience && profileData.experience.length > 0 && (
            <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Experience</h2>
              <div className="space-y-6">
                {profileData.experience.map((item, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-l-teal-500 pl-4 pb-4 border-b border-b-gray-100 last:border-b-0"
                  >
                    {/* Check if it's new format with detailed fields */}
                    {item.title || item.organization || item.timePeriod ? (
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.title || 'Position'}
                            </h3>
                            <p className="text-teal-600 font-medium">
                              {item.organization || 'Organization'}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.timePeriod && (
                              <div className="flex items-center gap-1">
                                <span>{item.timePeriod}</span>
                              </div>
                            )}
                            {item.location && (
                              <div className="flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" />
                                <span>{item.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {item.description && (
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-2">
                            {item.description}
                          </p>
                        )}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-sm mt-2"
                          >
                            View Details
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ) : (
                      // Legacy format fallback
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex gap-3 flex-1">
                          <Diamond className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0 fill-teal-600" />
                          <p className="text-black text-sm sm:text-base">
                            {item.content || item.description}
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
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Section */}
          {profileData.achievements && profileData.achievements.length > 0 && (
            <div className="bg-white shadow-sm shadow-black/30 rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Achievements</h2>
              <div className="space-y-6">
                {profileData.achievements.map((item, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-l-orange-500 pl-4 pb-4 border-b border-b-gray-100 last:border-b-0"
                  >
                    {/* Check if it's new format with detailed fields */}
                    {item.title || item.organization || item.date ? (
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.title || 'Achievement'}
                            </h3>
                            {item.organization && (
                              <p className="text-orange-600 font-medium">
                                {item.organization}
                              </p>
                            )}
                          </div>
                          {item.date && (
                            <div className="text-sm text-gray-500">
                              <span>{item.date}</span>
                            </div>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-2">
                            {item.description}
                          </p>
                        )}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-sm mt-2"
                          >
                            View Certificate
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ) : (
                      // Legacy format fallback
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex gap-3 flex-1">
                          <Diamond className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0 fill-teal-600" />
                          <p className="text-black text-sm sm:text-base">
                            {item.content || item.description}
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
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Works Section */}
          
          {/* Contact Button */}
          <div className="text-center pt-4">
            <button 
              onClick={handleContactClick}
              className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-colors w-full sm:w-auto"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowContactModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={profileData.profileImage || "/common-profile.png"}
                    alt={profileData.displayName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/common-profile.png';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{profileData.displayName}</h3>
                  <p className="text-sm text-gray-600">@{profileData.username}</p>
                </div>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>

              {/* Email */}
              {profileData.email && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Mail className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-900">{profileData.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyToClipboard(profileData.email, 'email')}
                      className="p-2 hover:bg-white rounded-lg transition-colors relative"
                      title="Copy email"
                    >
                      <Copy className="w-4 h-4 text-gray-500" />
                      {copiedField === 'email' && (
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                      title="Send email"
                    >
                      <ExternalLinkIcon className="w-4 h-4 text-gray-500" />
                    </a>
                  </div>
                </div>
              )}

              {/* Phone */}
              {profileData.phone && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-sm text-gray-900">{profileData.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyToClipboard(profileData.phone, 'phone')}
                      className="p-2 hover:bg-white rounded-lg transition-colors relative"
                      title="Copy phone"
                    >
                      <Copy className="w-4 h-4 text-gray-500" />
                      {copiedField === 'phone' && (
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>
                    <a
                      href={`tel:${profileData.phone}`}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                      title="Call phone"
                    >
                      <ExternalLinkIcon className="w-4 h-4 text-gray-500" />
                    </a>
                  </div>
                </div>
              )}

              {/* Social Media Links */}
              {(profileData.instagram || profileData.linkedin || profileData.github) && (
                <div className="space-y-3">
                  <h5 className="text-md font-semibold text-gray-900 mt-6 mb-3">Social Media</h5>
                  
                  {profileData.instagram && (
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl hover:from-pink-100 hover:to-purple-100 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg">
                          <Instagram className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Instagram</p>
                          <p className="text-sm text-gray-900">@{profileData.instagram.split('/').pop()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopyToClipboard(profileData.instagram, 'instagram')}
                          className="p-2 hover:bg-white rounded-lg transition-colors relative"
                          title="Copy Instagram URL"
                        >
                          <Copy className="w-4 h-4 text-gray-500" />
                          {copiedField === 'instagram' && (
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Copied!
                            </span>
                          )}
                        </button>
                        <a
                          href={profileData.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                          title="Visit Instagram profile"
                        >
                          <ExternalLinkIcon className="w-4 h-4 text-gray-500" />
                        </a>
                      </div>
                    </div>
                  )}

                  {profileData.linkedin && (
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                          <Linkedin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">LinkedIn</p>
                          <p className="text-sm text-gray-900">Professional Profile</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopyToClipboard(profileData.linkedin, 'linkedin')}
                          className="p-2 hover:bg-white rounded-lg transition-colors relative"
                          title="Copy LinkedIn URL"
                        >
                          <Copy className="w-4 h-4 text-gray-500" />
                          {copiedField === 'linkedin' && (
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Copied!
                            </span>
                          )}
                        </button>
                        <a
                          href={profileData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                          title="Visit LinkedIn profile"
                        >
                          <ExternalLinkIcon className="w-4 h-4 text-gray-500" />
                        </a>
                      </div>
                    </div>
                  )}

                  {profileData.github && (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          <Github className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">GitHub</p>
                          <p className="text-sm text-gray-900">Code Repository</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopyToClipboard(profileData.github, 'github')}
                          className="p-2 hover:bg-white rounded-lg transition-colors relative"
                          title="Copy GitHub URL"
                        >
                          <Copy className="w-4 h-4 text-gray-500" />
                          {copiedField === 'github' && (
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Copied!
                            </span>
                          )}
                        </button>
                        <a
                          href={profileData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                          title="Visit GitHub profile"
                        >
                          <ExternalLinkIcon className="w-4 h-4 text-gray-500" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* No Contact Info Message */}
              {!profileData.email && !profileData.phone && !profileData.instagram && !profileData.linkedin && !profileData.github && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">No contact information available</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setShowContactModal(false)}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProfilePage;
