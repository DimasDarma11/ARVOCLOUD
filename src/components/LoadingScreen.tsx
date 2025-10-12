import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-white via-gray-50 to-gray-100"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40"
            initial={{ scale: 0.9, opacity: 0.2 }}
            animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src="https://i.ibb.co/VWzggVqJ/Arvocloud1.png"
            alt="ArvoCloud Logo"
            className="h-16 w-auto mb-4 opacity-90"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <motion.div
            className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-700 to-slate-700 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            className="text-gray-500 text-sm tracking-wide font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Memuat <span className="text-blue-700 font-semibold">ArvoCloud</span>...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
