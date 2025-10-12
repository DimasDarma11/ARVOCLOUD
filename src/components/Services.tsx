import React from "react";
import { Server, Monitor, Cpu, Settings } from "lucide-react";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      icon: Server,
      title: "Server VPS",
      desc: "Server virtual cepat dan stabil dengan akses penuh root — cocok untuk bisnis dan developer.",
    },
    {
      icon: Monitor,
      title: "Server RDP",
      desc: "Akses desktop Windows jarak jauh dengan performa tinggi dan koneksi stabil untuk kerja profesional.",
    },
    {
      icon: Cpu,
      title: "Bare Metal",
      desc: "Server fisik dedicated untuk performa maksimal dan kendali penuh atas hardware.",
    },
    {
      icon: Settings,
      title: "Custom Spesifikasi",
      desc: "Kustomisasi konfigurasi server sesuai kebutuhan proyek Anda, fleksibel dan efisien.",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-28 overflow-hidden bg-gradient-to-b from-[#e2e8f0] via-[#dbe2e8] to-[#cbd5e1]"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-32 left-24 w-72 h-72 bg-white/40 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 right-24 w-96 h-96 bg-slate-300/30 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative container mx-auto px-6 text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
        >
          <span className="bg-gradient-to-r from-gray-800 via-slate-700 to-gray-800 bg-clip-text text-transparent">
            Layanan Kami
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600/90 text-lg max-w-2xl mx-auto mb-20"
        >
          Infrastruktur yang stabil, efisien, dan bisa diandalkan.
        </motion.p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
              className="group relative p-8 rounded-3xl backdrop-blur-2xl bg-white/30 border border-white/50 shadow-[0_8px_32px_rgba(31,38,135,0.08)] hover:shadow-[0_12px_48px_rgba(31,38,135,0.15)] transition-all duration-500"
            >
              {/* Floating icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-white/60 backdrop-blur-xl shadow-inner ring-1 ring-white/40 group-hover:scale-105 transition-transform duration-300">
                <Icon className="h-7 w-7 text-gray-700/90" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {title}
              </h3>
              <p className="text-gray-600/90 text-sm leading-relaxed">
                {desc}
              </p>

              {/* Soft hover glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                layoutId={`hover-glow-${i}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
