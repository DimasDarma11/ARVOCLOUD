import React, { memo } from "react";
import { Check } from "lucide-react";

const SelectableCard = ({ label, selected, onClick, subLabel, extra }) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-xl border-2 transition-all text-left ${
      selected ? "border-blue-600 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-blue-300"
    }`}
  >
    <div className="flex items-center justify-between">
      <div>
        <span className="text-lg font-semibold text-gray-800 block">{label}</span>
        {subLabel && <span className="text-sm text-gray-600 block">{subLabel}</span>}
        {extra && <span className="text-xs text-blue-600 block mt-1">{extra}</span>}
      </div>
      {selected && <Check className="w-6 h-6 text-blue-600" />}
    </div>
  </button>
);

const InfoCard = ({ children, color = "blue", icon }) => {
  const bgMap = { blue: "from-blue-50 to-indigo-50", green: "from-green-50 to-emerald-50", gray: "from-gray-50 to-slate-50" };
  const borderMap = { blue: "border-blue-200", green: "border-green-200", gray: "border-gray-200" };
  return (
    <div className={`mt-6 p-4 bg-gradient-to-br ${bgMap[color]} rounded-xl border-2 ${borderMap[color]}`}>
      <div className="flex items-center gap-2">{icon}{children}</div>
    </div>
  );
};

// === Steps ===
export const StepRegion = memo(({ regions, selected, onSelect }) => (
  <div className="space-y-4">
    <h4 className="text-xl font-bold text-gray-800 mb-4">Pilih Region</h4>
    <div className="grid gap-3">
      {regions.map(r => <SelectableCard key={r} label={r} selected={selected===r} onClick={() => onSelect(r)} />)}
    </div>
  </div>
));

export const StepQuantity = memo(({ quantity, usage, onQuantityChange, onUsageChange }) => (
  <div className="space-y-6">
    <h4 className="text-xl font-bold text-gray-800 mb-4">Kuantitas dan Kegunaan</h4>
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Unit</label>
      <input type="number" min={1} value={quantity} onChange={e => onQuantityChange(Math.max(1, parseInt(e.target.value)||1))}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all"
      />
    </div>
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Digunakan Untuk Apa? <span className="text-red-500">*</span></label>
      <textarea value={usage} onChange={e => onUsageChange(e.target.value)} placeholder="Contoh: Hosting website, development dll." rows={4}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all resize-none"
      />
      {usage.trim() === "" && <p className="text-red-500 text-xs mt-1">Field ini wajib diisi</p>}
    </div>
  </div>
));

export const StepOS = memo(({ osList, selected, onSelect, category, ipPublic, onIPToggle }) => (
  <div className="space-y-4">
    <h4 className="text-xl font-bold text-gray-800 mb-4">Pilih Sistem Operasi</h4>
    <div className="grid gap-3">{osList.map(os => <SelectableCard key={os} label={os} selected={selected===os} onClick={() => onSelect(os)} />)}</div>

    {category === "rdp" && (
      <InfoCard color="blue" icon={<input type="checkbox" checked={ipPublic} onChange={e => onIPToggle(e.target.checked)} className="mt-1 w-5 h-5 text-blue-600 rounded" />}>
        <div className="flex-1">
          <label className="font-semibold text-gray-800 cursor-pointer block">Tambah IP Public (+Rp85.000/bulan)</label>
          {ipPublic && <p className="text-xs text-blue-600 mt-2 bg-white/70 p-2 rounded">ℹ️ IP Public memungkinkan open all port</p>}
        </div>
      </InfoCard>
    )}

    {category === "vps" && <InfoCard color="green" icon={<Check className="w-5 h-5 text-green-600" />}>IP Public sudah termasuk</InfoCard>}
    {category === "baremetal" && <InfoCard color="gray">🏠 Menggunakan IP Local</InfoCard>}
  </div>
));

export const StepDuration = memo(({ durations, selected, onSelect, plan, quantity, category, ipPublic }) => (
  <div className="space-y-4">
    <h4 className="text-xl font-bold text-gray-800 mb-4">Pilih Durasi</h4>
    <div className="grid gap-3">
      {durations.map(d => {
        let price = (d.includes("1 Bulan") ? plan.price.bulanan : plan.price.tahunan) * quantity;
        if (category === "rdp" && ipPublic) price += 85000*quantity;
        return <SelectableCard key={d} label={d} selected={selected===d} onClick={() => onSelect(d)} subLabel={`Rp${price.toLocaleString("id-ID")}`} extra={category==="rdp" && ipPublic ? "(Termasuk IP Public)" : ""} />;
      })}
    </div>
  </div>
));

export const StepConfirm = memo(({ plan, formData, category, finalPrice, onWhatsApp, onTelegram }) => {
  const isProxy = category === "proxy";

  const InfoRow = ({ label, value, className }) => (
    <div className={`flex justify-between items-start ${className || ""}`}>
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold text-right">{value}</span>
    </div>
  );

  const renderIP = () => {
    if (category === "vps") return "✅ IP Public (Included)";
    if (category === "rdp") return formData.ipPublic ? "✅ IP Public (+Rp85.000)" : "🔒 IP NAT (Default)";
    if (category === "baremetal") return "🏠 IP Local";
    return "-";
  };

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-gray-800 mb-4">Konfirmasi Pesanan</h4>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 space-y-3">
        <InfoRow label="📦 Nama Paket:" value={plan.name} />
        <InfoRow label="🌍 Region:" value={formData.region} />

        {!isProxy && (
          <>
            <InfoRow label="💻 Sistem Operasi:" value={formData.os} />
            <InfoRow label="⚡ CPU:" value={plan.specs.cpu} />
            <InfoRow label="🧠 RAM:" value={plan.specs.ram} />
            <InfoRow label="🌐 IP:" value={renderIP()} />
            {category === "rdp" && formData.ipPublic && (
              <div className="bg-blue-100/70 p-3 rounded-lg text-xs text-blue-800 font-medium">
                ℹ️ *IP Public untuk open all port, cocok untuk kebutuhan tertentu
              </div>
            )}
          </>
        )}

        <InfoRow label="🔢 Kuantitas:" value={formData.quantity} />
        {!isProxy && <InfoRow label="🛡️ Garansi:" value="Garansi full" />}
        <InfoRow label="⏱️ Durasi:" value={formData.duration} />

        <InfoRow label="💰 Total Harga:" value={`Rp${finalPrice.toLocaleString("id-ID")}`} className="pt-3 border-t-2 border-blue-200 text-blue-600 font-bold text-xl" />

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
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm5.478 7.859l-1.693 7.992c-.127.564-.46.698-.932.437l-2.581-1.905-1.245 1.2c-.137.137-.252.252-.516.252l.184-2.623 4.772-4.312c.208-.184-.045-.288-.322-.104l-5.905 3.72-2.546-.796c-.552-.173-.564-.552.115-.815l10.012-3.87c.464-.173.868.104.717.832z" />
          </svg>
          Order via Telegram
        </button>
      </div>
    </div>
  );
});
