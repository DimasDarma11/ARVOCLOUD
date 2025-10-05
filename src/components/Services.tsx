import React from "react";
import { Server, Monitor, Cpu, Settings } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Server,
      title: "VPS Hosting",
      desc: "Server virtual cepat dan stabil dengan akses penuh.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Monitor,
      title: "Server RDP",
      desc: "Akses desktop Windows jarak jauh berkecepatan tinggi.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Cpu,
      title: "Bare Metal",
      desc: "Performa maksimal dengan server dedicated.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Settings,
      title: "Solusi Kustom",
      desc: "Konfigurasi server fleksibel sesuai kebutuhan Anda.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Layanan Kami
          </span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
          Solusi server modern dengan kecepatan, keamanan, dan fleksibilitas terbaik.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, title, desc, color }, i) => (
            <div
              key={i}
              className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 mb-5 rounded-xl text-white bg-gradient-to-r ${color}`}
              >
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

