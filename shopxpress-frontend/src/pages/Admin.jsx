import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createProduct } from '../services/admin';
import { showToast } from '../components/Toast';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState({ title: '', description: '', price: '', category: '', image: '', featured: false });
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'admin') {
    return (
      <div className="glass-card p-10 text-center">
        <h1 className="text-2xl font-semibold">Admin Access Required</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Please login with an admin account to manage products.</p>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await createProduct({ ...product, price: Number(product.price) });
      showToast('Product added', 'success');
      setProduct({ title: '', description: '', price: '', category: '', image: '', featured: false });
    } catch (error) {
      showToast('Could not add product', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-8">
        <h1 className="text-3xl font-semibold">Admin dashboard</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Add new listings to ShopXpress quickly and safely.</p>
      </div>
      <form onSubmit={handleSubmit} className="glass-card space-y-4 p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            placeholder="Title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            className="rounded-3xl border border-slate-300 bg-slate-100 px-4 py-4 outline-none dark:border-slate-700 dark:bg-slate-900"
            required
          />
          <input
            placeholder="Category"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            className="rounded-3xl border border-slate-300 bg-slate-100 px-4 py-4 outline-none dark:border-slate-700 dark:bg-slate-900"
            required
          />
        </div>
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          className="w-full rounded-3xl border border-slate-300 bg-slate-100 px-4 py-4 outline-none dark:border-slate-700 dark:bg-slate-900"
          rows="4"
          required
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="rounded-3xl border border-slate-300 bg-slate-100 px-4 py-4 outline-none dark:border-slate-700 dark:bg-slate-900"
            required
          />
          <input
            placeholder="Image URL"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            className="rounded-3xl border border-slate-300 bg-slate-100 px-4 py-4 outline-none dark:border-slate-700 dark:bg-slate-900"
            required
          />
          <label className="inline-flex items-center gap-2 rounded-3xl border border-slate-300 bg-slate-100 px-4 py-4 dark:border-slate-700 dark:bg-slate-900">
            <input type="checkbox" checked={product.featured} onChange={(e) => setProduct({ ...product, featured: e.target.checked })} />
            Featured
          </label>
        </div>
        <button disabled={loading} className="rounded-3xl bg-brand-600 px-6 py-4 text-white transition hover:bg-brand-700">
          {loading ? 'Saving...' : 'Add product'}
        </button>
      </form>
    </div>
  );
};

export default Admin;
