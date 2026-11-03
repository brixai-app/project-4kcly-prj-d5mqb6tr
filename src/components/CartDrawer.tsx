import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  img: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function CartDrawer({ isOpen, onClose, cartItems, setCartItems }: CartDrawerProps) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const getCartTotal = () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const getCartCount = () => cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const updateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setCartItems(prev => prev.filter((_, i) => i !== index));
    } else {
      setCartItems(prev => {
        const copy = [...prev];
        copy[index].quantity = newQty;
        return copy;
      });
    }
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 font-sans">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium tracking-wide text-black uppercase">
            SHOPPING BAG ({getCartCount()})
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <p className="text-gray-500 font-medium text-sm">Your bag is empty</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex gap-4 border-b border-gray-100 pb-6">
                <div className="w-24 h-24 bg-gray-100 overflow-hidden rounded shrink-0 border border-gray-200">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium text-sm text-gray-900 line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-gray-500">
                    Size: {item.size} / Color: {item.color}
                  </p>
                  <p className="font-semibold text-sm text-black font-mono">${item.price * item.quantity}.00</p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button onClick={() => updateQuantity(index, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer">
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(index, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer">
                        <Plus size={12} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="ml-auto text-gray-400 hover:text-red-600 transition-colors cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4 bg-gray-50">
            <div className="flex justify-between text-sm font-medium">
              <span>Subtotal</span>
              <span className="font-bold text-black font-mono">${getCartTotal()}.00</span>
            </div>
            <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout</p>
            <button
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
              className="w-full bg-black text-white py-3.5 text-sm font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors rounded-lg cursor-pointer"
            >
              CHECKOUT (${getCartTotal()}.00)
            </button>
          </div>
        )}
      </div>
    </>
  );
}
