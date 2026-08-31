const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function api(path, options = {}) {
  const token = localStorage.getItem('giftlink_token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const getGifts = (params = {}) => {
  const query = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== '' && v !== 'All')).toString();
  return api(`/api/gift${query ? `?${query}` : ''}`);
};
export const searchGifts = (params) => api(`/api/search?${new URLSearchParams(params).toString()}`);
export const getGift = id => api(`/api/gift/${id}`);
export const login = body => api('/api/auth/login', { method: 'POST', body: JSON.stringify(body) });
export const register = body => api('/api/auth/register', { method: 'POST', body: JSON.stringify(body) });
export const updateProfile = body => api('/api/auth/update', { method: 'PUT', body: JSON.stringify(body) });
export const createGift = body => api('/api/gift', { method: 'POST', body: JSON.stringify(body) });
export const updateGift = (id, body) => api(`/api/gift/${id}`, { method: 'PUT', body: JSON.stringify(body) });
export const deleteGift = id => api(`/api/gift/${id}`, { method: 'DELETE' });
export const addComment = (id, text) => api(`/api/gift/${id}/comments`, { method: 'POST', body: JSON.stringify({ text }) });
