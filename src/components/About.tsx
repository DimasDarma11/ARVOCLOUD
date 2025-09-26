import React from 'react';
import { Award, Users, Clock, Headphones, Shield, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users className="h-8 w-8" />, number: "100+", label: "Happy Clients" },
    { icon: <Clock className="h-8 w-8" />, number: "99.8%", label: "Uptime Guarantee" },
    { icon: <Award className="h-8 w-8" />, number: "2+", label: "Years Experience" },
    { icon: <Globe className="h-8 w-8" />, number: "3+", label: "Data Centers" }
  ];

  const features = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Keamanan",
      description: "Keamanan berlapis dengan perlindungan DDoS, firewall, dan pemantauan berkelanjutan untuk menjaga keamanan data Anda."
    },
    {
      icon: <Headphones className="h-12 w-12" />,
      title: "Dukungan 24/7",
      description: "Tim dukungan teknis kami tersedia 24 jam untuk membantu Anda dengan masalah atau pertanyaan apa pun."
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Infrastruktur Global",
      description: "Beberapa pusat data di seluruh dunia memastikan latensi rendah dan ketersediaan tinggi untuk aplikasi Anda."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ARVOCLOUD</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Kami bukan sekadar penyedia hosting biasa. ARVOCLOUD menghadirkan infrastruktur cloud kelas perusahaan
dengan performa, dan keamanan untuk mendukung pertumbuhan bisnis Anda.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-xl flex-shrink-0">
                    <div className="text-blue-600">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-blue-600">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Untuk menyediakan solusi infrastruktur cloud yang andal, aman, dan berkinerja tinggi
yang memberdayakan bisnis untuk mencapai tujuan transformasi digital mereka.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Values */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <p className="text-lg text-gray-600">Prinsip-prinsip yang memandu semua yang kami lakukan</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Reliability</h4>
              <p className="text-gray-600">Kami menjamin waktu aktif 99,8% dengan sistem redundan dan pemantauan proaktif.</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Pelanggan Pertama</h4>
              <p className="text-gray-600">Kesuksesan Anda adalah prioritas kami. Kami menyediakan dukungan dan solusi yang dipersonalisasi.</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Inovasi</h4>
              <p className="text-gray-600">Kami terus berinvestasi dalam teknologi dan infrastruktur mutakhir.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
