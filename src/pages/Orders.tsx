import React from 'react';

interface OrdersProps {
  orders?: any[];
}

export default function Orders({ orders = [] }: OrdersProps) {
  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">MY ORDERS</h1>
          <p className="text-xs text-gray-500 mt-1">Track your recent orders and receipts directly from the database.</p>
        </div>
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-3">
            <h3 className="font-bold text-sm text-gray-800 uppercase">NO ORDERS FOUND</h3>
            <p className="text-xs text-gray-500">You have no recent order transactions.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((ord: any) => (
              <div key={ord.id} className="border border-gray-200 rounded-xl p-5 bg-white space-y-3 shadow-xs">
                <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-3 gap-2">
                  <div>
                    <span className="text-xs font-bold text-black uppercase">{ord.id}</span>
                    <span className="text-[10px] text-gray-400 ml-3">{ord.date}</span>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {ord.status || 'PROCESSING'}
                  </span>
                </div>
                <div className="space-y-2">
                  {(Array.isArray(ord.items) ? ord.items : []).map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-xs text-gray-700">
                      <span>{item.title || item.name || 'Item'} × {item.quantity || 1}</span>
                      <span className="font-medium">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 font-bold text-sm">
                  <span>TOTAL</span>
                  <span>${Number(ord.total || 0).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
