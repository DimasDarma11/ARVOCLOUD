import React, { useEffect, useState, useRef } from 'react';
import supabase from '../lib/supabase';
import { ArrowLeft, Download, Calendar, FileText, Cloud } from 'lucide-react';

interface InvoiceDetailProps {
  invoiceId: string;
  onBack: () => void;
}

interface InvoiceData {
  id: string;
  invoice_number: string;
  amount: number;
  status: string;
  due_date: string;
  created_at: string;
  paid_at: string | null;
  payment_method: string | null;
  orders: {
    order_number: string;
    billing_period: string;
    servers: {
      name: string;
      type: string;
      cpu: string;
      ram: string;
      storage: string;
    };
  };
  profiles: {
    full_name: string;
    email: string;
    phone: string;
  };
}

export const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ invoiceId, onBack }) => {
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadInvoice();
  }, [invoiceId]);

  const loadInvoice = async () => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          orders (
            order_number,
            billing_period,
            servers (
              name,
              type,
              cpu,
              ram,
              storage
            )
          ),
          profiles (
            full_name,
            email,
            phone
          )
        `)
        .eq('id', invoiceId)
        .single();

      if (error) throw error;
      setInvoice(data as any);
    } catch (error) {
      console.error('Error loading invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => window.print();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center text-white">
        <p>Invoice not found</p>
        <button onClick={onBack} className="mt-4 text-cyan-400 hover:text-cyan-300">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header Buttons */}
      <div className="flex items-center justify-between mb-8 print:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Invoices
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/40 hover:shadow-cyan-500/70 transition-all"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>
      </div>

      {/* Main Invoice Container */}
      <div
        ref={invoiceRef}
        className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 max-w-4xl mx-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ARVOCLOUD</h1>
                <p className="text-sm text-gray-400">Premium VPS & RDP Solutions</p>
              </div>
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Jakarta, Indonesia</p>
              <p>support@arvocloud.com</p>
              <p>+62 821-xxxx-xxxx</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-white mb-1">INVOICE</h2>
            <p className="text-lg font-semibold text-cyan-400">{invoice.invoice_number}</p>
            <div className="mt-4 space-y-1 text-sm text-gray-400">
              <div className="flex items-center justify-end gap-2">
                <Calendar className="w-4 h-4" />
                <span>Date: {new Date(invoice.created_at).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Calendar className="w-4 h-4" />
                <span>Due: {new Date(invoice.due_date).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To & Order */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Bill To</h3>
            <p className="text-white font-semibold text-lg mb-1">{invoice.profiles.full_name}</p>
            <p className="text-sm text-gray-400">{invoice.profiles.email}</p>
            {invoice.profiles.phone && (
              <p className="text-sm text-gray-400">{invoice.profiles.phone}</p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Order Details</h3>
            <p className="text-sm text-gray-400">
              Order No: <span className="text-white">{invoice.orders.order_number}</span>
            </p>
            <p className="text-sm text-gray-400">
              Billing: <span className="text-white capitalize">{invoice.orders.billing_period}</span>
            </p>
            <p className="text-sm text-gray-400">
              Status:{' '}
              <span
                className={`font-medium ${
                  invoice.status === 'paid' ? 'text-green-400' : 'text-orange-400'
                }`}
              >
                {invoice.status.toUpperCase()}
              </span>
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-white/10 mb-10">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-300">Description</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-300">Qty</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-300">Price</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-300">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="py-5 px-6 text-white">
                  <p className="font-semibold mb-1">
                    {invoice.orders.servers.name} - {invoice.orders.servers.type}
                  </p>
                  <p className="text-gray-400 text-sm">
                    CPU: {invoice.orders.servers.cpu} | RAM: {invoice.orders.servers.ram} | Storage:{' '}
                    {invoice.orders.servers.storage}
                  </p>
                </td>
                <td className="py-5 px-6 text-right text-gray-300">1</td>
                <td className="py-5 px-6 text-right text-gray-300">
                  Rp {Number(invoice.amount).toLocaleString('id-ID')}
                </td>
                <td className="py-5 px-6 text-right text-white font-semibold">
                  Rp {Number(invoice.amount).toLocaleString('id-ID')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex justify-end mb-10">
          <div className="w-80 space-y-3 text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>Rp {Number(invoice.amount).toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (0%):</span>
              <span>Rp 0</span>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total:</span>
              <span className="text-2xl font-bold text-cyan-400">
                Rp {Number(invoice.amount).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Payment info */}
        {invoice.status === 'paid' && invoice.paid_at && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-green-400">Payment Received</p>
                <p className="text-sm text-gray-300">
                  Paid on {new Date(invoice.paid_at).toLocaleDateString('id-ID')}
                  {invoice.payment_method && ` via ${invoice.payment_method.replace('_', ' ')}`}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p className="mb-1">Thank you for your business!</p>
          <p>For questions, contact <span className="text-cyan-400">support@arvocloud.com</span></p>
        </div>
      </div>
    </div>
  );
};
