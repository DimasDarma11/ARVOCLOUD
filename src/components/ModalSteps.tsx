import React, { memo } from "react";
import { Check } from "lucide-react";

// Memoized Modal Step Components
export const StepRegion = memo(({ regions, selected, onSelect }) => (
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

export const StepQuantity = memo(({ quantity, usage, onQuantityChange, onUsageChange }) => (
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

export const StepOS = memo(({ osList, selected, onSelect, category, ipPublic, onIPToggle }) => (
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

export const StepDuration = memo(({ durations, selected, onSelect, plan, quantity, category, ipPublic }) => (
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

export const StepConfirm = memo(({ plan, formData, category, finalPrice, onWhatsApp, onMessenger }) => {
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
          Order via WhatsApp
        </button>
        <button onClick={onTelegram} className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-xl">
          <svg className="w-6 h-6" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="120" cy="120" r="120" fill="#37AEE2"/> <path d="M46 121L193 68c9-3 9 1 7 7L157 187c-2 6-4 8-11 5L106 155l-19 18c-2 2-3 3-5 3-2 0-2-2-1-4L106 132l57-57c2-2 0-3-3-1L46 121z" fill="white" /> </svg>
          Order via Telegram
        </button>
      </div>
    </div>
  );
});
