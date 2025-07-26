import {
  Search,
  Star,
  Instagram,
  Linkedin,
  Github,
  Facebook,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardCard({ props, onStarToggle }) {
  const router = useRouter();
  const enterpage = () => {
    router.push("/id");
  };

  return (
    <div className="relative w-full lg:w-[47%] bg-white rounded-2xl cursor-pointer p-4 sm:p-6 mx-2 lg:ml-4 my-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div
        onClick={enterpage}
        className="flex flex-col sm:flex-row items-start justify-between gap-4"
      >
        {/* Profile Image Section */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex flex-col justify-between items-between mx-auto sm:mx-0">
            <img
              src={props.profileImage}
              alt={props.name}
              className="w-full h-[80%] sm:w-40 sm:h-[80%] rounded-tr-xl sm:rounded-tr-lg rounded-tl-lg rounded-br-lg rounded-bl-lg object-cover"
            />
            <div className="absolute -bottom-2 left-0 right-0">
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
  <p className="text-gray-600 mb-2 text-sm">{props.username}</p>
  <p className="text-gray-800 font-medium mb-2 text-sm">
    {props.college}
  </p>
  <p className="text-gray-600 mb-4 text-sm">{props.location}</p>
</div>

<div className="block sm:hidden">
  <h3 className="text-lg font-semibold text-gray-900 mb-2">
    {props.name}
  </h3>
  <div className="text-sm text-gray-600 mb-4">
    <span>{props.username}</span>
    <span className="mx-2 text-gray-400">•</span>
    <span className="text-gray-800 font-medium">{props.college}</span>
    <span className="mx-2 text-gray-400">•</span>
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
              <Instagram className="w-5 h-5 text-teal-500 hover:text-pink-500 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-teal-500 hover:text-blue-600 cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-teal-500 hover:text-gray-800 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Star Button */}
      <div className="absolute top-4 right-4 group z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStarToggle();
          }}
          className={`${
            props.starred ? "bg-teal-800" : "bg-teal-500 hover:bg-teal-600"
          } cursor-pointer text-white p-2 rounded-full transition-colors`}
        >
          <Star
            className={`w-4 h-4 cursor-pointer ${
              props.starred ? "fill-current text-yellow-400" : ""
            }`}
          />
        </button>

        {/* Tooltip */}
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 text-xs text-black bg-teal-200 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
          {props.starred ? "Unstar" : "Star Me !"}
        </span>
      </div>
    </div>
  );
}
