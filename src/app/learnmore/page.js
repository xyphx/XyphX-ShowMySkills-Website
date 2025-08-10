"use client";
import { useRouter } from "next/navigation";
import { Star, Users, Trophy, Target, ArrowRight, CheckCircle } from "lucide-react";
import Nav from "@/components/Nav";

export default function LearnMore() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-teal-50">
      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16 md:py-24">
        <div className="max-w-4xl mx-auto flex justify-center items-center flex-col text-center">
            <img 
              src="/Logo.jpg" 
              alt="ShowMySkills Logo"
                className="h-32 w-auto mb-6"
            />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-teal-500">ShowMySkills</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Empowering the next generation of creators, developers, and innovators 
            to showcase their talents and connect with opportunities.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that talent deserves recognition. ShowMySkills is designed to 
                bridge the gap between skilled individuals and those seeking their expertise. 
                Whether you're a developer, designer, writer, or any other creative professional, 
                our platform gives you the tools to shine.
              </p>
              <div className="flex items-center space-x-2 text-teal-600">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Connecting talent with opportunity</span>
              </div>
            </div>
            <div className="relative items-end flex justify-center">
              <img 
                src="/learn1.jpg" 
                alt="Innovation" 
                className="w-[80%] h-auto left-0 rounded-lg "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600">
                Built by creators, for creators. Our platform thrives on community 
                interaction and peer recognition.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Merit-Based Ranking</h3>
              <p className="text-gray-600">
                Our star rating system ensures that quality work gets the recognition 
                it deserves through authentic peer reviews.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600 fill-current" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Skill Showcase</h3>
              <p className="text-gray-600">
                Create detailed portfolios that highlight your skills, projects, 
                and achievements in an engaging format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Profile</h3>
              <p className="text-gray-600 text-sm">
                Sign up and build your professional profile with skills and projects.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Showcase Work</h3>
              <p className="text-gray-600 text-sm">
                Upload your best projects and describe your skills in detail.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Discovered</h3>
              <p className="text-gray-600 text-sm">
                Connect with peers and get starred by the community.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Network</h3>
              <p className="text-gray-600 text-sm">
                Grow your professional network and unlock new opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16 bg-teal-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Authenticity</h3>
                <p className="text-gray-600">
                  We believe in genuine talent recognition and authentic peer reviews.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Inclusivity</h3>
                <p className="text-gray-600">
                  Every skill and talent deserves a platform to shine, regardless of background.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously evolve our platform to better serve our community.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth</h3>
                <p className="text-gray-600">
                  We support continuous learning and professional development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Company Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powered by <span className="text-purple-600">XyphX</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the visionary company behind ShowMySkills
            </p>
          </div>
          
          <div className="bg-[#FFF8F0] rounded-2xl p-8 md:p-12 shadow-black/30  shadow-inner">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                {/* Logo Placeholder - Replace with actual XyphX logo */}
                <div className="mb-6 flex justify-center md:justify-start">
                  <div className="w-32 h-32 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                    
                    <img src="/logo_dark.png" alt="XyphX Logo" className="h-[90%] w-auto object-contain" />
                   
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Transforming Vision into Reality
                </h3>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  XyphX is a budding, service-based tech company with a bold ambition — to transform 
                  into a revolutionary tech product powerhouse. We're building technology-driven 
                  solutions that are smart, futuristic, and ready to redefine industries.
                </p>
                
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Our journey began with a vision to bridge the gap between current technology and 
                  the vast, untapped potential of digital innovation. Today, we stand at the forefront 
                  of progress, crafting solutions that not only meet today's demands but are designed 
                  with tomorrow in mind.
                </p>
                
                <a
                  href="https://www.xyphx.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-800 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  <span>Visit XyphX</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-xl p-6 shadow-xl">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">Tech</div>
                      <div className="text-sm text-gray-600">Innovation</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">Future</div>
                      <div className="text-sm text-gray-600">Ready</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">Smart</div>
                      <div className="text-sm text-gray-600">Solutions</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-1">Bold</div>
                      <div className="text-sm text-gray-600">Vision</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-2">Building the future, one innovation at a time</div>
                    <div className="flex justify-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Showcase Your Skills?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who are already building their professional presence.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
          >
            <span>Get Started Today</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-8 bg-white border-t">
        <div className="max-w-6xl mx-auto text-center">
          <img src="/Logo.jpg" alt="ShowMySkills Logo" className="h-8 w-auto object-contain mx-auto mb-4" />
          <p className="text-gray-600">
            © 2025 ShowMySkills. Empowering creators worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}
