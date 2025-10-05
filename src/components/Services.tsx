import React from 'react';
import { Server, Monitor, Cpu, Settings, Shield, Zap, Globe } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Server,
      title: "VPS Hosting",
      desc: "Server virtual performa tinggi dengan akses root penuh dan uptime 99.9%.",
      color: "from-blue-500 to-indigo-500",
      link: "#pricing",
    },
    {
      icon: Monitor,
      title: "Server RDP",
      desc: "Akses desktop Windows jarak jauh dengan koneksi cepat dan stabil.",
      color: "from-purple-500 to-fuchsia-500",
      link: "#pricing",
    },
    {
      icon: Cpu,
      title: "Bare Metal RDP",
      desc: "Server dedicated dengan kontrol penuh dan performa maksimal.",
      color: "from-pink-500 to-rose-500",
      link: "#pricing",
    },
    {
      icon: Settings,
      title: "Solusi Kustom",
      desc: "Konfigurasi server fleksibel sesuai kebutuhan bisnis Anda.",
      color: "from-emerald-500 to-green-500",
      link: "#contact",
    },
  ];

  const extras = [
    {
      icon: Shield,
      title: "Keamanan Enterprise",
      desc: "Perlindungan DDoS, firewall aktif, dan monitoring real-time.",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: Zap,
      title: "Performa Super Cepat",
      desc: "SSD premium dan jaringan global untuk koneksi optimal.",
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: Globe,
      title: "Jaringan Global",
      desc: "Data center di berbagai wilayah dengan latency rendah.",
      color: "text-pink-600 bg-pink-50",
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
          Infrastruktur cloud modern dengan keandalan, kecepatan, dan keamanan terbaik untuk mendukung bisnis Anda.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, title, desc, color, link }, i) => (
            <div
              key={i}
              className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 text-white bg-gradient-to-r ${color}`}
              >
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 mb-6">{desc}</p>
              <a
                href={link}
                className={`inline-block bg-gradient-to-r ${color} text-white px-5 py-2 rounded-lg font-medium hover:shadow-md transition-transform hover:scale-105`}
              >
                Selengkapnya
              </a>
            </div>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-10">
          {extras.map(({ icon: Icon, title, desc, color }, i) => (
            <div key={i} className="text-center">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${color}`}>
                <Icon className="h-10 w-10" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
              <p className="text-gray-600 max-w-sm mx-auto">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
