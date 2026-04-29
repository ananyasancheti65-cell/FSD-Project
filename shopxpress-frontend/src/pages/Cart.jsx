import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';

const Cart = () => {
  const { cartItems, loading, setQuantity, removeItem } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (loading) {
    return <div className="glass-card p-10 text-slate-500 shadow-soft dark:bg-slate-900">Loading cart...</div>;
  }

  if (!cartItems.length) {
    return (
      <div className="glass-card p-10 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Browse products and add items to your cart.</p>
        <Link to="/products" className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-3 text-white hover:bg-brand-700">
          Explore products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.product._id} className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <img src={item.product.image} alt={item.product.title} className="h-28 w-28 rounded-3xl object-cover" />
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.product.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-300">
                <span>{formatCurrency(item.product.price)}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{item.product.category}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => setQuantity(item.product._id, Number(e.target.value))}
                  className="w-24 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                />
                <button onClick={() => removeItem(item.product._id)} className="text-sm text-rose-500 hover:underline">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <aside className="glass-card p-6">
        <h2 className="text-xl font-semibold">Order summary</h2>
        <div className="mt-5 space-y-3 text-slate-600 dark:text-slate-300">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-6 text-lg font-semibold dark:border-slate-700">
          <span>Total</span>
          <span>{formatCurrency(total + 5)}</span>
        </div>
        <button onClick={() => navigate('/checkout')} className="mt-6 w-full rounded-3xl bg-brand-600 px-6 py-4 text-white transition hover:bg-brand-700">
          Checkout now
        </button>
      </aside>
    </div>
  );
};

export default Cart;
