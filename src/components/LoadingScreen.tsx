import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-slate-100 via-white to-slate-200"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Glow Aura */}
          <motion.div
            className="absolute w-72 h-72 bg-blue-400/40 rounded-full blur-3xl"
            initial={{ scale: 0.8, opacity: 0.2 }}
            animate={{
              scale: [0.9, 1.05, 0.9],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo */}
          <motion.div
            className="relative flex items-center justify-center bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg shadow-blue-300/30 px-10 py-6"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src="https://i.ibb.co/VWzggVqJ/Arvocloud1.png"
              alt="ArvoCloud Logo"
              className="h-14 w-auto drop-shadow-[0_0_12px_rgba(37,99,235,0.5)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="w-44 h-1.5 bg-white/40 rounded-full overflow-hidden mt-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.7)]"
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Text */}
          <motion.p
            className="text-slate-600 text-sm tracking-wide font-medium mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Memuat{" "}
            <span className="font-semibold text-blue-700 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]">
              ArvoCloud
            </span>
            ...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
