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
  const isProxyCategory = selectedCategory === "proxy";
  const maxStep = isProxyCategory ? 3 : 5;

  const handleOpenModal = useCallback((plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    setCurrentStep(1);
    setFormData(isProxyCategory ? { region: "🌍 Global", quantity: 1, usage: "", os: "N/A - Proxy", duration: "", ipPublic: false } : { region: "", quantity: 1, usage: "", os: "", duration: "", ipPublic: false });
  }, [isProxyCategory]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setSelectedPlan(null);
    setFormData({ region: "", quantity: 1, usage: "", os: "", duration: "", ipPublic: false });
  }, []);

  const canProceed = useCallback(() => {
    if (isProxyCategory) return (currentStep === 1 && formData.quantity >= 1 && formData.usage) || (currentStep === 2 && formData.duration);
    return (currentStep === 1 && formData.region) || (currentStep === 2 && formData.quantity >= 1 && formData.usage) || (currentStep === 3 && formData.os) || (currentStep === 4 && formData.duration);
  }, [currentStep, formData, isProxyCategory]);

  const handleNext = useCallback(() => { if (canProceed() && currentStep < maxStep) setCurrentStep(currentStep + 1); }, [currentStep, canProceed, maxStep]);
  const handlePrev = useCallback(() => { if (currentStep > 1) setCurrentStep(currentStep - 1); }, [currentStep]);

  const getFinalPrice = useCallback(() => {
    if (!selectedPlan) return 0;
    let price = (formData.duration?.includes("Bulan") ? selectedPlan.price.bulanan : selectedPlan.price.tahunan) * formData.quantity;
    if (selectedCategory === "rdp" && formData.ipPublic) price += 85000 * formData.quantity;
    return price;
  }, [selectedPlan, formData, selectedCategory]);

  const generateOrderMessage = useCallback(() => {
    if (!selectedPlan) return "";
    const ipInfo = selectedCategory === "vps" ? "✅ IP Public" : selectedCategory === "rdp" ? (formData.ipPublic ? "✅ IP Public (+Rp85.000)" : "🔒 IP NAT") : "🏠 IP Local";
    const base = `Halo, saya ingin memesan ${selectedCategory.toUpperCase()}:\n📦 Paket: ${selectedPlan.name}\n🌍 Region: ${formData.region}\n💻 OS: ${formData.os}\n⚡ CPU: ${selectedPlan.specs.cpu}\n🧠 RAM: ${selectedPlan.specs.ram}\n🌐 IP: ${ipInfo}\n🔢 Qty: ${formData.quantity}\n💰 Harga: Rp${getFinalPrice().toLocaleString()}\n🎯 Untuk: ${formData.usage}`;
    return base;
  }, [selectedPlan, selectedCategory, formData, getFinalPrice]);

  const handleWhatsAppOrder = useCallback(() => { window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(generateOrderMessage())}`, "_blank"); handleCloseModal(); }, [generateOrderMessage, handleCloseModal]);
  const handleTelegramOrder = useCallback(() => { window.open(`https://t.me/${telegramUsername}?text=${encodeURIComponent(generateOrderMessage())}`, "_blank"); handleCloseModal(); }, [generateOrderMessage, handleCloseModal]);

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Harga <span className="text-blue-600">Transparan</span></h2>
        <p className="text-gray-600 mb-10">Pilih paket sesuai kebutuhan Anda. Semua sudah termasuk dukungan 24/7.</p>

        <div className="flex justify-center gap-3 flex-wrap mb-8">
          {categories.map(c => (
            <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`flex items-center gap-2 px-5 py-2 rounded-2xl transition ${selectedCategory===c.id?'bg-white text-blue-600 shadow':'bg-gray-100 text-gray-700 hover:bg-white'}`}>
              <c.icon className="w-5 h-5" />
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={billingCycle==="bulanan"?"font-semibold text-blue-600":"text-gray-500"}>Bulanan</span>
          <button onClick={()=>setBillingCycle(billingCycle==="bulanan"?"tahunan":"bulanan")} className="w-16 h-8 bg-gray-200 rounded-full relative">
            <motion.div layout className={`w-7 h-7 bg-blue-600 rounded-full absolute top-0 ${billingCycle==="tahunan"?"right-0":"left-0"}`} />
          </button>
          <span className={billingCycle==="tahunan"?"font-semibold text-blue-600":"text-gray-500"}>Tahunan</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {currentPlans.map((plan, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition relative flex flex-col">
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-blue-100 rounded-lg mx-auto">
                <plan.icon className="w-6 h-6 text-blue-600"/>
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center">{plan.name}</h3>
              <p className="text-gray-500 text-sm text-center mb-4">{plan.desc}</p>
              <div className="text-2xl font-bold text-blue-600 text-center mb-4">
                Rp{plan.price[billingCycle].toLocaleString()}<span className="text-gray-400 text-sm">/{billingCycle==="bulanan"?"bulan":"tahun"}</span>
              </div>
              <div className="text-gray-700 text-sm mb-4 flex flex-col gap-1">
                {Object.entries(plan.specs).map(([k,v])=>(
                  <div key={k} className="flex justify-between"><span>{k}</span><span className="font-medium">{v}</span></div>
                ))}
              </div>
              <button onClick={()=>handleOpenModal(plan)} className="mt-auto py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-600 transition">Mulai Sekarang</button>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {isModalOpen && selectedPlan && (
            <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={handleCloseModal}>
              <motion.div className="bg-white rounded-2xl shadow-lg max-w-xl w-full max-h-[90vh] overflow-auto" initial={{scale:0.95}} animate={{scale:1}} exit={{scale:0.95}} onClick={e=>e.stopPropagation()}>
                <div className="sticky top-0 bg-blue-600 text-white p-5 rounded-t-2xl flex justify-between items-center">
                  <div><h3 className="text-xl font-bold">{selectedPlan.name}</h3></div>
                  <button onClick={handleCloseModal}><X className="w-5 h-5"/></button>
                </div>
                <div className="p-6 space-y-4">
                  <AnimatePresence mode="wait">
                    {currentStep===1&&!isProxyCategory&&<motion.div key="s1" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}><StepRegion regions={["🇮🇩","🇺🇸"]} selected={formData.region} onSelect={r=>setFormData({...formData,region:r})} /></motion.div>}
                    {(currentStep===2&&!isProxyCategory)||(currentStep===1&&isProxyCategory)&&<motion.div key="s2" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}><StepQuantity quantity={formData.quantity} usage={formData.usage} onQuantityChange={q=>setFormData({...formData,quantity:q})} onUsageChange={u=>setFormData({...formData,usage:u})}/></motion.div>}
                    {currentStep===3&&!isProxyCategory&&<motion.div key="s3" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}><StepOS osList={["Ubuntu","Debian"]} selected={formData.os} onSelect={os=>setFormData({...formData,os})} category={selectedCategory} ipPublic={formData.ipPublic} onIPToggle={ip=>setFormData({...formData,ipPublic:ip})}/></motion.div>}
                    {((currentStep===4&&!isProxyCategory)||(currentStep===2&&isProxyCategory))&&<motion.div key="s4" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}><StepDuration durations={["1 Bulan","1 Tahun"]} selected={formData.duration} onSelect={d=>setFormData({...formData,duration:d})} plan={selectedPlan} quantity={formData.quantity} category={selectedCategory} ipPublic={formData.ipPublic}/></motion.div>}
                    {((currentStep===5&&!isProxyCategory)||(currentStep===3&&isProxyCategory))&&<motion.div key="s5" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}><StepConfirm plan={selectedPlan} formData={formData} category={selectedCategory} finalPrice={getFinalPrice()} onWhatsApp={handleWhatsAppOrder} onTelegram={handleTelegramOrder}/></motion.div>}
                  </AnimatePresence>
                </div>

                {currentStep<maxStep&&(
                  <div className="sticky bottom-0 bg-gray-50 p-5 flex justify-between items-center border-t">
                    <button onClick={handlePrev} disabled={currentStep===1} className="px-4 py-2 rounded-xl border hover:border-blue-600 disabled:opacity-50 flex items-center gap-2"><ChevronLeft className="w-4 h-4"/>Kembali</button>
                    <span className="text-gray-500 text-sm">Langkah {currentStep} dari {maxStep}</span>
                    <button onClick={handleNext} disabled={!canProceed()} className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold disabled:opacity-50 flex items-center gap-2">Lanjut<ChevronRight className="w-4 h-4"/></button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Pricing;
