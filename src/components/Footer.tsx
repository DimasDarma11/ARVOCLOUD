import React from 'react';
import { Server, Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Github, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <Server className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ARVOCLOUD</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Layanan cloud premium dengan performa cepat, keamanan terjamin, dan dukungan profesional 24/7 untuk kebutuhan bisnis Anda.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/dimazdarmaa" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 p-2 rounded-lg transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com/jagoanneon44" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 p-2 rounded-lg transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-lg font-bold mb-6">Layanan</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">VPS Hosting</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">RDP Server</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Bare Metal RDP</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Solusi Kustom</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Dukungan 24/7</a></li>
            </ul>
          </div>

          {/* Dukungan */}
          <div>
            <h3 className="text-lg font-bold mb-6">Dukungan</h3>
            <ul className="space-y-3">
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status Sistem</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-bold mb-6">Info Kontak</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">support@arvocloud.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">+62 831-9718-3724</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">Global Data Center</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Dukungan 24/7</h4>
              <p className="text-sm text-gray-400">
                Tim dukungan ahli kami siap membantu Anda kapan saja, 24 jam nonstop.
              </p>
            </div>
          </div>
        </div>

        {/* Bawah */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="text-gray-400 text-center md:text-left">
              <p>&copy; 2025 ARVOCLOUD. Hak cipta dilindungi.</p>
            </div>
            <div className="flex justify-center md:justify-end space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Kebijakan Privasi</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Syarat & Ketentuan</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Kebijakan Cookie</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

