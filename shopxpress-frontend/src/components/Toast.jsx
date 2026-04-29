import { useEffect, useState } from 'react';

let toastTimer;
export const showToast = (message, type = 'info') => {
  window.dispatchEvent(new CustomEvent('shopxpress-toast', { detail: { message, type } }));
};

const Toast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      setToast(event.detail);
      clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => setToast(null), 2800);
    };
    window.addEventListener('shopxpress-toast', handler);
    return () => window.removeEventListener('shopxpress-toast', handler);
  }, []);

  if (!toast) return null;

  const color = toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-rose-500' : 'bg-slate-700';

  return (
    <div className={`fixed bottom-5 right-5 z-50 rounded-3xl px-5 py-4 text-white shadow-soft ${color}`}>
      {toast.message}
    </div>
  );
};

export default Toast;
