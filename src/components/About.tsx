import React from "react";
import { Shield, Headphones, Globe, Users, Clock, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      desc: "Perlindungan DDoS, firewall aktif, dan monitoring 24/7 untuk menjaga data Anda.",
    },
    {
      icon: Headphones,
      title: "Dukungan 24/7",
      desc: "Tim kami siap membantu kapan pun Anda butuh bantuan teknis atau konsultasi.",
    },
    {
      icon: Globe,
      title: "Jaringan Global",
      desc: "Server di lokasi strategis memastikan koneksi cepat dan stabil di seluruh dunia.",
    },
  ];

  const stats = [
    { icon: Users, number: "100+", label: "Pelanggan Aktif" },
    { icon: Clock, number: "99.8%", label: "Uptime Terjamin" },
    { icon: Award, number: "2+", label: "Tahun Pengalaman" },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mengapa{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ARVOCLOUD
            </span>
            ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan solusi cloud yang cepat, aman, dan stabil — dirancang untuk mendukung bisnis modern Anda berkembang tanpa batas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map(({ icon: Icon, number, label }, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm text-center"
            >
              <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">{number}</div>
              <div className="text-gray-600 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
