import React from "react";
import { Shield, Headphones, Globe, Users, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      desc: "Dilengkapi perlindungan DDoS, firewall aktif, dan sistem monitoring 24/7 untuk memastikan data Anda selalu aman.",
    },
    {
      icon: Headphones,
      title: "Dukungan 24/7",
      desc: "Tim support kami siap membantu setiap saat — baik untuk kendala teknis maupun konsultasi kebutuhan server Anda.",
    },
    {
      icon: Globe,
      title: "Jaringan Global",
      desc: "Lokasi server strategis di berbagai wilayah memastikan koneksi cepat dan stabil di seluruh dunia.",
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mengapa{" "}
            <span className="text-blue-600">
              ARVOCLOUD
            </span>
            ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami menghadirkan infrastruktur cloud berperforma tinggi dengan kecepatan, keamanan, dan stabilitas terbaik untuk mendukung bisnis digital Anda.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl hover:shadow-md transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {stats.map(({ icon: Icon, number, label }, i) => (
            <div
              key={i}
              className="bg-blue-50 p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-all duration-300 border border-blue-100"
            >
              <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">{number}</div>
              <div className="text-gray-600 text-sm mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
