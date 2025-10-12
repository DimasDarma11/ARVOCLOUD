import React, { useState } from "react";
import { Check, Star, Zap, Crown, Server, Monitor, Cpu, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("bulanan");
  const [selectedCategory, setSelectedCategory] = useState("vps");
  const [redirecting, setRedirecting] = useState(false);
  const [message, setMessage] = useState("");

  const whatsappNumber = "6283197183724";
  const whatsappMessage = (planName) =>
    `Halo, saya tertarik dengan paket ${planName}. Bisa dibantu informasinya?`;

  const categories = [
    { id: "vps", name: "VPS", icon: Server },
    { id: "rdp", name: "RDP", icon: Monitor },
    { id: "baremetal", name: "Bare Metal", icon: Cpu },
    { id: "proxy", name: "Proxy", icon: ShieldCheck },
  ];

  const handleRedirect = (planName) => {
    setMessage(planName);
    setRedirecting(true);

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage(planName)
  )}`;

    setTimeout(() => {
      window.open(waUrl, "_blank");
      setRedirecting(false);
    }, 1800);
  };


  const plans = {
    vps: [
      {
        name: "VPS TURBO 1",
        icon: Zap,
        price: { bulanan: 50000, tahunan: 550000 },
        desc: "Pilihan hemat untuk project kecil atau pengujian pengembang.",
        specs: { 
          cpu: "1 vCPU", 
          ram: "1 GB", 
          storage: "15 GB SSD NVMe", 
          network: "Speed UpTo 10 Gbps",
          ip: "1 IPv4",
          os: "Ubuntu atau Debian",
          region: "🇮🇩 Indonesia"
        },
        gradient: "from-blue-600 to-blue-600",
      },
      {
        name: "VPS TURBO 2",
        icon: Zap,
        price: { bulanan: 75000, tahunan: 825000 },
        desc: "Cocok untuk website ringan, bot, atau aplikasi skala kecil.",
        specs: { 
          cpu: "1 vCPU", 
          ram: "2 GB", 
          storage: "20 GB SSD NVMe", 
          network: "Speed UpTo 10 Gbps",
          ip: "1 IPv4",
          os: "Ubuntu atau Debian",
          region: "🇮🇩 Indonesia"
        },
        gradient: "from-blue-600 to-blue-600",
      },
      {
        name: "VPS TURBO 3",
        icon: Zap,
        price: { bulanan: 150000, tahunan: 1650000 },
        desc: "Ideal untuk website, panel hosting, atau aplikasi ringan-menengah.",
        specs: { 
          cpu: "2 vCPU", 
          ram: "4 GB", 
          storage: "50 GB SSD NVMe",
          network: "Speed UpTo 10 Gbps",
          ip: "1 IPv4",
          os: "Ubuntu atau Debian",
          region: "🇮🇩 Indonesia"
        },
        gradient: "from-blue-600 to-blue-600",
      },
      {
        name: "VPS TURBO 4",
        icon: Zap,
        price: { bulanan: 170000, tahunan: 1870000 },
        desc: "Pilihan seimbang untuk aplikasi menengah dan server komunitas.",
        specs: { 
          cpu: "4 vCPU", 
          ram: "6 GB", 
          storage: "60 GB SSD NVMe", 
          network: "Speed UpTo 10 Gbps",
          ip: "1 IPv4",
          os: "Ubuntu atau Debian",
          region: "🇮🇩 Indonesia"
        },
        gradient: "from-blue-600 to-blue-600",
      },
      {
        name: "VPS TURBO 5",
        icon: Star,
        price: { bulanan: 200000, tahunan: 2200000 },
        desc: "Performa tinggi untuk bisnis kecil, e-commerce, atau tim pengembang.",
        specs: { 
          cpu: "4 vCPU", 
          ram: "8 GB", 
          storage: "70GB SSD NVMe",
          network: "Speed UpTo 10 Gbps",
          ip: "1 IPv4",
          os: "Ubuntu atau Debian",
          region: "🇮🇩 Indonesia"
        },
        gradient: "from-indigo-500 to-indigo-500",
      },
      {
        name: "VPS TURBO 6",
        icon: Crown,
        price: { bulanan: 230000, tahunan: 2530000 },
        desc: "Kinerja optimal untuk bisnis menengah dan server aplikasi berat.",
        specs: { 
          cpu: "6 vCPU", 
          ram: "10 GB", 
          storage: "80 GB SSD NVMe",
          network: "Speed UpTo 10 Gbps",
          ip: "1 IPv4",
          os: "Ubuntu atau Debian",
          region: "🇮🇩 Indonesia"
        },
        gradient: "from-blue-500 to-blue-500",
      },
      {
        name: "VPS TURBO 7",
        icon: Crown,
        price: { bulanan: 300000, tahunan: 3300000 },
        desc: "Performa tinggi untuk bisnis profesional dan server produksi.",
        specs: { 
          cpu: "8 vCPU", 
          ram: "14 GB", 
          storage: "100 GB SSD NVMe",
          network: "Speed UpTo 10 Gbps",
          ip: "1 IPv4",
          os: "Ubuntu atau Debian",
          region: "🇮🇩 Indonesia"
        },
        gradient: "from-blue-500 to-blue-500",
      },
      {
        name: "VPS TURBO 8",
        icon: Crown,
        price: { bulanan: 320000, tahunan: 3520000 },
        desc: "Kinerja stabil untuk bisnis profesional dan server produksi berskala menengah.",
        specs: { 
          cpu: "8 vCPU", 
          ram: "16 GB", 
          storage: "100 GB SSD NVMe",
          network: "Speed UpTo 10 Gbps",
          ip: "1 IPv4",
          os: "Ubuntu atau Debian",
          region: "🇮🇩 Indonesia"
        },
        gradient: "from-blue-500 to-blue-500",
      },
      {
        name: "VPS TURBO 9",
        icon: Crown,
        price: { bulanan: 350000, tahunan: 3850000 },
        desc: "Server tangguh untuk aplikasi intensif, database besar, atau load tinggi.",
        specs: { 
          cpu: "10 vCPU", 
          ram: "16 GB", 
          storage: "120 GB SSD NVMe",
          network: "Speed UpTo 10 Gbps",
          ip: "1 IPv4",
          os: "Ubuntu atau Debian",
          region: "🇮🇩 Indonesia"
        },
        gradient: "from-blue-500 to-blue-500",
      },
      {
        name: "VPS TURBO 10",
        icon: Crown,
        price: { bulanan: 380000, tahunan: 4180000 },
        desc: "Performa maksimal untuk perusahaan, server produksi besar, atau cloud service.",
        specs: { 
          cpu: "10 vCPU", 
          ram: "18 GB", 
          storage: "120 GB SSD NVMe",
          network: "Speed UpTo 10 Gbps",
          ip: "1 IPv4",
          os: "Ubuntu atau Debian",
          region: "🇮🇩 Indonesia"
        },
        gradient: "from-blue-500 to-blue-500",
      },
    ],
    rdp: [
      {
        name: "RDP 1",
        icon: Zap,
        price: { bulanan: 95000, tahunan: 1045000 },
        desc: "RDP ekonomis untuk keperluan ringan",
        specs: { 
          cpu: "2 vCPU", 
          ram: "4 GB", 
          storage: "20 GB SSD",
          os: "Windows 10 atau 11 (Spectre Edition)",
          region: "🇮🇩 Indonesia • 🇺🇸 USA",
          emulator: "⚠️ Tidak support emulator / game"
        },
        gradient: "from-blue-600 to-blue-600",
      },
      {
        name: "RDP 2",
        icon: Star,
        price: { bulanan: 150000, tahunan: 1650000 },
        desc: "Performa stabil untuk kebutuhan harian",
        specs: { 
          cpu: "4 vCPU", 
          ram: "8 GB", 
          storage: "40 GB SSD",
          os: "Windows 10 atau 11 (Spectre Edition)",
          region: "🇮🇩 Indonesia • 🇺🇸 USA",
          emulator: "⚠️ Tidak support emulator / game"
        },
        gradient: "from-indigo-500 to-indigo-500",
      },
      {
        name: "RDP 3",
        icon: Crown,
        price: { bulanan: 260000, tahunan: 2860000 },
        desc: "Performa tinggi dengan dukungan 24/7",
        specs: { 
          cpu: "6 vCPU", 
          ram: "16 GB", 
          storage: "60 GB SSD",
          os: "Windows 10 atau 11 (Spectre Edition)",
          region: "🇮🇩 Indonesia • 🇺🇸 USA",
          emulator: "⚠️ Tidak support emulator / game"
        },
        gradient: "from-blue-500 to-blue-500",
      },
      {
        name: "RDP 4",
        icon: Crown,
        price: { bulanan: 275000, tahunan: 3025000 },
        desc: "Performa tinggi dengan dukungan 24/7",
        specs: { 
          cpu: "8 vCPU", 
          ram: "16 GB", 
          storage: "80 GB SSD",
          os: "Windows 10 atau 11 (Spectre Edition)",
          region: "🇮🇩 Indonesia • 🇺🇸 USA",
          emulator: "⚠️ Tidak support emulator / game"
        },
        gradient: "from-blue-500 to-blue-500",
      },
    ],
    baremetal: [
      {
        name: "Bare Metal ID 1",
        icon: Zap,
        price: { bulanan: 350000, tahunan: 3850000 },
        desc: "Entry-level dedicated server",
        specs: {
          cpu: "Intel Core i3 Gen 6",
          ram: "8 GB",
          storage: "256 GB SSD",
          bandwidth: "Unlimited",
          region: "🇮🇩 Indonesia",
          emulator: "✅ Support emulator & game"
        },
        gradient: "from-blue-600 to-blue-600",
      },
      {
        name: "Bare Metal ID 2",
        icon: Star,
        price: { bulanan: 400000, tahunan: 4400000 },
        desc: "High-performance dedicated server",
        specs: {
          cpu: "Intel Core i3 Gen 6",
          ram: "16 GB",
          storage: "256 GB SSD",
          bandwidth: "Unlimited",
          region: "🇮🇩 Indonesia",
          emulator: "✅ Support emulator & game"
        },
        gradient: "from-indigo-500 to-indigo-500",
      },
      {
        name: "Bare Metal ID 3",
        icon: Crown,
        price: { bulanan: 450000, tahunan: 4950000 },
        desc: "Maximum performance dedicated server",
        specs: {
          cpu: "Intel Core i3 Gen 6",
          ram: "24 GB",
          storage: "256 GB SSD",
          bandwidth: "Unlimited",
          region: "🇮🇩 Indonesia",
          emulator: "✅ Support emulator & game"
        },
        gradient: "from-blue-500 to-blue-500",
      },
      {
        name: "Bare Metal ID 4",
        icon: Crown,
        price: { bulanan: 550000, tahunan: 6050000 },
        desc: "Maximum performance dedicated server",
        specs: {
          cpu: "Intel Core i3 Gen 6",
          ram: "32 GB",
          storage: "256 GB SSD",
          bandwidth: "Unlimited",
          region: "🇮🇩 Indonesia",
          emulator: "✅ Support emulator & game"
        },
        gradient: "from-blue-500 to-blue-500",
      },
      {
        name: "Bare Metal ID 5",
        icon: Star,
        price: { bulanan: 750000, tahunan: 8250000 },
        desc: "High-performance dedicated server",
        specs: {
          cpu: "Intel Core i7 Gen 4",
          ram: "32 GB",
          storage: "512 GB SSD",
          bandwidth: "Unlimited",
          region: "🇮🇩 Indonesia",
          emulator: "✅ Support emulator & game"
        },
        gradient: "from-indigo-500 to-indigo-500",
      },
      {
        name: "Bare Metal USA",
        icon: Star,
        price: { bulanan: 1500000, tahunan: 16500000 },
        desc: "High-performance dedicated server",
        specs: {
          cpu: "AMD Ryzen 7 5700G",
          ram: "64 GB",
          storage: "1 TB SSD",
          bandwidth: "Unlimited",
          region: "🇺🇸 USA",
          emulator: "✅ Support emulator & game"
        },
        gradient: "from-indigo-500 to-indigo-500",
      },
    ],

    proxy: [
      {
        name: "Proxy Rotating IP",
        icon: Zap,
        price: { bulanan: 45000, tahunan: 540000 },
        desc: "Proxy fleksibel dengan rotasi IP cepat",
        specs: { Bandwidth: "1GB", Rotasi: "1-120 Menit" },
        gradient: "from-blue-600 to-blue-600",
      },
      {
        name: "Proxy Residential Static",
        icon: ShieldCheck,
        price: { bulanan: 140000, tahunan: 1680000 },
        desc: "Proxy statis untuk kestabilan tinggi",
        specs: { Bandwidth: "Unlimited", Negara: "27+ Country" },
        gradient: "from-blue-600 to-blue-600",
      },
    ],
  };

  const currentPlans = plans[selectedCategory] || [];

  return (
    <section id="pricing" className="py-28 bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#f1f5f9]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-grey-800 mb-4">
          Harga yang <span className="bg-gradient-to-r from-gray-800 to-gray-800 bg-clip-text text-transparent">Transparan</span>
        </h2>
        <p className="text-gray-600/90 text-lg max-w-2xl mx-auto mb-10">
          Pilih paket sesuai kebutuhan Anda. Semua sudah termasuk dukungan 24/7.
        </p>

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-300 ${
                selectedCategory === c.id
                  ? "bg-white text-primary border-primary shadow-[0_0_15px_rgba(59,130,246,0.25)] backdrop-blur-md"
                  : "bg-white/70 text-gray-600 border-gray-300 hover:bg-white hover:shadow-sm hover:text-gray-800 backdrop-blur-sm"
              }`}
            >
              <c.icon 
                className={`w-5 h-5 transition-colors duration-300 ${
                  selectedCategory === c.id ? "text-primary" : "text-gray-500"
                }`}
              />
              {c.name}
            </button>
          ))}
        </div>


        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <span
            className={`mr-3 text-sm font-medium transition-colors duration-300 ${
              billingCycle === "bulanan" ? "text-primary font-semibold" : "text-gray-500"
            }`}
          >
            Bulanan
          </span>

          <button
            onClick={() =>
              setBillingCycle(billingCycle === "bulanan" ? "tahunan" : "bulanan")
            }
            className={`relative w-16 h-8 rounded-full p-1 transition-all duration-300 border backdrop-blur-sm ${
              billingCycle === "tahunan"
                ? "bg-primary/20 border-primary/60 shadow-primary/30"
                : "bg-gray-200 border-gray-300 shadow-inner"
            }`}
          >

          <div
            className={`w-6 h-6 rounded-full transform transition-transform duration-300 shadow-md ${
              billingCycle === "tahunan" 
              ? "translate-x-8 bg-primary shadow-primary/40" 
              : "translate-x-0 bg-primary shadow-primary/40"
            }`}
          ></div>
        </button>

        <span
          className={`ml-3 text-sm font-medium transition-colors duration-300 ${
            billingCycle === "tahunan" 
            ? "text-primary font-semibold" 
            : "text-gray-500"
          }`}
        >
          Tahunan
        </span>
      </div>


        {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8">
       {currentPlans.map((plan, i) => (
        <div
          key={i}
          className="bg-white hover:bg-gray-50 transition-all rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-md"
        >
          <div className="w-14 h-14 mx-auto mb-4 bg-blue-50 rounded-xl flex items-center justify-center">
            <plan.icon className="w-6 h-6 text-blue-600" />
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-1">{plan.name}</h3>
          <p className="text-gray-600 text-sm mb-6">{plan.desc}</p>

          <div className="text-4xl font-bold text-primary mb-6">
            Rp{plan.price[billingCycle].toLocaleString("id-ID")}
            <span className="text-secondary text-sm ml-1">
              /{billingCycle === "bulanan" ? "bulan" : "tahun"}
            </span>
          </div>

          <div className="text-on-surface text-sm space-y-2 mb-6">
            {Object.entries(plan.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="capitalize">{k}:</span>
                <span>{v}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleRedirect(plan.name)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Mulai Sekarang
          </button>
        </div>
      ))}
    </div>


        {/* Redirect Modal */}
        <AnimatePresence>
        {redirecting && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl text-center shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="animate-spin rounded-full h-14 w-14 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
              <h3 className="text-primary font-semibold text-lg mb-2">
                Mengarahkan ke WhatsApp...
              </h3>
              <p className="text-secondary text-sm">
                Paket <span className="font-semibold">{message}</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
};

export default Pricing;
