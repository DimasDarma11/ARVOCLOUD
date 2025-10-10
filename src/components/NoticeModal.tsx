import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

const NoticeModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem("noticeShown");
    if (!alreadyShown) {
      setTimeout(() => setShow(true), 800); // muncul agak lambat biar smooth
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("noticeShown", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-gray-900/95 text-white p-7 rounded-2xl shadow-2xl w-[90%] max-w-md border border-gray-700 relative"
          >
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="text-cyan-400 w-8 h-8 mr-2" />
              <h2 className="text-xl font-semibold text-cyan-400">
                Pemberitahuan
              </h2>
            </div>

            <p className="text-sm text-gray-300 text-center mb-6 leading-relaxed">
              Untuk kebutuhan <span className="font-medium text-white">emulator, game, atau Roblox</span>,  
              silakan pilih paket <span className="font-semibold text-cyan-400">Baremetal</span>.
              <br />
              <span className="text-gray-400">
                RDP & VPS tidak mendukung emulator/game.
              </span>
            </p>

            <div className="flex justify-center space-x-3">
              <motion.a
                href="#pricing"
                onClick={handleClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
              >
                Lihat Harga
              </motion.a>
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-500 hover:bg-gray-800 px-5 py-2.5 rounded-lg text-sm font-medium transition-all text-gray-300"
              >
                Tutup
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoticeModal;
