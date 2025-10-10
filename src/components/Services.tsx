import React from "react";
import { Server, Monitor, Cpu, Settings } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Server,
      title: "Server VPS",
      desc: "Server virtual cepat dan stabil dengan akses penuh root, ideal untuk bisnis dan pengembangan.",
      iconBg: "from-blue-600 to-blue-600",
    },
    {
      icon: Monitor,
      title: "Server RDP",
      desc: "Akses desktop Windows jarak jauh dengan performa tinggi dan koneksi stabil (tidak mendukung emulator).",
      iconBg: "from-sky-600 to-sky-600",
    },
    {
      icon: Cpu,
      title: "Bare Metal",
      desc: "Server fisik dedicated untuk performa maksimal — cocok untuk emulator dan aplikasi berat.",
      iconBg: "from-gray-600 to-gray-600",
    },
    {
      icon: Settings,
      title: "Custom Spesifikasi",
      desc: "Konfigurasi server fleksibel sesuai kebutuhan bisnis atau proyek Anda.",
      iconBg: "from-slate-600 to-slate-600",
    },
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="container mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Layanan Kami
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
          Solusi infrastruktur modern untuk segala kebutuhan — cepat, aman, dan dapat diandalkan.
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, title, desc, iconBg }, i) => (
            <div
              key={i}
              className="group p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 mb-5 rounded-xl text-white bg-gradient-to-r ${iconBg} group-hover:scale-105 transition-transform duration-300`}
              >
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
