import { Search, Star, Instagram, Linkedin, Github, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-teal-600 text-white py-12  mt-16">
        <div className="w-[90%] mx-auto px-16">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Skillora</h2>
              <div className="space-y-2">
                <a href="#" className="block hover:text-emerald-200 transition-colors">Get Started</a>
                <a href="#" className="block hover:text-emerald-200 transition-colors">Learn More</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Social Links</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 flex items-center justify-center font-bold text-xs">X</span>
                  <span>X</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }