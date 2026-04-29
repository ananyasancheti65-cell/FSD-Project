import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/product';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import LoadingSkeleton from '../components/LoadingSkeleton';

/* Fallback products when backend is offline */
const sampleProducts = [
  { _id: '1', title: 'Wireless Earbuds Pro', price: 79.99, image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=600&q=80', category: 'Audio', description: 'Crystal clear sound with active noise cancellation.' },
  { _id: '2', title: 'Canvas Laptop Backpack', price: 49.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80', category: 'Bags', description: 'Water-resistant fabric with padded laptop sleeve.' },
  { _id: '3', title: 'Smart Watch Series X', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', category: 'Wearables', description: 'Heart-rate monitor, GPS, and 7-day battery.' },
  { _id: '4', title: 'LED Desk Lamp', price: 34.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?auto=format&fit=crop&w=600&q=80', category: 'Home', description: 'Touch dimming with 3 color modes.' },
  { _id: '5', title: 'Minimalist Wallet', price: 24.99, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80', category: 'Accessories', description: 'Slim RFID-blocking design for everyday carry.' },
  { _id: '6', title: 'Bluetooth Speaker', price: 59.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80', category: 'Audio', description: 'Portable, waterproof, and 12-hour playtime.' },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ category: 'All', minPrice: '', maxPrice: '' });

  const fetchProductData = async (params = {}) => {
    setLoading(true);
    try {
      const query = {
        search: searchParams.get('search') || '',
        category: params.category && params.category !== 'All' ? params.category : undefined,
        minPrice: params.minPrice || undefined,
        maxPrice: params.maxPrice || undefined,
      };
      const response = await getProducts(query);
      const data = Array.isArray(response.data) ? response.data : [];
      setProducts(data.length ? data : sampleProducts);
    } catch {
      setProducts(sampleProducts);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductData(filters);
  }, [searchParams]);

  const applyFilters = (nextFilters) => {
    setFilters(nextFilters);
    fetchProductData(nextFilters);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <FilterSidebar filters={filters} setFilters={setFilters} onApply={applyFilters} />
      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">All products</h1>
            <p className="text-slate-600 dark:text-slate-300">Browse, filter, and shop with clean product cards.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900">
            {products.length} items found
          </div>
        </div>
        {loading ? <LoadingSkeleton /> : <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product._id} product={product} />)}</div>}
      </section>
    </div>
  );
};

export default Products;
