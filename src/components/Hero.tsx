import React, { useState, useEffect } from "react";
import { ArrowRight, Play, Activity, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import NoticeModal from "./NoticeModal";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({ cpu: 27, mem: 52, net: 14 });
  const status = "online";

  useEffect(() => {
    const hasSeenNotice = localStorage.getItem("hasSeenNotice");
    if (!hasSeenNotice) {
      setShowModal(true);
      localStorage.setItem("hasSeenNotice", "true");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        cpu: Math.min(100, Math.max(5, prev.cpu + (Math.random() * 10 - 5))),
        mem: Math.min(100, Math.max(10, prev.mem + (Math.random() * 8 - 4))),
        net: Math.min(100, Math.max(3, prev.net + (Math.random() * 6 - 3))),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NoticeModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <section
        id="home"
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]"
      >
        {/* Ambient light blur */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-32 left-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"
            animate={{ y: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-32 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"
            animate={{ y: [0, -20, 0], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center backdrop-blur-md bg-white/30 px-4 py-2 rounded-full text-sm font-medium text-gray-800/80 shadow-inner ring-1 ring-white/40 mb-6">
              <Activity className="w-4 h-4 mr-2 text-blue-600" />
              Infrastruktur Cloud Handal
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-800/90 drop-shadow-sm">
              Solusi{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                VPS & RDP Premium
              </span>{" "}
              untuk bisnis anda.
            </h1>

            <p className="text-lg text-gray-600/90 mb-10 max-w-xl mx-auto lg:mx-0">
              Rasakan performa tinggi, uptime 99.8%, dan dukungan 24/7. Infrastruktur modern untuk kebutuhan bisnis, developer, dan kreator.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#pricing"
                className="group bg-white/60 backdrop-blur-xl shadow-lg ring-1 ring-white/40 hover:ring-blue-400/50 text-gray-900 px-8 py-4 rounded-2xl text-lg font-semibold transition-all flex items-center justify-center"
              >
                Mulai Sekarang
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-blue-600" />
              </a>

              <a
                href="https://wa.me/6283197183724?text=Halo,%20saya%20mau%20trial%20VPS/RDP"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-gray-300/70 hover:border-blue-500/70 text-gray-700/90 hover:text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold backdrop-blur-lg transition-all flex items-center justify-center"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Trial
              </a>
            </div>
          </motion.div>

          {/* Right Glass Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="relative backdrop-blur-2xl bg-white/25 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] rounded-3xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    status === "online"
                      ? "bg-emerald-400 animate-pulse"
                      : "bg-red-400"
                  }`}
                />
                <span className="font-medium text-gray-700/90">
                  {status === "online" ? "Server Aktif" : "Server Offline"}
                </span>
              </div>
              <ShieldCheck
                className={`w-5 h-5 ${
                  status === "online" ? "text-emerald-500" : "text-red-500"
                }`}
              />
            </div>

            <div className="space-y-5">
              {[
                {
                  label: "CPU Load",
                  value: stats.cpu,
                  gradient: "from-emerald-300 to-emerald-500",
                },
                {
                  label: "Memory Usage",
                  value: stats.mem,
                  gradient: "from-blue-300 to-blue-500",
                },
                {
                  label: "Network",
                  value: stats.net,
                  gradient: "from-indigo-300 to-indigo-500",
                },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{item.label}</span>
                    <span className="font-medium text-gray-800/80">
                      {item.value.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200/60 overflow-hidden">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${item.gradient}`}
                      style={{ width: `${item.value}%` }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 text-center mt-8 border-t border-white/30 pt-6">
              <div>
                <div className="text-2xl font-bold text-blue-700">99.8%</div>
                <div className="text-sm text-gray-600/80">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">24/7</div>
                <div className="text-sm text-gray-600/80">Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-700">100+</div>
                <div className="text-sm text-gray-600/80">Clients</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
