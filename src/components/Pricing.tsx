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
    <section id="pricing" className="py-28 h-16 bg-gradient-to-b from-transparent via-[#f8fafc]/80 to-[#e2e8f0]">
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
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 ${
                selectedCategory === c.id
                  ? "bg-white/80 text-primary border-primary/60 shadow-[0_0_25px_rgba(59,130,246,0.25)] backdrop-blur-md scale-[1.03]"
                  : "bg-white/40 text-gray-700 border-gray-200 hover:bg-white/70 hover:text-primary/90 hover:shadow-[0_0_10px_rgba(59,130,246,0.15)] backdrop-blur-sm"
              }`}
            >
              <c.icon 
                className={`w-5 h-5 transition-all duration-300 ${
                  selectedCategory === c.id ? "text-primary drop-shadow-[0_0_6px_rgba(59,130,246,0.35)]" : "text-gray-500"
                }`}
              />
              <span className="font-medium tracking-wide">{c.name}</span>
            </button>
          ))}
        </div>


        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <span
            className={`mr-3 text-sm md:text-base font-medium transition-all duration-300 ${
              billingCycle === "bulanan" ? "text-primary font-semibold scale-105" : "text-gray-500 scale-105"
            }`}
          >
            Bulanan
          </span>

          <button
            onClick={() =>
              setBillingCycle(billingCycle === "bulanan" ? "tahunan" : "bulanan")
            }
            className={`relative w-20 h-10 rounded-full p-1 flex items-center transition-all duration-500 backdrop-blur-md border ${
              billingCycle === "tahunan"
                ? "bg-blue-100/70 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                : "bg-gray-200/60 border-gray-300 shadow-inner"
            }`}
          >

          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center 
              ${
                billingCycle === "tahunan"
                  ? "translate-x-10 bg-blue-600 shadow-blue-400/50"
                  : "translate-x-0 bg-blue-600 shadow-blue-400/50"
              }`}
          >
            <motion.span
              key={billingCycle}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-white text-[10px] font-semibold select-none"
            >
              {billingCycle === "bulanan" ? "B" : "T"}
            </motion.span>
          </motion.div>
        </button>

        <span
          className={`ml-3 text-sm md:text-base font-medium transition-all duration-300 ${
            billingCycle === "tahunan" 
            ? "text-blue-600 font-semibold scale-105" 
            : "text-gray-500 scale-100"
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
          className={`relative group transition-all duration-500 rounded-2xl p-8 border backdrop-blur-md
            ${plan.featured
              ? "bg-white/80 border-blue-200 shadow-[0_8px_32px_rgba(59,130,246,0.15)] scale-[1.02]"
              : "bg-white/60 border-gray-200 hover:bg-white/80 hover:shadow-[0_8px_32px_rgba(59,130,246,0.1)]"
            }`}
        >
          <div className="w-14 h-14 mx-auto mb-5 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center shadow-inner">
            <plan.icon className="w-6 h-6 text-blue-600" />
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">{plan.name}</h3>
          <p className="text-gray-600 text-sm mb-6 text-center">{plan.desc}</p>

          <div className="text-4xl font-extrabold text-blue-600 mb-6 text-center">
            Rp{plan.price[billingCycle].toLocaleString("id-ID")}
            <span className="text-gray-500 text-sm ml-1 font-medium">
              /{billingCycle === "bulanan" ? "bulan" : "tahun"}
            </span>
          </div>

          <div className="text-gray-700 text-sm space-y-2 mb-8">
            {Object.entries(plan.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="capitalize">{k}:</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleRedirect(plan.name)}
            className="w-full py-3 rounded-xl font-semibold transition-all duration-300
              bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-[0_4px_20px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_30px_rgba(59,130,246,0.35)]"
          >
            Mulai Sekarang
          </button>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-blue-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
