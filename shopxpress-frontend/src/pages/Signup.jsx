import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const { signup, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(form);
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-lg space-y-6 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-950/95">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold">Create your account</h1>
        <p className="text-slate-600 dark:text-slate-300">Simple authentication for your ShopXpress experience.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm text-slate-600 dark:text-slate-300">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-3xl border border-slate-300 bg-slate-100 px-5 py-4 outline-none transition focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
          required
        />
        <label className="block text-sm text-slate-600 dark:text-slate-300">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-3xl border border-slate-300 bg-slate-100 px-5 py-4 outline-none transition focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
          required
        />
        <label className="block text-sm text-slate-600 dark:text-slate-300">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full rounded-3xl border border-slate-300 bg-slate-100 px-5 py-4 outline-none transition focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
          required
        />
        <button disabled={loading} className="w-full rounded-3xl bg-brand-600 px-6 py-4 text-white transition hover:bg-brand-700">
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
