import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/product';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { formatCurrency } from '../utils/helpers';

const categoryBanners = [
  { title: 'Work essentials', subtitle: 'Laptop accessories, notebooks and more', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80', category: 'Accessories' },
  { title: 'Sound Studio', subtitle: 'Premium audio gear for calm studying', image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=900&q=80', category: 'Audio' },
];

/* Sample products shown when backend is unavailable */
const sampleProducts = [
  { _id: '1', title: 'Wireless Earbuds Pro', price: 79.99, image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=600&q=80', category: 'Audio', description: 'Crystal clear sound with active noise cancellation and 24-hour battery life.' },
  { _id: '2', title: 'Canvas Laptop Backpack', price: 49.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80', category: 'Bags', description: 'Water-resistant fabric with padded laptop sleeve fits up to 15.6 inches.' },
  { _id: '3', title: 'Smart Watch Series X', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', category: 'Wearables', description: 'Heart-rate monitor, GPS, and 7-day battery for active campus life.' },
  { _id: '4', title: 'LED Desk Lamp', price: 34.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?auto=format&fit=crop&w=600&q=80', category: 'Home', description: 'Touch dimming with 3 color modes — perfect for late-night study sessions.' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFeatured = async () => {
      setLoading(true);
      try {
        const response = await getProducts({ featured: true });
        const data = Array.isArray(response.data) ? response.data : [];
        setFeatured(data.length ? data.slice(0, 4) : sampleProducts);
      } catch {
        // Backend unavailable — show sample products so the page isn't empty
        setFeatured(sampleProducts);
      }
      setLoading(false);
    };
    loadFeatured();
  }, []);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950/90">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700">New collection</span>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">ShopXpress brings premium campus essentials to your screen.</h1>
            <p className="max-w-2xl text-slate-600 dark:text-slate-300">Browse curated products, build your cart, and checkout with a smooth modern UI designed for college projects and simple shopping.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products" className="rounded-full bg-brand-600 px-6 py-3 text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-700">
                Explore Products
              </Link>
              <Link to="/cart" className="rounded-full border border-slate-300 px-6 py-3 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900">
                View Cart
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {categoryBanners.map((banner) => (
              <article key={banner.title} className="group overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-soft">
                <img src={banner.image} alt={banner.title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{banner.title}</h2>
                  <p className="mt-2 text-sm text-slate-300">{banner.subtitle}</p>
                  <span className="mt-4 inline-flex rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">{banner.category}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Featured products</h2>
            <p className="text-slate-600 dark:text-slate-300">Handpicked items for quick campus shopping.</p>
          </div>
          <p className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">Start from {formatCurrency(25)}</p>
        </div>
        {loading ? <LoadingSkeleton /> : <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{featured.map((product) => <ProductCard key={product._id} product={product} />)}</div>}
      </section>
    </div>
  );
};

export default Home;
