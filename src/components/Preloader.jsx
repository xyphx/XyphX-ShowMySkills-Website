"use client"
import React from "react";

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500 border-b-4"></div>
      <span className="ml-4 text-teal-600 font-semibold text-lg">Loading...</span>
    </div>
  );
}