import React from 'react';
import { Server, Monitor, Cpu, Settings, Shield, Zap, Globe, HardDrive } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Server className="h-12 w-12" />,
      title: "VPS Hosting",
      description: "Server virtual privat dengan performa tinggi, akses root penuh, dan sumber daya terjamin.",
      features: ["Penyimpanan SSD", "Perlindungan DDoS", "Uptime 99.9%", "Akses Root Penuh"],
      color: "from-blue-500 to-blue-600",
      link: "#pricelist"
    },
    {
      icon: <Monitor className="h-12 w-12" />,
      title: "Server RDP",
      description: "Server Windows RDP untuk akses desktop jarak jauh dengan koneksi berkecepatan tinggi.",
      features: ["Windows Server", "Remote Desktop", "Akses Admin", "Dukungan 24/7"],
      color: "from-purple-500 to-purple-600",
      link: "#pricing"
    },
    {
      icon: <Cpu className="h-12 w-12" />,
      title: "Bare Metal RDP",
      description: "Server bare metal khusus untuk performa maksimal dan kontrol penuh.",
      features: ["Hardware Dedicated", "Konfigurasi Custom", "Performa Maksimal", "Akses Langsung"],
      color: "from-pink-500 to-pink-600"
      link: "#pricelist"
    },
    {
      icon: <Settings className="h-12 w-12" />,
      title: "Solusi Kustom",
      description: "Konfigurasi server sesuai kebutuhan bisnis Anda secara spesifik.",
      features: ["Spesifikasi Kustom", "Paket Fleksibel", "Skalabilitas Tinggi", "Dukungan Ahli"],
      color: "from-green-500 to-green-600"
      link: "#about"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Layanan</span> Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solusi infrastruktur cloud yang lengkap, dirancang untuk mendukung bisnis Anda dengan keandalan dan performa terbaik.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              <div className="p-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} text-white rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full bg-gradient-to-r ${service.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
                  Selengkapnya
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fitur Tambahan */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Keamanan Tingkat Enterprise</h3>
            <p className="text-gray-600">Keamanan perlindungan DDoS, firewall, dan pemantauan berkelanjutan.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Super Cepat</h3>
            <p className="text-gray-600">Penyimpanan SSD dan koneksi jaringan premium untuk performa optimal.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-pink-100 to-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="h-10 w-10 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Jaringan Global</h3>
            <p className="text-gray-600">Banyak data center di seluruh dunia memastikan latency rendah dan ketersediaan tinggi.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

