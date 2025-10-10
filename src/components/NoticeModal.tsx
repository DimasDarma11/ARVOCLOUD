import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

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
          {/* Backdrop animasi */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Modal box */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.95, filter: "blur(6px)" }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{ y: 40, opacity: 0, scale: 0.95, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-gray-900/95 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 shadow-[0_0_25px_rgba(0,0,0,0.25)]"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center mb-5"
              >
                <AlertCircle className="text-blue-400 w-8 h-8 mr-2" />
                <h2 className="text-2xl font-semibold text-blue-400">
                  Pemberitahuan
                </h2>
              </motion.div>

              {/* Text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-300 text-center mb-7 leading-relaxed"
              >
                Untuk kebutuhan{" "}
                <span className="font-medium text-white">
                  emulator, game, atau Roblox
                </span>
                , silakan pilih paket{" "}
                <span className="font-semibold text-blue-400">Baremetal</span>.
                <br />
                <span className="text-gray-400">
                  RDP & VPS Standar tidak mendukung emulator/game.
                </span>
              </motion.p>

              {/* Tombol muncul bertahap */}
              <motion.div
                className="flex justify-center space-x-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
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
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                >
                  Lihat Harga
                </motion.a>
                <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="border border-gray-500 hover:bg-gray-800 px-5 py-2.5 rounded-lg text-sm font-medium transition-all text-gray-300"
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
