import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

const NoticeModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem("noticeShown");
    if (!alreadyShown) {
      setTimeout(() => setShow(true), 800);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("noticeShown", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl w-full max-w-md p-8 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center justify-center mb-4"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                  <Info className="text-blue-700 w-6 h-6" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-semibold text-gray-900 mb-3"
              >
                Pemberitahuan Penting
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-sm text-gray-600 leading-relaxed mb-6"
              >
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
              </motion.p>

              <motion.div
                className="flex justify-center gap-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                <motion.a
                  href="#pricing"
                  onClick={handleClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                >
                  Lihat Paket
                </motion.a>
                <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="border border-gray-300 hover:bg-gray-100 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 transition-all"
                >
                  Tutup
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NoticeModal;
