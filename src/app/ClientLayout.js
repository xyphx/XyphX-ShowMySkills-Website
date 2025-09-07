"use client";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const [showLoader, setShowLoader] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {showLoader && <Loader />}
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
