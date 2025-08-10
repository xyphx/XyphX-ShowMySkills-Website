"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Users, Star, Briefcase, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-teal-600">ShowMySkills</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A platform where students and professionals can showcase their skills, experience, 
              and achievements to build their digital presence and connect with opportunities.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-teal-50 p-6 rounded-2xl text-center">
              <Users className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Your Profile</h3>
              <p className="text-gray-600">Create a comprehensive profile showcasing your skills and achievements.</p>
            </div>
            
            <div className="bg-emerald-50 p-6 rounded-2xl text-center">
              <Star className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Recognition</h3>
              <p className="text-gray-600">Receive stars from peers and build your reputation in the community.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl text-center">
              <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Experience</h3>
              <p className="text-gray-600">Document your work experience, projects, and professional journey.</p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-2xl text-center">
              <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Showcase Achievements</h3>
              <p className="text-gray-600">Highlight your certifications, awards, and notable accomplishments.</p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-100 rounded-3xl p-8 md:p-12 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                We believe everyone has unique skills and talents worth showcasing. ShowMySkills provides 
                a platform for students, professionals, and creators to build their digital portfolio, 
                connect with like-minded individuals, and discover new opportunities.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🎯 Purpose-Driven</h3>
                  <p className="text-gray-600">Help individuals build meaningful professional profiles.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🌐 Community-Focused</h3>
                  <p className="text-gray-600">Foster connections and collaboration among users.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🚀 Growth-Oriented</h3>
                  <p className="text-gray-600">Enable career advancement and skill development.</p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Profile</h3>
                <p className="text-gray-600">Sign up and build your comprehensive profile with skills, experience, and achievements.</p>
              </div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Share & Connect</h3>
                <p className="text-gray-600">Share your profile, connect with others, and star profiles that inspire you.</p>
              </div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Grow Together</h3>
                <p className="text-gray-600">Build your reputation, discover opportunities, and advance your career.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-teal-600 text-white rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Show Your Skills?</h2>
            <p className="text-xl text-teal-100 mb-8">Join thousands of professionals building their digital presence.</p>
            <Link
              href="/auth"
              className="inline-block bg-white text-teal-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
