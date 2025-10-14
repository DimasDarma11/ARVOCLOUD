import React from "react";
import { Shield, Headphones, Globe, Users, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      desc: "Perlindungan DDoS, firewall aktif, dan sistem monitoring 24/7 untuk menjaga data Anda tetap aman.",
    },
    {
      icon: Headphones,
      title: "Dukungan 24/7",
      desc: "Tim support kami selalu siap membantu, kapan pun Anda membutuhkan bantuan atau konsultasi.",
    },
    {
      icon: Globe,
      title: "Jaringan Global",
      desc: "Lokasi server strategis di berbagai wilayah memastikan koneksi cepat dan stabil di seluruh dunia.",
    },
  ];

  const stats = [
    { icon: Users, number: "50+", label: "Pelanggan Aktif" },
    { icon: Clock, number: "99.8%", label: "Uptime Terjamin" },
    { icon: Award, number: "1+", label: "Tahun Pengalaman" },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-[#f1f5f9] via-[#e2e8f0] to-[#e0e7ef] backdrop-blur-xl relative overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center mb-16 px-6"
      >
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
          Mengapa{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-600">
            ArvoCloud
          </span>
          ?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Kami menghadirkan infrastruktur cloud berperforma tinggi yang dirancang
          untuk kecepatan, keamanan, dan kestabilan maksimal.
        </p>
      </motion.div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 mb-16">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-gray-200/60 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-300"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100/60 text-blue-600 mx-auto mb-5">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2 text-center">
              {title}
            </h3>
            <p className="text-gray-600 text-sm text-center leading-relaxed">
              {desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto px-6"
      >
        {stats.map(({ icon: Icon, number, label }, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-white/50 backdrop-blur-lg border border-gray-200 text-center shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-semibold text-gray-900">{number}</div>
            <div className="text-gray-600 text-sm mt-1">{label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default About;
