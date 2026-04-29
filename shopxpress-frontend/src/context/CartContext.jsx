import { createContext, useEffect, useState } from 'react';
import { showToast } from '../components/Toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    setLoading(true);
    try {
      /* Dynamic import so the module is resolved lazily — avoids circular-import
         issues that can silently crash React's initial render. */
      const { fetchCart } = await import('../services/cart');
      const response = await fetchCart();
      setCartItems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      // Backend unavailable — keep cart empty rather than crashing
      console.warn('Cart could not load (backend may be offline)', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const setQuantity = async (productId, quantity) => {
    try {
      const { updateCartItem } = await import('../services/cart');
      await updateCartItem(productId, quantity);
      await loadCart();
      showToast('Cart updated', 'success');
    } catch {
      showToast('Could not update cart', 'error');
    }
  };

  const removeItem = async (productId) => {
    try {
      const { removeCartItem } = await import('../services/cart');
      await removeCartItem(productId);
      await loadCart();
      showToast('Item removed', 'success');
    } catch {
      showToast('Could not remove item', 'error');
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, loading, loadCart, setQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
