import api from './api';

export const placeOrder = (items) => api.post('/orders', { items });
export const fetchOrders = () => api.get('/orders');
