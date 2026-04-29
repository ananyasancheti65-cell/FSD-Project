import api from './api';

export const createProduct = (payload) => api.post('/admin/products', payload);
export const updateProduct = (id, payload) => api.put(`/admin/products/${id}`, payload);
export const deleteProduct = (id) => api.delete(`/admin/products/${id}`);
