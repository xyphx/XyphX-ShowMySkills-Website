import {
  Search,
  Star,
  Instagram,
  Linkedin,
  Github,
  Facebook,
  LogIn,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { generateProfileUrl, formatUsername } from "@/utils/profileUtils";

export default function DashboardCard({
  props,
  onStarToggle,
  isAuthenticated,
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const enterpage = () => {
    router.push(generateProfileUrl(props.username));
  };

  // Check if this is the current user's own profile
  const isOwnProfile = user && user.uid === props.id;

  const handleStarClick = (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      // Auto-hide prompt after 3 seconds
      setTimeout(() => setShowLoginPrompt(false), 3000);
    } else {
      onStarToggle();
    }
  };

  const handleLoginRedirect = () => {
    router.push("/auth");
  };

  return (
    <div className="relative w-full lg:w-full bg-white rounded-2xl cursor-pointer p-4 sm:p-6 mx-2 lg:ml-4 my-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div
        onClick={enterpage}
        className="flex flex-col sm:flex-row items-start justify-between gap-4"
      >
        {/* Profile Image Section */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex flex-col justify-start items-start sm:w-40 w-full sm:mx-0 bg-[url('/pin.jpg')] bg-cover bg-center sm:bg-none sm:bg-white sm:rounded-lg rounded-2xl">
            <img
              src={props.profileImage}
              alt={props.name}
              className="w-40 h-40 sm:rounded-tr-lg rounded-tl-lg rounded-br-lg rounded-bl-lg object-cover"
            />

            {/* Star Count Below Image */}
            <div className="w-40 sm:w-full mt-2">
              <div className="bg-teal-500 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center justify-center space-x-1">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                <span className="text-sm sm:text-lg font-bold">
                  {props.stars}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 w-full sm:w-[70%] text-left">
            <div className="hidden sm:block">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {props.name}
              </h3>
              <p className="text-gray-600 mb-2 text-sm">
                {formatUsername(props.username)}
              </p>
              <p className="text-gray-800 font-medium mb-2 text-sm">
                {props.college}
              </p>
              <p className="text-gray-800 font-medium mb-2 text-sm">
                {props.branch === "Other" && props.customBranch
                  ? props.customBranch
                  : props.branch}
              </p>
              <p className="text-gray-800 font-medium mb-2 text-sm">
                {props.stream === "Other" && props.customStream
                  ? props.customStream
                  : props.stream}
              </p>
              <p className="text-gray-600 mb-4 text-sm">{props.location}</p>
            </div>

            <div className="block sm:hidden">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {props.name}
              </h3>
              <br />
              <div className="text-sm text-gray-600 mb-4">
                <span>{formatUsername(props.username)}</span>
                <br />
                <span className="text-gray-800 font-medium">
                  {props.college}
                </span>
                <br />
                <span className="text-gray-800 font-medium">
                  {props.branch === "Other" && props.customBranch
                    ? props.customBranch
                    : props.branch}
                </span>
                <br />
                <span className="text-gray-800 font-medium">
                  {props.stream === "Other" && props.customStream
                    ? props.customStream
                    : props.stream}
                </span>
                <br />
                <span>{props.location}</span>
              </div>
            </div>

            {/* Skills Section */}
            <div className="flex flex-wrap gap-2 mb-4 justify-start">
              {props.skills.slice(0, 2).map((skill, skillindex) => (
                <span
                  key={skillindex}
                  className="px-3 py-1 border-2 border-teal-500 font-bold text-teal-600 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
              {props.skills.length > 2 && (
                <span className="px-3 py-1 border border-gray-300 text-gray-600 rounded-full text-xs font-medium">
                  & More
                </span>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 sm:justify-start">
              {props.instagram && (
                <a
                  href={props.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 text-teal-500 hover:text-pink-500 cursor-pointer transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {props.linkedin && (
                <a
                  href={props.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 text-teal-500 hover:text-blue-600 cursor-pointer transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {props.github && (
                <a
                  href={props.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 text-teal-500 hover:text-gray-800 cursor-pointer transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Star Button - Show for all users except own profile */}
      {!isOwnProfile && (
        <div className="absolute top-4 right-4 group z-10">
          <button
            onClick={handleStarClick}
            className={`${
              props.starred
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-teal-500 hover:bg-teal-600"
            } cursor-pointer text-white p-2 rounded-full transition-colors relative`}
          >
            {!isAuthenticated ? (
              <LogIn className="w-4 h-4" />
            ) : (
              <Star
                className={`w-4 h-4 cursor-pointer ${
                  props.starred
                    ? "fill-current text-yellow-200"
                    : "fill-current text-white"
                }`}
              />
            )}
          </button>

          {/* Tooltip */}
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 text-xs text-black bg-teal-200 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
            {!isAuthenticated
              ? "Sign in to star"
              : props.starred
              ? "Unstar"
              : "Star Me !"}
          </span>

          {/* Login Prompt Modal */}
          {showLoginPrompt && !isAuthenticated && (
            <div className="absolute top-full -left-52 md:-left-40 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-64">
              <div className="text-center">
                <LogIn className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Sign in required
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  You need to be signed in to star profiles
                </p>
                <button
                  onClick={handleLoginRedirect}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* "My Profile" indicator for own profile */}
    </div>
  );
}
