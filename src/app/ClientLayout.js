"use client";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowLoader(true);
    setFadeOut(false);
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowLoader(false), 500); // 500ms fade duration
    }, 4000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AuthProvider>
      {children}
      {showLoader && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'auto',
          transition: 'opacity 0.5s',
          opacity: fadeOut ? 0 : 1
        }}>
          <Loader />
        </div>
      )}
    </AuthProvider>
  );
}
