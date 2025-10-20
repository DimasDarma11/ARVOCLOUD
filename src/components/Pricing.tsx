import React, { useState, useMemo, useCallback } from "react";
import { Check, Star, Zap, Crown, Server, Monitor, Cpu, ShieldCheck, X, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StepRegion, StepQuantity, StepOS, StepDuration, StepConfirm } from "./ModalSteps";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("bulanan");
  const [selectedCategory, setSelectedCategory] = useState("vps");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({ region: "", quantity: 1, usage: "", os: "", duration: "", ipPublic: false });

  const whatsappNumber = "6283197183724";
  const telegramUsername = "superku15";

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

  const currentPlans = useMemo(() => plans[selectedCategory] || [], [plans, selectedCategory]);
  const maxStep = selectedCategory === "proxy" ? 3 : 5;
  const isProxyCategory = selectedCategory === "proxy";

  const defaultForm = useCallback((category) => ({
    region: category === "proxy" ? "🌍 Global" : "",
    quantity: 1,
    usage: "",
    os: category === "proxy" ? "N/A - Proxy Service" : "",
    duration: "",
    ipPublic: false
  }), []);

  const handleOpenModal = useCallback((plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    setCurrentStep(1);
    setFormData(defaultForm(selectedCategory));
  }, [defaultForm, selectedCategory]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setSelectedPlan(null);
    setFormData(defaultForm(selectedCategory));
  }, [defaultForm, selectedCategory]);

  const getFinalPrice = useCallback(() => {
    if (!selectedPlan) return 0;
    let price = selectedPlan.price[formData.duration.includes("Bulan") ? "bulanan" : "tahunan"];
    if (selectedCategory === "rdp" && formData.ipPublic) price += 85000;
    return price * formData.quantity;
  }, [selectedPlan, formData, selectedCategory]);

  const canProceed = useCallback(() => {
    const step = currentStep;
    if (selectedCategory === "proxy") {
      if (step === 1) return formData.quantity >= 1 && formData.usage.trim() !== "";
      if (step === 2) return formData.duration !== "";
    } else {
      if (step === 1) return formData.region !== "";
      if (step === 2) return formData.quantity >= 1 && formData.usage.trim() !== "";
      if (step === 3) return formData.os !== "";
      if (step === 4) return formData.duration !== "";
    }
    return false;
  }, [currentStep, selectedCategory, formData]);

  const handleNext = useCallback(() => { if (canProceed() && currentStep < maxStep) setCurrentStep(currentStep + 1); }, [canProceed, currentStep, maxStep]);
  const handlePrev = useCallback(() => { if (currentStep > 1) setCurrentStep(currentStep - 1); }, [currentStep]);

  const generateOrderMessage = useCallback(() => {
    if (!selectedPlan) return "";
    const categoryName = { vps: "VPS", rdp: "RDP", baremetal: "Bare Metal", proxy: "Proxy" }[selectedCategory];
    if (selectedCategory === "proxy") return `Halo, saya ingin memesan ${categoryName} ${selectedPlan.name} x${formData.quantity} (${formData.usage}), harga Rp${getFinalPrice().toLocaleString("id-ID")}, region: ${formData.region}`;
    const ipInfo = selectedCategory === "vps" ? "✅ IP Public (Included)" : selectedCategory === "rdp" ? (formData.ipPublic ? "✅ IP Public (+Rp85.000)" : "🔒 IP NAT (Default)") : "🏠 IP Local";
    return `Halo, saya ingin memesan ${categoryName} ${selectedPlan.name} x${formData.quantity}\nOS: ${formData.os}\nCPU: ${selectedPlan.specs.cpu}\nRAM: ${selectedPlan.specs.ram}\nIP: ${ipInfo}\nHarga: Rp${getFinalPrice().toLocaleString("id-ID")}\nDigunakan untuk: ${formData.usage}`;
  }, [selectedPlan, selectedCategory, formData, getFinalPrice]);

  const handleWhatsAppOrder = useCallback(() => { window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(generateOrderMessage())}`, "_blank"); handleCloseModal(); }, [generateOrderMessage, handleCloseModal]);
  const handleTelegramOrder = useCallback(() => { window.open(`https://t.me/${telegramUsername}?text=${encodeURIComponent(generateOrderMessage())}`, "_blank"); handleCloseModal(); }, [generateOrderMessage, handleCloseModal]);

  const getBillingClass = (type) => `text-sm md:text-base font-medium transition-all duration-300 ${billingCycle === type ? "text-primary font-semibold scale-105" : "text-gray-500"}`;
  const renderSpecs = (specs) => Object.entries(specs).map(([k, v]) => <div key={k} className="flex justify-between text-sm"><span className="capitalize">{k}:</span><span className="font-medium">{v}</span></div>);

  const renderStep = () => {
    if (currentStep === 1 && !isProxyCategory) return <StepRegion regions={["🇮🇩 Indonesia", "🇺🇸 USA"]} selected={formData.region} onSelect={(r) => setFormData({ ...formData, region: r })} />;
    if ((currentStep === 2 && !isProxyCategory) || (currentStep === 1 && isProxyCategory)) return <StepQuantity quantity={formData.quantity} usage={formData.usage} onQuantityChange={(q) => setFormData({ ...formData, quantity: q })} onUsageChange={(u) => setFormData({ ...formData, usage: u })} />;
    if (currentStep === 3 && !isProxyCategory) return <StepOS osList={["Ubuntu 22.04","Ubuntu 24.04","Debian 12","Debian 14"]} selected={formData.os} onSelect={(os) => setFormData({ ...formData, os })} category={selectedCategory} ipPublic={formData.ipPublic} onIPToggle={(ip) => setFormData({ ...formData, ipPublic: ip })} />;
    if ((currentStep === 4 && !isProxyCategory) || (currentStep === 2 && isProxyCategory)) return <StepDuration durations={["1 Bulan (30 Hari)", "1 Tahun"]} selected={formData.duration} onSelect={(d) => setFormData({ ...formData, duration: d })} plan={selectedPlan} quantity={formData.quantity} category={selectedCategory} ipPublic={formData.ipPublic} />;
    if ((currentStep === 5 && !isProxyCategory) || (currentStep === 3 && isProxyCategory)) return <StepConfirm plan={selectedPlan} formData={formData} category={selectedCategory} finalPrice={getFinalPrice()} onWhatsApp={handleWhatsAppOrder} onTelegram={handleTelegramOrder} />;
  };

  return (
    <section id="pricing" className="relative py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <h2 className="text-4xl font-bold text-center">Pricing & Plans</h2>
        </div>

        <div className="flex justify-center mb-8 space-x-4">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-2 rounded-md font-medium transition ${selectedCategory === cat.id ? "bg-primary text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}>
              <cat.icon className="inline mr-2" size={18} /> {cat.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPlans.map((plan) => (
            <motion.div key={plan.name} whileHover={{ scale: 1.02 }} className="border rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer" onClick={() => handleOpenModal(plan)}>
              <div className="flex items-center justify-between mb-4">
                <plan.icon size={24} className="text-primary" />
                <h3 className="text-lg font-bold">{plan.name}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.desc}</p>
              <div className="text-gray-700 text-sm space-y-2 mb-4">{renderSpecs(plan.specs)}</div>
              <div className="text-xl font-bold text-primary">Rp{plan.price[billingCycle].toLocaleString("id-ID")}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPlan && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }} className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 relative">
              <button onClick={handleCloseModal} className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X size={20} /></button>
              <AnimatePresence mode="wait">
                <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between mt-6">
                {currentStep > 1 && <button onClick={handlePrev} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Kembali</button>}
                {currentStep < maxStep && <button onClick={handleNext} disabled={!canProceed()} className="ml-auto px-4 py-2 rounded-md bg-primary text-white disabled:opacity-50 hover:bg-primary/90">Lanjut</button>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Pricing;
