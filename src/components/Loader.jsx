import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#4b9c93] z-50">
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0"
        initial={{ height: "0%" }}
        animate={{ height: "500%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(to bottom, #FFF8F0, #45A3A2)",
        }}
      ></motion.div>

      {/* Loader image */}
      <img
        src="/loader.png"
        alt="Loader"
        className="w-24 h-24 z-10 mb-4"
      />
    <motion.div
        className="text-teal-600 text-xl font-bold z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: .9 }}
        transition={{ duration: 1, ease: "easeIn"}}
      >
        &nbsp;{progress}%
      </motion.div>
      
    </div>
  );
}
