import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

interface CheckoutProps {
  cartItems?: any[];
  onPlaceOrder?: (orderData: any) => void;
}

export default function Checkout({ cartItems = [], onPlaceOrder }: CheckoutProps) {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [shipping, setShipping] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onPlaceOrder) {
      onPlaceOrder({
        total: subtotal,
        shipping,
      });
    }
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-6 bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-xs">
          <CheckCircle2 size={48} className="mx-auto text-emerald-600" />
          <h1 className="text-2xl font-bold uppercase tracking-tight text-black">ORDER CONFIRMED</h1>
          <p className="text-xs text-gray-600 leading-relaxed">
            Thank you for your purchase. We have received your order and added it to your order history.
          </p>
          <button
            onClick={() => navigate('/orders')}
            className="w-full py-3 bg-black text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            VIEW MY ORDERS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-black uppercase tracking-tight text-black border-b border-gray-200 pb-4">
          CHECKOUT & PAYMENT
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 border border-gray-200 rounded-2xl p-6 bg-gray-50">
            <h3 className="font-bold text-xs uppercase tracking-wider text-black border-b border-gray-200 pb-3">
              SHIPPING ADDRESS
            </h3>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={shipping.email}
              onChange={e => setShipping({ ...shipping, email: e.target.value })}
              className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-black"
            />
            <input
              type="text"
              placeholder="Full Name"
              required
              value={shipping.fullName}
              onChange={e => setShipping({ ...shipping, fullName: e.target.value })}
              className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-black"
            />
            <input
              type="text"
              placeholder="Street Address"
              required
              value={shipping.address}
              onChange={e => setShipping({ ...shipping, address: e.target.value })}
              className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-black"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="City"
                required
                value={shipping.city}
                onChange={e => setShipping({ ...shipping, city: e.target.value })}
                className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-black"
              />
              <input
                type="text"
                placeholder="Postal Code"
                required
                value={shipping.postalCode}
                onChange={e => setShipping({ ...shipping, postalCode: e.target.value })}
                className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="space-y-4 border border-gray-200 rounded-2xl p-6 bg-gray-50 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-black border-b border-gray-200 pb-3">
                BAG SUMMARY ({cartItems.length} ITEMS)
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="font-medium text-black truncate max-w-[180px]">{item.title}</span>
                    <span className="font-mono text-zinc-600">${item.price} x {item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-zinc-200 flex justify-between font-mono font-bold text-sm text-black">
                <span>TOTAL:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-colors cursor-pointer mt-6"
            >
              PLACE ORDER (${subtotal.toFixed(2)})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
