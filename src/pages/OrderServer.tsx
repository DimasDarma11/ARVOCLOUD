import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Server, Check, ArrowRight } from "lucide-react";

interface ServerPackage {
  id: string;
  name: string;
  type: string;
  cpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
  price: number;
  description: string;
}

interface OrderServerProps {
  onOrderComplete: (orderId: string) => void;
}

export const OrderServer: React.FC<OrderServerProps> = ({ onOrderComplete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [servers, setServers] = useState<ServerPackage[]>([]);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"VPS" | "RDP" | "Baremetal">("VPS");
  const [selectedOS, setSelectedOS] = useState<string>("");
  const [billingPeriod, setBillingPeriod] = useState<
    "monthly" | "quarterly" | "yearly"
  >("monthly");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingServers, setLoadingServers] = useState(true);

  const osOptions = {
    VPS: ["Ubuntu 22", "Ubuntu 24", "Debian"],
    RDP: ["Windows 10 Spectre", "Windows 11 Spectre"],
    Baremetal: ["Windows 10 Spectre", "Windows 11 Spectre"],
  };

  useEffect(() => {
    loadServers();
  }, [selectedType]);

  const loadServers = async () => {
    try {
      setLoadingServers(true);
      const { data, error } = await supabase
        .from("servers")
        .select("*")
        .eq("is_active", true)
        .eq("type", selectedType)
        .order("price", { ascending: true });

      if (error) throw error;
      setServers(data || []);
    } catch (error) {
      console.error("Error loading servers:", error);
    } finally {
      setLoadingServers(false);
    }
  };

  const calculateTotal = () => {
    const server = servers.find((s) => s.id === selectedServer);
    if (!server) return 0;

    const multiplier =
      billingPeriod === "monthly" ? 1 : billingPeriod === "quarterly" ? 3 : 12;
    const discount =
      billingPeriod === "quarterly" ? 0.95 : billingPeriod === "yearly" ? 0.85 : 1;
    return server.price * multiplier * discount;
  };

  const handleSubmitOrder = async () => {
    if (!selectedServer || !user || !selectedOS) {
      alert("Please select server and OS first!");
      return;
    }

    setLoading(true);
    try {
      const orderNumber = await generateOrderNumber();
      const total = calculateTotal();

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_id: user.id,
          server_id: selectedServer,
          os_choice: selectedOS,
          order_number: orderNumber,
          billing_period: billingPeriod,
          total_amount: total,
          notes,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);

      const invoiceNumber = await generateInvoiceNumber();

      const { data: invoiceData, error: invoiceError } = await supabase
        .from("invoices")
        .insert({
          order_id: orderData.id,
          customer_id: user.id,
          invoice_number: invoiceNumber,
          amount: total,
          status: "unpaid",
          due_date: dueDate.toISOString(),
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      onOrderComplete(orderData.id);
      navigate(`/payment/${invoiceData.id}`);
    } catch (error: any) {
      console.error("Error creating order:", error);
      alert("Failed to create order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateOrderNumber = async () => {
    const { data, error } = await supabase.rpc("generate_order_number");
    if (error) throw error;
    return data;
  };

  const generateInvoiceNumber = async () => {
    const { data, error } = await supabase.rpc("generate_invoice_number");
    if (error) throw error;
    return data;
  };

  if (loadingServers) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Neon background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent blur-3xl"></div>

      <div className="relative mb-10 text-center">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
          Deploy Your Server Instantly ⚡
        </h1>
        <p className="text-gray-400 mt-2">
          Pilih spesifikasi server terbaikmu dan jalankan hanya dalam hitungan menit.
        </p>
      </div>

      {/* Filter buttons */}
      <div className="flex justify-center gap-3 mb-10">
        {["VPS", "RDP", "Baremetal"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setSelectedType(type as any);
              setSelectedServer(null);
            }}
            className={`px-6 py-3 rounded-xl border backdrop-blur-lg transition-all font-medium ${
              selectedType === type
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/40"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/40"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Server list */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {servers.map((server) => (
          <motion.div
            key={server.id}
            onClick={() => setSelectedServer(server.id)}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-3xl border backdrop-blur-xl cursor-pointer transition-all duration-300 ${
              selectedServer === server.id
                ? "bg-gradient-to-br from-cyan-500/30 to-blue-700/20 border-cyan-500 shadow-lg shadow-cyan-500/40"
                : "bg-white/5 border-white/10 hover:border-cyan-400/30"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{server.name}</h3>
                  <span className="text-sm text-gray-400">{server.type}</span>
                </div>
              </div>
              {selectedServer === server.id && (
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <p className="text-gray-400 text-sm mb-4">{server.description}</p>

            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">CPU</span>
                <span className="text-white">{server.cpu}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">RAM</span>
                <span className="text-white">{server.ram}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Storage</span>
                <span className="text-white">{server.storage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Bandwidth</span>
                <span className="text-white">{server.bandwidth}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10">
              <span className="text-2xl font-bold text-white">
                Rp {server.price.toLocaleString("id-ID")}
              </span>
              <span className="text-gray-400 text-sm ml-1">/bulan</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail & Checkout */}
      {selectedServer && (
        <div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Checkout Server</h2>
          <div className="space-y-6">
            {/* OS Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Operating System
              </label>
              <select
                value={selectedOS}
                onChange={(e) => setSelectedOS(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">-- Pilih OS --</option>
                {osOptions[selectedType].map((os) => (
                  <option key={os} value={os}>
                    {os}
                  </option>
                ))}
              </select>
            </div>

            {/* Billing */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Periode Pembayaran
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "monthly", label: "Bulanan", discount: 0 },
                  { value: "quarterly", label: "3 Bulan", discount: 5 },
                  { value: "yearly", label: "Tahunan", discount: 15 },
                ].map((period) => (
                  <button
                    key={period.value}
                    onClick={() => setBillingPeriod(period.value as any)}
                    className={`p-4 rounded-xl border transition-all ${
                      billingPeriod === period.value
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/40"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-cyan-500/30"
                    }`}
                  >
                    <div className="font-medium">{period.label}</div>
                    {period.discount > 0 && (
                      <div className="text-xs text-cyan-400 mt-1">
                        Hemat {period.discount}%
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Catatan (Opsional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Tulis kebutuhan khususmu di sini..."
              />
            </div>

            {/* Total & Submit */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Total Pembayaran</span>
                <span className="text-3xl font-bold text-white">
                  Rp {calculateTotal().toLocaleString("id-ID")}
                </span>
              </div>
              <button
                onClick={handleSubmitOrder}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Lanjut ke Pembayaran"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
