import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Users, ShoppingBag, FileText, Server, Settings, CheckCircle, X, Edit2, Save } from 'lucide-react';

interface Order {
  id: string;
  user_id: string;
  status: string;
  created_at: string;
  expires_at: string | null;
  profiles: { full_name: string; whatsapp_number: string };
  products: { name: string };
  os_choice: string;
  total_price: number;
}

interface Invoice {
  id: string;
  invoice_number: string;
  status: string;
  amount: number;
  created_at: string;
  profiles: { full_name: string };
}

interface ServerCredential {
  id: string;
  order_id: string;
  ip_address: string | null;
  username: string | null;
  password: string | null;
}

export function Admin() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'invoices' | 'products' | 'telegram'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCredentials, setEditingCredentials] = useState<string | null>(null);
  const [credentialsForms, setCredentialsForms] = useState<Record<string, ServerCredential>>({});

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    } else if (activeTab === 'invoices') {
      fetchInvoices();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles (full_name, whatsapp_number),
        products (name)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);

      const credentialsData: Record<string, ServerCredential> = {};
      for (const order of data) {
        const { data: cred } = await supabase
          .from('server_credentials')
          .select('*')
          .eq('order_id', order.id)
          .maybeSingle();

        if (cred) {
          credentialsData[order.id] = cred;
        }
      }
      setCredentialsForms(credentialsData);
    }
    setLoading(false);
  };

  const fetchInvoices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        profiles (full_name)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setInvoices(data);
    }
    setLoading(false);
  };

  const handleVerifyPayment = async (invoiceId: string, orderId: string) => {
    const { error: invoiceError } = await supabase
      .from('invoices')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', invoiceId);

    if (invoiceError) {
      alert('Failed to update invoice: ' + invoiceError.message);
      return;
    }

    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: 'provisioning' })
      .eq('id', orderId);

    if (orderError) {
      alert('Failed to update order: ' + orderError.message);
      return;
    }

    const { error: logError } = await supabase
      .from('admin_logs')
      .insert({
        admin_id: profile?.id,
        action: 'verify_payment',
        entity_type: 'invoice',
        entity_id: invoiceId,
        details: { order_id: orderId },
      });

    if (logError) console.error('Failed to log action:', logError);

    alert('Payment verified successfully!');
    fetchInvoices();
    fetchOrders();
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      alert('Failed to update status: ' + error.message);
      return;
    }

    await supabase
      .from('admin_logs')
      .insert({
        admin_id: profile?.id,
        action: 'update_order_status',
        entity_type: 'order',
        entity_id: orderId,
        details: { new_status: newStatus },
      });

    alert('Status updated successfully!');
    fetchOrders();
  };

  const handleSaveCredentials = async (orderId: string) => {
    const credentials = credentialsForms[orderId];
    if (!credentials) return;

    const { error } = await supabase
      .from('server_credentials')
      .update({
        ip_address: credentials.ip_address,
        username: credentials.username,
        password: credentials.password,
        updated_at: new Date().toISOString(),
      })
      .eq('id', credentials.id);

    if (error) {
      alert('Failed to save credentials: ' + error.message);
      return;
    }

    await supabase
      .from('admin_logs')
      .insert({
        admin_id: profile?.id,
        action: 'update_credentials',
        entity_type: 'order',
        entity_id: orderId,
      });

    setEditingCredentials(null);
    alert('Credentials saved successfully!');
  };

  const updateCredentialField = (orderId: string, field: keyof ServerCredential, value: string) => {
    setCredentialsForms(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value,
      },
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Manage orders, invoices, and system settings</p>
        </div>

        <div className="flex space-x-4 border-b border-gray-200">
          {[
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'invoices', label: 'Invoices', icon: FileText },
            { id: 'products', label: 'Products', icon: Server },
            { id: 'telegram', label: 'Telegram', icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-4 py-3 font-medium transition-colors border-b-2 ${
                activeTab === id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{order.products.name}</h3>
                        <p className="text-sm text-gray-600">Customer: {order.profiles.full_name}</p>
                        <p className="text-sm text-gray-600">WhatsApp: {order.profiles.whatsapp_number}</p>
                        <p className="text-sm text-gray-600">OS: {order.os_choice}</p>
                        <p className="text-sm text-gray-600">Amount: ${order.total_price.toFixed(2)}</p>
                        {order.expires_at && (
                          <p className="text-sm text-gray-600">
                            Expires: {new Date(order.expires_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="provisioning">Provisioning</option>
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                          <option value="expired">Expired</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Server Credentials</h4>
                        {editingCredentials === order.id ? (
                          <button
                            onClick={() => handleSaveCredentials(order.id)}
                            className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                          >
                            <Save className="w-4 h-4" />
                            <span className="text-sm">Save</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingCredentials(order.id)}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span className="text-sm">Edit</span>
                          </button>
                        )}
                      </div>

                      {credentialsForms[order.id] && (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              IP Address
                            </label>
                            <input
                              type="text"
                              value={credentialsForms[order.id].ip_address || ''}
                              onChange={(e) => updateCredentialField(order.id, 'ip_address', e.target.value)}
                              disabled={editingCredentials !== order.id}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50"
                              placeholder="192.168.1.1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Username
                            </label>
                            <input
                              type="text"
                              value={credentialsForms[order.id].username || ''}
                              onChange={(e) => updateCredentialField(order.id, 'username', e.target.value)}
                              disabled={editingCredentials !== order.id}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50"
                              placeholder="root"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Password
                            </label>
                            <input
                              type="text"
                              value={credentialsForms[order.id].password || ''}
                              onChange={(e) => updateCredentialField(order.id, 'password', e.target.value)}
                              disabled={editingCredentials !== order.id}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-50"
                              placeholder="password123"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'invoices' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Invoice #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {invoice.invoice_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {invoice.profiles.full_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          ${invoice.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              invoice.status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : invoice.status === 'pending_verification'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {invoice.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(invoice.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {invoice.status === 'pending_verification' && (
                            <button
                              onClick={() => {
                                supabase
                                  .from('invoices')
                                  .select('order_id')
                                  .eq('id', invoice.id)
                                  .single()
                                  .then(({ data }) => {
                                    if (data) {
                                      handleVerifyPayment(invoice.id, data.order_id);
                                    }
                                  });
                              }}
                              className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm">Verify</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-gray-600">
                  Product management interface - Add/Edit products directly in the database or through a dedicated form.
                </p>
              </div>
            )}

            {activeTab === 'telegram' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Telegram Configuration</h3>
                <p className="text-gray-600 mb-4">
                  Configure Telegram Bot for notifications. Set environment variables in your Edge Functions.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    Required environment variables:<br/>
                    - TELEGRAM_BOT_TOKEN<br/>
                    - TELEGRAM_CHAT_ID
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
