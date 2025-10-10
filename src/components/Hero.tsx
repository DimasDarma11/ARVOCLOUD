import React from "react";
import { ArrowRight, Play, Activity, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100"
    >
      {/* Subtle blurred orbs (lebih lembut dan realistis) */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-16 left-24 w-56 h-56 bg-blue-100 rounded-full blur-3xl opacity-50"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-16 right-24 w-56 h-56 bg-purple-100 rounded-full blur-3xl opacity-50"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 py-20 mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Activity className="w-4 h-4 mr-2" />
            Infrastruktur Cloud Modern
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900"
          >
            Solusi Handal{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              VPS & RDP
            </span>{" "}
            untuk Profesional
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-10 max-w-xl"
          >
            Nikmati performa tinggi, uptime stabil, dan dukungan 24/7.
            Solusi cloud yang andal untuk kebutuhan bisnis maupun individu.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#pricing"
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md transition-all flex items-center justify-center"
            >
              Mulai Sekarang
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://wa.me/6283197183724?text=Halo,%20saya%20mau%20trial%20VPS/RDP"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Trial
            </a>
          </motion.div>
        </div>

        {/* Right side: Status Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-3 h-3 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span className="font-semibold text-gray-800">Server Online</span>
            </div>
            <Shield className="text-green-500 w-5 h-5" />
          </div>

          <div className="space-y-5">
            {[
              { label: "CPU Load", value: "27%", color: "from-green-500 to-blue-500" },
              { label: "Memory Usage", value: "52%", color: "from-blue-500 to-indigo-500" },
              { label: "Network", value: "14%", color: "from-indigo-500 to-purple-500" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.label}</span>
                  <span className="font-medium text-gray-800">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                    animate={{ width: ["30%", "70%", "30%"] }}
                    transition={{
                      duration: 6 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 text-center mt-8 border-t border-gray-200 pt-6">
            <div>
              <div className="text-2xl font-bold text-blue-600">99.8%</div>
              <div className="text-sm text-gray-500">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">24/7</div>
              <div className="text-sm text-gray-500">Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">100+</div>
              <div className="text-sm text-gray-500">Clients</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
