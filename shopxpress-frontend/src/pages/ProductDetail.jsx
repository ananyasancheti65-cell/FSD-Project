import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/product';
import api from '../services/api';
import { formatCurrency } from '../utils/helpers';
import { AuthContext } from '../context/AuthContext';
import { showToast } from '../components/Toast';

/* Fallback product when backend is offline */
const fallbackProduct = {
  _id: 'demo',
  title: 'Demo Product',
  price: 49.99,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  category: 'Demo',
  description: 'This is a sample product displayed because the backend server is not running. Start the backend to see real product data.',
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch {
        setProduct(fallbackProduct);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const addToCart = async () => {
    if (!user) {
      showToast('Please login to add items', 'error');
      return navigate('/login');
    }
    try {
      await api.post('/cart', { productId: id, quantity });
      showToast('Added to cart', 'success');
      navigate('/cart');
    } catch {
      showToast('Could not add item', 'error');
    }
  };

  if (loading || !product) {
    return <div className="rounded-3xl bg-white p-10 text-slate-500 shadow-soft dark:bg-slate-900">Loading product...</div>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="glass-card p-6">
        <img src={product.image} alt={product.title} className="h-[420px] w-full rounded-[2rem] object-cover" />
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700">{product.category}</span>
            <span className="text-3xl font-semibold text-brand-600">{formatCurrency(product.price)}</span>
          </div>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{product.title}</h1>
          <p className="text-slate-600 leading-8 dark:text-slate-300">{product.description}</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
              <label className="text-sm text-slate-500 dark:text-slate-400">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-2 w-24 rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <button onClick={addToCart} className="rounded-3xl bg-brand-600 px-6 py-4 text-white transition hover:bg-brand-700">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
      <aside className="glass-card p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Product details</h2>
          <div className="space-y-3 text-slate-600 dark:text-slate-300">
            <p>High quality, reliable design for student life and remote work.</p>
            <p>Fast shipping, easy checkout, and responsive mobile layout.</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProductDetail;
