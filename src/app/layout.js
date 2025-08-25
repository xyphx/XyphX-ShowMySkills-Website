"use client"
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";


const monaSans = Mona_Sans({
  variable: '--font-mona-sans', // You can name this whatever you prefer, e.g., '--font-mona-sans'
  subsets: ['latin'],
  display: 'swap', // Recommended for performance
});



export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for all images to load
    const handleLoad = () => setLoading(false);
    const images = Array.from(document.images);
    if (images.length === 0) {
      setLoading(false);
      return;
    }
    let loadedCount = 0;
    images.forEach(img => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount === images.length) handleLoad();
        });
        img.addEventListener('error', () => {
          loadedCount++;
          if (loadedCount === images.length) handleLoad();
        });
      }
    });
    if (loadedCount === images.length) handleLoad();
    // Cleanup listeners
    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleLoad);
      });
    };
  }, []);

  return (
    <html lang="en">
      <body className={`${monaSans.variable} antialiased`}>
        {loading && <Preloader />}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
