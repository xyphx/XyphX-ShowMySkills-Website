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
    <div className="relative w-full lg:w-[47%] bg-white rounded-2xl cursor-pointer rounded-tr-4xl p-6 ml-4 my-4 shadow-sm border border-gray-100 shadow-black/30 hover:shadow-md ">
      <div onClick={enterpage} className="flex items-start justify-between">
        <div className="flex space-x-4">
          <div className="relative flex flex-col justify-between items-center">
            <img
              src={props.profileImage}
              alt={props.name}
              className="w-40 h-[80%] rounded-lg object-cover"
            />
            <div className="absolute -bottom-2 left-0 right-0 h-[20%]">
              <div className="bg-teal-500 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-lg font-bold">{props.stars}</span>
              </div>
            </div>
          </div>

          <div className="flex-1  justify-between w-[70%]">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {props.name}
            </h3>
            <p className="text-gray-600 mb-1 text-sm">{props.username}</p>
            <p className="text-gray-800 font-medium mb-1 text-sm">
              {props.college}
            </p>
            <p className="text-gray-600 mb-3 text-sm">{props.location}</p>

            <div className="flex flex-wrap gap-1 mb-3">
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

            <div className="flex space-x-2 w-32 justify-between ">
              <Instagram className="w-5 h-5 text-teal-500 hover:text-pink-500 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-teal-500 hover:text-blue-600 cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-teal-500 hover:text-gray-800 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 group z-10">
        <button
          onClick={(e) => {
              e.stopPropagation(); // prevent navigation
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
            onClick={(e) => {
              e.stopPropagation(); // prevent navigation
              onStarToggle();
            }}
          />
        </button>
        {/* Tooltip */}
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 text-xs text-black bg-teal-200 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
          {props.starred ? "Unstar" : "Star Me !"}{" "}
        </span>
      </div>
    </div>
  );
}
