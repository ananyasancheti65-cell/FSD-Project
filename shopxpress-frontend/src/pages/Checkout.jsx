import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { placeOrder } from '../services/order';
import { AuthContext } from '../context/AuthContext';
import { formatCurrency } from '../utils/helpers';
import { showToast } from '../components/Toast';

const Checkout = () => {
  const { cartItems, loading, loadCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemsPayload = cartItems.map((item) => ({ product: item.product._id, quantity: item.quantity }));

  const handleCheckout = async () => {
    if (!user) {
      showToast('Please login to checkout', 'error');
      return navigate('/login');
    }
    setProcessing(true);
    try {
      await placeOrder(itemsPayload);
      showToast('Order completed', 'success');
      await loadCart();
      navigate('/');
    } catch (error) {
      showToast('Checkout failed', 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="glass-card p-10 text-slate-500 shadow-soft dark:bg-slate-900">Loading checkout...</div>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
      <section className="glass-card p-8">
        <h1 className="text-3xl font-semibold">Checkout</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Enter dummy payment details and place your order safely.</p>
        <div className="mt-8 space-y-6">
          <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-semibold">Payment method</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">This is a simulated checkout for school projects.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input placeholder="Name on card" className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950" />
              <input placeholder="Card number" className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950" />
              <input placeholder="MM / YY" className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950" />
              <input placeholder="CVC" className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none dark:border-slate-700 dark:bg-slate-950" />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-semibold">Order summary</h2>
            <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between">Subtotal</div>
              <div className="flex items-center justify-between">Delivery<small className="text-xs text-slate-500 dark:text-slate-400"> (flat rate)</small></div>
              <div className="flex items-center justify-between text-lg font-semibold">Total</div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xl font-semibold text-slate-900 dark:text-slate-100">
              <span>{formatCurrency(total)}</span>
              <span>{formatCurrency(total + 5)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          disabled={processing || !cartItems.length}
          className="mt-8 w-full rounded-3xl bg-brand-600 px-6 py-4 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {processing ? 'Processing...' : 'Place order'}
        </button>
      </section>
      <aside className="glass-card p-6">
        <h2 className="text-xl font-semibold">Shipping details</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">All orders are processed immediately and shipped in simulated checkout mode for this college project.</p>
      </aside>
    </div>
  );
};

export default Checkout;
