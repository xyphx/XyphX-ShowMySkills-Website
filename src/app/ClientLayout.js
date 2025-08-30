"use client";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    const images = Array.from(document.images);

    if (images.length === 0) {
      setLoading(false);
      return;
    }

    let loadedCount = 0;
    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === images.length) handleLoad();
        });
        img.addEventListener("error", () => {
          loadedCount++;
          if (loadedCount === images.length) handleLoad();
        });
      }
    });
    if (loadedCount === images.length) handleLoad();

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleLoad);
      });
    };
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
