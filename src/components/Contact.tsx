import React from "react";
import { Mail, Phone, MapPin, MessageSquare, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hubungi{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tim Kami
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tim support ARVOCLOUD siap membantu Anda kapan pun dibutuhkan —
            cepat, ramah, dan profesional.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-xl hover:shadow-sm transition">
            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 text-sm mb-3">Respons dalam 1–3 jam kerja</p>
            <a
              href="mailto:arvocloudserver@gmail.com"
              className="text-blue-600 font-medium hover:underline"
            >
              arvocloudserver@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-xl hover:shadow-sm transition">
            <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600 text-sm mb-3">Chat cepat dengan tim kami</p>
            <a
              href="https://wa.me/6283197183724?text=Halo,%20saya%20ingin%20bertanya%20tentang%20layanan%20ARVOCLOUD"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 font-medium hover:underline"
            >
              Buka WhatsApp
            </a>
          </div>

          <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-xl hover:shadow-sm transition">
            <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Dukungan 24/7</h3>
            <p className="text-gray-600 text-sm mb-3">
              Kami selalu siap melayani Anda setiap saat.
            </p>
            <span className="text-green-600 font-medium">Online Sekarang</span>
          </div>

          <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-xl hover:shadow-sm transition">
            <div className="bg-pink-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Lokasi</h3>
            <p className="text-gray-600 text-sm">Global Data Center Network</p>
            <span className="text-gray-500 text-sm">Jakarta • Singapore • USA </span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Butuh bantuan lebih lanjut?
          </h3>
          <p className="text-gray-600 mb-6">
            Tim kami dapat dihubungi 24/7 melalui WhatsApp atau email untuk dukungan cepat.
          </p>
          <a
            href="https://wa.me/6283197183724"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            Hubungi Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
