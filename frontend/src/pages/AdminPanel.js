import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../config';
import { getToken } from '../utils/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, ordersRes, reportsRes] = await Promise.all([
        axios.get(`${API}/admin/users`, { headers: { Authorization: `Bearer ${getToken()}` } }),
        axios.get(`${API}/admin/orders`, { headers: { Authorization: `Bearer ${getToken()}` } }),
        axios.get(`${API}/admin/reports`, { headers: { Authorization: `Bearer ${getToken()}` } })
      ]);

      setUsers(usersRes.data);
      setOrders(ordersRes.data);
      setReports(reportsRes.data);
    } catch (error) {
      toast.error('Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-secondary mb-8" data-testid="admin-heading">Admin Panel</h1>

        <Tabs defaultValue="users" className="space-y-8">
          <TabsList className="bg-white border border-primary/10">
            <TabsTrigger value="users" data-testid="users-tab">Users ({users.length})</TabsTrigger>
            <TabsTrigger value="orders" data-testid="orders-tab">Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="reports" data-testid="reports-tab">Reports ({reports.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="bg-white border border-primary/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary/5 border-b border-primary/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Mobile</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Admin</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-primary/5 hover:bg-primary/5">
                        <td className="px-6 py-4 text-sm text-secondary">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-secondary">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-secondary">{user.mobile}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.is_admin ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {user.is_admin ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary/70">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="bg-white border border-primary/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary/5 border-b border-primary/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Payment ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-primary/5 hover:bg-primary/5">
                        <td className="px-6 py-4 text-sm text-secondary font-mono">{order.id.substring(0, 8)}</td>
                        <td className="px-6 py-4 text-sm text-secondary font-semibold">₹{order.amount}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            order.status === 'paid' ? 'bg-green-100 text-green-700' :
                            order.status === 'created' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary/70 font-mono">
                          {order.razorpay_payment_id ? order.razorpay_payment_id.substring(0, 12) : '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary/70">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="bg-white border border-primary/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary/5 border-b border-primary/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Report ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Place</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id} className="border-b border-primary/5 hover:bg-primary/5">
                        <td className="px-6 py-4 text-sm text-secondary font-mono">{report.id.substring(0, 8)}</td>
                        <td className="px-6 py-4 text-sm text-secondary">{report.birth_data.full_name}</td>
                        <td className="px-6 py-4 text-sm text-secondary">{report.birth_data.place}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            report.status === 'completed' ? 'bg-green-100 text-green-700' :
                            report.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary/70">
                          {new Date(report.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
