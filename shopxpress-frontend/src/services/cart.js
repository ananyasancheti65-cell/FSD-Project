import api from './api';

export const fetchCart = () => api.get('/cart');
export const updateCartItem = (productId, quantity) => api.post('/cart', { productId, quantity });
export const removeCartItem = (productId) => api.delete(`/cart/${productId}`);
