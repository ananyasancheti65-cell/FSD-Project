import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ThemeToggle = () => {
  const { toggleTheme } = useContext(AuthContext);

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    >
      Theme
    </button>
  );
};

export default ThemeToggle;
