"use client";
import { useState, useEffect } from "react";
import { Star, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ProfileEdit from "./ProfileEdit";

export default function Nav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [profileComplete, setProfileComplete] = useState(true); // Default to true to avoid flashing
  const router = useRouter();
  const { user, logout, getUserProfile } = useAuth();

  // Fetch user profile and check completion status
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
          setProfileComplete(profile?.profileCompleted || false);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setProfileComplete(false);
        }
      }
    };

    fetchUserProfile();
  }, [user, getUserProfile]);

  const handleLogOut = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
    setDropdownOpen(false);
  };

  const handleEditProfile = () => {
    router.push('/profile-setup');
    setDropdownOpen(false);
  };

  const handleCompleteProfile = () => {
    router.push('/profile-setup');
  };

  const handleViewProfile = () => {
    if (userProfile?.username) {
      router.push(`/${userProfile.username}`);
    }
    setDropdownOpen(false);
  };

  const handleSignIn = () => {
    router.push('/auth');
  };

  // Use actual profile data from Firebase or defaults
  const displayData = {
    name: userProfile?.displayName || user?.displayName || "User",
    username: userProfile?.username || 'user',
    stars: userProfile?.stars || 0,
    profileImage: userProfile?.profileImage || user?.profileImage || "/common-profile.png",
  };

  return (
    <>
      {/* Incomplete Profile Warning Banner - Only show for authenticated users */}
      {user && !profileComplete && (
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-200 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 text-orange-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">
                Your profile is incomplete. Complete it to be visible on the dashboard and get discovered!
              </span>
            </div>
            <button
              onClick={handleCompleteProfile}
              className="text-sm cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md self-start sm:self-auto"
            >
              Complete Profile
            </button>
          </div>
        </div>
      )}
      
      <header className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 bg-white py-3 sm:py-4 flex items-center justify-between relative">
        <div className="flex items-center space-x-4">
          <img 
            src="/Logo.jpg" 
            alt="ShowMySkills Logo" 
            className="h-8 sm:h-10 w-auto object-contain cursor-pointer" 
            onClick={() => router.push('/home')}
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => router.push('/home')}
            className="text-gray-700 cursor-pointer hover:text-teal-600 font-medium transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => router.push('/learnmore')}
            className="text-gray-700 cursor-pointer hover:text-teal-600 font-medium transition-colors"
          >
            Learn More
          </button>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {user ? (
            // Authenticated user navigation
            <>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-800 text-sm sm:text-base">{displayData.stars}</span>
              </div>
              <div>
                <div className="flex items-center space-x-1 sm:space-x-2 relative cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <span className="text-gray-800 font-medium text-sm sm:text-base hidden sm:inline">{displayData.name}</span>
                  <span className="text-gray-800 font-medium text-sm sm:hidden">Menu</span>
                  <div
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-center bg-cover border-2 border-emerald-500"
                    style={{ backgroundImage: `url(${displayData.profileImage})` }}
                  ></div>
                </div>
                
                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 sm:right-8 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-36 sm:w-40">
                    {/* Mobile navigation links */}
                    <div className="md:hidden border-b border-gray-200">
                      <button 
                        onClick={() => {
                          router.push('/home');
                          setDropdownOpen(false);
                        }}
                        className="w-full cursor-pointer px-3 py-2 sm:px-4 sm:py-2 text-left text-gray-700 hover:bg-gray-100 text-sm sm:text-base"
                      >
                        Home
                      </button>
                      <button 
                        onClick={() => {
                          router.push('/learnmore');
                          setDropdownOpen(false);
                        }}
                        className="w-full cursor-pointer px-3 py-2 sm:px-4 sm:py-2 text-left text-gray-700 hover:bg-gray-100 text-sm sm:text-base"
                      >
                        Learn More
                      </button>
                    </div>
                    <button 
                      onClick={handleViewProfile}
                      className="w-full cursor-pointer px-3 py-2 sm:px-4 sm:py-2 text-left text-gray-700 hover:bg-gray-100 text-sm sm:text-base"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={handleEditProfile}
                      className="w-full px-3 py-2 cursor-pointer sm:px-4 sm:py-2 text-left text-gray-700 hover:bg-gray-100 text-sm sm:text-base"
                    >
                      Edit Profile
                    </button>
                    <button 
                      onClick={handleLogOut} 
                      className="w-full px-3 py-2 sm:px-4 cursor-pointer sm:py-2 text-left text-gray-700 hover:bg-gray-100 text-sm sm:text-base"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Unauthenticated user navigation
            <div className="flex items-center space-x-4">
              {/* Mobile menu for unauthenticated users */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-gray-700 cursor-pointer font-medium text-sm"
                >
                  Menu
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-36">
                    <button 
                      onClick={() => {
                        router.push('/home');
                        setDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 cursor-pointer text-left text-gray-700 hover:bg-gray-100 text-sm"
                    >
                      Home
                    </button>
                    <button 
                      onClick={() => {
                        router.push('/learnmore');
                        setDropdownOpen(false);
                      }}
                      className="w-full cursor-pointer px-3 py-2 text-left text-gray-700 hover:bg-gray-100 text-sm"
                    >
                      Learn More
                    </button>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleSignIn}
                className="bg-teal-500 cursor-pointer hover:bg-teal-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full font-medium text-sm sm:text-base transition-colors"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </header>
      
      {/* Profile Edit Modal */}
      <ProfileEdit 
        isOpen={showProfileEdit} 
        onClose={() => setShowProfileEdit(false)} 
      />
    </>
  );
}
