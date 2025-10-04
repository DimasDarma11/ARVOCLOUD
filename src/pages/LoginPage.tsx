import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Welcome back, ${email}! 🚀`);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute w-80 h-80 bg-white/10 rounded-full top-10 left-10 animate-pulse blur-3xl"></div>
      <div className="absolute w-96 h-96 bg-white/5 rounded-full bottom-10 right-10 animate-bounce blur-3xl"></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20"
      >
        <h1 className="text-4xl font-extrabold text-white text-center drop-shadow-lg mb-6">
          Welcome Back
        </h1>
        <p className="text-white/80 text-center mb-8">
          Log in to access your dashboard and services
        </p>

        {/* Form */}
        <div className="space-y-4">
          <motion.div
            whileFocus={{ scale: 1.05 }}
            className="relative flex items-center bg-white/80 rounded-xl p-2"
          >
            <User className="text-gray-600 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
            />
          </motion.div>

          <motion.div
            whileFocus={{ scale: 1.05 }}
            className="relative flex items-center bg-white/80 rounded-xl p-2"
          >
            <Lock className="text-gray-600 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
            />
          </motion.div>
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          disabled={isSubmitting}
          className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </motion.button>

        {/* Extra Links */}
        <div className="mt-6 flex justify-between text-sm text-white/70">
          <a href="#" className="hover:text-white">Forgot password?</a>
          <a href="#" className="hover:text-white">Sign up</a>
        </div>
      </motion.div>

      {/* Footer */}
      <p className="absolute bottom-5 text-white/50 text-sm">© 2025 ARVOCLOUD</p>
    </div>
  );
}


