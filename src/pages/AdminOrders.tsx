import React, { useState } from 'react';

interface AdminOrdersProps {
  orders?: any[];
  onUpdateOrderStatus?: (orderId: string, status: string) => void;
}

export default function AdminOrders({ orders = [], onUpdateOrderStatus }: AdminOrdersProps) {
  const [filter, setFilter] = useState('ALL');

  const filteredOrders = orders.filter(o => 
    filter === 'ALL' ? true : (o.status || 'PENDING').toUpperCase() === filter
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="border-b border-gray-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Orders Management</h1>
            <p className="text-xs text-gray-500 mt-1">Track customer purchases and order fulfillment.</p>
          </div>
          
          <div className="flex items-center bg-gray-100 p-1 rounded-lg">
            {['ALL', 'PENDING', 'SHIPPED', 'DELIVERED'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-md cursor-pointer transition-colors ${
                  filter === tab ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id || ord.orderId} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-gray-900">#{ord.id || ord.orderId || Math.floor(Math.random()*10000)}</td>
                    <td className="p-4 text-gray-700">
                      <div><strong className="text-black">{ord.customer || ord.shipping?.fullName || 'Guest Customer'}</strong></div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{ord.shipping?.email || 'N/A'}</div>
                    </td>
                    <td className="p-4 font-mono font-bold">${(ord.total || 0).toFixed(2)}</td>
                    <td className="p-4 text-gray-500">{ord.date || new Date().toISOString().split('T')[0]}</td>
                    <td className="p-4 text-right">
                      <select 
                        value={(ord.status || 'PENDING').toUpperCase()}
                        onChange={(e) => onUpdateOrderStatus && onUpdateOrderStatus(ord.id || ord.orderId, e.target.value)}
                        className={`px-2.5 py-1.5 text-[10px] font-bold rounded uppercase appearance-none cursor-pointer outline-none border text-center text-last-right ${
                          (ord.status || 'PENDING').toUpperCase() === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          (ord.status || 'PENDING').toUpperCase() === 'SHIPPED' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          'bg-amber-100 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-gray-400 text-xs">
                      No orders found matching the "{filter}" filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
