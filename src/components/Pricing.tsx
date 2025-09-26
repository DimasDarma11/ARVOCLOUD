import React, { useState } from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = usaState('monthly');

  const whatsappNumber = "6285707594952"; // nomor WA dalam format internasional
  const whatsappMessage = (planName) =>
    `Halo, saya tertarik dengan paket ${planName}. Bisa dibantu informasinya?`;

  const plans = [
    {
      name: "Starter VPS",
      price: { monthly: 95000, yearly: 150 },
      description: "Cocok untuk proyek kecil dan pengembangan",
      features: [
        "2 CPU Core",
        "4GB RAM",
        "50GB SSD Storage",
        "1TB Bandwidth",
        "Dukungan 24/7",
        "Sertifikat SSL Gratis"
      ],
      icon: <Zap className="h-6 w-6" />,
      color: "from-blue-500 to-blue-600",
      popular: false
    },
    {
      name: "Business VPS",
      price: { monthly: 35, yearly: 350 },
      description: "Ideal untuk bisnis berkembang dan aplikasi",
      features: [
        "4 CPU Core",
        "8GB RAM",
        "100GB SSD Storage",
        "3TB Bandwidth",
        "Perlindungan DDoS",
        "Backup Harian",
        "Dukungan Prioritas"
      ],
      icon: <Star className="h-6 w-6" />,
      color: "from-purple-500 to-purple-600",
      popular: true
    },
    {
      name: "Enterprise RDP",
      price: { monthly: 75, yearly: 750 },
      description: "RDP performa tinggi dengan fitur premium",
      features: [
        "8 CPU Core",
        "16GB RAM",
        "250GB NVMe SSD",
        "Bandwidth Unlimited",
        "Windows Server",
        "Akses Admin",
        "99.9% SLA",
        "Dukungan Dedicated"
      ],
      icon: <Crown className="h-6 w-6" />,
      color: "from-pink-500 to-pink-600",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Harga</span> Sederhana
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Harga transparan tanpa biaya tersembunyi. Pilih paket yang sesuai dengan kebutuhan Anda.
          </p>

          {/* Pilihan Billing */}
          <div className="inline-flex items-center bg-white rounded-xl p-1 shadow-lg">
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                billingCycle === 'monthly' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Bulanan
            </button>
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                billingCycle === 'yearly' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              Tahunan 
              <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Hemat 17%</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-4 ring-purple-500 ring-opacity-20 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${plan.color} text-white rounded-xl mb-6`}>
                  {plan.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.price[billingCycle]}
                  </span>
                  <span className="text-gray-600">/{billingCycle === 'monthly' ? 'bulan' : 'tahun'}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage(plan.name))}`,
                      "_blank"
                    )
                  }
                  className={`w-full bg-gradient-to-r ${plan.color} text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    plan.popular ? 'shadow-lg' : ''
                  }`}
                >
                  Mulai Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Solusi Kustom */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Butuh Konfigurasi Khusus?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Hubungi kami untuk solusi bare metal kustom, paket enterprise, atau kebutuhan khusus lainnya.
            </p>
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Halo, saya ingin konsultasi terkait solusi kustom.")}`,
                  "_blank"
                )
              }
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Hubungi Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;


