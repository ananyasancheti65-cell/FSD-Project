import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const onSearch = (event) => {
    event.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-semibold text-brand-600 dark:text-brand-400">
          ShopXpress
        </Link>
        <form onSubmit={onSearch} className="flex flex-1 items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm outline-none transition focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
          />
          <button className="rounded-2xl bg-brand-500 px-4 py-2 text-sm text-white transition hover:bg-brand-600">
            Search
          </button>
        </form>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <NavLink to="/cart" className="relative inline-flex items-center rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            Cart
            <span className="ml-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-brand-500 text-xs text-white">
              {cartItems.length}
            </span>
          </NavLink>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-300">{user.name}</span>
              <button onClick={logout} className="text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup" className="rounded-full bg-brand-500 px-4 py-2 text-white hover:bg-brand-600">
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
