"use client"
import { useState } from "react";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Nav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const handleLogOut = () => {
      
    router.push('/');
  }

  const profileData = {
    name: "Amal Raj R",
    username: "@ar6",
    college: "College of Engineering",
    location: "Trivandrum",
    stars: 221,
    skills: ["Web", "BlockChain"],
    profileImage:
      "https://media.istockphoto.com/id/1301234881/photo/portrait-of-successful-hispanic-business-man-looks-directly-at-the-camera-smile-happy-male.jpg?s=612x612&w=0&k=20&c=aQyg_qBxcPLCkm19I_EhU9LdbOo9uzDfVfe4nC6scZY=",
  };

  return (
    <header className="px-24 bg-white  py-4 flex items-center justify-between relative">
      <div className="flex items-center space-x-4">
        <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg font-medium">
          Logo
        </button>
      </div>

      <div className="flex items-center space-x-4 ">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <span className="font-semibold text-gray-800">{profileData.stars}</span>
        </div>
        <div>
        <div className=" flex items-center space-x-2 relative cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <span className="text-gray-800 font-medium">{profileData.name}</span>
          <div
            className="w-8 h-8 rounded-full bg-center bg-cover border-2 border-emerald-500 "
            style={{ backgroundImage: `url(${profileData.profileImage})` }}
            
          ></div>
          </div>
          

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-8 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-40">
              <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                Edit Profile
              </button>
              <button onClick={handleLogOut} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
          </div>
        </div>
      
    </header>
  );
}
