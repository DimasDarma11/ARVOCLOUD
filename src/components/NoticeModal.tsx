import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

const NoticeModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-none md:backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Modal container */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-none md:backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md md:shadow-xl w-full max-w-md p-6 md:p-8 text-center"
            >
              {/* Icon */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                  <Info className="text-blue-700 w-6 h-6" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Pemberitahuan Penting
              </h2>

              {/* Content */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Untuk kebutuhan{" "}
                <span className="font-semibold text-gray-900">
                  emulator, game, atau Roblox
                </span>{" "}
                silakan gunakan paket{" "}
                <span className="font-semibold text-blue-700">Baremetal</span>.
                <br />
                <span className="text-gray-500">
                  RDP & VPS Standar tidak mendukung penggunaan emulator atau game.
                </span>
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-3">
                <a
                  href="#pricing"
                  onClick={handleClose}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95"
                >
                  Lihat Paket
                </a>
                <button
                  onClick={handleClose}
                  className="border border-gray-300 hover:bg-gray-100 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 transition-all active:scale-95"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NoticeModal;
