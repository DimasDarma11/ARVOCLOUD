import React, { useState, useMemo, useCallback, memo } from "react";
import { Check, Star, Zap, Crown, Server, Monitor, Cpu, ShieldCheck, X, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Memoized Modal Step Components
const StepRegion = memo(({ regions, selected, onSelect }) => (
  <div className="space-y-4">
    <h4 className="text-xl font-bold text-gray-800 mb-4">Pilih Region</h4>
    <div className="grid gap-3">
      {regions.map((r) => (
        <button key={r} onClick={() => onSelect(r)} className={`p-4 rounded-xl border-2 transition-all text-left ${selected === r ? "border-blue-600 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-blue-300"}`}>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-800">{r}</span>
            {selected === r && <Check className="w-6 h-6 text-blue-600" />}
          </div>
        </button>
      ))}
    </div>
  </div>
));

const StepQuantity = memo(({ quantity, usage, onQuantityChange, onUsageChange }) => (
  <div className="space-y-6">
    <h4 className="text-xl font-bold text-gray-800 mb-4">Kuantitas dan Kegunaan</h4>
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Unit</label>
      <input type="number" min="1" value={quantity} onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all" />
    </div>
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Digunakan Untuk Apa? <span className="text-red-500">*</span></label>
      <textarea value={usage} onChange={(e) => onUsageChange(e.target.value)} placeholder="Contoh: Hosting website e-commerce, development aplikasi, dll." rows="4" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all resize-none" />
      {usage.trim() === "" && <p className="text-red-500 text-xs mt-1">Field ini wajib diisi</p>}
    </div>
  </div>
));

const StepOS = memo(({ osList, selected, onSelect, category, ipPublic, onIPToggle }) => (
  <div className="space-y-4">
    <h4 className="text-xl font-bold text-gray-800 mb-4">Pilih Sistem Operasi</h4>
    <div className="grid gap-3">
      {osList.map((os) => (
        <button key={os} onClick={() => onSelect(os)} className={`p-4 rounded-xl border-2 transition-all text-left ${selected === os ? "border-blue-600 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-blue-300"}`}>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-800">{os}</span>
            {selected === os && <Check className="w-6 h-6 text-blue-600" />}
          </div>
        </button>
      ))}
    </div>
    
    {category === "rdp" && (
      <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
        <div className="flex items-start gap-3">
          <input type="checkbox" id="ipPublic" checked={ipPublic} onChange={(e) => onIPToggle(e.target.checked)} className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
          <div className="flex-1">
            <label htmlFor="ipPublic" className="font-semibold text-gray-800 cursor-pointer block">Tambah IP Public (+Rp85.000/bulan)</label>
            <p className="text-sm text-gray-600 mt-1">Default menggunakan IP NAT. Pilih IP Public jika membutuhkan open all port untuk kebutuhan tertentu.</p>
            {ipPublic && <p className="text-xs text-blue-600 font-semibold mt-2 bg-white/70 p-2 rounded">ℹ️ *IP Public memungkinkan open all port untuk kebutuhan yang membutuhkan port tertentu</p>}
          </div>
        </div>
      </div>
    )}
    
    {category === "vps" && (
      <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-gray-800">IP Public sudah termasuk dalam paket</span>
        </div>
      </div>
    )}
    
    {category === "baremetal" && (
      <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border-2 border-gray-200">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">🏠 Menggunakan IP Local</span>
        </div>
      </div>
    )}
  </div>
));

const StepDuration = memo(({ durations, selected, onSelect, plan, quantity, category, ipPublic }) => (
  <div className="space-y-4">
    <h4 className="text-xl font-bold text-gray-800 mb-4">Pilih Durasi</h4>
    <div className="grid gap-3">
      {durations.map((duration) => {
        let price = (duration === "1 Bulan (30 Hari)" ? plan.price.bulanan : plan.price.tahunan) * quantity;
        if (category === "rdp" && ipPublic) price += 85000 * quantity;
        
        return (
          <button key={duration} onClick={() => onSelect(duration)} className={`p-4 rounded-xl border-2 transition-all text-left ${selected === duration ? "border-blue-600 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-blue-300"}`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-semibold text-gray-800 block">{duration}</span>
                <span className="text-sm text-gray-600">Rp{price.toLocaleString("id-ID")}</span>
                {category === "rdp" && ipPublic && <span className="text-xs text-blue-600 block mt-1">(Termasuk IP Public)</span>}
              </div>
              {selected === duration && <Check className="w-6 h-6 text-blue-600" />}
            </div>
          </button>
        );
      })}
    </div>
  </div>
));

const StepConfirm = memo(({ plan, formData, category, finalPrice, onWhatsApp, onMessenger }) => {
  const isProxy = category === "proxy";
  
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-gray-800 mb-4">Konfirmasi Pesanan</h4>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 space-y-3">
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">📦 Nama Paket:</span>
          <span className="text-gray-900 font-bold text-right">{plan.name}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">🌍 Region:</span>
          <span className="text-gray-900 font-semibold text-right">{formData.region}</span>
        </div>
        
        {!isProxy && (
          <>
            <div className="flex justify-between items-start">
              <span className="text-gray-600 font-medium">💻 Sistem Operasi:</span>
              <span className="text-gray-900 font-semibold text-right">{formData.os}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-gray-600 font-medium">⚡ CPU:</span>
              <span className="text-gray-900 font-semibold text-right">{plan.specs.cpu}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-gray-600 font-medium">🧠 RAM:</span>
              <span className="text-gray-900 font-semibold text-right">{plan.specs.ram}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-gray-600 font-medium">🌐 IP:</span>
              <span className="text-gray-900 font-semibold text-right">
                {category === "vps" && "✅ IP Public (Included)"}
                {category === "rdp" && (formData.ipPublic ? "✅ IP Public (+Rp85.000)" : "🔒 IP NAT (Default)")}
                {category === "baremetal" && "🏠 IP Local"}
              </span>
            </div>
            {category === "rdp" && formData.ipPublic && (
              <div className="bg-blue-100/70 p-3 rounded-lg">
                <p className="text-xs text-blue-800 font-medium">ℹ️ *IP Public untuk open all port, cocok untuk kebutuhan yang membutuhkan port tertentu</p>
              </div>
            )}
          </>
        )}
        
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">🔢 Kuantitas:</span>
          <span className="text-gray-900 font-semibold text-right">{formData.quantity}</span>
        </div>
        
        {!isProxy && (
          <div className="flex justify-between items-start">
            <span className="text-gray-600 font-medium">🛡️ Garansi:</span>
            <span className="text-gray-900 font-semibold text-right">Garansi full</span>
          </div>
        )}
        
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">⏱️ Durasi:</span>
          <span className="text-gray-900 font-semibold text-right">{formData.duration}</span>
        </div>
        <div className="flex justify-between items-start pt-3 border-t-2 border-blue-200">
          <span className="text-gray-600 font-medium">💰 Total Harga:</span>
          <span className="text-blue-600 font-bold text-xl text-right">Rp{finalPrice.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex flex-col pt-3 border-t-2 border-blue-200">
          <span className="text-gray-600 font-medium mb-2">🎯 Digunakan Untuk:</span>
          <span className="text-gray-900 font-semibold bg-white/70 p-3 rounded-lg">{formData.usage}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <button onClick={onWhatsApp} className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white shadow-lg hover:shadow-xl">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Pesan via WhatsApp
        </button>
        <button onClick={onMessenger} className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-xl">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/></svg>
          Pesan via Messenger
        </button>
      </div>
    </div>
  );
});

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("bulanan");
  const [selectedCategory, setSelectedCategory] = useState("vps");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    region: "",
    quantity: 1,
    usage: "",
    os: "",
    duration: "",
    ipPublic: false
  });

  const whatsappNumber = "6283197183724";
  const messengerUsername = "superku15";

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

  const getAvailableRegions = useCallback(() => {
    if (selectedCategory === "vps") return ["🇮🇩 Indonesia"];
    if (selectedCategory === "rdp") return ["🇺🇸 USA", "🇮🇩 Indonesia"];
    if (selectedCategory === "baremetal") return selectedPlan?.name.includes("USA") ? ["🇺🇸 USA"] : ["🇮🇩 Indonesia"];
    if (selectedCategory === "proxy") return ["🌍 Global"];
    return [];
  }, [selectedCategory, selectedPlan]);

  const getAvailableOS = useCallback(() => {
    if (selectedCategory === "vps") return ["Ubuntu 22.04", "Ubuntu 24.04", "Debian 12", "Debian 14"];
    if (selectedCategory === "rdp" || selectedCategory === "baremetal") return ["Windows 10 Ghost Spectre", "Windows 11 Ghost Spectre"];
    if (selectedCategory === "proxy") return ["N/A - Proxy Service"];
    return [];
  }, [selectedCategory]);

  const handleOpenModal = useCallback((plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    setCurrentStep(1);
    setFormData(selectedCategory === "proxy" ? { region: "🌍 Global", quantity: 1, usage: "", os: "N/A - Proxy Service", duration: "", ipPublic: false } : { region: "", quantity: 1, usage: "", os: "", duration: "", ipPublic: false });
  }, [selectedCategory]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setSelectedPlan(null);
    setFormData({ region: "", quantity: 1, usage: "", os: "", duration: "", ipPublic: false });
  }, []);

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

  const handleNext = useCallback(() => {
    const maxStep = selectedCategory === "proxy" ? 3 : 5;
    if (canProceed() && currentStep < maxStep) setCurrentStep(currentStep + 1);
  }, [selectedCategory, canProceed, currentStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const getFinalPrice = useCallback(() => {
    if (!selectedPlan) return 0;
    let price = (formData.duration === "1 Bulan (30 Hari)" ? selectedPlan.price.bulanan : selectedPlan.price.tahunan) * formData.quantity;
    if (selectedCategory === "rdp" && formData.ipPublic) price += 85000 * formData.quantity;
    return price;
  }, [selectedPlan, formData, selectedCategory]);

  const generateOrderMessage = useCallback(() => {
    if (!selectedPlan) return "";
    const categoryName = { vps: "VPS", rdp: "RDP", baremetal: "Bare Metal", proxy: "Proxy" }[selectedCategory];
    
    if (selectedCategory === "proxy") {
      return `Halo, saya ingin memesan ${categoryName} dengan konfigurasi berikut:\n\n📦 Nama Paket: ${selectedPlan.name}\n🌍 Region: ${formData.region}\n🔢 Kuantitas: ${formData.quantity}\n💰 Harga: Rp${getFinalPrice().toLocaleString("id-ID")}\n🎯 Digunakan Untuk: ${formData.usage}\n\nApakah konfigurasi ini tersedia?`;
    }
    
    const ipInfo = selectedCategory === "vps" ? "✅ IP Public (Included)" : selectedCategory === "rdp" ? (formData.ipPublic ? "✅ IP Public (+Rp85.000)\n*IP Public untuk open all port" : "🔒 IP NAT (Default)") : "🏠 IP Local";
    return `Halo, saya ingin memesan ${categoryName} dengan konfigurasi berikut:\n\n📦 Nama Paket: ${selectedPlan.name}\n🌍 Region: ${formData.region}\n💻 OS: ${formData.os}\n⚡ CPU: ${selectedPlan.specs.cpu}\n🧠 RAM: ${selectedPlan.specs.ram}\n🌐 IP: ${ipInfo}\n🔢 Kuantitas: ${formData.quantity}\n🛡️ Garansi: Garansi full\n💰 Harga: Rp${getFinalPrice().toLocaleString("id-ID")}\n🎯 Digunakan Untuk: ${formData.usage}\n\nApakah konfigurasi ini tersedia?`;
  }, [selectedPlan, selectedCategory, formData, getFinalPrice]);

  const handleWhatsAppOrder = useCallback(() => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(generateOrderMessage())}`, "_blank");
    handleCloseModal();
  }, [generateOrderMessage, handleCloseModal]);

  const handleTelegramOrder = useCallback(() => {
    window.open(`https://t.me/${telegramUsername}?text=${encodeURIComponent(generateOrderMessage())}`, "_blank");
    handleCloseModal();
  }, [generateOrderMessage, handleCloseModal]);

  const maxStep = selectedCategory === "proxy" ? 3 : 5;
  const isProxyCategory = selectedCategory === "proxy";

  return (
    <section id="pricing" className="py-28 bg-gradient-to-b from-transparent via-[#f8fafc]/80 to-[#e2e8f0]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Harga yang <span className="bg-gradient-to-r from-gray-800 to-gray-800 bg-clip-text text-transparent">Transparan</span>
        </h2>
        <p className="text-gray-600/90 text-lg max-w-2xl mx-auto mb-10">Pilih paket sesuai kebutuhan Anda. Semua sudah termasuk dukungan 24/7.</p>

        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all duration-300 ${selectedCategory === c.id ? "bg-white/80 text-primary border-primary/60 shadow-[0_0_25px_rgba(59,130,246,0.25)] backdrop-blur-md scale-[1.03]" : "bg-white/40 text-gray-700 border-gray-200 hover:bg-white/70 hover:text-primary/90 hover:shadow-[0_0_10px_rgba(59,130,246,0.15)] backdrop-blur-sm"}`}>
              <c.icon className={`w-5 h-5 transition-all duration-300 ${selectedCategory === c.id ? "text-primary drop-shadow-[0_0_6px_rgba(59,130,246,0.35)]" : "text-gray-500"}`} />
              <span className="font-medium tracking-wide">{c.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center mb-12">
          <span className={`mr-3 text-sm md:text-base font-medium transition-all duration-300 ${billingCycle === "bulanan" ? "text-primary font-semibold scale-105" : "text-gray-500 scale-105"}`}>Bulanan</span>
          <button onClick={() => setBillingCycle(billingCycle === "bulanan" ? "tahunan" : "bulanan")} className={`relative w-20 h-10 rounded-full p-1 flex items-center transition-all duration-500 backdrop-blur-md border ${billingCycle === "tahunan" ? "bg-blue-100/70 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.35)]" : "bg-gray-200/60 border-gray-300 shadow-inner"}`}>
            <motion.div layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center ${billingCycle === "tahunan" ? "translate-x-10 bg-blue-600 shadow-blue-400/50" : "translate-x-0 bg-blue-600 shadow-blue-400/50"}`}>
              <motion.span key={billingCycle} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-white text-[10px] font-semibold select-none">{billingCycle === "bulanan" ? "B" : "T"}</motion.span>
            </motion.div>
          </button>
          <span className={`ml-3 text-sm md:text-base font-medium transition-all duration-300 ${billingCycle === "tahunan" ? "text-blue-600 font-semibold scale-105" : "text-gray-500 scale-100"}`}>Tahunan</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {currentPlans.map((plan, i) => (
            <div key={i} className="relative group transition-all duration-500 rounded-2xl p-8 border backdrop-blur-md bg-white/60 border-gray-200 hover:bg-white/80 hover:shadow-[0_8px_32px_rgba(59,130,246,0.1)]">
              <div className="w-14 h-14 mx-auto mb-5 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center shadow-inner">
                <plan.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-6 text-center">{plan.desc}</p>
              <div className="text-4xl font-extrabold text-blue-600 mb-6 text-center">
                Rp{plan.price[billingCycle].toLocaleString("id-ID")}
                <span className="text-gray-500 text-sm ml-1 font-medium">/{billingCycle === "bulanan" ? "bulan" : "tahun"}</span>
              </div>
              <div className="text-gray-700 text-sm space-y-2 mb-8">
                {Object.entries(plan.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="capitalize">{k}:</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => handleOpenModal(plan)} className="w-full py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-[0_4px_20px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_30px_rgba(59,130,246,0.35)]">Mulai Sekarang</button>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-blue-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        <AnimatePresence>
          {isModalOpen && selectedPlan && (
            <motion.div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseModal}>
              <motion.div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-t-2xl z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">{selectedPlan.name}</h3>
                      <p className="text-blue-100 text-sm mt-1">Lengkapi formulir pemesanan</p>
                    </div>
                    <button onClick={handleCloseModal} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    {Array.from({ length: maxStep }, (_, i) => i + 1).map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${currentStep >= step ? "bg-white text-blue-600" : "bg-white/30 text-white"}`}>{step}</div>
                        {step < maxStep && <div className={`${isProxyCategory ? 'w-16' : 'w-8'} h-1 mx-1 rounded transition-all ${currentStep > step ? "bg-white" : "bg-white/30"}`} />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && !isProxyCategory && (
                      <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">Pilih Region</h4>
                        <div className="grid gap-3">
                          {getAvailableRegions().map((r) => (
                            <button key={r} onClick={() => setFormData({ ...formData, region: r })} className={`p-4 rounded-xl border-2 transition-all text-left ${formData.region === r ? "border-blue-600 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-blue-300"}`}>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-gray-800">{r}</span>
                                {formData.region === r && <Check className="w-6 h-6 text-blue-600" />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {((currentStep === 2 && !isProxyCategory) || (currentStep === 1 && isProxyCategory)) && (
                      <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">Kuantitas dan Kegunaan</h4>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Unit</label>
                          <input type="number" min="1" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1) })} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Digunakan Untuk Apa? <span className="text-red-500">*</span></label>
                          <textarea value={formData.usage} onChange={(e) => setFormData({ ...formData, usage: e.target.value })} placeholder="Contoh: Hosting website e-commerce, development aplikasi, dll." rows="4" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all resize-none" />
                          {formData.usage.trim() === "" && <p className="text-red-500 text-xs mt-1">Field ini wajib diisi</p>}
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && !isProxyCategory && (
                      <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">Pilih Sistem Operasi</h4>
                        <div className="grid gap-3">
                          {getAvailableOS().map((os) => (
                            <button key={os} onClick={() => setFormData({ ...formData, os })} className={`p-4 rounded-xl border-2 transition-all text-left ${formData.os === os ? "border-blue-600 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-blue-300"}`}>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-gray-800">{os}</span>
                                {formData.os === os && <Check className="w-6 h-6 text-blue-600" />}
                              </div>
                            </button>
                          ))}
                        </div>
                        
                        {selectedCategory === "rdp" && (
                          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                            <div className="flex items-start gap-3">
                              <input type="checkbox" id="ipPublic" checked={formData.ipPublic} onChange={(e) => setFormData({ ...formData, ipPublic: e.target.checked })} className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                              <div className="flex-1">
                                <label htmlFor="ipPublic" className="font-semibold text-gray-800 cursor-pointer block">Tambah IP Public (+Rp85.000/bulan)</label>
                                <p className="text-sm text-gray-600 mt-1">Default menggunakan IP NAT. Pilih IP Public jika membutuhkan open all port untuk kebutuhan tertentu.</p>
                                {formData.ipPublic && <p className="text-xs text-blue-600 font-semibold mt-2 bg-white/70 p-2 rounded">ℹ️ *IP Public memungkinkan open all port untuk kebutuhan yang membutuhkan port tertentu</p>}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {selectedCategory === "vps" && (
                          <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                            <div className="flex items-center gap-2">
                              <Check className="w-5 h-5 text-green-600" />
                              <span className="font-semibold text-gray-800">IP Public sudah termasuk dalam paket</span>
                            </div>
                          </div>
                        )}
                        
                        {selectedCategory === "baremetal" && (
                          <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border-2 border-gray-200">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-800">🏠 Menggunakan IP Local</span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {((currentStep === 4 && !isProxyCategory) || (currentStep === 2 && isProxyCategory)) && (
                      <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">Pilih Durasi</h4>
                        <div className="grid gap-3">
                          {["1 Bulan (30 Hari)", "1 Tahun"].map((duration) => {
                            let price = (duration === "1 Bulan (30 Hari)" ? selectedPlan.price.bulanan : selectedPlan.price.tahunan) * formData.quantity;
                            if (selectedCategory === "rdp" && formData.ipPublic) price += 85000 * formData.quantity;
                            
                            return (
                              <button key={duration} onClick={() => setFormData({ ...formData, duration })} className={`p-4 rounded-xl border-2 transition-all text-left ${formData.duration === duration ? "border-blue-600 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-blue-300"}`}>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-lg font-semibold text-gray-800 block">{duration}</span>
                                    <span className="text-sm text-gray-600">Rp{price.toLocaleString("id-ID")}</span>
                                    {selectedCategory === "rdp" && formData.ipPublic && <span className="text-xs text-blue-600 block mt-1">(Termasuk IP Public)</span>}
                                  </div>
                                  {formData.duration === duration && <Check className="w-6 h-6 text-blue-600" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {((currentStep === 5 && !isProxyCategory) || (currentStep === 3 && isProxyCategory)) && (
                      <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">Konfirmasi Pesanan</h4>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 space-y-3">
                          <div className="flex justify-between items-start">
                            <span className="text-gray-600 font-medium">📦 Nama Paket:</span>
                            <span className="text-gray-900 font-bold text-right">{selectedPlan.name}</span>
                          </div>
                          <div className="flex justify-between items-start">
                            <span className="text-gray-600 font-medium">🌍 Region:</span>
                            <span className="text-gray-900 font-semibold text-right">{formData.region}</span>
                          </div>
                          
                          {!isProxyCategory && (
                            <>
                              <div className="flex justify-between items-start">
                                <span className="text-gray-600 font-medium">💻 OS:</span>
                                <span className="text-gray-900 font-semibold text-right">{formData.os}</span>
                              </div>
                              <div className="flex justify-between items-start">
                                <span className="text-gray-600 font-medium">⚡ CPU:</span>
                                <span className="text-gray-900 font-semibold text-right">{selectedPlan.specs.cpu}</span>
                              </div>
                              <div className="flex justify-between items-start">
                                <span className="text-gray-600 font-medium">🧠 RAM:</span>
                                <span className="text-gray-900 font-semibold text-right">{selectedPlan.specs.ram}</span>
                              </div>
                              <div className="flex justify-between items-start">
                                <span className="text-gray-600 font-medium">🌐 IP:</span>
                                <span className="text-gray-900 font-semibold text-right">
                                  {selectedCategory === "vps" && "✅ IP Public (Included)"}
                                  {selectedCategory === "rdp" && (formData.ipPublic ? "✅ IP Public (+Rp85.000)" : "🔒 IP NAT (Default)")}
                                  {selectedCategory === "baremetal" && "🏠 IP Local"}
                                </span>
                              </div>
                              {selectedCategory === "rdp" && formData.ipPublic && (
                                <div className="bg-blue-100/70 p-3 rounded-lg">
                                  <p className="text-xs text-blue-800 font-medium">ℹ️ *IP Public untuk open all port, cocok untuk kebutuhan yang membutuhkan port tertentu</p>
                                </div>
                              )}
                            </>
                          )}
                          
                          <div className="flex justify-between items-start">
                            <span className="text-gray-600 font-medium">🔢 Kuantitas:</span>
                            <span className="text-gray-900 font-semibold text-right">{formData.quantity}</span>
                          </div>
                          
                          {!isProxyCategory && (
                            <div className="flex justify-between items-start">
                              <span className="text-gray-600 font-medium">🛡️ Garansi:</span>
                              <span className="text-gray-900 font-semibold text-right">Garansi full</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-start">
                            <span className="text-gray-600 font-medium">⏱️ Durasi:</span>
                            <span className="text-gray-900 font-semibold text-right">{formData.duration}</span>
                          </div>
                          <div className="flex justify-between items-start pt-3 border-t-2 border-blue-200">
                            <span className="text-gray-600 font-medium">💰 Total Harga:</span>
                            <span className="text-blue-600 font-bold text-xl text-right">Rp{getFinalPrice().toLocaleString("id-ID")}</span>
                          </div>
                          <div className="flex flex-col pt-3 border-t-2 border-blue-200">
                            <span className="text-gray-600 font-medium mb-2">🎯 Digunakan Untuk:</span>
                            <span className="text-gray-900 font-semibold bg-white/70 p-3 rounded-lg">{formData.usage}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          <button onClick={handleWhatsAppOrder} className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white shadow-lg hover:shadow-xl">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            Order via WhatsApp
                          </button>
                          <button onClick={handleTelegramOrder} className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-xl">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/></svg>
                            Order via Telegram
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {currentStep < maxStep && (
                  <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t flex items-center justify-between">
                    <button onClick={handlePrev} disabled={currentStep === 1} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${currentStep === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600"}`}>
                      <ChevronLeft className="w-5 h-5" />
                      Kembali
                    </button>
                    <div className="text-sm text-gray-500 font-medium">Langkah {currentStep} dari {maxStep}</div>
                    <button onClick={handleNext} disabled={!canProceed()} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${canProceed() ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 shadow-md hover:shadow-lg" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                      Lanjut
                      <ChevronRight className="w-5 h-5" />
                    </button>
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
