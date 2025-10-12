import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Glow Aura */}
          <motion.div
            className="absolute w-[30rem] h-[30rem] bg-blue-400/30 rounded-full blur-[120px]"
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{
              scale: [0.9, 1.1, 0.9],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo Card */}
          <motion.div
            className="relative flex items-center justify-center bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-xl shadow-blue-300/40 px-14 py-8"
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src="https://i.ibb.co/VWzggVqJ/Arvocloud1.png"
              alt="ArvoCloud Logo"
              className="h-24 w-auto drop-shadow-[0_0_25px_rgba(59,130,246,0.45)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="w-64 h-2 bg-white/40 rounded-full overflow-hidden mt-10 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.7)]"
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Text */}
          <motion.p
            className="text-slate-700 text-base tracking-wide font-medium mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            Memuat{" "}
            <span className="font-semibold text-blue-700 drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]">
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
