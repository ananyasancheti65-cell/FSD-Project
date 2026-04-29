import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';

const ProductCard = ({ product }) => {
  return (
    <article className="glass-card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.title} className="h-52 w-full object-cover" />
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">{product.category}</span>
          <span className="text-lg font-semibold text-brand-600">{formatCurrency(product.price)}</span>
        </div>
        <Link to={`/products/${product._id}`} className="block text-xl font-semibold text-slate-900 dark:text-slate-100">
          {product.title}
        </Link>
        <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{product.description}</p>
      </div>
    </article>
  );
};

export default ProductCard;
