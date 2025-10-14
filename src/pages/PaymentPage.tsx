import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { CreditCard, Building2, Wallet, ArrowLeft, Check } from "lucide-react";

interface PaymentPageProps {
  invoiceId: string;
  onBack: () => void;
  onPaymentComplete: () => void;
}

interface InvoiceDetails {
  id: string;
  invoice_number: string;
  amount: number;
  due_date: string;
  order_id: string;
  orders: {
    order_number: string;
    servers: {
      name: string;
      type: string;
    };
  };
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  invoiceId,
  onBack,
  onPaymentComplete,
}) => {
  const { user } = useAuth();
  const [invoice, setInvoice] = useState<InvoiceDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "bank_transfer" | "ewallet" | "credit_card"
  >("bank_transfer");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadInvoiceDetails();
  }, [invoiceId]);

  const loadInvoiceDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("invoices")
        .select(
          `
          *,
          orders (
            order_number,
            servers (
              name,
              type
            )
          )
        `
        )
        .eq("id", invoiceId)
        .single();

      if (error) throw error;
      setInvoice(data as any);
    } catch (error) {
      console.error("Error loading invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!invoice || !user) return;

    setProcessing(true);
    try {
      const transactionId = `TRX-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;

      const { error: paymentError } = await supabase.from("payments").insert({
        invoice_id: invoice.id,
        customer_id: user.id,
        amount: invoice.amount,
        payment_method: paymentMethod,
        transaction_id: transactionId,
        status: "completed",
      });

      if (paymentError) throw paymentError;

      await supabase
        .from("invoices")
        .update({
          status: "paid",
          paid_at: new Date().toISOString(),
          payment_method: paymentMethod,
        })
        .eq("id", invoice.id);

      await supabase
        .from("orders")
        .update({ status: "active" })
        .eq("id", invoice.order_id);

      alert("✅ Pembayaran berhasil! Server Anda sekarang aktif.");
      onPaymentComplete();
    } catch (error: any) {
      console.error("Error processing payment:", error);
      alert("❌ Pembayaran gagal: " + error.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center text-gray-700">
        <p>Invoice tidak ditemukan</p>
        <button
          onClick={onBack}
          className="mt-4 text-blue-600 hover:text-blue-500 font-medium"
        >
          Kembali
        </button>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      icon: Building2,
      description: "Transfer via BCA, Mandiri, BNI, BRI",
    },
    {
      id: "ewallet",
      name: "E-Wallet",
      icon: Wallet,
      description: "GoPay, OVO, Dana, ShopeePay",
    },
    {
      id: "credit_card",
      name: "Kartu Kredit",
      icon: CreditCard,
      description: "Visa, Mastercard, JCB",
    },
  ];

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali ke Invoice</span>
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pembayaran</h1>
        <p className="text-gray-500">
          Selesaikan pembayaran untuk {invoice.invoice_number}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom kiri: Metode pembayaran */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Pilih Metode Pembayaran
            </h2>

            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const selected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`w-full text-left flex items-center gap-4 p-5 rounded-xl border transition-all ${
                      selected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selected ? "bg-blue-500 text-white" : "bg-white text-gray-600"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-base font-semibold ${
                          selected ? "text-blue-600" : "text-gray-800"
                        }`}
                      >
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                    {selected && (
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instruksi khusus untuk transfer bank */}
          {paymentMethod === "bank_transfer" && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Instruksi Transfer Bank
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Bank</p>
                  <p className="text-gray-900 font-semibold">BCA (Bank Central Asia)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">No. Rekening</p>
                  <p className="text-gray-900 font-semibold">1234567890</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Atas Nama</p>
                  <p className="text-gray-900 font-semibold">ARVOCLOUD Indonesia</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Kolom kanan: Ringkasan pesanan */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

            <div className="space-y-4 mb-6 text-sm">
              <div>
                <p className="text-gray-500">Nomor Invoice</p>
                <p className="text-gray-900 font-medium">
                  {invoice.invoice_number}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Nomor Pesanan</p>
                <p className="text-gray-900 font-medium">
                  {invoice.orders.order_number}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Paket Server</p>
                <p className="text-gray-900 font-medium">
                  {invoice.orders.servers.name} ({invoice.orders.servers.type})
                </p>
              </div>
              <div>
                <p className="text-gray-500">Jatuh Tempo</p>
                <p className="text-gray-900 font-medium">
                  {new Date(invoice.due_date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4 text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">
                  Rp {Number(invoice.amount).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-gray-500">Biaya Admin</span>
                <span className="text-gray-900">Rp 0</span>
              </div>
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>
                  Rp {Number(invoice.amount).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? "Memproses..." : "Selesaikan Pembayaran"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Dengan melanjutkan, Anda menyetujui Ketentuan Layanan kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
