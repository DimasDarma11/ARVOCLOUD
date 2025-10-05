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

  const plans = {
    vps: [
      {
        name: "VPS 1",
        icon: Zap,
        price: { bulanan: 50000, tahunan: 550000 },
        desc: "Cocok untuk project kecil & dev testing",
        specs: { cpu: "1 vCPU", ram: "1GB", storage: "25GB SSD" },
        gradient: "from-cyan-500 to-blue-500",
      },
      {
        name: "VPS 2",
        icon: Star,
        price: { bulanan: 140000, tahunan: 1540000 },
        desc: "Ideal untuk website dan aplikasi ringan",
        specs: { cpu: "2 vCPU", ram: "4GB", storage: "40GB SSD" },
        gradient: "from-purple-500 to-pink-500",
      },
      {
        name: "VPS 3",
        icon: Crown,
        price: { bulanan: 200000, tahunan: 2200000 },
        desc: "Performa tinggi untuk bisnis dan tim kecil",
        specs: { cpu: "4 vCPU", ram: "8GB", storage: "60GB SSD" },
        gradient: "from-orange-500 to-red-500",
      },
    ],
    rdp: [
      {
        name: "RDP Starter",
        icon: Zap,
        price: { bulanan: 95000, tahunan: 1045000 },
        desc: "RDP ekonomis untuk keperluan ringan",
        specs: { cpu: "2 vCPU", ram: "4GB", os: "Win 11 Pro" },
        gradient: "from-blue-500 to-cyan-500",
      },
      {
        name: "RDP Business",
        icon: Star,
        price: { bulanan: 150000, tahunan: 1650000 },
        desc: "Performa stabil untuk kebutuhan harian",
        specs: { cpu: "4 vCPU", ram: "8GB", os: "Win 11 Pro" },
        gradient: "from-purple-500 to-pink-500",
      },
      {
        name: "RDP Premium",
        icon: Crown,
        price: { bulanan: 250000, tahunan: 2750000 },
        desc: "Performa tinggi dengan dukungan 24/7",
        specs: { cpu: "6 vCPU", ram: "16GB", os: "Win 11 Pro" },
        gradient: "from-orange-500 to-red-500",
      },
    ],
  };

  const currentPlans = plans[selectedCategory] || [];

  return (
    <section id="pricing" className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Harga yang <span className="text-cyan-400">Transparan</span>
        </h2>
        <p className="text-gray-400 mb-10">
          Pilih paket sesuai kebutuhan Anda. Semua sudah termasuk dukungan 24/7.
        </p>

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                selectedCategory === c.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <c.icon className="w-5 h-5" />
              {c.name}
            </button>
          ))}
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <span
            className={`mr-3 ${
              billingCycle === "bulanan" ? "text-white" : "text-gray-400"
            }`}
          >
            Bulanan
          </span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === "bulanan" ? "tahunan" : "bulanan")
            }
            className="relative w-16 h-8 bg-slate-700 rounded-full p-1"
          >
            <div
              className={`w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform transition-transform ${
                billingCycle === "tahunan" ? "translate-x-8" : ""
              }`}
            ></div>
          </button>
          <span
            className={`ml-3 ${
              billingCycle === "tahunan" ? "text-white" : "text-gray-400"
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
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all"
            >
              <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-r ${plan.gradient} rounded-xl flex items-center justify-center`}>
                <plan.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>

              <div className="text-4xl font-bold text-white mb-6">
                Rp{plan.price[billingCycle].toLocaleString("id-ID")}
                <span className="text-sm text-gray-400 ml-1">
                  /{billingCycle === "bulanan" ? "bulan" : "tahun"}
                </span>
              </div>

              <div className="text-gray-300 text-sm space-y-2 mb-6">
                {Object.entries(plan.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="capitalize">{k}:</span>
                    <span className="text-cyan-400">{v}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setRedirecting(true);
                  setMessage(plan.name);
                  setTimeout(() => {
                    window.open(
                      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        whatsappMessage(plan.name)
                      )}`,
                      "_blank"
                    );
                    setRedirecting(false);
                  }, 1500);
                }}
                className={`w-full bg-gradient-to-r ${plan.gradient} text-white py-3 rounded-lg font-semibold hover:opacity-90`}
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
              className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-slate-800 p-8 rounded-2xl text-center shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="animate-spin rounded-full h-14 w-14 border-4 border-cyan-400 border-t-transparent mx-auto mb-4"></div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  Mengarahkan ke WhatsApp...
                </h3>
                <p className="text-gray-400 text-sm">
                  Paket <span className="text-cyan-400 font-semibold">{message}</span>
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
