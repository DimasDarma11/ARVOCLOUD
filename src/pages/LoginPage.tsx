import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [timeLeft, setTimeLeft] = useState(60 * 60 * 24); // 24 jam countdown
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = () => {
    alert(`Terima kasih! Email ${email} akan mendapat notifikasi 🚀`);
    setEmail("");
  };

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-800 to-pink-700 overflow-hidden text-white">
      
      {/* Animated Gradient Blobs */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-white/10 top-10 left-1/4 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div 
        className="absolute w-80 h-80 rounded-full bg-white/5 bottom-10 right-1/4 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Glassmorphic Card */}
      <motion.div
        className="z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-xl border border-white/20 max-w-md w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4 animate-pulse">🚧 Coming Soon 🚧</h1>
        <p className="text-lg opacity-80 mb-6">Login Page sedang dipersiapkan</p>

        {/* Countdown */}
        <motion.div 
          className="flex justify-center space-x-4 text-3xl font-mono mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <span>{hours}h</span> : <span>{minutes}m</span> : <span>{seconds}s</span>
        </motion.div>

        {/* Email Notify Form */}
        <div className="flex shadow-lg rounded-full overflow-hidden">
          <input
            type="email"
            value={email}
            placeholder="Masukkan email kamu"
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 text-black focus:outline-none"
          />
          <motion.button
            onClick={handleSubscribe}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 bg-yellow-400 text-black font-semibold"
          >
            Notify Me
          </motion.button>
        </div>
      </motion.div>

      {/* Footer */}
      <p className="absolute bottom-5 text-sm opacity-70">© 2025 ARVOCLOUD</p>
    </div>
  );
}

