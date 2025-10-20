import React from "react";
import { Server, Monitor, Cpu, Settings } from "lucide-react";

const Services: React.FC = () => {
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
      className="relative py-28 overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]"
    >
      {/* Ambient light blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float-delay" />
      </div>

      <div className="relative container mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 drop-shadow-sm">
          <span className="bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
            Layanan Kami
          </span>
        </h2>
        <p className="text-gray-600/90 text-lg max-w-2xl mx-auto mb-20">
          Infrastruktur yang stabil, efisien, dan bisa diandalkan.
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="group relative p-6 md:p-8 rounded-3xl bg-white/25 backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:shadow-[0_12px_48px_0_rgba(31,38,135,0.15)] transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-white/40 backdrop-blur-xl shadow-inner ring-1 ring-white/40 group-hover:scale-105 transition-transform duration-300">
                <Icon className="h-8 w-8 text-gray-700/90" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
              <p className="text-gray-600/90 text-sm leading-relaxed">{desc}</p>

              {/* Soft hover overlay */}
              <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(20px); opacity: 0.8; }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-20px); opacity: 0.9; }
        }
        .animate-float { animation: float 12s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 10s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Services;
