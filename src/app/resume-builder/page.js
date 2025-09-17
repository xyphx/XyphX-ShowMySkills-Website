
"use client";
import React from "react";

import { Star, MessageCircle, FileText, Zap } from "lucide-react";
import { useRouter } from 'next/navigation';
import Nav from "@/components/Nav";
import { useAuth } from "@/contexts/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

// Helper to fetch suggestions by username prefix
async function getUsersByUsernamePrefix(prefix) {
  if (!prefix) return [];
  // Firestore query for usernames starting with prefix
  const usersRef = collection(db, "users");
  // Use >= and < for prefix search
  const end = prefix.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
  const q = query(usersRef, where("username", ">=", prefix), where("username", "<", end));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export default function page() {

  const router = useRouter();
  const { getUserByUsername } = useAuth();
  const [inputValue, setInputValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [error, setError] = React.useState("");
  const [inputChangedAfterSelect, setInputChangedAfterSelect] = React.useState(false);

  // Fetch suggestions as user types
  React.useEffect(() => {
    let ignore = false;
    const fetchSuggestionsAsync = async () => {
      setError("");
      if (!inputValue) {
        setSuggestions([]);
        return;
      }
      const results = await getUsersByUsernamePrefix(inputValue);
      if (!ignore) setSuggestions(results);
    };
    fetchSuggestionsAsync();
    return () => { ignore = true; };
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (selectedUser) {
      setSelectedUser(null);
      setInputChangedAfterSelect(true);
    }
  };

  const handleSuggestionClick = (user) => {
    setSelectedUser(user);
    setInputValue(user.username);
    setSuggestions([]);
    setError("");
    setInputChangedAfterSelect(false);
  };

  const handleGenerate = () => {
    if (!selectedUser) {
      setError("No user found");
      return;
    }
    // Proceed with resume generation for selectedUser
    // router.push(`/resume/${selectedUser.username}`); // Example navigation
  };


  return (
    <div className="max-h-screen">
      <Nav />
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden flex flex-col justify-center items-center">
        {/* Main Content */}
        <div className="relative w-[95%] h-[85vh] mb-2 md:mb-8 bg-[#FFF8F0] shadow-black/30 rounded-xl shadow-inner overflow-hidden">
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
            <div className="absolute top-8 md:top-24 left-10 md:left-32 text-orange-300 opacity-70 rotate-12">
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
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Generate Your ATS Resume
              </h2>
              <div className="" />
              {/* Username Input, Suggestions, and CTA Button */}
              <div className="flex flex-col items-center justify-center gap-2 md:gap-4 w-full">
                <img src="/coder.png" alt="Coder" className="w-64 md:w-64" />
                {selectedUser && (
                  <div className="flex items-center gap-2 text-black bg-teal-50 border border-teal-200 rounded-lg px-4 py-2 w-full max-w-xl">
                    <span>{selectedUser.displayName || selectedUser.username}</span>
                    <span className="text-gray-500 text-xs">@{selectedUser.username}</span>
                    {selectedUser.location && <span className="text-gray-400 text-xs">{selectedUser.location}</span>}
                    <span className="flex items-center text-yellow-500 text-xs"><Star size={16} className="inline-block mr-1" />{selectedUser.stars || 0}</span>
                  </div>
                )}
                <div className="relative w-full max-w-2xl">
                
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your showmyskills username"
                    className="w-full text-gray-600 px-4 py-2 border border-gray-300 rounded-full mb-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  {/* Suggestions dropdown above input */}
                 
                  {(!selectedUser && suggestions.length > 0 && inputValue) && (
                    <ul
                      className={`absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full max-w-2xl ${suggestions.length > 3 ? 'overflow-y-auto' : ''} flex flex-col-reverse`}
                      style={{
                        top: '-11rem',
                        maxHeight: suggestions.length > 3 ? '10rem' : 'auto',
                        minWidth: '100%',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    >
                      {[...suggestions.slice(0, 5)].reverse().map((user) => (
                        <li
                          key={user.id}
                          className="flex items-center px-8 py-3 cursor-pointer hover:bg-teal-100 text-black text-lg"
                          onClick={() => handleSuggestionClick(user)}
                        >
                          <span className="font-semibold mr-2">{user.displayName || user.username}</span>
                          <span className="text-gray-500 text-xs mr-2">@{user.username}</span>
                          {user.location && <span className="text-gray-400 text-xs mr-2">{user.location}</span>}
                          <span className="flex items-center text-yellow-500 text-xs"><Star size={18} className="inline-block mr-1" />{user.stars || 0}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Show selected user */}
               
                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                <button
                  className="cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                  onClick={handleGenerate}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


