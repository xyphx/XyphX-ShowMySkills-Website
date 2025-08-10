"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import HomePage from "@/components/Homepage";

export default function Home() {
  
  const { user, loading } = useAuth();
  const router = useRouter();

  //useEffect to handle redirection based on auth state
  useEffect(() => {
    if (!loading && user) {
      // If user is logged in, redirect to dashboard
      router.push('/home');
    }
    // Remove the automatic redirect to /auth for non-logged-in users
  }, [user, loading, router]);

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show homepage for non-logged-in users, redirect logged-in users to dashboard
  return (
    <div>
      <HomePage />
    </div>
  );
}
