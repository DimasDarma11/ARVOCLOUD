import React, { useState, useMemo, useCallback } from "react";
import { Check, Star, Zap, Crown, Server, Monitor, Cpu, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StepRegion, StepQuantity, StepOS, StepDuration, StepConfirm } from "./ModalSteps";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"bulanan" | "tahunan">("bulanan");
  const [category, setCategory] = useState("vps");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [planSelected, setPlanSelected] = useState<any>(null);
  const [formData, setFormData] = useState<any>({ region: "", quantity: 1, usage: "", os: "", duration: "", ipPublic: false });

  const categories = useMemo(() => [
    { id: "vps", name: "VPS", icon: Server },
    { id: "rdp", name: "RDP", icon: Monitor },
    { id: "baremetal", name: "Bare Metal", icon: Cpu },
    { id: "proxy", name: "Proxy", icon: ShieldCheck },
  ], []);

  const plans = useMemo(() => ({
    vps: [
      { name: "VPS TURBO 1", icon: Zap, price: { bulanan: 50000, tahunan: 550000 }, desc: "Pilihan hemat untuk project kecil atau pengujian pengembang.", specs: { cpu: "1 vCPU", ram: "1 GB", storage: "15 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 2", icon: Zap, price: { bulanan: 75000, tahunan: 825000 }, desc: "Cocok untuk website ringan, bot, atau aplikasi skala kecil.", specs: { cpu: "1 vCPU", ram: "2 GB", storage: "20 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 3", icon: Zap, price: { bulanan: 150000, tahunan: 1650000 }, desc: "Ideal untuk website, panel hosting, atau aplikasi ringan-menengah.", specs: { cpu: "2 vCPU", ram: "4 GB", storage: "50 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 4", icon: Zap, price: { bulanan: 170000, tahunan: 1870000 }, desc: "Pilihan seimbang untuk aplikasi menengah dan server komunitas.", specs: { cpu: "4 vCPU", ram: "6 GB", storage: "60 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 5", icon: Star, price: { bulanan: 200000, tahunan: 2200000 }, desc: "Performa tinggi untuk bisnis kecil, e-commerce, atau tim pengembang.", specs: { cpu: "4 vCPU", ram: "8 GB", storage: "70GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 6", icon: Crown, price: { bulanan: 230000, tahunan: 2530000 }, desc: "Kinerja optimal untuk bisnis menengah dan server aplikasi berat.", specs: { cpu: "6 vCPU", ram: "10 GB", storage: "80 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 7", icon: Crown, price: { bulanan: 300000, tahunan: 3300000 }, desc: "Performa tinggi untuk bisnis profesional dan server produksi.", specs: { cpu: "8 vCPU", ram: "14 GB", storage: "100 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 8", icon: Crown, price: { bulanan: 320000, tahunan: 3520000 }, desc: "Kinerja stabil untuk bisnis profesional dan server produksi berskala menengah.", specs: { cpu: "8 vCPU", ram: "16 GB", storage: "100 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 9", icon: Crown, price: { bulanan: 350000, tahunan: 3850000 }, desc: "Server tangguh untuk aplikasi intensif, database besar, atau load tinggi.", specs: { cpu: "10 vCPU", ram: "16 GB", storage: "120 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
      { name: "VPS TURBO 10", icon: Crown, price: { bulanan: 380000, tahunan: 4180000 }, desc: "Performa maksimal untuk perusahaan, server produksi besar, atau cloud service.", specs: { cpu: "10 vCPU", ram: "18 GB", storage: "120 GB SSD NVMe", network: "Speed UpTo 10 Gbps", ip: "1 IPv4", os: "Ubuntu atau Debian", region: "🇮🇩 Indonesia" } },
    ],
    rdp: [
      { name: "RDP 1", icon: Zap, price: { bulanan: 95000, tahunan: 1045000 }, desc: "RDP ekonomis untuk keperluan ringan", specs: { cpu: "2 vCPU", ram: "4 GB", storage: "20 GB SSD", os: "Windows 10 atau 11 (Spectre Edition)", region: "🇮🇩 Indonesia • 🇺🇸 USA", emulator: "⚠️ Tidak support emulator / game" } },
      { name: "RDP 2", icon: Star, price: { bulanan: 150000, tahunan: 1650000 }, desc: "Performa stabil untuk kebutuhan harian", specs: { cpu: "4 vCPU", ram: "8 GB", storage: "40 GB SSD", os: "Windows 10 atau 11 (Spectre Edition)", region: "🇮🇩 Indonesia • 🇺🇸 USA", emulator: "⚠️ Tidak support emulator / game" } },
      { name: "RDP 3", icon: Crown, price: { bulanan: 260000, tahunan: 2860000 }, desc: "Performa tinggi dengan dukungan 24/7", specs: { cpu: "6 vCPU", ram: "16 GB", storage: "60 GB SSD", os: "Windows 10 atau 11 (Spectre Edition)", region: "🇮🇩 Indonesia • 🇺🇸 USA", emulator: "⚠️ Tidak support emulator / game" } },
      { name: "RDP 4", icon: Crown, price: { bulanan: 275000, tahunan: 3025000 }, desc: "Performa tinggi dengan dukungan 24/7", specs: { cpu: "8 vCPU", ram: "16 GB", storage: "80 GB SSD", os: "Windows 10 atau 11 (Spectre Edition)", region: "🇮🇩 Indonesia • 🇺🇸 USA", emulator: "⚠️ Tidak support emulator / game" } },
    ],
    baremetal: [
      { name: "Bare Metal ID 1", icon: Zap, price: { bulanan: 350000, tahunan: 3850000 }, desc: "Entry-level dedicated server", specs: { cpu: "Intel Core i3 Gen 6", ram: "8 GB", storage: "256 GB SSD", bandwidth: "Unlimited", region: "🇮🇩 Indonesia", emulator: "✅ Support emulator & game" } },
      { name: "Bare Metal ID 2", icon: Star, price: { bulanan: 400000, tahunan: 4400000 }, desc: "High-performance dedicated server", specs: { cpu: "Intel Core i3 Gen 6", ram: "16 GB", storage: "256 GB SSD", bandwidth: "Unlimited", region: "🇮🇩 Indonesia", emulator: "✅ Support emulator & game" } },
      { name: "Bare Metal ID 3", icon: Crown, price: { bulanan: 450000, tahunan: 4950000 }, desc: "Maximum performance dedicated server", specs: { cpu: "Intel Core i3 Gen 6", ram: "24 GB", storage: "256 GB SSD", bandwidth: "Unlimited", region: "🇮🇩 Indonesia", emulator: "✅ Support emulator & game" } },
      { name: "Bare Metal ID 4", icon: Crown, price: { bulanan: 550000, tahunan: 6050000 }, desc: "Maximum performance dedicated server", specs: { cpu: "Intel Core i3 Gen 6", ram: "32 GB", storage: "256 GB SSD", bandwidth: "Unlimited", region: "🇮🇩 Indonesia", emulator: "✅ Support emulator & game" } },
      { name: "Bare Metal ID 5", icon: Star, price: { bulanan: 750000, tahunan: 8250000 }, desc: "High-performance dedicated server", specs: { cpu: "Intel Core i7 Gen 4", ram: "32 GB", storage: "512 GB SSD", bandwidth: "Unlimited", region: "🇮🇩 Indonesia", emulator: "✅ Support emulator & game" } },
      { name: "Bare Metal USA", icon: Star, price: { bulanan: 1500000, tahunan: 16500000 }, desc: "High-performance dedicated server", specs: { cpu: "AMD Ryzen 7 5700G", ram: "64 GB", storage: "1 TB SSD", bandwidth: "Unlimited", region: "🇺🇸 USA", emulator: "✅ Support emulator & game" } },
    ],
    proxy: [
      { name: "Proxy Rotating IP", icon: Zap, price: { bulanan: 45000, tahunan: 540000 }, desc: "Proxy fleksibel dengan rotasi IP cepat", specs: { Bandwidth: "1GB", Rotasi: "1-120 Menit" } },
      { name: "Proxy Residential Static", icon: ShieldCheck, price: { bulanan: 140000, tahunan: 1680000 }, desc: "Proxy statis untuk kestabilan tinggi", specs: { Bandwidth: "Unlimited", Negara: "27+ Country" } },
    ],
  }), []);

  const currentPlans = useMemo(() => plans[category] || [], [category, plans]);

  const openModal = useCallback((plan: any) => {
    setPlanSelected(plan);
    setModalOpen(true);
    setCurrentStep(1);
    setFormData({ region: "", quantity: 1, usage: "", os: "", duration: "", ipPublic: false });
  }, []);

  const closeModal = useCallback(() => { setModalOpen(false); setPlanSelected(null); setCurrentStep(1); }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Pilih Paket Sesuai Kebutuhan</h2>
        <p className="text-gray-600 mb-10">Harga transparan, dukungan 24/7, dan setup cepat.</p>

        {/* Category Selector */}
        <div className="flex justify-center gap-3 flex-wrap mb-12">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setCategory(c.id)} className={`flex items-center gap-2 px-5 py-2 rounded-full border transition ${category === c.id ? "bg-white/90 text-blue-600 shadow-lg" : "bg-white/40 text-gray-700 hover:bg-white/70"}`}>
              <c.icon className="w-5 h-5" />
              {c.name}
            </button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPlans.map((p, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-white/70 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition cursor-pointer">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-xl">
                  <p.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{p.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{p.desc}</p>
              <div className="text-2xl font-bold text-blue-600 mb-4">
                Rp{p.price[billingCycle].toLocaleString("id-ID")}
                <span className="text-gray-500 text-sm">/{billingCycle === "bulanan" ? "bulan" : "tahun"}</span>
              </div>
              <ul className="text-sm text-gray-700 mb-6 space-y-1">
                {Object.entries(p.specs).map(([k, v]) => (
                  <li key={k} className="flex justify-between"><span className="capitalize">{k}:</span> <span className="font-medium">{v}</span></li>
                ))}
              </ul>
              <button onClick={() => openModal(p)} className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-lg transition">Mulai Sekarang</button>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {modalOpen && planSelected && (
            <motion.div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}>
              <motion.div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">{planSelected.name}</h3>
                  <button onClick={closeModal} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X className="w-5 h-5" /></button>
                </div>
                {/* Step Content */}
                <div>
                  {currentStep === 1 && <StepRegion regions={["🇮🇩 Indonesia"]} selected={formData.region} onSelect={(r) => setFormData({ ...formData, region: r })} />}
                  {currentStep === 2 && <StepQuantity quantity={formData.quantity} usage={formData.usage} onQuantityChange={(q) => setFormData({ ...formData, quantity: q })} onUsageChange={(u) => setFormData({ ...formData, usage: u })} />}
                  {currentStep === 3 && <StepOS osList={["Ubuntu 22.04","Debian 12"]} selected={formData.os} onSelect={(os) => setFormData({ ...formData, os })} category={category} ipPublic={formData.ipPublic} onIPToggle={(ip) => setFormData({ ...formData, ipPublic: ip })} />}
                  {currentStep === 4 && <StepDuration durations={["1 Bulan", "1 Tahun"]} selected={formData.duration} onSelect={(d) => setFormData({ ...formData, duration: d })} plan={planSelected} quantity={formData.quantity} category={category} ipPublic={formData.ipPublic} />}
                  {currentStep === 5 && <StepConfirm plan={planSelected} formData={formData} category={category} finalPrice={formData.quantity * planSelected.price[billingCycle]} onWhatsApp={() => {}} onTelegram={() => {}} />}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Pricing;
