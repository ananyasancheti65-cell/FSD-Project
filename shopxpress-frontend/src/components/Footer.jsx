import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-slate-200/80 bg-white/95 py-8 text-slate-700 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-300">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div>
        <h2 className="text-lg font-semibold">ShopXpress</h2>
        <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400">Modern shopping experience for projects, gifts, and campus essentials.</p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link to="/products" className="hover:text-brand-600">Products</Link>
        <Link to="/cart" className="hover:text-brand-600">Cart</Link>
        <Link to="/login" className="hover:text-brand-600">Login</Link>
        <a href="#" className="hover:text-brand-600">Support</a>
      </div>
    </div>
  </footer>
);

export default Footer;
