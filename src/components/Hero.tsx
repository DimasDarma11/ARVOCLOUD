import React from "react";
import { ArrowRight, Play, Server, Activity, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 py-24 mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Activity className="w-4 h-4 mr-2" />
            Cloud Infrastructure Next-Gen
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900"
          >
            Solusi Premium{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VPS & RDP
            </span>{" "}
            Untuk Profesional
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-10 max-w-xl"
          >
            Infrastruktur Cloud Cepat & Andal
            Jalankan VPS dan RDP performa tinggi dengan uptime terjamin dan dukungan teknis 24/7.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#pricing"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center"
            >
              Mulai Sekarang
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://wa.me/6283197183724?text=Halo,%20saya%20mau%20trial%20VPS/RDP"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Trial
            </a>
          </motion.div>
        </div>

        {/* Right side: Status Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-3 h-3 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-semibold text-gray-800">Server Online</span>
            </div>
            <Shield className="text-green-500 w-5 h-5" />
          </div>

          {/* Server metrics simplified */}
          <div className="space-y-5">
            {[
              { label: "CPU Load", value: "27%", color: "from-green-400 to-blue-500" },
              { label: "Memory Usage", value: "52%", color: "from-blue-400 to-purple-500" },
              { label: "Network", value: "14%", color: "from-purple-400 to-pink-500" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.label}</span>
                  <span className="font-medium text-gray-800">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                    animate={{ width: ["30%", "80%", "30%"] }}
                    transition={{
                      duration: 5 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Server stats footer */}
          <div className="grid grid-cols-3 text-center mt-8 border-t border-gray-200 pt-6">
            <div>
              <div className="text-2xl font-bold text-blue-600">99.8%</div>
              <div className="text-sm text-gray-500">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-500">Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">100+</div>
              <div className="text-sm text-gray-500">Clients</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
