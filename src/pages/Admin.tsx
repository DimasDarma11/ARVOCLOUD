import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
  ShoppingBag,
  FileText,
  Server,
  Settings,
  CheckCircle,
  Edit2,
  Save,
} from 'lucide-react';

export function Admin() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'invoices' | 'products' | 'telegram'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCredentials, setEditingCredentials] = useState<string | null>(null);
  const [credentialsForms, setCredentialsForms] = useState<Record<string, any>>({});

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
    else if (activeTab === 'invoices') fetchInvoices();
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`*, profiles (full_name, whatsapp_number), products (name)`)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
      const creds: Record<string, any> = {};
      for (const order of data) {
        const { data: c } = await supabase
          .from('server_credentials')
          .select('*')
          .eq('order_id', order.id)
          .maybeSingle();
        if (c) creds[order.id] = c;
      }
      setCredentialsForms(creds);
    }
    setLoading(false);
  };

  const fetchInvoices = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('invoices')
      .select(`*, profiles (full_name)`)
      .order('created_at', { ascending: false });
    if (data) setInvoices(data);
    setLoading(false);
  };

  const handleSaveCredentials = async (orderId: string) => {
    const c = credentialsForms[orderId];
    if (!c) return;
    await supabase
      .from('server_credentials')
      .update({
        ip_address: c.ip_address,
        username: c.username,
        password: c.password,
        updated_at: new Date().toISOString(),
      })
      .eq('id', c.id);
    setEditingCredentials(null);
    alert('Credentials saved!');
  };

  const updateCredentialField = (orderId: string, field: string, value: string) => {
    setCredentialsForms((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], [field]: value },
    }));
  };

  if (!profile?.is_admin) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600">Access denied. Admin privileges required.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 text-sm md:text-base mt-1">
            Manage orders, invoices, and system settings
          </p>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          {[
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'invoices', label: 'Invoices', icon: FileText },
            { id: 'products', label: 'Products', icon: Server },
            { id: 'telegram', label: 'Telegram', icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === id
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl shadow-sm p-4 md:p-6 space-y-4"
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                          {order.products.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {order.profiles.full_name} ({order.profiles.whatsapp_number})
                        </p>
                        <p className="text-sm text-gray-600">
                          OS: {order.os_choice} — ${order.total_price.toFixed(2)}
                        </p>
                      </div>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          supabase
                            .from('orders')
                            .update({ status: e.target.value })
                            .eq('id', order.id)
                            .then(fetchOrders)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                      >
                        <option value="pending">Pending</option>
                        <option value="provisioning">Provisioning</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="expired">Expired</option>
                      </select>
                    </div>

                    {/* Credentials */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Server Credentials</h4>
                        {editingCredentials === order.id ? (
                          <button
                            onClick={() => handleSaveCredentials(order.id)}
                            className="flex items-center text-green-600 hover:text-green-700 text-sm"
                          >
                            <Save className="w-4 h-4 mr-1" /> Save
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingCredentials(order.id)}
                            className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <Edit2 className="w-4 h-4 mr-1" /> Edit
                          </button>
                        )}
                      </div>

                      {credentialsForms[order.id] && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {['ip_address', 'username', 'password'].map((field) => (
                            <div key={field}>
                              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                {field.replace('_', ' ')}
                              </label>
                              <input
                                type="text"
                                value={credentialsForms[order.id][field] || ''}
                                onChange={(e) =>
                                  updateCredentialField(order.id, field, e.target.value)
                                }
                                disabled={editingCredentials !== order.id}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50"
                                placeholder={field === 'password' ? '••••••••' : field}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* INVOICES */}
            {activeTab === 'invoices' && (
              <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Invoice #', 'Customer', 'Amount', 'Status', 'Date', 'Actions'].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{inv.invoice_number}</td>
                        <td className="px-4 py-3">{inv.profiles.full_name}</td>
                        <td className="px-4 py-3 font-semibold">${inv.amount.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              inv.status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : inv.status === 'pending_verification'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {inv.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {new Date(inv.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          {inv.status === 'pending_verification' && (
                            <button
                              onClick={() =>
                                supabase
                                  .from('invoices')
                                  .select('order_id')
                                  .eq('id', inv.id)
                                  .single()
                                  .then(({ data }) => {
                                    if (data)
                                      alert(`Verified payment for ${data.order_id}`);
                                  })
                              }
                              className="flex items-center text-green-600 hover:text-green-700 text-sm"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" /> Verify
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PRODUCTS & TELEGRAM */}
            {activeTab === 'products' && (
              <div className="bg-white rounded-xl shadow-sm p-6 text-sm text-gray-600">
                Manage products directly in the database or through a dedicated form.
              </div>
            )}

            {activeTab === 'telegram' && (
              <div className="bg-white rounded-xl shadow-sm p-6 text-sm text-gray-600 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Telegram Configuration</h3>
                <p>
                  Configure your Telegram Bot for notifications. Set environment variables in your
                  Edge Functions.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p>
                    <strong>Required:</strong> TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
