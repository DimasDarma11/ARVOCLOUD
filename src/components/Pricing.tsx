import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Server, Monitor, Cpu, Globe } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'bulanan' | 'tahunan'>('bulanan');
  const [selectedCategory, setSelectedCategory] = useState<'vps' | 'rdp' | 'baremetal'>('vps');
  const [selectedCountry, setSelectedCountry] = useState('id');

  const countries = [
    { code: 'us', name: 'Amerika Serikat', flag: '🇺🇸' },
    { code: 'sg', name: 'Singapura', flag: '🇸🇬' },
    { code: 'idn', name: 'Indonesia', flag: '🇮🇩n' }
  ];

  const categories = [
    { id: 'vps', name: 'VPS Hosting', icon: Server, description: 'Server Pribadi Virtual' },
    { id: 'rdp', name: 'RDP Solutions', icon: Monitor, description: 'Layanan Remote Desktop' },
    { id: 'baremetal', name: 'Bare Metal', icon: Cpu, description: 'Server Fisik Dedicated' }
  ];

  const plans = {
    vps: [
      {
        name: 'VPS Pemula',
        icon: Zap,
        popular: false,
        price: { bulanan: 50.000, tahunan: 120 },
        description: 'Cocok untuk project kecil dan kebutuhan pengembangan',
        specs: {
          cpu: '1 vCPU Core',
          ram: '2GB RAM',
          storage: '25GB SSD',
          bandwidth: 'Unlimited'
        },
        features: [
          'Akses Root Penuh',
          'Penyimpanan SSD NVMe',
          'Pilihan OS Beragam',
          'Dukungan 24/7'
        ],
        gradient: 'from-blue-500 to-cyan-500'
      },
      {
        name: 'VPS Profesional',
        icon: Star,
        popular: true,
        price: { bulanan: 95.000, tahunan: 250 },
        description: 'Ideal untuk website dan aplikasi yang berkembang',
        specs: {
          cpu: '2 vCPU Cores',
          ram: '4GB RAM',
          storage: '50GB SSD',
          bandwidth: 'Unlimited Transfer'
        },
        features: [
          'Akses Root Penuh',
          'Penyimpanan SSD NVMe',
          'Pilihan OS Beragam',
          'Dukungan Prioritas 24/7'
        ],
        gradient: 'from-purple-500 to-pink-500'
      },
      {
        name: 'VPS Enterprise',
        icon: Crown,
        popular: false,
        price: { bulanan: 55, tahunan: 550 },
        description: 'Performa tinggi untuk aplikasi yang berat',
        specs: {
          cpu: '4 vCPU Cores',
          ram: '8GB RAM',
          storage: '100GB NVMe SSD',
          bandwidth: '4TB Transfer',
          ip: '2 IPv4'
        },
        features: [
          'Akses Root Penuh',
          'Penyimpanan NVMe Premium',
          'Pilihan OS Beragam',
          'Dukungan Enterprise 24/7',
          'Setup & Migrasi Gratis',
          'Proteksi DDoS Enterprise',
          'Virtualisasi KVM',
          'Backup Harian',
          'Dashboard Monitoring'
        ],
        gradient: 'from-orange-500 to-red-500'
      }
    ],
    // (RDP & Baremetal juga bisa diterjemahkan dengan pola yang sama)
  };

  const currentPlans = plans[selectedCategory];

  return (
    <section id="pricing" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Harga Transparan
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Pilih paket yang sesuai dengan kebutuhan Anda. Semua paket sudah termasuk fitur premium dan dukungan 24/7.
          </p>

          {/* Pilih Lokasi */}
          <div className="flex items-center justify-center mb-8">
            <Globe className="h-5 w-5 text-cyan-400 mr-3" />
            <span className="text-gray-300 mr-4">Pilih Lokasi:</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tabs Kategori */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-sm font-semibold">{category.name}</div>
                  <div className="text-xs opacity-75">{category.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Pilihan Billing */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 Rp{billingCycle === 'bulanan' ? 'text-white' : 'text-gray-400' .toLocaleString("id-ID")}`}>Bulanan</span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'bulanan' ? 'tahunan' : 'bulanan')}
              className="relative w-16 h-8 bg-slate-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <div className={`w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg transform transition-transform duration-300 ${
                billingCycle === 'tahunan' ? 'translate-x-8' : 'translate-x-0'
              }`}></div>
            </button>
            <span className={`ml-3 Rp{billingCycle === 'tahunan' ? 'text-white' : 'text-gray-400' .toLocaleString("id-ID")}`}>
              Tahunan <span className="text-green-400 text-sm">(Hemat 20%)</span>
            </span>
          </div>
        </div>

        {/* Render Paket */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-slate-800 rounded-2xl p-8 border transition-all duration-500 hover:transform hover:scale-105 ${
                plan.popular 
                  ? 'border-cyan-400 shadow-2xl shadow-cyan-400/20' 
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl p-4 mx-auto mb-4`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">
                    Rp{plan.price[billingCycle]}
                  </span>
                  <span className="text-gray-400 ml-2">
                    /{billingCycle === 'bulanan' ? 'bulan' : 'tahun'}
                  </span>
                </div>
              </div>

              {/* Spesifikasi */}
              <div className="mb-8 p-6 bg-slate-900/50 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-4">Spesifikasi</h4>
                <div className="space-y-2 text-gray-300">
                  {Object.entries(plan.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="text-cyan-400">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fitur */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full bg-gradient-to-r ${plan.gradient} text-white py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105`}>
                Mulai Sekarang
              </button>
            </div>
          ))}
        </div>

        {/* Custom Solution */}
        <div className="text-center bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 border border-slate-700">
          <h3 className="text-3xl font-bold text-white mb-4">Butuh Konfigurasi Khusus?</h3>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Kami menyediakan solusi yang sepenuhnya dapat disesuaikan sesuai kebutuhan Anda. 
            Hubungi tim kami untuk penawaran harga khusus dan konfigurasi di lokasi manapun di seluruh dunia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:shadow-xl">
              Hubungi Tim Penjualan
            </button>
            <button className="border border-gray-600 hover:border-cyan-400 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
              Minta Penawaran
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;


