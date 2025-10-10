import React from "react";
import { Mail, Phone, MapPin, MessageSquare, Clock } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const contacts = [
    {
      icon: Mail,
      color: "bg-blue-100 text-blue-600",
      title: "Email",
      desc: "Respons dalam 1–3 jam kerja",
      value: "arvocloudserver@gmail.com",
      link: "mailto:arvocloudserver@gmail.com",
    },
    {
      icon: MessageSquare,
      color: "bg-green-100 text-green-600",
      title: "WhatsApp",
      desc: "Chat langsung dengan tim kami",
      value: "Buka WhatsApp",
      link: "https://wa.me/6283197183724?text=Halo,%20saya%20ingin%20bertanya%20tentang%20layanan%20ARVOCLOUD",
    },
    {
      icon: Clock,
      color: "bg-blue-100 text-blue-600",
      title: "Dukungan 24/7",
      desc: "Kami siap melayani Anda setiap saat.",
      value: "Online Sekarang",
      link: null,
    },
    {
      icon: MapPin,
      color: "bg-gray-100 text-gray-600",
      title: "Lokasi",
      desc: "Global Data Center Network",
      value: "Jakarta • Singapore • USA",
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hubungi <span className="text-blue-600">Tim Kami</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tim support ARVOCLOUD siap membantu Anda kapan pun dibutuhkan —
            cepat, ramah, dan profesional.
          </p>
        </motion.div>

        {/* Contact Info */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contacts.map(({ icon: Icon, color, title, desc, value, link }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm mb-2">{desc}</p>
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  {value}
                </a>
              ) : (
                <span className="text-gray-700 font-medium">{value}</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Butuh bantuan lebih lanjut?
          </h3>
          <p className="text-gray-600 mb-6">
            Hubungi kami melalui WhatsApp atau email — tim kami tersedia 24 jam.
          </p>
          <a
            href="https://wa.me/6283197183724"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Hubungi Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
