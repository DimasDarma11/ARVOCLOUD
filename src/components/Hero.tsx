import React, { useState, useEffect } from "react";
import { ArrowRight, Play, Activity, Shield } from "lucide-react";
import { motion } from "framer-motion";
import NoticeModal from "./NoticeModal";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    cpu: 27,
    mem: 52,
    net: 14,
  });

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
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-40"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-24 right-24 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-40"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>


      <div className="container relative z-10 px-6 py-20 mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Activity className="w-4 h-4 mr-2" />
            Infrastruktur Cloud Handal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900"
          >
            Solusi{" "}
            <span className="bg-gradient-to-r from-blue-700 to-slate-700 bg-clip-text text-transparent">
              VPS & RDP Premium
            </span>{" "}
            untuk bisnis anda
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-10 max-w-xl"
          >
            Rasakan performa tinggi, uptime 99.8%, dan dukungan 24/7.
            Infrastruktur modern untuk kebutuhan bisnis, developer, dan kreator.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#pricing"
              className="group bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md transition-all flex items-center justify-center"
            >
              Mulai Sekarang
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://wa.me/6283197183724?text=Halo,%20saya%20mau%20trial%20VPS/RDP"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 border-gray-300 hover:border-blue-700 text-gray-700 hover:text-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Trial
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="font-semibold text-gray-800">Server Online</span>
            </div>
            <Shield className="text-green-500 w-5 h-5" />
          </div>

          <div className="space-y-5">
            {[
              { label: "CPU Load", value: stats.cpu, color: "bg-green-500" },
              { label: "Memory Usage", value: stats.mem, color: "bg-blue-500" },
              { label: "Network", value: stats.net, color: "bg-slate-500" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.label}</span>
                  <span className="font-medium text-gray-800">
                    {item.value.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.value}%`, transition: "width 1s ease-in-out" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 text-center mt-8 border-t border-gray-200 pt-6">
            <div>
              <div className="text-2xl font-bold text-blue-700">99.8%</div>
              <div className="text-sm text-gray-500">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-700">24/7</div>
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
   </>
  );
};

export default Hero;
