import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Download, Eye } from 'lucide-react';

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: string;
  due_date: string;
  created_at: string;
  paid_at: string | null;
  order_id: string;
}

interface InvoiceListProps {
  onPayInvoice: (invoiceId: string) => void;
  onViewInvoice: (invoiceId: string) => void;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({ onPayInvoice, onViewInvoice }) => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadInvoices();
  }, [user]);

  const loadInvoices = async () => {
    try {
      setLoading(true);

      const identifier = user?.id || user?.email; // fallback ke email
      if (!identifier) return;

      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .or(`customer_id.eq.${identifier},customer_email.eq.${user?.email}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setInvoices(data || []);
    } catch (err) {
      console.error('Error loading invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'unpaid':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'overdue':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
        <p className="text-gray-400">View and manage your invoices</p>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 text-center">
          <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No invoices yet</h3>
          <p className="text-gray-400">Your invoices will appear here after placing orders</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{invoice.invoice_number}</h3>
                    <p className="text-sm text-gray-400">
                      Created: {new Date(invoice.created_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      Rp {Number(invoice.amount).toLocaleString('id-ID')}
                    </p>
                    <p className="text-sm text-gray-400">
                      Due: {new Date(invoice.due_date).toLocaleDateString('id-ID')}
                    </p>
                  </div>

                  <div className={`px-4 py-2 rounded-xl border font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status.toUpperCase()}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewInvoice(invoice.id)}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                      title="View Invoice"
                    >
                      <Eye className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                      title="Download Invoice"
                    >
                      <Download className="w-5 h-5 text-gray-400" />
                    </button>
                    {invoice.status === 'unpaid' && (
                      <button
                        onClick={() => onPayInvoice(invoice.id)}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
