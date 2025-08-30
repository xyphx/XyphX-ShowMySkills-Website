"use client";
import React, { useState, useEffect } from "react";
import DashPage from "@/components/home/home";
import Loader from "@/components/Loader";

export default function Page() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Dashboard is always rendered */}
      <DashPage />

      {/* Loader on top as overlay */}
      {showLoader && (
        <div className="absolute inset-0 z-50">
          <Loader />
        </div>
      )}
    </div>
  );
}
